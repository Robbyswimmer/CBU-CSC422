---
title: "CA.02: Classification Models"
description: "Implementation of classification algorithms and model comparison"
module: "Module 1"
points: 3
estimated_hours: 2
difficulty: "Beginner"
---

## Assignment Overview

This hands-on coding assignment introduces you to **classification algorithms**, fundamental techniques for predicting categories and making decisions from data. You'll implement three core classification methods—K-Nearest Neighbors, Logistic Regression, and Naive Bayes—and compare their performance on the famous Titanic survival dataset.

**Points:** 3  
**Estimated Time:** 2 hours  
**Difficulty:** Beginner

## Learning Goals

By completing this assignment, you will:

1. **Understand classification fundamentals** and how they differ from regression
2. **Implement three classification algorithms** with guided scaffolding
3. **Apply data preprocessing** for categorical variables and feature scaling
4. **Compare model performance** using accuracy and other metrics
5. **Interpret results** and analyze algorithm strengths and weaknesses
6. **Reflect on real-world applications** and ethical considerations

## Assignment Structure

This assignment is divided into seven progressive parts, designed to build your understanding from mathematical foundations to practical comparison:

### Part 1: Mathematical Foundation (30 minutes)
- Understand classification vs. regression differences
- Learn distance metrics for K-Nearest Neighbors
- Explore the sigmoid function for Logistic Regression
- Introduction to Bayes' theorem for Naive Bayes

### Part 2: Dataset & Exploration (20 minutes)
- Load and explore the Titanic survival dataset
- Analyze survival patterns by passenger class, gender, and age
- Visualize key relationships in the data
- Understand the classification target variable

### Part 3: Data Preprocessing (15 minutes)
- Handle missing values in passenger data
- Encode categorical variables (sex, embarked port)
- Apply feature scaling with StandardScaler
- Split data into training and testing sets

### Part 4: Model Implementations (60 minutes)
#### 4.1 K-Nearest Neighbors (KNN)
- Implement distance calculations
- Experiment with different k values
- Understand the bias-variance tradeoff

#### 4.2 Logistic Regression
- Train probabilistic classification model
- Interpret coefficients for survival factors
- Understand decision boundaries

#### 4.3 Naive Bayes
- Apply Bayes' theorem with independence assumption
- Compare performance on categorical data
- Understand probabilistic predictions

### Part 5: Model Comparison (20 minutes)
- Systematic comparison of all three models
- Analyze confusion matrices and classification metrics
- Visualize performance differences
- Optional: Cross-validation analysis

### Part 6: Analysis Questions (15 minutes)
- Written responses analyzing model performance
- Interpret algorithm characteristics and trade-offs
- Discuss when to use each classification method

### Part 7: Critical Reflection (10 minutes)
- Compare classification with regression from CA.01
- Explore real-world applications of each algorithm
- Consider ethical implications of classification systems

## Technical Requirements

### Software Requirements
- Python 3.11+
- Jupyter Notebook or Google Colab
- Required libraries: `numpy`, `pandas`, `matplotlib`, `seaborn`, `scikit-learn`

### Dataset
You will work with the **Titanic Passenger Dataset**, which includes:
- **Features:** Passenger class, sex, age, siblings/spouses, parents/children, fare, port of embarkation
- **Target:** Survival (0 = died, 1 = survived)
- **Size:** ~891 passengers with 7 features
- **Context:** Real historical data from the 1912 Titanic disaster

## What You Need to Turn In

**Submit one completed Jupyter notebook (`ca2.ipynb`) that includes:**
- All TODO sections completed with working code
- Written responses to all analysis questions
- Model comparison analysis and performance evaluation
- Your reflection on classification concepts learned
- All visualizations with proper labels and interpretations

## Grading Rubric (3 Points Total)

| Points | Performance Level | Description |
|--------|------------------|-------------|
| **3 - Excellent** | Assignment Fully Complete | All TODO sections implemented correctly, notebook runs without errors, demonstrates clear understanding of classification concepts, includes thorough analysis and well-documented code, thoughtful responses to all questions |
| **2 - Proficient** | Assignment Mostly Complete | Most TODO sections completed adequately, notebook mostly functional with minor issues, shows good understanding of core concepts with some gaps in analysis or incomplete responses |
| **1 - Developing** | Assignment Partially Complete | Some TODO sections incomplete or incorrect, notebook has significant errors, shows basic understanding but lacks depth, missing or superficial analysis |
| **0 - Incomplete** | Assignment Not Submitted | No submission or assignment shows no meaningful effort toward completion |

## Step-by-Step Instructions

### Getting Started
1. Download the `ca2.ipynb` notebook from the course materials
2. Set up your Python environment with required libraries
3. Open the notebook in Jupyter or Google Colab
4. Begin with Part 1: Mathematical Foundation

