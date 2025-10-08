---
id: chip
title: High Speed and Efficient Edge AI
sidebar_label: High Speed and Efficient Edge AI
---

# High Speed and Efficient Edge AI

### Optimized AI architectures that make hardware secondary

The <a href="https://go.altera.com/l/1090322/2025-04-18/2vvzbn" target="_blank" className="underline hover:no-underline">
              whitepaper
            </a> from **Altera and ONE WARE** highlights a practical industrial use case: **potato chip quality inspection**.  
The challenge: reliably detecting burn marks and defects in real time on a fast production line — under strict limits on **latency, power, and cost**.

<div style={{display: 'flex', justifyContent: 'center', gap: '20px', margin: '20px 0'}}>
  <div style={{textAlign: 'center'}}>
    <img src="/img/ai/one_ai_plugin/use_cases/chip/good.png" alt="Good quality potato chip" style={{height: '200px', objectFit: 'cover', borderRadius: '8px'}} />
    <p style={{marginTop: '8px', fontSize: '14px', color: '#c1c1c1ff'}}>Good</p>
  </div>
  <div style={{textAlign: 'center'}}>
    <img src="/img/ai/one_ai_plugin/use_cases/chip/defect.png" alt="Defective potato chip with burn marks" style={{height: '200px', objectFit: 'cover', borderRadius: '8px'}} />
    <p style={{marginTop: '8px', fontSize: '14px', color: '#c1c1c1ff'}}>Defective (Burn Marks)</p>
  </div>
</div>

This example reflects a broader class of industrial AI challenges:

* **Manufacturing**: PCB and automotive part inspection, textile quality control  
* **Robotics**: real-time perception and decision-making  
* **Agriculture**: drone-based crop and soil monitoring  
* **Healthcare & mobility**: compact diagnostic and sensing devices  

---

## AI Model Optimization as the Key Differentiator

The real breakthrough lies **not in the hardware**, but in the **AI model design**.

* **Minimalistic Architecture**: ONE AI generated a lean network with only **6,750 parameters and 0.0175 GOPs**, compared to **127 million parameters and 25 GOPs** for the conventional VGG19 baseline.  
* **Quantization-Aware Training (QAT)**: Training directly in INT8 preserves accuracy during quantization — a critical step for FPGA deployment.  
* **Smarter, not bigger**: The optimized model reached **99.5% test accuracy**, while the VGG19 reference managed only **88%** on the same dataset.  

This demonstrates how **domain-specific, optimized architectures outperform oversized networks**, avoiding overfitting and focusing only on the features that matter.  

---

## HDL Generation as an Efficiency Amplifier

Once optimized, the model is compiled into RTL/HDL and deployed on Altera’s **MAX® 10 FPGA**.

* Removes runtime overhead  
* Achieves **deterministic, microsecond-level latency** through parallel execution  
* Runs seamlessly alongside existing FPGA control logic, with no additional hardware required  

HDL generation is not the core innovation — but it acts as a **multiplier**, ensuring the optimized model can fully exploit the hardware.  

---

## Benchmark: MAX® 10 FPGA vs. Jetson Orin Nano

The whitepaper presents a direct comparison:

| Metric            | **Altera MAX® 10 + ONE AI** | **Nvidia Jetson Orin Nano (VGG19)** | Improvement               |
| ----------------- | --------------------------- | ----------------------------------- | ------------------------- |
| **Test Accuracy** | 99.5% (INT8)                | 88% (FP32)                          | **24× higher accuracy**   |
| **Power**         | 0.5 W                       | 10 W                                | **20× lower power**       |
| **Latency**       | 0.086 ms                    | 42 ms                               | **488× lower latency**    |
| **Cost**          | €454                        | €2505                               | **6× lower cost**         |
| **Throughput**    | 1736 FPS                    | 24 FPS                              | **72× higher FPS**        |
| **Size**          | 11×11 mm                    | 70×45 mm                            | **26× smaller footprint** |

Even with **decade-old FPGA technology**, the optimized ONE AI model **outperforms Nvidia’s Jetson Orin Nano across every dimension**.  

---

## Implications for Edge AI

* **Hardware becomes secondary**: Performance depends less on raw compute and more on how well the AI model is optimized.  
* **Scalable deployment**: Lower power and cost make it viable to scale across thousands of devices.  
* **Industrial-grade resilience**: MAX® 10 devices offer unique features — on-chip ADCs, jitter tolerance, long lifecycle support — ideal for harsh environments.  
* **Future-proof AI**: Instead of chasing ever-larger GPUs, companies can rely on leaner, domain-specific architectures that deliver more with less.  

---

## Conclusion

The potato chip inspection demo is just one example. The broader lesson is clear:

* **ONE AI optimizes the architecture itself**, achieving higher accuracy with far fewer resources.  
* With HDL deployment, even a low-cost FPGA like MAX® 10 can **surpass a modern GPU**.  
* The result is **real-time, energy-efficient, and cost-effective AI** — perfectly suited for industrial applications.  

**You can also check out our other [use-cases](/docs/one-ai/use-cases/) for more examples.**

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Use Cases Support" />
