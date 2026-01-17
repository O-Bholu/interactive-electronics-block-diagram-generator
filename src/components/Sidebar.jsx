import React, { useState } from 'react';

export default function Sidebar({ onGenerate }) {
    const [prompt, setPrompt] = useState('');

    const handleGenerate = () => {
        if (!prompt.trim()) return;
        onGenerate(prompt);
    };

    return (
        <aside style={{
            width: '300px',
            background: 'var(--bg-panel)',
            borderRight: '1px solid #333',
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px',
            color: '#fff'
        }}>
            <div>
                <h2 style={{ fontSize: '1.2rem', marginBottom: '10px' }}>Diagram Input</h2>
                <textarea
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    placeholder="Describe your electronics system (e.g., Smart Doorbell with Camera, Battery, WiFi...)"
                    style={{
                        width: '100%',
                        height: '150px',
                        background: '#1a1a1a',
                        border: '1px solid #444',
                        borderRadius: '4px',
                        color: '#fff',
                        padding: '10px',
                        resize: 'vertical'
                    }}
                />
                <button
                    onClick={handleGenerate}
                    style={{
                        marginTop: '10px',
                        width: '100%',
                        background: '#646cff',
                        color: '#fff',
                        padding: '10px',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontWeight: 'bold'
                    }}
                >
                    Generate Diagram
                </button>
            </div>

            <div style={{ fontSize: '0.9rem', color: '#888' }}>
                <p><strong>Tips:</strong></p>
                <ul style={{ paddingLeft: '20px' }}>
                    <li>Mention power sources (Battery, USB)</li>
                    <li>List sensors (Camera, Button)</li>
                    <li>Include outputs (Screen, LED)</li>
                    <li>Add connectivity (WiFi, Bluetooth)</li>
                </ul>
            </div>
        </aside>
    );
}