### Part 1: Mathematical Foundation
1. **Study classification vs. regression**
   - Understand discrete vs. continuous predictions
   - Learn about decision boundaries and probabilities

2. **Implement basic functions**
   - Create Euclidean distance calculation
   - Implement sigmoid function for logistic regression
   - Understand Bayes' theorem components

### Part 2: Dataset Exploration
1. **Load Titanic dataset**
   - Examine passenger demographics and survival rates
   - Create visualizations of key relationships
   - Identify patterns in the data

2. **Understand the prediction task**
   - Analyze survival by passenger class, gender, age
   - Consider historical context and data limitations

### Part 3: Data Preprocessing
1. **Handle missing data**
   - Fill missing age values with median
   - Handle missing embarked values with mode

2. **Encode categorical variables**
   ```python
   # TODO: Encode 'sex' column (male=0, female=1)
   X['sex_encoded'] = None  # Your code here
   
   # TODO: One-hot encode 'embarked' column
   embarked_encoded = None  # Your code here
   ```

3. **Apply feature scaling**
   - Use StandardScaler for consistent feature ranges
   - Split into training and testing sets

### Part 4: Model Implementations
1. **K-Nearest Neighbors**
   ```python
   # TODO: Create KNN classifier with k=5
   knn_model = None  # Your code here
   
   # TODO: Experiment with different k values
   # Test k=1, 3, 5, 7, 10, 15, 20
   ```

2. **Logistic Regression**
   ```python
   # TODO: Create Logistic Regression classifier
   lr_model = None  # Your code here
   
   # TODO: Interpret coefficients
   # Which features increase/decrease survival probability?
   ```

3. **Naive Bayes**
   ```python
   # TODO: Create Gaussian Naive Bayes classifier
   nb_model = None  # Your code here
   
   # TODO: Understand probability predictions
   ```

### Part 5: Model Comparison
1. **Systematic evaluation**
   - Compare accuracy scores across all models
   - Analyze confusion matrices for each algorithm
   - Create performance visualizations

2. **Write comparison loop**
   ```python
   # TODO: Implement comparison framework
   models = {
       'KNN': knn_model,
       'Logistic Regression': lr_model, 
       'Naive Bayes': nb_model
   }
   # Compare performance systematically
   ```

### Parts 6-7: Analysis and Reflection
Answer all written questions thoroughly, demonstrating your understanding of:
- Algorithm characteristics and trade-offs
- When to use each classification method
- Real-world applications and ethical considerations

## Tips for Success

### Programming Tips
- **Follow the scaffolding** - Complete TODOs in order
- **Test incrementally** - Verify each model works before comparing
- **Read error messages carefully** - They often point to the solution
- **Use print statements** - Debug by examining intermediate results

### Conceptual Tips
- **Understand the algorithms** - Don't just copy code, understand the logic
- **Connect to real world** - Think about practical applications
- **Compare systematically** - Look for patterns in model performance
- **Question your results** - If something seems wrong, investigate

### Common Issues to Avoid
- **Preprocessing errors** - Ensure categorical encoding is correct
- **Data leakage** - Only fit scalers on training data
- **Metric confusion** - Understand accuracy vs. precision vs. recall
- **Incomplete analysis** - Answer all parts of each question

## Extension Opportunities

For students who finish early or want extra challenge:

1. **Feature Engineering** - Create new features like passenger title, family size
2. **Hyperparameter Tuning** - Use GridSearchCV to optimize parameters
3. **Ensemble Methods** - Combine multiple models for better predictions
4. **Deep Analysis** - Explore feature importance and model interpretability

## Resources

### Mathematical Background
- Khan Academy: Statistics and Probability
- 3Blue1Brown: Neural Networks series
- Andrew Ng's ML Course: Classification lectures

### Programming Resources
- Scikit-learn documentation and examples
- Pandas guide for data manipulation
- Matplotlib/Seaborn visualization galleries

### Historical Context
- Encyclopedia Titanica for passenger data background
- Understanding the social dynamics of the Titanic disaster

## Submission Instructions

1. **Complete all TODO sections** in the notebook
2. **Answer all written questions** with thoughtful responses
3. **Ensure notebook runs completely** without errors
4. **Save as HTML** in addition to .ipynb format
5. **Upload both files** to the course management system
6. **Include your name and student ID** in the notebook header

## Academic Integrity

This is an individual assignment. While you may discuss concepts with classmates, all code and written responses must be your own. Properly cite any external resources used beyond the course materials.

---

**Questions?** Contact the instructor during office hours or via email. Enjoy exploring the fascinating world of classification algorithms!