---
title: "CA.03: Neural Networks"
description: "Implementation of multi-layer perceptrons from scratch and with PyTorch"
module: "Module 2"
points: 3
estimated_hours: 2
difficulty: "Intermediate"
---

## Assignment Overview

This hands-on coding assignment introduces you to **neural networks**, the foundation of deep learning and artificial intelligence. You'll implement a multi-layer perceptron (MLP) from scratch using Python and NumPy, covering forward propagation, backpropagation, and gradient descent. The assignment concludes with implementing the same network using PyTorch for comparison and understanding of modern deep learning frameworks.

**Points:** 3  
**Estimated Time:** 2 hours  
**Difficulty:** Intermediate

## Learning Goals

By completing this assignment, you will:

1. **Understand neural network fundamentals** from a mathematical perspective
2. **Implement forward propagation** through multiple layers with activation functions
3. **Master backpropagation** for computing gradients and updating weights
4. **Apply gradient descent** to train neural networks from scratch
5. **Compare implementations** between from-scratch NumPy and modern PyTorch
6. **Analyze performance** on real-world classification tasks

## Assignment Structure

This assignment is divided into five progressive parts, designed to build your understanding from mathematical foundations to practical application:

### Part 1: Mathematical Foundation (30 minutes)
- Understand neural network architecture and notation
- Learn activation functions: sigmoid, tanh, ReLU
- Explore forward propagation through multiple layers
- Introduction to backpropagation and chain rule

### Part 2: From-Scratch MLP Implementation (45 minutes)
- Build a complete MLP class using only Python and NumPy
- Implement forward propagation with matrix operations
- Implement backpropagation with gradient computation
- Create training loop with mini-batch gradient descent

### Part 3: Real-World Application (30 minutes)
- Load and explore the Wine dataset for classification
- Preprocess data for neural network training
- Train your from-scratch MLP on real data
- Evaluate performance and analyze learning curves

### Part 4: PyTorch Implementation (20 minutes)
- Implement equivalent neural network using PyTorch
- Compare training efficiency and performance
- Understand modern deep learning frameworks
- Explore automatic differentiation capabilities

### Part 5: Critical Reflection (15 minutes)
- Compare neural networks with previous ML algorithms
- Analyze advantages and limitations of MLPs
- Discuss ethical considerations in neural network applications
- Explore future directions in deep learning

## Technical Requirements

### Software Requirements
- Python 3.11+
- Jupyter Notebook or Google Colab
- Required libraries: `numpy`, `matplotlib`, `pandas`, `scikit-learn`, `torch`

### Dataset
You will work with the **Wine Classification Dataset**, which includes:
- **Features:** Chemical properties of wines (alcohol, acidity, phenols, etc.)
- **Target:** Wine class (3 different wine types)
- **Size:** 178 samples with 13 features
- **Context:** Real chemical analysis data for wine classification

## What You Need to Turn In

**Submit one completed Jupyter notebook (`ca3.ipynb`) and .PDF that includes:**
- All code cells executed and showing output
- Complete from-scratch MLP implementation
- PyTorch neural network comparison
- Performance analysis and learning curves
- Written responses to all reflection questions
- Visualizations with proper labels and interpretations

## Grading Rubric (3 Points Total)

| Points | Performance Level | Description |
|--------|------------------|-------------|
| **3 - Excellent** | Assignment Fully Complete | All sections implemented correctly, notebook runs without errors, demonstrates clear understanding of neural network concepts, includes thorough mathematical implementation and insightful analysis, thoughtful comparison between approaches |
| **2 - Proficient** | Assignment Mostly Complete | Most sections completed adequately, notebook mostly functional with minor issues, shows good understanding of core concepts with some gaps in implementation or analysis |
| **1 - Developing** | Assignment Partially Complete | Some sections incomplete or incorrect, notebook has significant errors, shows basic understanding but lacks depth in implementation or analysis |
| **0 - Incomplete** | Assignment Not Submitted | No submission or assignment shows no meaningful effort toward completion |

## Step-by-Step Instructions

### Getting Started
1. Download the `ca3.ipynb` notebook from the course materials
2. Set up your Python environment with required libraries
3. Open the notebook in Jupyter or Google Colab
4. Begin with Part 1: Mathematical Foundation

### Part 1: Mathematical Foundation
1. **Study neural network architecture**
   - Understand layers, weights, biases, and activations
   - Learn matrix notation for efficient computation
   - Explore different activation functions and their derivatives

