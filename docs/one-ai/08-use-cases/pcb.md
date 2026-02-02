---
id: pcb
title: High Precision Computer Vision
sidebar_label: High Precision Computer Vision
---

### Outperforming hand-crafted architectures with optimized AI models

Printed Circuit Board (PCB) quality inspection is a critical step in electronics manufacturing. Defective boards not only increase costs but can also compromise product safety and reliability. Traditionally, researchers have designed specialized deep learning architectures for this task, as documented in the [scientific paper on PCB defect detection](https://arxiv.org/pdf/1902.06197).  

ONE AI was tested on the same dataset and benchmarked against both **researcher-designed models** and **universal off-the-shelf networks**.  

<div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
  <img src="/img/ai/one_ai_plugin/use_cases/pcb/pcb.png" alt="PCB Quality Control Example" style={{maxHeight: '350px', borderRadius:'8px'}} />
</div>

---

## Benchmark Results

| Model                               | F-Score (%) | FPS (Titan X GPU) |
|-------------------------------------|-------------|-------------------|
| **Human Scientists (custom ResNet18)** | 98.2         | 62                |
| Universal AI – Faster R-CNN         | 97.8         | 4                 |
| Universal AI – SSD                  | 95.4         | 64                |
| Universal AI – YOLO                 | 93.1         | 34                |
| Traditional Image Processing        | 89.8         | 78                |
| **ONE AI (automated architecture)** | **98.4**     | **~465**          |

*Source: Comparison of [PCB defect detection benchmarks](https://arxiv.org/pdf/1902.06197) with ONE AI results.*

---

## Analysis

- **Highest Reliability**:  
  With an F-Score of **98.4%**, ONE AI outperformed all baselines — including the hand-crafted architecture developed by domain experts (98.2%).  

- **Drastic Speedup**:  
  The custom ResNet18 used by researchers requires ~30 FLOPs due to double application of the network for two input images.  
  ONE AI, by contrast, produced a lightweight architecture needing only ~4 FLOPs, resulting in:  
  * **750% faster** inference compared to the scientific model  
  * **11,600% faster** compared to the best universal AI approach  

- **Superior to Traditional Methods**:  
  Classical image processing reached just 89.8% accuracy, showing that AI is not only faster but also significantly more reliable.  

---

## Implications for Industry

- **Production Efficiency**: Real-time inspection becomes feasible even in high-throughput environments.  
- **Reduced Costs**: Faster inference enables more units to be inspected per device, lowering hardware requirements.  
- **Scalability**: ONE AI automatically adapts architectures to data and constraints, making it easier to expand to other inspection tasks beyond PCBs.  

---

## Conclusion

The study shows that **automated AI architecture optimization** can not only match but surpass the results of **human-designed neural networks** — both in reliability and by an order of magnitude in speed.  

**ONE AI proves that smarter architectures deliver better quality control at industrial scale.**

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Use Cases Support" />  
