// Declare edges as a global variable
const edges = [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['k', 'h']];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to visualize a non-directed graph based on the provided edges
const visualizeGraph = (edges) => {
    // Get the graph container from the DOM
    const container = document.getElementById('graph-container');
    // Iterate over edges to visualize nodes and edges in the graph
    for (let [a, b] of edges) {
        visualizeNode(a);
        visualizeEdge(a, b);
        visualizeNode(b);
    }
}

// Asynchronous function to visualize the graph and check for the existence of a path between two nodes
const undirectedPath = async (nodeA, nodeB) => {
    // Visualize the graph before performing the path check
    visualizeGraph(edges);

    // Build the graph based on the provided edges
    const graph = buildGraph(edges);

    // Await the asynchronous path check between nodeA and nodeB
    const result = await hasPath(graph, nodeA, nodeB);

    // Update the HTML element content with the path check results
    document.getElementById('result').textContent = `Path from ${nodeA} to ${nodeB}: ${result}`;

    // If there is a path, display an additional message
    if (result) {
        document.getElementById('if-graph-end-true').textContent = `YOU GOT ARRIVE TO ${nodeB}`;
    }
}

// Asynchronous function to check if a path exists between source (src) and destination (dst) nodes in a graph
const hasPath = async (graph, src, dst, visited = new Set()) => {
    // Base case: source equals destination, there is a path
    if (src === dst) return true;

    // Mark the current node as visited and highlight it
    visited.add(src);
    visualizeNode(src, 'highlight');

    // Introduce a delay for visualization
    await delay(1000);

    // Iterate over neighbors of the current node
    for (let neighbor of graph[src]) {
        // Highlight the edge to the neighbor
        visualizeEdge(src, neighbor, 'highlight');

        // Recursively check for a path from the neighbor to the destination
        if (!visited.has(neighbor) && await hasPath(graph, neighbor, dst, visited)) {
            return true;
        }
        // Remove the highlight from the edge after checking
        visualizeEdge(src, neighbor);
    }

    // Remove the highlight from the edge after checking
    visualizeNode(src);

    // If no path is found from this node, return false
    return false;
};

// Function to visualize a node in the graph with an optional CSS class
const visualizeNode = (node, className = '') => {
    const nodeElement = document.createElement('div');
    nodeElement.className = `node ${className}`;
    nodeElement.textContent = node;
    document.getElementById('graph-container-node').appendChild(nodeElement);
}

// Function to visualize an edge between nodes with an optional CSS class
const visualizeEdge = (nodeA, nodeB, className = '') => {
    const edgeElement = document.createElement('div');
    edgeElement.className = `edge ${className}`; // Include the 'edge' class
    edgeElement.innerHTML = '&nbsp;'; // Add a non-breaking space as content
    document.getElementById('graph-container-node').appendChild(edgeElement);
}

// Function to build a graph from the provided edges
const buildGraph = (edges) => {
    const graph = {};

    // Iterate over edges to build the graph
    for (let edge of edges) {
        const [a, b] = edge;

        // Initialize nodes in the graph if not present
        if (!(a in graph)) graph[a] = [];
        if (!(b in graph)) graph[b] = [];

        // Add edges to the graph
        graph[a].push(b);
        graph[b].push(a);
    }

    return graph;
}

// Function to convert edges to edge pairs
const getEdgePairs = (edges) => {
    const edgePairs = [];

    // Iterate over edges to create edge pairs
    for (let [a, b] of edges) {
        edgePairs.push([a, b]);
    }
    return edgePairs;
}

// function to be called when the runPath button is clicked
async function runPath() {
    // Get the spinner and button elements
    const spinner = document.getElementById('spinner');
    const button = document.getElementById('runPathBtn');

    // Check if the elements are found
    if (!spinner || !button) {
        console.error('Spinner or button element not found.');
        return;
    }


    // Clear the result area
    document.getElementById('result').textContent = '';
    // Clear the graph container nodes and edges
    document.getElementById('graph-container-node').innerHTML = '';
    document.getElementById('graph-container').innerHTML = '';
    // Clear the previous message
    document.getElementById('if-graph-end-true').textContent = '';

    const form = document.getElementById('pathForm');
    const formData = new FormData(form);
    const userNodeA = formData.get('nodeA').toLowerCase();
    const userNodeB = formData.get('nodeB').toLowerCase();

    // Check if inputs are empty
    if (!userNodeA || !userNodeB) {
        alert('Please fill in both nodeA and nodeB.');
        return;
    }
    else {
        // Show the spinner and disable the button
        spinner.style.display = 'inline-block';
        button.disabled = true;
    }

    await undirectedPath(userNodeA, userNodeB);

    // Hide the spinner and enable the button after completion
    spinner.style.display = 'none';
    button.disabled = false;
}

function clearGraph() {
    // Clear the graph container nodes and edges
    document.getElementById('graph-container-node').innerHTML = '';
    document.getElementById('graph-container').innerHTML = '';

    // Clear the nodeA and nodeB inputs
    document.getElementById('nodeA').value = '';
    document.getElementById('nodeB').value = '';
}

function toggleAnswer(questionId) {
    const answer = document.getElementById(questionId);
    if (answer.style.display === 'block') {
        answer.style.display = 'none';
    } else {
        answer.style.display = 'block';
    }
}