# Midterm Project Specification

## Project Goals

Apply shallow learning techniques to a real-world dataset, demonstrating your understanding of fundamental machine learning concepts covered in the first 5 weeks of the course.

## Core Requirements

### Dataset Requirements
- **Source**: Must use an online dataset from reputable sources
- **Size**: Minimum 1,000 samples (recommended 5,000+)
- **Complexity**: Should require meaningful preprocessing and feature engineering
- **Type**: Suitable for classification, regression, or clustering tasks

### Technical Requirements
- **Baseline Model**: Implement at least one simple baseline (e.g., mean prediction for regression, majority class for classification)
- **ML Model**: Implement at least one shallow learning algorithm from course material
- **Evaluation**: Use appropriate metrics for your problem type
- **Reproducibility**: Code must run from clean clone with setup instructions

## Project Categories

Choose one of the following approaches:

### 1. Classification Projects
**Goal**: Predict categorical outcomes  
**Techniques**: Logistic regression, SVM, decision trees, random forests  
**Examples**:
- Email spam detection
- Medical diagnosis prediction
- Customer churn prediction
- Image classification (with traditional features)

### 2. Regression Projects
**Goal**: Predict continuous values  
**Techniques**: Linear regression, polynomial features, regularization (Ridge/Lasso)  
**Examples**:
- House price prediction
- Stock price forecasting
- Energy consumption modeling
- Academic performance prediction

### 3. Clustering Projects
**Goal**: Discover hidden patterns in data  
**Techniques**: K-means, hierarchical clustering, DBSCAN  
**Examples**:
- Customer segmentation
- Gene expression analysis
- Market basket analysis
- Social network community detection

## Suggested Datasets

### Government & Public Data
- **US Census Data**: Demographics, income, housing
- **CDC Health Data**: Disease surveillance, health indicators
- **Bureau of Labor Statistics**: Employment, wages, economic indicators
- **NOAA Climate Data**: Weather patterns, climate variables

### Academic & Research
- **UCI ML Repository**: Classic machine learning datasets
- **Kaggle Datasets**: Competition and community datasets
- **Papers with Code**: Datasets from academic publications
- **Data.gov**: US government open data

### Business & Industry
- **Customer Reviews**: Amazon, Yelp, app store reviews
- **Financial Data**: Yahoo Finance, FRED economic data
- **Social Media**: Twitter sentiment, Reddit discussions
- **E-commerce**: Sales data, user behavior

## Technical Implementation

### Data Exploration & Preprocessing
- Load and examine dataset structure
- Handle missing values appropriately
- Create meaningful visualizations
- Engineer relevant features
- Split data properly (train/validation/test)

### Modeling & Evaluation
- Implement meaningful baseline model
- Train at least one shallow ML model
- Use cross-validation where appropriate
- Evaluate with task-appropriate metrics
- Compare model performance systematically

### Code Quality Standards
- **Structure**: Organize code into logical modules/scripts
- **Documentation**: Clear comments and docstrings
- **README**: Setup instructions, data sources, how to run
- **Dependencies**: Requirements.txt or environment.yml
- **Reproducibility**: Set random seeds, version dependencies

## Deliverable Specifications

### GitHub Repository Structure
```
your-project-name/
├── README.md                 # Setup and overview
├── data/                     # Data files or download scripts
├── notebooks/               # Jupyter notebooks for exploration
├── src/                     # Source code modules
├── results/                 # Generated plots, tables, outputs
├── requirements.txt         # Python dependencies
└── presentation/           # Video file or link
```

### Required Repository Contents
1. **Clear README.md** with:
   - Project description and motivation
   - Dataset information and source
   - Setup/installation instructions
   - How to reproduce results
   - Key findings summary

2. **Clean, runnable code** that:
   - Loads and preprocesses data
   - Trains baseline and ML models
   - Evaluates model performance
   - Generates key visualizations

3. **Results documentation**:
   - Model performance comparison
   - Key insights from data exploration
   - Limitations and potential improvements

## Evaluation Criteria

Your project will be assessed on:

1. **Problem Statement & Dataset** (2 points)
   - Clear motivation and research question
   - Appropriate dataset selection and sourcing

2. **Data Exploration & Preprocessing** (2 points)
   - Thorough exploratory data analysis
   - Appropriate preprocessing and feature engineering

3. **Modeling & Implementation** (2 points)
   - Meaningful baseline comparison
   - Correct implementation of shallow learning techniques

4. **Evaluation & Results** (2 points)
   - Appropriate evaluation metrics
   - Clear presentation of results

5. **Code Quality & Reproducibility** (2 points)
   - Clean, well-organized code
   - Reproducible from clean clone
   - Clear documentation

## Timeline & Milestones

- **Week 3**: Dataset selected, initial exploration begun
- **Week 4**: EDA complete, preprocessing pipeline established
- **Week 5**: Models implemented and evaluated
- **Week 6**: Final submission due (repository + video)

## Common Pitfalls to Avoid

- **Dataset too simple**: Choosing problems that don't require meaningful ML
- **Insufficient preprocessing**: Not handling missing values, outliers, or feature scaling
- **No baseline comparison**: Jumping directly to complex models without simple baselines
- **Reproducibility issues**: Code that doesn't run on fresh environment
- **Unclear problem framing**: Not articulating what you're trying to predict/discover

## Getting Help

- **Dataset Selection**: Ask in discussion forum for feedback on dataset appropriateness
- **Technical Issues**: Use office hours for debugging and implementation help
- **Scope Questions**: Email instructor if unsure about project complexity

## Success Tips

1. **Start with simple, clean dataset** - complexity can be added later
2. **Focus on solid fundamentals** - this builds foundation for final project
3. **Document your thought process** - explain why you made specific choices
4. **Test reproducibility early** - ensure others can run your code
5. **Choose problems you find interesting** - passion shows in quality of work

Remember: This project demonstrates your grasp of fundamental ML concepts. Focus on doing the basics exceptionally well rather than attempting overly complex approaches.