2. **Implement activation functions**
   ```python
   # TODO: Implement sigmoid activation and its derivative
   def sigmoid(x):
       # Your code here
   
   def sigmoid_derivative(x):
       # Your code here
   ```

### Part 2: From-Scratch Implementation
1. **Create MLP class structure**
   ```python
   class MLP:
       def __init__(self, input_size, hidden_sizes, output_size, activation='relu'):
           # TODO: Initialize weights and biases
           # Use Xavier initialization for weights
           
       def forward(self, X):
           # TODO: Implement forward propagation
           # Store activations for backpropagation
           
       def backward(self, X, y, activations, pre_activations):
           # TODO: Implement backpropagation
           # Compute gradients using chain rule
           
       def fit(self, X, y, epochs=1000, learning_rate=0.01, batch_size=32):
           # TODO: Implement training loop
           # Use mini-batch gradient descent
   ```

2. **Test with synthetic data**
   - Create simple datasets to verify implementation
   - Check gradient calculations with numerical gradients
   - Ensure loss decreases during training

### Part 3: Real-World Application
1. **Load and explore Wine dataset**
   ```python
   # TODO: Load Wine dataset from sklearn
   from sklearn.datasets import load_wine
   # Explore features and target classes
   ```

2. **Preprocess the data**
   - Scale features using StandardScaler
   - Convert labels to one-hot encoding
   - Split into training and testing sets

3. **Train your MLP**
   - Apply your from-scratch implementation
   - Monitor training progress and loss curves
   - Evaluate on test set and analyze results

### Part 4: PyTorch Implementation
1. **Create PyTorch MLP**
   ```python
   import torch
   import torch.nn as nn
   
   class PyTorchMLP(nn.Module):
       def __init__(self, input_size, hidden_sizes, output_size):
           # TODO: Define neural network layers
           
       def forward(self, x):
           # TODO: Implement forward pass
   ```

2. **Compare implementations**
   - Train both models on same data
   - Compare training time and final performance
   - Analyze differences in implementation complexity

### Part 5: Critical Reflection
Answer all written questions thoroughly, demonstrating your understanding of:
- Mathematical foundations of neural networks
- Advantages of neural networks over linear models
- When to use MLPs vs. other machine learning approaches
- Ethical considerations in neural network applications

## Tips for Success

### Programming Tips
- **Start with small networks** - Debug with 1-2 hidden layers first
- **Check dimensions carefully** - Matrix multiplication errors are common
- **Implement incrementally** - Test each function before combining
- **Use vectorization** - Avoid for loops when possible with NumPy

### Mathematical Tips
- **Review linear algebra** - Understand matrix multiplication and derivatives
- **Check gradients numerically** - Verify backpropagation with finite differences
- **Understand the chain rule** - Essential for backpropagation
- **Watch for numerical stability** - Use appropriate activation functions

### Common Pitfalls to Avoid
- **Vanishing gradients** - Choose activation functions carefully
- **Exploding gradients** - Use proper weight initialization
- **Feature scaling** - Always normalize input features
- **Learning rate** - Too high causes instability, too low is slow
- **Overfitting** - Monitor training vs. validation performance

## Extension Opportunities

For students who finish early or want extra challenge:

1. **Advanced Architectures** - Implement dropout, batch normalization
2. **Optimization** - Try different optimizers (Adam, RMSprop)
3. **Regularization** - Add L1/L2 regularization to prevent overfitting
4. **Visualization** - Create decision boundary plots for 2D data
5. **Hyperparameter Tuning** - Systematically optimize network architecture

## Resources

### Mathematical Background
- 3Blue1Brown: Neural Networks series
- Andrew Ng's Deep Learning Course
- Linear Algebra review: Khan Academy

### Programming Resources
- NumPy documentation and broadcasting guide
- PyTorch tutorials and documentation
- Matplotlib for visualization examples

### Deep Learning Theory
- "Deep Learning" by Ian Goodfellow
- CS231n Stanford course materials
- Neural network visualization tools

## Submission Instructions

1. **Complete all TODO sections** in the notebook
2. **Answer all written questions** with thoughtful responses
3. **Ensure notebook runs completely** without errors
4. **Include performance comparisons** between implementations
5. **Save as PDF** in addition to .ipynb format
6. **Upload both files** to the course management system
7. **Include your name and student ID** in the notebook header

## Academic Integrity

This is an individual assignment. While you may discuss concepts with classmates, all code and written work must be your own. Properly cite any external resources used beyond the course materials.

---

**Questions?** Contact the instructor during office hours or via email. Enjoy diving into the fascinating world of neural networks and deep learning!