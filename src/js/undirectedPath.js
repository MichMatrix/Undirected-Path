// Declare edges as a global variable
const edges = [['a', 'b'], ['b', 'c'], ['b', 'd'], ['c', 'e'], ['k', 'h']];

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Function to visualize an edge between nodes with an optional CSS class


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
