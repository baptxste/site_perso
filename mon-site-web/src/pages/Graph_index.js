import React, { useRef, useEffect, useState } from 'react';
import { ForceGraph3D } from 'react-force-graph';
import './dark.css';
import { useWindowSize } from '@react-hook/window-size';




// import * as THREE from 'three';
// // eslint-disable-next-line
// const createNeuron = (id) => {
//   const group = new THREE.Group();

//   // Création du soma (corps cellulaire) comme une sphère
//   const somaGeometry = new THREE.SphereGeometry(1, 32, 32);
//   const somaMaterial = new THREE.MeshBasicMaterial({ color: 'blue' });
//   const soma = new THREE.Mesh(somaGeometry, somaMaterial);
//   group.add(soma);
//   return group;
// };





const Graph = () => {
    const fgRef = useRef();
    const [data, setData] = useState({ nodes: [], links: [] });
    const [loading, setLoading] = useState(true);
    // eslint-disable-next-line
    const [width, height] = useWindowSize();

    useEffect(() => {
        fetch('data.json')
            .then(response => response.json())
            .then(data => {
                // Ajouter des URLs aux nœuds
                const nodesWithUrls = data.nodes.map(node => ({
                    ...node,
                    url: node.url
                }));
                setData({ nodes: nodesWithUrls, links: data.links });
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching graph data:', error);
                setLoading(false);
            });
    }, []);

    useEffect(() => {
        if (!loading && fgRef.current) {
            fgRef.current.zoomToFit(400);
        }
    }, [loading]);

    const handleNodeClick = (node) => {
        if (node.url) {
            window.location.href = node.url;
        }
    };

    return (
        <div className="content" >
            {loading ? (
                <p>Loading graph...</p>
            ) : (
                <ForceGraph3D
                    ref={fgRef}
                    graphData={data}
                    // nodeThreeObject={({ id }) => createNeuron(id)}
                    nodeLabel="id"
                    nodeAutoColorBy="group"
                    nodeColor={()=>'blue'}
                    nodeResolution={50}
                    backgroundColor="#2B4257"
                    onNodeClick={handleNodeClick}
                    width={width * 0.95}
                    linkDirectionalParticles="value"
                    linkDirectionalParticleSpeed={d => d.value * 0.001}
                    linkDirectionalParticleColor={() => 'violet'}
                    linkDirectionalParticleWidth={0.5}
                />
            )}
        </div>
    );
};

export default Graph;
