# 🧩 Interactive Electronics Block Diagram Generator

An interactive **web-based canvas** that converts **natural language descriptions** of electronics products into **editable block diagrams**.  
The application generates a structured block diagram with **five predefined sections**, allowing users to modify, annotate, and export the diagram.



---

## 🚀 Features

- 📝 **Natural Language Input**
  - Describe any electronics product (e.g., *"Smart doorbell with camera, battery, and WiFi"*).

- 🧱 **Automatic Diagram Generation**
  - Generates a block diagram with **exactly five sections**:
    1. Power Supply  
    2. Inputs Block  
    3. Control & Processing Block  
    4. Outputs Block  
    5. Other Peripherals  

- ✏️ **Full Interactivity**
  - Add, remove, or modify blocks
  - Create or delete connections
  - Move components freely
  - Add comments and annotations

- 📤 **Export Options**
  - Export diagram as **JSON**
  - Machine-readable and programmatically editable

- 🌐 **Web-Based & Offline Friendly**
  - Runs entirely in the browser
  - No backend required

---

## 🏗️ Architecture Overview

### Tech Stack

| Technology | Purpose |
|----------|--------|
| React (Vite) | Frontend framework |
| react-flow-renderer | Interactive diagram rendering |
| Vanilla CSS | Styling & theming |
| lucide-react | Icons |

---

## 🧠 Diagram Generation Logic

Since no backend or LLM is used, the system relies on a **heuristic keyword-based generator**.

### Keyword Mapping Strategy

| Keyword Detected | Assigned Block |
|----------------|--------------|
| Battery, Power Adapter | Power Supply |
| Camera, Sensor, Button | Inputs Block |
| MCU, Processor | Control & Processing |
| LED, Display, Motor | Outputs Block |
| WiFi, Bluetooth, Storage | Other Peripherals |

- If no controller is detected, a **default MCU** is automatically added.
- The diagram always enforces **five fixed zones (swimlanes)** for consistency.

---

🧪 Verification & Testing
========================
Manual Testing

Input Prompt-1
=============

=> Smart doorbell with camera, battery, and WiFi


Expected Output
================

Camera → Inputs Block

Battery → Power Supply

WiFi → Other Peripherals

MCU → Control & Processing (auto-added)

<img width="940" height="527" alt="image" src="https://github.com/user-attachments/assets/7c4bafa2-a284-435e-927b-c15ade93b8c4" />


Input Prompt-2
==============

"Smart Doorbell with camera, motion sensor, battery, wifi module, and a speaker."

Expected Output
================
<img width="940" height="521" alt="image" src="https://github.com/user-attachments/assets/0ced4938-9b23-47a3-9f47-56723d6d41a0" />




Interactivity Checks
===================

Move nodes

Delete or add components

Create or remove connections



Export
========
Click Export JSON

Verify structured, machine-readable output

Automated tests are not included in this prototype phase.
