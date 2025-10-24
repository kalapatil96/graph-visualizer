<template>
  <div style="display:flex; align-items:flex-start">
    <!-- SVG Tree -->
    <svg ref="svg" style="border:1px solid #ccc"></svg>

    <!-- Sidebar for node details -->
    <div style="width:300px; margin-left:20px; font-family:Arial;">
      <h2>Node Details</h2>
      <div v-if="selectedNode">
        <p><span class="label">Name:</span> {{ selectedNode.name }}</p>
        <p><span class="label">Description:</span> {{ selectedNode.description }}</p>
        <button @click="selectedNode=null">✕ Deselect</button>
      </div>
      <div v-else>
        Click a node to see details
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import * as d3 from 'd3';

const svg = ref(null);             // SVG reference
const selectedNode = ref(null);    // Selected node state

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

onMounted(async () => {
  try {
    // Fetch tree data from backend
   const res = await fetch(`${API_BASE_URL}`);
    const tree = await res.json();   // backend returns the root node directly

    drawTree(tree);
  } catch (err) {
    console.error('Error fetching tree data:', err);
  }
});

function drawTree(treeData) {
  const margin = { top: 40, right: 150, bottom: 20, left: 100 };
  const width = 800 - margin.left - margin.right;
  const height = 400 - margin.top - margin.bottom;

  const svgEl = d3.select(svg.value)
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  const root = d3.hierarchy(treeData);
  d3.tree().size([height, width])(root);

  const rectWidth = 100;
  const rectHeight = 40;

  // Draw links from rectangle edges
  svgEl.selectAll('path.link')
    .data(root.links())
    .join('path')
    .attr('class', 'link')
    .attr('fill', 'none')
    .attr('stroke', '#555')
    .attr('stroke-width', 2)
    .attr('d', d => {
      // start and end points adjusted to rectangle edges
      const startX = d.source.y + rectWidth / 2;
      const startY = d.source.x;
      const endX = d.target.y - rectWidth / 2;
      const endY = d.target.x;

      return `M${startX},${startY} C${(startX + endX) / 2},${startY} ${(startX + endX) / 2},${endY} ${endX},${endY}`;
    });

  // Draw nodes (rectangles + text)
  const node = svgEl.selectAll('g.node')
    .data(root.descendants())
    .join('g')
    .attr('class', 'node')
    .attr('transform', d => `translate(${d.y},${d.x})`);

  node.append('rect')
    .attr('x', -rectWidth / 2)
    .attr('y', -rectHeight / 2)
    .attr('width', rectWidth)
    .attr('height', rectHeight)
    .attr('fill', 'steelblue')
    .attr('stroke', '#333')
    .attr('stroke-width', 2)
    .on('click', (_, d) => selectedNode.value = d.data);

  node.append('text')
    .attr('x', 0)
    .attr('y', 5)
    .attr('text-anchor', 'middle')
    .attr('fill', 'white')
    .text(d => d.data.name);
}

</script>

<style>
/* Hover effect for rectangle nodes */
.node rect:hover {
  fill: orange;   /* color change on hover */
  cursor: pointer; /* pointer cursor */
}

/* Node text style */
.node text {
  font-weight: bold;
  pointer-events: none; /* prevents text from blocking rectangle click */
}
</style>

