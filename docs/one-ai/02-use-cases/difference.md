---
id: difference-detection
title: Reference-Based Defect Detection
sidebar_label: Reference-Based Defect Detection
---

### Leveraging multi-image comparison for superior defect detection

In quality control and surveillance applications, detecting small differences between a reference image and a test image is crucial. Traditional AI approaches treat each image independently, requiring the model to learn the entire background and context. ONE AI's **overlap difference** capability enables direct comparison between spatially aligned images, dramatically improving detection accuracy while reducing computational costs.

To demonstrate this capability, ONE AI was tested on a challenging bird and drone detection dataset featuring small objects (7-10% of image size), complex city backgrounds with detailed buildings, and varying lighting conditions. The model was benchmarked against YOLOv8, a state-of-the-art object detection network.

<div style={{display: 'flex', justifyContent: 'center', margin: '20px 0'}}>
  <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_temp.png" alt="Reference Template" style={{maxHeight: '250px', borderRadius: '8px', marginRight: '10px'}} />
  <img src="/img/ai/one_ai_plugin/demos/overlap-difference/image_000118_test.png" alt="Test Image with Objects" style={{maxHeight: '250px', borderRadius: '8px'}} />
</div>

---

## Benchmark Results

| Model                               | F1-Score (%) | Architecture Complexity |
|-------------------------------------|--------------|-------------------------|
| **ONE AI (with overlap difference)**| **93.0**     | Optimized, lightweight  |
| YOLOv8 (single image)               | 56.0         | Pre-trained, heavy      |

*Results from internal benchmarking on birds and drones detection dataset with 259 image pairs.*

---

## Analysis

- **Superior Detection Accuracy**:  
  With an F1-Score of **93%**, ONE AI achieves **37 percentage points better performance** than YOLOv8 (a 66% relative improvement), which can only process single images without reference context.

- **Architectural Advantage**:  
  By computing the pixel-wise difference between reference and test images, ONE AI's automatically optimized architecture focuses only on relevant changes, effectively cancelling out complex backgrounds. Additionally, all color channels from both the reference and test images are provided as input, giving the model access to both the original image information and the computed difference. This multi-channel approach provides significantly more information than single-image methods. YOLOv8 must learn to distinguish objects from the entire varying background using only the test image, making the task significantly harder.

- **Optimized for the Task**:  
  ONE AI's automated architecture search tailors the network specifically to difference detection, resulting in a lightweight model that maintains high accuracy while requiring fewer computational resources than universal pre-trained models. **The ONE AI model is twelve times smaller than YOLOv8**, making it ideal for deployment on resource-constrained devices.

---

## Implications for Industry

- **Manufacturing Quality Control**: Reference-based inspection enables detection of minute defects on production lines where products pass through fixed camera positions. Missing components, surface defects, or placement errors become immediately visible through image comparison.
- **PCB and Electronics Inspection**: Template images of perfect boards can be used to identify soldering defects, missing components, or incorrect placements that would be nearly impossible to detect in complex board layouts using single-image approaches.
- **Surveillance and Security**: Security systems can flag changes in monitored areas by comparing against reference frames, dramatically reducing false positives from lighting changes or weather conditions while reliably detecting actual intrusions or unauthorized objects.
- **Scalable Deployment**: With models **12× smaller** than YOLOv8, deployment across multiple inspection stations becomes more cost-effective. Lower computational requirements mean faster processing and reduced hardware costs per unit.

---

## Conclusion

The benchmark demonstrates that **multi-image comparison combined with automated architecture optimization** provides a significant advantage over traditional single-image approaches.

With **93% F1-Score** vs. YOLOv8's 56% and a model **12× smaller**, ONE AI proves that:
* **Smarter input processing** (overlap difference) dramatically improves detection accuracy
* **Automated architecture search** creates optimized, lightweight models tailored to the task
* **Reference-based comparison** is superior for applications where spatially aligned images are available

**ONE AI's overlap difference capability makes it the superior choice for quality control and surveillance applications, delivering better accuracy with optimized efficiency.**

import SupportBanner from '@site/src/components/SupportBanner';

<SupportBanner subject="ONE AI Use Cases Support" />