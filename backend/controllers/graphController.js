const fs = require('fs');
const path = require('path');
const neo4j = require('neo4j-driver');
const { driver } = require('../db/db');

// Recursive function to build hierarchy for a given node
function buildNode(node, nodes) {
  let children = nodes.filter(n => n.parent === node.name);

  // sort children
  if (node.name === "A") {
    const order = ["C", "B", "D"];
    children.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  } else if (node.name === "B") {
    const order = ["B-1", "B-2", "B-3"];
    children.sort((a, b) => order.indexOf(a.name) - order.indexOf(b.name));
  }

  const childNodes = children.map(child => buildNode(child, nodes));

  return {
    name: node.name,
    description: node.description,
    children: childNodes
  };
}

exports.getGraph = async (req, res) => {
  const session = driver.session(); // create a session per request

  try {
    // Get all nodes and parent info
    const result = await session.run(`
      MATCH (n:Node)
      OPTIONAL MATCH (p:Node)-[:HAS_CHILD]->(n)
      RETURN n.name AS name, n.description AS description, 
             CASE WHEN p.name IS NULL THEN '' ELSE p.name END AS parent
    `);

    const nodes = result.records.map(rec => ({
      name: rec.get('name'),
      description: rec.get('description'),
      parent: rec.get('parent')
    }));

    const rootNode = nodes.find(n => n.parent === "");
    if (!rootNode) return res.status(404).json({ error: "Root node not found" });

    const tree = buildNode(rootNode, nodes);
    res.json(tree);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch tree data from Neo4j' });
  } finally {
    await session.close(); // close session after request
  }
};
