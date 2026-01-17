import React, { useCallback } from 'react';
import ReactFlow, {
    addEdge,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState
} from 'reactflow';
import 'reactflow/dist/style.css';

// Default initial nodes (just the groups? No, passed from App usually)
const initialNodes = [];
const initialEdges = [];

const Canvas = ({ nodes, edges, onNodesChange, onEdgesChange, onConnect, setNodes, setEdges }) => {

    const onConnectHandler = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    // We can also handle drag and drop here later.

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <ReactFlow
                nodes={nodes}
                edges={edges}
                onNodesChange={onNodesChange}
                onEdgesChange={onEdgesChange}
                onConnect={onConnectHandler}
                fitView
            >
                <Background color="#444" gap={16} />
                <Controls />
                <MiniMap nodeStrokeColor={(n) => {
                    if (n.type === 'group') return n.style.color;
                    return '#eee';
                }} />
            </ReactFlow>
        </div>
    );
};

export default Canvas;
