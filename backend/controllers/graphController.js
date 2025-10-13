const fs = require('fs');
const path = require('path');


// Build hierarchical tree from flat node array
function buildTree(nodes, parent = "") {
  return nodes
    .filter(n => n.parent === parent)   // Select nodes with current parent
    .map(n => ({
      name: n.name,
      description: n.description,
      children: buildTree(nodes, n.name) // Recursively build children
    }));
}

// Controller: GET /api/graph
exports.getGraph = (req, res) => {
  const filePath = path.join(__dirname, '..', 'data.json'); // JSON data file
  const data = JSON.parse(fs.readFileSync(filePath, 'utf8')); 
  const tree = buildTree(data.data);                         
  res.json({ tree: tree[0] });                         
};