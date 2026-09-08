---
title: "CA.04: Advanced Computer Vision with CNNs"
description: "Advanced CNN architectures, transfer learning, and model interpretability"
module: "Module 3"
points: 3
estimated_hours: "3-4"
difficulty: "Intermediate-Advanced"
---

## Assignment Overview

This advanced coding assignment takes you beyond basic CNNs to explore **modern computer vision techniques** used in industry and research. You'll implement ResNet-style architectures, apply transfer learning, work with complex color image datasets, and analyze model interpretability. This assignment bridges the gap between academic learning and real-world computer vision applications.

**Points:** 3  
**Estimated Time:** 3-4 hours  
**Difficulty:** Intermediate-Advanced

## Learning Goals

By completing this assignment, you will:

1. **Implement advanced CNN architectures** with skip connections and modern techniques
2. **Apply transfer learning** using pre-trained models for efficient training
3. **Work with complex datasets** (CIFAR-10) requiring sophisticated preprocessing
4. **Analyze model interpretability** using Grad-CAM and layer visualization
5. **Address real-world challenges** like class imbalance and model robustness
6. **Optimize models for deployment** with quantization and pruning techniques
7. **Reflect critically** on bias, fairness, and ethics in computer vision systems

## Assignment Structure

This assignment is divided into six progressive parts, designed to challenge you with industry-relevant computer vision techniques:

### Part 1: Advanced CNN Architecture (45 minutes)
- Implement ResNet-style residual blocks with skip connections
- Build modern CNN with batch normalization, dropout, and advanced techniques
- Compare architectural choices and their impact on performance
- Analyze parameter efficiency vs computational cost

### Part 2: CIFAR-10 Classification Challenge (60 minutes)
- Work with 32×32 color images across 10 diverse classes
- Implement comprehensive data augmentation pipeline
- Train models from scratch vs transfer learning approaches
- Handle complex multi-class classification with class imbalance

### Part 3: Transfer Learning & Fine-tuning (45 minutes)
- Use pre-trained ResNet and VGG models from PyTorch
- Implement feature extraction vs end-to-end fine-tuning
- Compare computational efficiency and convergence speed
- Analyze layer-wise learning rates and freezing strategies

### Part 4: Model Analysis & Interpretability (30 minutes)
- Implement Grad-CAM for visual explanation of predictions
- Analyze what different CNN layers learn and detect
- Identify failure cases and potential model biases
- Compare model uncertainty and prediction confidence

### Part 5: Optimization & Deployment (30 minutes)
- Implement model quantization and pruning for efficiency
- Compare inference speed vs accuracy trade-offs
- Create deployment pipeline for real-world usage
- Analyze memory usage and computational requirements

### Part 6: Critical Analysis & Ethics (30 minutes)
- Compare CNN approaches to human visual perception
- Analyze bias and fairness in computer vision systems
- Discuss privacy, surveillance, and ethical implications
- Propose solutions for building robust and fair AI systems

## Technical Requirements

### Software Requirements
- Python 3.11+
- Jupyter Notebook or Google Colab
- Required libraries: `torch`, `torchvision`, `numpy`, `matplotlib`, `seaborn`, `sklearn`, `opencv-python`, `tqdm`
- Optional: `tensorboard` for advanced visualization

### Dataset
You will work with the **CIFAR-10 Dataset**, which includes:
- **Images:** 32×32 color images (60,000 total)
- **Classes:** 10 categories (airplane, automobile, bird, cat, deer, dog, frog, horse, ship, truck)
- **Split:** 50,000 training + 10,000 test images
- **Challenge:** More complex than MNIST with color, texture, and object variation

### Hardware Considerations
- **Memory:** At least 8GB RAM recommended for larger models
- **Time:** Some experiments may take 15-30 minutes to train

## What You Need to Turn In

