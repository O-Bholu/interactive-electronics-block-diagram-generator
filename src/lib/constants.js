export const BLOCK_SECTIONS = [
    { id: 'power', label: 'Power Supply', color: 'var(--color-power)', x: 0, y: 0 },
    { id: 'input', label: 'Inputs Block', color: 'var(--color-input)', x: 0, y: 300 },
    { id: 'control', label: 'Control & Processing', color: 'var(--color-control)', x: 350, y: 300 },
    { id: 'output', label: 'Outputs Block', color: 'var(--color-output)', x: 700, y: 150 }, // Split outputs
    { id: 'peripheral', label: 'Other Peripherals', color: 'var(--color-peripheral)', x: 350, y: 600 },
];

export const KEYWORDS = {
    power: ['battery', 'mains', 'solar', 'power', 'supply', 'usb', 'charger', 'adapter'],
    input: ['button', 'switch', 'sensor', 'camera', 'microphone', 'keypad', 'scanner', 'detector'],
    control: ['cpu', 'mcu', 'microcontroller', 'arduino', 'esp32', 'pi', 'fpga', 'processor', 'chip'],
    output: ['led', 'screen', 'display', 'motor', 'speaker', 'buzzer', 'relay', 'light', 'lcd'],
    peripheral: ['wifi', 'bluetooth', 'sd card', 'storage', 'antenna', 'gsm', 'lora', 'module'],
};
