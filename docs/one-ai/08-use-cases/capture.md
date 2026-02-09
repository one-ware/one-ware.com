---
id: camera-tool
title: AI Industry Automation in One Click
sidebar_label: Quality Control in One Click
---

import LiteYouTubeEmbed from '@site/src/components/LiteYouTubeEmbed';

### High Speed and Precise Quality Control or General Factory Automation in One Click

From **[potato chip inspection](/docs/one-ai/use-cases/chip)** to **[PCB defect detection](/docs/one-ai/use-cases/pcb)**, ONE AI has shown that it can generate models that are not only **leaner and faster**, but also **more accurate** than both universal networks and hand-crafted expert designs. These results have been confirmed in our joint whitepaper with Altera—where even a decade-old MAX® 10 FPGA outperformed Nvidia’s Jetson Orin Nano—and in independent PCB benchmarks, where ONE AI surpassed researcher-built architectures while running more than ten times faster.

<div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
  <img src="/img/ai/one_ai_plugin/use_cases/capture/full.png" alt="Camera Tool capturing images for QC" style={{maxHeight:'320px', borderRadius:'8px'}} />
</div>

But high-performance models are only the first step. With the **Camera Tool**, they can be used for industry automation or turned into a **production-ready quality control station** instantly - without custom UI development or complex integration work.

---

## What this means for quality control and industry automation

**No custom UI needed**  
The Camera Tool already provides a clean, full-screen operator interface with clear visualization, logging, and feedback options. There is no need to design or program a separate application.

**Use existing hardware**  
A standard NUC PC and a USB camera are enough. The AI model runs locally, while the Camera Tool handles capture, decision-making, and operator interaction. For production, it connects seamlessly to a PLC to control sorting or rejection systems.

<div style={{display:'flex', justifyContent:'center', margin:'20px 0'}}>
  <img src="/img/ai/one_ai_plugin/getting_started/camera_tool/capture.webp" alt="Camera Tool capturing images for QC" style={{maxHeight:'320px', borderRadius:'8px'}} />
</div>

**Continuous improvement built in**  
Whenever new images are captured, they can be uploaded to the ONE AI Cloud for retraining. Each retraining not only adapts the model to new data, but also lets ONE AI automatically **redesign the architecture** for even higher efficiency and accuracy. This creates a cycle of ongoing optimization with every batch of data.

**Traceability and feedback**  
Every decision is logged. Operators can override classifications (“actually OK/Defect”), and these corrections can feed directly back into the dataset for the next training cycle.

---

## Example: AI in running production

The following demo shows how a **MAX® 10 FPGA** can be used to implement real-time AI-based quality control directly in production:

<div style={{display:'flex', justifyContent:'center', margin:'20px 0', maxWidth: '600px', marginLeft: 'auto', marginRight: 'auto'}}>
  <LiteYouTubeEmbed
    videoId="ywtKTb8Z3_Q"
    previewImage="https://i.ytimg.com/vi/ywtKTb8Z3_Q/maxresdefault.jpg"
    title="AI in running production"
  />
</div>

The same principle applies with a **conveyor belt**, a **NUC PC**, and the Camera Tool: the AI evaluates each part in real time, and the PLC sorts out defective items automatically. What begins as a dataset experiment quickly becomes a **fully operational QC station** on the shop floor.

---

## Why this matters

- **No custom development overhead:** ready-to-use UI for operators.  
- **Leverages existing infrastructure:** runs on standard PCs and connects to cameras and PLCs.  
- **Improves with use:** each new batch of images triggers a retraining cycle in the ONE AI Cloud, with optimized architectures for even better performance.  
- **Compliance and traceability included:** all results, images, and thresholds are logged automatically.

---

## Conclusion

The Camera Tool completes the workflow:  
**ONE AI develops the superior models—and with a single click they become a production-ready QC station.**

From lab experiments to real production lines, you get **accurate AI decisions, seamless hardware integration, and continuous model improvement**—without extra engineering effort. It’s the fastest path from **better models** to **better manufacturing outcomes**.

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Open Source Program Support" />