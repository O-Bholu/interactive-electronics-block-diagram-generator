import { BLOCK_SECTIONS, KEYWORDS } from './constants';

export const generateDiagram = (prompt) => {
    const lowerPrompt = prompt.toLowerCase();
    const nodes = [];
    const edges = [];

    // 1. Create Section Groups
    BLOCK_SECTIONS.forEach((section) => {
        nodes.push({
            id: section.id,
            type: 'group', // We will need to register a custom group type or use default Group
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
        });
    });

    // We'll split by common separators to find "items"
    // Added support for periods, newlines, and common conjunctions
    const tokens = lowerPrompt.split(/,| and | with | including | also |\.|;|\n/).map(t => t.trim()).filter(t => t);

    // Always ensure a Control Block exists (Central Node)
    let controlNodeId = null;

    const detectedItems = [];

    tokens.forEach((token, index) => {
        let matchedSection = null;

        // Check against keywords
        for (const [sectionKey, words] of Object.entries(KEYWORDS)) {
            if (words.some(w => token.includes(w))) {
                matchedSection = sectionKey;
                break;
            }
        }

        if (matchedSection) {
            const nodeId = `node-${index}`;
            const itemLabel = token.charAt(0).toUpperCase() + token.slice(1);

            // Calculate position within group (simple stack layout)
            // We need to know how many items are already in this section to stack them
            const itemsInSection = detectedItems.filter(i => i.section === matchedSection).length;
            const xOffset = 20;
            const yOffset = 50 + (itemsInSection * 60);

            nodes.push({
                id: nodeId,
                type: 'default', // Standard input/output node
                data: { label: itemLabel },
                position: { x: xOffset, y: yOffset },
                parentNode: matchedSection,
                extent: 'parent', // Keep inside group
                style: {
                    background: '#333',
                    color: '#fff',
                    border: '1px solid #777',
                    width: 260
                }
            });

            detectedItems.push({ id: nodeId, section: matchedSection });

            if (matchedSection === 'control') {
                controlNodeId = nodeId;
            }
        }
    });

    // If no control node found, add a generic one
    if (!controlNodeId) {
        const mcuId = 'node-mcu-default';
        nodes.push({
            id: mcuId,
            type: 'default',
            data: { label: 'Microcontroller (Auto)' },
            position: { x: 20, y: 50 },
            parentNode: 'control',
            extent: 'parent',
            style: { background: '#333', color: '#fff', border: '1px solid #777', width: 260 }
        });
        controlNodeId = mcuId;
        // Adjust existing control nodes if any? No, just add it.
    }

    // 3. Generate Edges (Star Topology centered on Control)
    // Everything connects to the Main Control Unit
    detectedItems.forEach(item => {
        if (item.id !== controlNodeId) {


            let source = item.id;
            let target = controlNodeId;

            if (item.section === 'input') {
                source = item.id;
                target = controlNodeId;
            } else if (item.section === 'output') {
                source = controlNodeId;
                target = item.id;
            } else if (item.section === 'power') {
                source = item.id;
                target = controlNodeId;
            } else {
                // Peripheral: Double arrow? Or just connection.
                source = controlNodeId;
                target = item.id;
            }

            edges.push({
                id: `edge-${source}-${target}`,
                source,
                target,
                animated: true,
                style: { stroke: '#888' }
            });
        }
    });

    return { nodes, edges };
};
