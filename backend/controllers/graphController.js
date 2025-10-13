const fs = require('fs');
const path = require('path');

// Build hierarchical tree from flat node array
function buildTree(nodes, parent = "") {
  return nodes
    .filter(n => n.parent === parent)
    .map(n => ({
      name: n.name,
      description: n.description,
      children: buildTree(nodes, n.name)
    }));
}

// Controller: GET /api/graph
exports.getGraph = (req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'data.json'); 
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ error: 'Data file not found' });
    }

    const data = JSON.parse(fs.readFileSync(filePath, 'utf8')); 
    const tree = buildTree(data.data);                         
    res.json({ tree: tree[0] });  
  } catch (err) {
    console.error('Error reading data:', err);
    res.status(500).json({ error: 'Failed to read tree data' });
  }
};