**Submit one completed Jupyter notebook (`ca4.ipynb`) and .PDF that includes:**
- All code cells executed and showing output
- Complete ResNet-style architecture implementation
- CIFAR-10 classification results with analysis
- Transfer learning comparisons and insights
- Model interpretability visualizations
- Optimization experiments with performance analysis
- Written responses to all reflection questions
- Visualizations with proper labels and interpretations

## Grading Rubric (3 Points Total)

| Points | Performance Level | Description |
|--------|------------------|-------------|
| **3 - Excellent** | Assignment Fully Complete | All advanced techniques implemented correctly, demonstrates deep understanding of modern CNN architectures, comprehensive analysis of results, thoughtful reflection on real-world applications and ethics, code runs without errors and produces meaningful insights |
| **2 - Proficient** | Assignment Mostly Complete | Most sections completed adequately with minor gaps, shows good understanding of advanced concepts, some analysis may lack depth, code mostly functional with minor issues |
| **1 - Developing** | Assignment Partially Complete | Some advanced sections incomplete or incorrect, shows basic understanding but struggles with complex concepts, limited analysis or reflection, significant code issues |
| **0 - Incomplete** | Assignment Not Submitted | No submission or assignment shows no meaningful effort toward completion |

## Step-by-Step Instructions

### Getting Started
1. Download the `ca4.ipynb` notebook from the course materials
2. Set up your Python environment with required libraries
3. Ensure you have access to GPU (Google Colab recommended if no local GPU)
4. Begin with Part 1: Advanced CNN Architecture

### Part 1: Advanced CNN Architecture
1. **Study ResNet architecture**
   - Understand skip connections and their purpose
   - Learn about batch normalization and dropout
   - Explore different activation functions

2. **Implement residual blocks**
   ```python
   class ResidualBlock(nn.Module):
       def __init__(self, in_channels, out_channels, stride=1):
           # TODO: Implement residual block with skip connection
           # Include conv layers, batch norm, and skip connection
   ```

3. **Build complete ResNet-style CNN**
   ```python
   class AdvancedCNN(nn.Module):
       def __init__(self, num_classes=10):
           # TODO: Combine residual blocks into full architecture
           # Include proper downsampling and global average pooling
   ```

### Part 2: CIFAR-10 Classification
1. **Load and explore CIFAR-10**
   ```python
   # TODO: Load CIFAR-10 dataset
   train_dataset = torchvision.datasets.CIFAR10(...)
   # Analyze class distribution and image characteristics
   ```

2. **Implement advanced data augmentation**
   ```python
   # TODO: Create comprehensive augmentation pipeline
   train_transform = transforms.Compose([
       transforms.RandomHorizontalFlip(),
       transforms.RandomRotation(10),
       transforms.ColorJitter(...),
       # Add more augmentations
   ])
   ```

3. **Train and evaluate models**
   - Train your ResNet-style model from scratch
   - Implement proper training loop with learning rate scheduling
   - Monitor training progress and prevent overfitting

### Part 3: Transfer Learning
1. **Load pre-trained models**
   ```python
   # TODO: Load pre-trained ResNet18 from torchvision
   pretrained_model = torchvision.models.resnet18(pretrained=True)
   # Modify final layer for CIFAR-10 classes
   ```

2. **Implement fine-tuning strategies**
   - Feature extraction: Freeze early layers
   - Full fine-tuning: Train all layers with different learning rates
   - Compare approaches and analyze results

### Part 4: Model Interpretability
1. **Implement Grad-CAM**
   ```python
   def generate_gradcam(model, input_tensor, target_class):
       # TODO: Implement gradient-weighted class activation mapping
       # Extract gradients and feature maps from target layer
   ```

2. **Analyze layer activations**
   - Visualize what different layers detect
   - Compare early vs late layer representations
   - Identify potential biases or failure modes

### Part 5: Optimization & Deployment
1. **Implement model quantization**
   ```python
   # TODO: Apply post-training quantization
   quantized_model = torch.quantization.quantize_dynamic(...)
   # Compare model size and inference speed
   ```

