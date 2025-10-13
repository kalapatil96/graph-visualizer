<template>
  <div style="display:flex; align-items:flex-start">
    <!-- SVG Tree -->
    <svg ref="svg" style="border:1px solid #ccc"></svg>

    <!-- Sidebar for node details -->
    <div style="width:250px; margin-left:20px; font-family:Arial;">
      <h3>Node Details</h3>
      <div v-if="selectedNode">
        <p><strong>Name:</strong> {{ selectedNode.name }}</p>
        <p><strong>Description:</strong> {{ selectedNode.description }}</p>
        <button @click="selectedNode=null">✕ Deselect</button>
      </div>
      <div v-else>
        Click a node to see details
      </div>
    </div>
  </div>
</template>

<script>
import * as d3 from 'd3';
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const svg = ref(null);             // SVG reference
    const selectedNode = ref(null);    // Node selected by user

    onMounted(async () => {
      try {
        // Fetch tree data from backend
        const res = await fetch('http://localhost:3000/api/graph');
        const { tree } = await res.json();

        drawTree(tree); // Draw the tree
      } catch (err) {
        console.error('Error fetching tree data:', err);
      }
    });

    function drawTree(treeData) {
      // Margin and SVG dimensions
      const margin = { top: 40, right: 150, bottom: 20, left: 100 };
      const width = 800 - margin.left - margin.right;
      const height = 400 - margin.top - margin.bottom;

      // Select SVG and add group with margin
      const svgEl = d3.select(svg.value)
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      // Create hierarchy and tree layout
      const root = d3.hierarchy(treeData);
      d3.tree().size([height, width])(root);

      // Draw links (lines connecting nodes)
      svgEl.selectAll('path.link')
        .data(root.links())
        .join('path')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#555')
        .attr('stroke-width', 2)
        .attr('d', d3.linkHorizontal()
          .x(d => d.y)
          .y(d => d.x)
        );

      // Draw nodes (circles + text)
      const node = svgEl.selectAll('g.node')
        .data(root.descendants())
        .join('g')
        .attr('class', 'node')
        .attr('transform', d => `translate(${d.y},${d.x})`);

      node.append('circle')
        .attr('r', 20)
        .attr('fill', 'steelblue')
        .on('click', (_, d) => selectedNode.value = d.data);

      node.append('text')
        .attr('x', 25)
        .attr('dy', 4)
        .text(d => d.data.name);
    }

    return { svg, selectedNode };
  }
};
</script>

<style>
/* Hover effect for nodes */
.node circle:hover {
  fill: orange;
  cursor: pointer;
}
</style>
