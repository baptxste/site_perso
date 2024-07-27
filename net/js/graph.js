// Data for the graph (nodes and links)
// const nodes = [
//     { id: 'Note 1', url: `page${1}.html` },
//     { id: 'Note 2', url: `page${1}.html` },
//     { id: 'Note 3' , url: `page${1}.html`},
// ];

// const links = [
//     { source: 'Note 1', target: 'Note 2' },
//     { source: 'Note 2', target: 'Note 3' },
//     { source: 'Note 3', target: 'Note 1' },
// ];
// Générer des données pour les nœuds et les liens
const nodes = d3.range(50).map(i => ({ id: `Note ${i + 1}`, url: `../notes/page${i + 1}.html` }));

const links = d3.range(100).map(() => ({
    source: `Note ${Math.floor(Math.random() * 50) + 1}`,
    target: `Note ${Math.floor(Math.random() * 50) + 1}`
}));

// Dimensions du SVG
const width = window.innerWidth;
const height = window.innerHeight;

const svg = d3.select('#graph')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    .call(d3.zoom().on('zoom', function (event) {
        svg.attr('transform', event.transform);
    }))
    .append('g');

// Initialiser la simulation de force
const simulation = d3.forceSimulation(nodes)
    .force('link', d3.forceLink(links).id(d => d.id).distance(50))
    .force('charge', d3.forceManyBody().strength(-100))
    .force('center', d3.forceCenter(width / 2, height / 2))
    .force('collision', d3.forceCollide().radius(20))
    .on('tick', ticked);

// Ajouter les liens au SVG
const link = svg.append('g')
    .attr('class', 'links')
    .selectAll('line')
    .data(links)
    .enter().append('line')
    .attr('class', 'link');

// Ajouter les nœuds au SVG
const node = svg.append('g')
    .attr('class', 'nodes')
    .selectAll('circle')
    .data(nodes)
    .enter().append('circle')
    .attr('class', 'node')
    .attr('r', 8)
    .attr('fill', '#69b3a2')
    .on('click', function(event, d) {
        event.stopPropagation(); // Empêcher le déclenchement de l'événement sur le SVG
        highlightNode(d);
    })
    .call(drag(simulation));

// Ajouter les labels aux nœuds
const label = svg.append('g')
    .selectAll('text')
    .data(nodes)
    .enter().append('text')
    .text(d => d.id)
    .attr('x', 10)
    .attr('y', 3);

// Fonction pour mettre en évidence le nœud sélectionné et les liens associés
function highlightNode(selectedNode) {
    node.attr('fill', d => d.id === selectedNode.id ? 'orange' : '#ccc')
        .attr('opacity', d => d.id === selectedNode.id ? 1 : 0.5);

    link.attr('stroke', d => d.source.id === selectedNode.id || d.target.id === selectedNode.id ? 'orange' : '#999')
        .attr('opacity', d => d.source.id === selectedNode.id || d.target.id === selectedNode.id ? 1 : 0.5);

    label.attr('opacity', d => d.id === selectedNode.id ? 1 : 0.5);
}

// Gérer le clic sur le SVG pour réinitialiser la mise en forme
d3.select('svg').on('click', function(event) {
    if (event.target.tagName !== 'circle' && event.target.tagName !== 'line') {
        resetHighlight();
    }
});

// Fonction pour réinitialiser la mise en forme des nœuds et liens
function resetHighlight() {
    node.attr('fill', '#69b3a2').attr('opacity', 1);
    link.attr('stroke', '#999').attr('opacity', 1);
    label.attr('opacity', 1);
}

// Mettre à jour les positions des nœuds, liens et labels à chaque tick
function ticked() {
    link
        .attr('x1', d => d.source.x)
        .attr('y1', d => d.source.y)
        .attr('x2', d => d.target.x)
        .attr('y2', d => d.target.y);

    node
        .attr('cx', d => d.x)
        .attr('cy', d => d.y);

    label
        .attr('x', d => d.x)
        .attr('y', d => d.y);
}

// Gérer le déplacement des nœuds
function drag(simulation) {
    function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
    }

    function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
    }

    function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
    }

    return d3.drag()
        .on('start', dragstarted)
        .on('drag', dragged)
        .on('end', dragended);
}

// Initialiser les positions des nœuds
nodes.forEach((d, i) => {
    d.x = Math.random() * width;
    d.y = Math.random() * height;
});

// Démarrer la simulation
simulation.nodes(nodes);

// Mettre à jour les forces en fonction des contrôles
d3.select('#link-distance').on('input', function() {
    const distance = +this.value;
    d3.select('#link-distance-value').text(distance);
    simulation.force('link').distance(distance);
    simulation.alpha(1).restart();
});

d3.select('#charge-strength').on('input', function() {
    const strength = +this.value;
    d3.select('#charge-strength-value').text(strength);
    simulation.force('charge').strength(strength);
    simulation.alpha(1).restart();
});

d3.select('#collision-radius').on('input', function() {
    const radius = +this.value;
    d3.select('#collision-radius-value').text(radius);
    simulation.force('collision').radius(radius);
    simulation.alpha(1).restart();
});
