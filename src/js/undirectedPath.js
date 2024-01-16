// Declare edges as a global variable
const edges = [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['k', 'h']];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));





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