2. **Create deployment pipeline**
   - Save optimized model for inference
   - Implement preprocessing pipeline
   - Measure real-world performance metrics

### Part 6: Critical Analysis
Answer all written questions thoroughly, demonstrating your understanding of:
- Modern CNN architectures and their advantages
- Transfer learning benefits and limitations
- Model interpretability and explainable AI
- Bias, fairness, and ethics in computer vision
- Real-world deployment considerations

## Tips for Success

### Programming Tips
- **Start with simpler models** - Debug your ResNet implementation incrementally
- **Monitor training closely** - Use matplotlib for visualization
- **Save checkpoints** - Long training runs should save intermediate results

### Deep Learning Tips
- **Understand skip connections** - Critical for training very deep networks
- **Use proper initialization** - He initialization for ReLU networks
- **Implement learning rate scheduling** - Reduce LR when training plateaus
- **Apply regularization carefully** - Balance between underfitting and overfitting

### Transfer Learning Tips
- **Choose appropriate learning rates** - Lower for pre-trained layers
- **Freeze layers strategically** - Gradually unfreeze during training
- **Monitor catastrophic forgetting** - Ensure pre-trained features aren't destroyed
- **Compare to training from scratch** - Understand when transfer learning helps

### Common Pitfalls to Avoid
- **Gradient vanishing/exploding** - Use proper normalization and skip connections
- **Overfitting on small datasets** - Apply data augmentation and regularization
- **Memory issues with large models** - Use gradient checkpointing if needed
- **Inconsistent preprocessing** - Ensure train/test pipelines match
- **Ignoring class imbalance** - Use appropriate loss functions and metrics

## Extension Opportunities

For students who finish early or want extra challenge:

1. **Advanced Architectures** - Implement DenseNet or EfficientNet
2. **Attention Mechanisms** - Add self-attention or channel attention
3. **Advanced Augmentation** - Implement CutMix, MixUp, or AutoAugment
4. **Model Ensembling** - Combine multiple models for better performance
5. **Custom Datasets** - Apply techniques to your own image classification problem
6. **Advanced Interpretability** - Implement LIME or SHAP for image explanation

## Resources

### CNN Architecture References
- ResNet paper: "Deep Residual Learning for Image Recognition"
- PyTorch CNN tutorials and documentation
- Papers With Code for latest architectures

### Transfer Learning Resources
- "How transferable are features in deep neural networks?"
- PyTorch transfer learning tutorial
- Best practices for fine-tuning

### Model Interpretability
- Grad-CAM paper: "Grad-CAM: Visual Explanations from Deep Networks"
- "Visualizing and Understanding Convolutional Networks"
- Captum library for PyTorch interpretability

### Ethics and Bias
- "Fairness and Abstraction in Sociotechnical Systems"
- "Gender Shades" study on face recognition bias
- "Weapons of Math Destruction" book chapters

## Submission Instructions

1. **Complete all TODO sections** in the notebook
2. **Answer all written questions** with thoughtful, detailed responses
3. **Ensure notebook runs completely** without errors (test in clean environment)
4. **Include performance comparisons** between all implemented approaches
5. **Save as PDF** in addition to .ipynb format
6. **Upload both files** to the course management system
7. **Include your name and student ID** in the notebook header

## Academic Integrity

This is an individual assignment. While you may discuss concepts with classmates, all code and written work must be your own. Properly cite any external resources used beyond the course materials. Do not share your implementation details or results with other students.

## Getting Help

- **Office Hours:** Bring specific questions about implementation challenges
- **Discussion Forum:** Post conceptual questions (without code solutions)
- **Documentation:** PyTorch, torchvision, and other library docs are your friend
- **Research Papers:** Referenced papers provide mathematical details

---

**Ready to build state-of-the-art computer vision systems?** This assignment will give you hands-on experience with the techniques used in modern AI applications. Enjoy exploring the cutting edge of deep learning!