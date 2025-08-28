---
title: "CA.01: Linear Regression"
description: "Introduction to ML fundamentals and linear regression implementation"
module: "Module 1"
points: 3
estimated_hours: 2
difficulty: "Beginner"
---

## Assignment Overview

This hands-on coding assignment introduces you to **linear regression**, the cornerstone of machine learning. You'll implement linear regression from scratch using Python and NumPy, covering data preprocessing, model training, evaluation metrics, and visualization of results.

**Points:** 3  
**Estimated Time:** 2 hours  
**Difficulty:** Beginner

## Learning Goals

By completing this assignment, you will:

1. **Understand the fundamentals** of linear regression from a mathematical perspective
2. **Implement linear regression from scratch** using only basic Python and NumPy
3. **Apply linear regression** using modern ML libraries (scikit-learn)
4. **Analyze and visualize** regression results and model performance
5. **Reflect critically** on how machine learning differs from traditional programming approaches

## Assignment Structure

This assignment is divided into four progressive parts, designed to build your understanding from mathematical foundations to practical application:

### Part 1: Mathematical Foundation (30 minutes)
- Understand the linear regression equation: y = mx + b
- Learn about the cost function (Mean Squared Error)
- Explore gradient descent optimization
- Implement basic mathematical operations

### Part 2: From-Scratch Implementation (45 minutes)
- Build a linear regression class using only Python and NumPy
- Implement gradient descent algorithm
- Create prediction and cost calculation functions
- Test your implementation on synthetic data

### Part 3: Real-World Application (30 minutes)
- Load and explore a housing price dataset
- Preprocess data for machine learning
- Apply your from-scratch implementation
- Compare with scikit-learn's implementation
- Visualize results and model fit

### Part 4: Critical Reflection (15 minutes)
- Compare ML approach vs. traditional programming
- Analyze strengths and limitations of linear regression
- Discuss when to use ML vs. deterministic programming

## Technical Requirements

### Software Requirements
- Python 3.11+
- Jupyter Notebook or Google Colab
- Required libraries: `numpy`, `matplotlib`, `pandas`, `scikit-learn`

### Dataset
You will work with the **California Housing Dataset**, which includes:
- **Features:** Median income, house age, average rooms, population, occupancy, latitude/longitude
- **Target:** Median home values (in $100K units)
- **Size:** ~20,640 samples with 8 features

## What You Need to Turn In

**Submit one completed Jupyter notebook (`ca1.ipynb`) that includes:**
- All code cells executed and showing output
- Written explanations and analysis within the notebook
- Visualizations with proper labels and descriptions
- Your reflection on the ML concepts learned

## Grading Rubric (3 Points Total)

| Points | Performance Level | Description |
|--------|------------------|-------------|
| **3 - Excellent** | Assignment Fully Complete | Notebook runs without errors, all sections completed thoroughly, demonstrates clear understanding of linear regression concepts, includes thoughtful analysis and well-documented code |
| **2 - Proficient** | Assignment Mostly Complete | Notebook mostly functional with minor issues, most sections completed adequately, shows good understanding of core concepts with some gaps in analysis or documentation |
| **1 - Developing** | Assignment Partially Complete | Notebook has significant errors or missing sections, shows basic understanding but lacks depth, incomplete analysis or poorly documented code |
| **0 - Incomplete** | Assignment Not Submitted | No submission or assignment shows no meaningful effort toward completion |

## Step-by-Step Instructions

### Getting Started
1. Download the `ca1.ipynb` notebook from the course materials
2. Set up your Python environment with required libraries
3. Open the notebook in Jupyter or Google Colab

### Part 1: Mathematical Foundation
1. **Study the linear regression equation**
   - Understand how `y = mx + b` extends to multiple variables
   - Learn about the cost function: `J(θ) = (1/2m) * Σ(h(x) - y)²`

2. **Implement basic functions**
   - Create a function to calculate predictions
   - Implement mean squared error calculation
   - Understand partial derivatives for gradient descent

### Part 2: From-Scratch Implementation
1. **Create a LinearRegression class**
   ```python
   class LinearRegression:
       def __init__(self, learning_rate=0.01, max_iterations=1000):
           # Initialize parameters
       
       def fit(self, X, y):
           # Implement gradient descent
       
       def predict(self, X):
           # Make predictions
       
       def cost(self, X, y):
           # Calculate mean squared error
   ```

2. **Test with synthetic data**
   - Generate sample data with known linear relationship
   - Verify your implementation produces expected results

### Part 3: Real-World Application
1. **Load and explore housing dataset**
   - Use pandas to load and examine the data
   - Create visualizations to understand feature relationships
   - Handle any missing values or outliers

2. **Preprocess the data**
   - Scale features for better convergence
   - Split into training and testing sets
   - Prepare data for both implementations

3. **Apply both implementations**
   - Train your from-scratch model
   - Train scikit-learn's LinearRegression
   - Compare results and performance

4. **Visualize results**
   - Plot actual vs. predicted values
   - Show learning curves (cost vs. iterations)
   - Compare feature importance

### Part 4: Critical Reflection
Write your reflection addressing these questions:

1. **Conceptual Understanding**
   - How does machine learning "learn" differently than traditional programming?
   - What role does data play in ML vs. traditional approaches?

2. **Practical Considerations**
   - When would you choose linear regression over other methods?
   - What are the limitations you observed?

3. **Implementation Insights**
   - What was most challenging about implementing from scratch?
   - How did your results compare to scikit-learn?

## Tips for Success

### Programming Tips
- **Start early** - Don't underestimate the time needed for debugging
- **Test incrementally** - Verify each function before moving on
- **Use print statements** - Debug by printing intermediate values
- **Visualize everything** - Plots help you understand what's happening

### Mathematical Tips
- **Review linear algebra** - Brush up on matrix operations
- **Understand derivatives** - Know why gradient descent works
- **Check your math** - Verify calculations with simple examples

### Common Pitfalls to Avoid
- **Feature scaling** - Always scale your features for gradient descent
- **Learning rate** - Too high causes divergence, too low is slow
- **Initialization** - Start with small random weights, not zeros
- **Overfitting** - Watch for perfect training but poor test performance

## Extension Opportunities

For students who finish early or want extra challenge:

1. **Regularization** - Implement L1 or L2 regularization
2. **Multiple datasets** - Try your implementation on different data
3. **Feature engineering** - Create polynomial features
4. **Comparison study** - Compare with other regression techniques

## Resources

### Mathematical Background
- Khan Academy: Linear Algebra
- 3Blue1Brown: Essence of Calculus
- Andrew Ng's ML Course: Linear Regression lectures

### Programming Resources
- NumPy documentation and tutorials
- Matplotlib plotting gallery
- Scikit-learn user guide

### Dataset Information
- UCI Machine Learning Repository
- Pandas documentation for data manipulation

## Submission Instructions

1. **Complete the notebook** with all cells executed
2. **Save as HTML** in addition to .ipynb format
3. **Upload both files** to the course management system
4. **Include your name** and student ID in the notebook header

## Academic Integrity

This is an individual assignment. While you may discuss concepts with classmates, all code and written work must be your own. Properly cite any external resources used beyond the course materials.

---

**Questions?** Contact the instructor during office hours or via email. Good luck, and enjoy your introduction to machine learning!