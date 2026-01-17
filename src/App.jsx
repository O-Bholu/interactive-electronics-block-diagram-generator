import { useState, useCallback, useEffect } from 'react'
import ReactFlow, { useNodesState, useEdgesState, addEdge } from 'reactflow';
import './App.css'
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import { generateDiagram } from './lib/generator';
import { BLOCK_SECTIONS } from './lib/constants';

// Initialize with just the empty groups
const initGroups = BLOCK_SECTIONS.map((section) => ({
  id: section.id,
  type: 'group',
  data: { label: section.label },
  position: { x: section.x, y: section.y },
  style: {
    width: 300,
    height: 250,
    border: `2px dashed ${section.color}`,
    borderRadius: '8px',
    color: section.color,
    backgroundColor: 'rgba(255,255,255,0.02)'
  },
}));

function App() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initGroups);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  const handleGenerate = (prompt) => {
    const { nodes: newNodes, edges: newEdges } = generateDiagram(prompt);
    // Maintain existing node positions if possible? 
    // For now, full regenerate
    setNodes(newNodes);
    setEdges(newEdges);
  };

  const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

  const addAnnotation = () => {
    const label = window.prompt('Enter annotation text:');
    if (!label) return;

    const id = `note-${Date.now()}`;
    const newNode = {
      id,
      position: { x: 400, y: 400 }, // Center-ish
      data: { label },
      style: {
        background: '#fff9c4',
        color: '#333',
        border: '1px solid #f57f17',
        width: 180,
        fontSize: '0.9rem',
        boxShadow: '2px 2px 5px rgba(0,0,0,0.1)'
      },
      type: 'default',
    };
    setNodes((nds) => nds.concat(newNode));
  };

  const downloadJSON = () => {
    const data = { nodes, edges };
    const json = JSON.stringify(data, null, 2);
    const blob = new Blob([json], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'diagram.json';
    a.click();
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Interactive Block Diagram Canvas</h1>
        <div className="toolbar-actions" style={{ display: 'flex', gap: '10px' }}>
          <button onClick={addAnnotation} style={{ fontSize: '0.9rem', padding: '6px 12px', background: '#eab308', color: '#000' }}>
            + Note
          </button>
          <button onClick={downloadJSON} style={{ fontSize: '0.9rem', padding: '6px 12px' }}>
            Export JSON
          </button>
          <button onClick={() => setNodes(initGroups)} style={{ fontSize: '0.9rem', padding: '6px 12px', background: '#d33' }}>
            Reset
          </button>
        </div>
      </header>
      <main className="main-content">
        <Sidebar onGenerate={handleGenerate} />
        <div className="canvas-area" style={{ flex: 1, height: '100%' }}>
          <Canvas
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            setNodes={setNodes}
            setEdges={setEdges}
          />
        </div>
      </main>
    </div>
  )
}

export default App

