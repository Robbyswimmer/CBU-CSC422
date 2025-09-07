# Module 0: Python Performance for Machine Learning
## 45-Minute Performance-Driven Code-Along

**Course:** CSC 422 - Machine and Deep Learning  
**Duration:** 45 minutes  
**Format:** Live coding with timing demonstrations

---

## Learning Objectives

By the end of this session, students will:
- Write Python code that's 10-100x faster using comprehensions and NumPy
- Understand why performance matters for ML datasets
- Master essential patterns for data processing pipelines
- Build efficient, scalable code for ML workflows

---

## Session Timeline

- **0-5 min:** Performance Hook - Speed Matters
- **5-15 min:** List/Dict Comprehensions + Timing
- **15-30 min:** NumPy Performance Fundamentals 
- **30-40 min:** Essential OOP for Data
- **40-45 min:** Real ML Pipeline Challenge

---

## Setup
```python
import time
import timeit
import numpy as np
from collections import defaultdict

# Performance measurement helper
def time_it(func, *args, **kwargs):
    start = time.perf_counter()
    result = func(*args, **kwargs)
    end = time.perf_counter()
    return result, (end - start) * 1000  # milliseconds
```

---

# Phase 1: Performance Hook - Speed Matters (5 minutes)
**Goal: Show why performance matters for ML with real timing comparisons**

```python
# Demo: Simple but convincing performance comparison
# Task: Apply ReLU activation (max(0, x)) to 50,000 values

data = list(range(-25000, 25000))  # Mix of positive/negative numbers

# Method 1: Traditional loops
def traditional_relu(values):
    result = []
    for x in values:
        if x > 0:
            result.append(x)
        else:
            result.append(0)
    return result

# Method 2: List comprehension
def comprehension_relu(values):
    return [max(0, x) for x in values]

# Method 3: NumPy (the ML standard)
def numpy_relu(values):
    arr = np.array(values)
    return np.maximum(0, arr)

# LIVE TIMING DEMO
print("ReLU activation on 50,000 values:")
_, trad_time = time_it(traditional_relu, data)
_, comp_time = time_it(comprehension_relu, data)
_, numpy_time = time_it(numpy_relu, data)

print(f"Traditional loops: {trad_time:.1f}ms")
print(f"List comprehension: {comp_time:.1f}ms ({trad_time/comp_time:.1f}x faster)")
print(f"NumPy: {numpy_time:.1f}ms ({trad_time/numpy_time:.0f}x FASTER!)")
print(f"\nFor 1M neurons: NumPy finishes in {numpy_time*20:.0f}ms vs {trad_time*20:.0f}ms")
print("This is why we use optimized Python for ML!")
```

---

---

# Phase 2: List/Dict Comprehensions + Timing (10 minutes)
**Goal: Master the #1 Python optimization with performance proof**

## The Comprehension Performance Test

```python
# ML scenario: Process 100,000 feature values (common in ML preprocessing)
raw_features = list(range(100_000))

# Task: Square positive numbers, filter > 1000

# Method 1: Traditional loops
def traditional_processing(data):
    result = []
    for x in data:
        if x > 0:
            squared = x * x
            if squared > 1000:
                result.append(squared)
    return result

# Method 2: List comprehension
def comprehension_processing(data):
    return [x * x for x in data if x > 0 and x * x > 1000]

# Method 3: NumPy (for comparison)
def numpy_processing(data):
    arr = np.array(data)
    positive = arr[arr > 0]
    squared = positive ** 2
    return squared[squared > 1000]

# SPEED TEST
_, trad_time = time_it(traditional_processing, raw_features)
_, comp_time = time_it(comprehension_processing, raw_features)  
_, numpy_time = time_it(numpy_processing, raw_features)

print(f"Traditional loops: {trad_time:.2f}ms")
print(f"List comprehension: {comp_time:.2f}ms ({trad_time/comp_time:.1f}x faster!)")
print(f"NumPy: {numpy_time:.2f}ms ({trad_time/numpy_time:.1f}x faster!)")
print(f"Comprehension is {numpy_time/comp_time:.1f}x slower than NumPy (but much more readable)")
```

## Essential Comprehension Patterns

```python
# 1. Basic transformation
scores = [78, 85, 92, 67, 88, 95, 73]
curved = [score + 5 for score in scores]  # Add curve

# 2. Filtering
passing = [score for score in curved if score >= 80]

# 3. Conditional transformation
grades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' for s in passing]

# 4. Dictionary comprehensions
student_scores = {'student_' + str(i): score for i, score in enumerate(scores)}
high_performers = {k: v for k, v in student_scores.items() if v >= 85}

# 5. Real ML preprocessing example
features = [[1.2, 0.8, -0.5], [0.9, 1.1, 0.3], [-0.2, 0.7, 1.4]]
normalized = [[max(0, x) for x in row] for row in features]  # ReLU activation

print(f"Original: {features[0]}")
print(f"ReLU applied: {normalized[0]}")
```

## Dictionary Power Patterns

```python
# Group data by category (common in ML)
data_points = [('A', 10), ('B', 15), ('A', 8), ('C', 12), ('B', 9)]

# Group using dictionary comprehension + logic
grouped = {}
for category, value in data_points:
    if category not in grouped:
        grouped[category] = []
    grouped[category].append(value)

# Better: Use defaultdict with comprehension
from collections import defaultdict
auto_grouped = defaultdict(list)
for cat, val in data_points:
    auto_grouped[cat].append(val)

# Average by group (ML feature engineering)
avg_by_group = {cat: sum(vals)/len(vals) for cat, vals in auto_grouped.items()}
print(f"Category averages: {avg_by_group}")
```

---

# Phase 3: NumPy Performance Fundamentals (15 minutes)
**Goal: Understand why NumPy is 50-100x faster for ML computations**

## The NumPy Speed Test

```python
# ML scenario: Apply sigmoid activation to 100K neurons
size = 100_000
data = list(range(size))
np_data = np.array(data)

def sigmoid_python(x):
    """Sigmoid using pure Python"""
    return [1 / (1 + 2.71828**(-val)) for val in x]

def sigmoid_numpy(x):
    """Sigmoid using NumPy"""
    return 1 / (1 + np.exp(-x))

# PERFORMANCE COMPARISON
_, py_time = time_it(sigmoid_python, data[:1000])  # Sample for demo
_, np_time = time_it(sigmoid_numpy, np_data[:1000])

print(f"Python sigmoid: {py_time:.2f}ms")
print(f"NumPy sigmoid: {np_time:.2f}ms")
print(f"NumPy is {py_time/np_time:.1f}x FASTER!")
print(f"For 100K neurons: {np_time*100:.1f}ms vs {py_time*100:.1f}ms")
```

## Essential NumPy Operations

```python
# ML feature matrix (samples x features)
features = np.random.randn(1000, 10)  # 1000 samples, 10 features
labels = np.random.randint(0, 2, 1000)  # Binary classification

# 1. Vectorized operations (no loops!)
normalized = (features - features.mean(axis=0)) / features.std(axis=0)

# 2. Boolean masking (filter data)
positive_samples = features[labels == 1]
negative_samples = features[labels == 0]

print(f"Dataset shape: {features.shape}")
print(f"Positive samples: {positive_samples.shape[0]}")
print(f"Negative samples: {negative_samples.shape[0]}")

# 3. Array broadcasting (different sized arrays work together)
weights = np.array([0.1, 0.2, 0.15, 0.05, 0.3, 0.1, 0.05, 0.02, 0.02, 0.01])
weighted_features = features * weights  # Broadcast across all samples

# 4. Axis operations (crucial for ML)
feature_means = features.mean(axis=0)    # Mean of each feature
sample_sums = features.sum(axis=1)       # Sum for each sample
overall_mean = features.mean()           # Single value

print(f"Feature means shape: {feature_means.shape}")
print(f"Sample sums shape: {sample_sums.shape}")
print(f"Overall mean: {overall_mean:.3f}")
```

## The @ Operator - Matrix Multiplication Magic

```python
# ML Example: Neural network forward pass
# Input: 3 samples, 4 features
X = np.array([[1.0, 2.0, 0.5, -1.0],
              [0.5, 1.5, 1.0, -0.5], 
              [-1.0, 0.8, 2.0, 0.3]])

# Weights: 4 inputs -> 2 hidden neurons
W1 = np.array([[0.1, 0.4],
               [0.2, -0.1],
               [-0.3, 0.5],
               [0.6, 0.2]])

# Hidden -> 1 output
W2 = np.array([[0.8],
               [-0.3]])

print(f"Input shape: {X.shape}")
print(f"W1 shape: {W1.shape}")
print(f"W2 shape: {W2.shape}")

# Forward pass using @ operator
hidden = X @ W1  # (3,4) @ (4,2) = (3,2)
output = hidden @ W2  # (3,2) @ (2,1) = (3,1)

print(f"Hidden layer: {hidden.shape}")
print(f"Output: {output.flatten()}")

# Time comparison: @ vs manual loops
def manual_multiply(a, b):
    result = np.zeros((a.shape[0], b.shape[1]))
    for i in range(a.shape[0]):
        for j in range(b.shape[1]):
            for k in range(a.shape[1]):
                result[i, j] += a[i, k] * b[k, j]
    return result

# Speed test
_, at_time = time_it(lambda: X @ W1)
_, manual_time = time_it(manual_multiply, X, W1)

print(f"@ operator: {at_time:.4f}ms")
print(f"Manual loops: {manual_time:.4f}ms")
print(f"@ is {manual_time/at_time:.1f}x faster!")
```


## Broadcasting & Advanced Indexing for ML

```python
# Broadcasting example: Normalize dataset
dataset = np.random.randn(1000, 5)  # 1000 samples, 5 features

# Calculate mean and std for each feature
feature_means = dataset.mean(axis=0)  # Shape: (5,)
feature_stds = dataset.std(axis=0)    # Shape: (5,)

# Normalize: broadcasting applies to all 1000 samples automatically
normalized = (dataset - feature_means) / feature_stds

print(f"Original shape: {dataset.shape}")
print(f"Means shape: {feature_means.shape}")
print(f"Normalized shape: {normalized.shape}")
print(f"New means (should be ~0): {normalized.mean(axis=0)}")

# Advanced indexing: Select specific samples and features
interesting_samples = np.array([0, 10, 100, 500])  # Sample indices
key_features = np.array([1, 3, 4])                 # Feature indices

# Extract submatrix
subset = dataset[interesting_samples][:, key_features]
print(f"Subset shape: {subset.shape}")

# Boolean indexing for data filtering
high_variance_features = feature_stds > 1.0
filtered_data = dataset[:, high_variance_features]
print(f"High variance features: {high_variance_features.sum()}")
print(f"Filtered data shape: {filtered_data.shape}")
```

---

# Phase 4: Essential OOP for Data (10 minutes)
**Goal: Organize ML data processing with classes**

## Data Container Pattern

```python
class MLDataset:
    """Simple class to organize ML datasets"""
    def __init__(self, name):
        self.name = name
        self.features = []
        self.labels = []
        self.metadata = {}
    
    def add_sample(self, features, label):
        self.features.append(features)
        self.labels.append(label)
    
    def get_stats(self):
        if not self.features:
            return "No data"
        
        X = np.array(self.features)
        y = np.array(self.labels)
        
        return {
            'samples': len(self.features),
            'features': X.shape[1] if len(X.shape) > 1 else 1,
            'classes': len(np.unique(y)),
            'feature_means': X.mean(axis=0) if len(X.shape) > 1 else X.mean()
        }
    
    def __len__(self):
        return len(self.features)
    
    def __repr__(self):
        return f"MLDataset('{self.name}', {len(self)} samples)"

# Usage
dataset = MLDataset("Iris Classification")
dataset.add_sample([5.1, 3.5, 1.4, 0.2], 0)  # Setosa
dataset.add_sample([7.0, 3.2, 4.7, 1.4], 1)  # Versicolor
dataset.add_sample([6.3, 3.3, 6.0, 2.5], 2)  # Virginica

print(dataset)
print(f"Stats: {dataset.get_stats()}")
```

## ML Model Pattern

```python
class SimpleClassifier:
    """Minimal ML model structure"""
    def __init__(self, model_type="LogisticRegression"):
        self.model_type = model_type
        self.is_trained = False
        self.weights = None
        self.training_history = []
    
    def fit(self, X, y):
        """Simulate training (normally would use sklearn etc.)"""
        X = np.array(X)
        y = np.array(y)
        
        # Simulate training with random weights
        n_features = X.shape[1]
        self.weights = np.random.randn(n_features)
        
        # Fake training history
        self.training_history = [0.8, 0.75, 0.73, 0.72, 0.71]
        self.is_trained = True
        
        return self
    
    def predict(self, X):
        if not self.is_trained:
            raise ValueError("Model must be trained first!")
        
        X = np.array(X)
        # Simple prediction: dot product with weights
        scores = X @ self.weights
        return (scores > 0).astype(int)
    
    def get_metrics(self):
        return {
            'model': self.model_type,
            'trained': self.is_trained,
            'final_loss': self.training_history[-1] if self.training_history else None
        }

# Usage
model = SimpleClassifier()
model.fit(dataset.features, dataset.labels)
predictions = model.predict([[5.0, 3.0, 1.5, 0.3]])
print(f"Model: {model.get_metrics()}")
print(f"Prediction: {predictions}")
```


---

# Phase 5: Real ML Pipeline Challenge (5 minutes)
**Goal: Combine all techniques in a realistic ML preprocessing pipeline**

## The Challenge: Customer Churn Prediction

```python
# Simulate messy customer data (typical real-world scenario)
customer_data = [
    "Alice,25,Premium,500.50,1,2020-01-15",
    "Bob,35,,250.00,0,2019-05-20",
    "Carol,45,Basic,150.75,1,2021-03-10", 
    "David,30,Premium,850.25,1,2020-11-05",
    "Eve,28,Standard,300.00,0,2021-01-20",
    "Frank,55,Basic,,1,2019-12-01",  # Missing spending
    "Grace,22,Premium,920.80,0,2020-08-15"
]

print("Raw data sample:")
print(customer_data[0])
```

## Step-by-Step Pipeline with Timing

```python
# Step 1: Parse data using comprehensions
def parse_customer_data(raw_data):
    parsed = []
    for line in raw_data:
        parts = line.split(',')
        if len(parts) == 6:  # Valid record
            try:
                customer = {
                    'name': parts[0],
                    'age': int(parts[1]) if parts[1] else None,
                    'tier': parts[2] if parts[2] else 'Basic',
                    'spending': float(parts[3]) if parts[3] else 0.0,
                    'churned': int(parts[4]),
                    'signup_year': int(parts[5].split('-')[0])
                }
                parsed.append(customer)
            except ValueError:
                continue  # Skip invalid records
    return parsed

# Step 2: Feature engineering with comprehensions
def engineer_features(customers):
    # Create feature matrix
    features = []
    labels = []
    
    for customer in customers:
        if customer['age'] is not None:  # Skip records with missing age
            # Feature engineering
            feature_vector = [
                customer['age'],
                customer['spending'],
                1 if customer['tier'] == 'Premium' else 0,  # Premium tier
                2024 - customer['signup_year'],  # Customer tenure
                customer['spending'] / max(customer['age'], 1)  # Spending per age
            ]
            
            features.append(feature_vector)
            labels.append(customer['churned'])
    
    return np.array(features), np.array(labels)

# Step 3: NumPy processing
def preprocess_features(X):
    # Normalize features
    X_mean = X.mean(axis=0)
    X_std = X.std(axis=0)
    X_normalized = (X - X_mean) / (X_std + 1e-8)  # Avoid division by zero
    return X_normalized, X_mean, X_std

# EXECUTE PIPELINE WITH TIMING
print("\n=== ML PIPELINE EXECUTION ===")

# Parse data
_, parse_time = time_it(parse_customer_data, customer_data)
clean_data = parse_customer_data(customer_data)
print(f"1. Data parsing: {parse_time:.2f}ms ({len(clean_data)} customers)")

# Feature engineering
_, feature_time = time_it(engineer_features, clean_data)
X, y = engineer_features(clean_data)
print(f"2. Feature engineering: {feature_time:.2f}ms (shape: {X.shape})")

# Preprocessing
_, preprocess_time = time_it(preprocess_features, X)
X_processed, means, stds = preprocess_features(X)
print(f"3. Normalization: {preprocess_time:.2f}ms")

# Summary statistics
churn_rate = y.mean() * 100
print(f"\nDataset Summary:")
print(f"- Total customers: {len(X)}")
print(f"- Features per customer: {X.shape[1]}")
print(f"- Churn rate: {churn_rate:.1f}%")
print(f"- Processing time: {parse_time + feature_time + preprocess_time:.2f}ms total")

# Feature importance (simple correlation)
feature_names = ['Age', 'Spending', 'Premium_Tier', 'Tenure', 'Spending_per_Age']
correlations = [np.corrcoef(X_processed[:, i], y)[0,1] for i in range(X.shape[1])]

print(f"\nFeature correlations with churn:")
for name, corr in zip(feature_names, correlations):
    print(f"- {name}: {corr:.3f}")
```

---

## Key Takeaways & Performance Summary

```python
# What we learned with performance proof:
print("\n=== PERFORMANCE SUMMARY ===")
print("✓ Comprehensions: 2-5x faster than loops")
print("✓ NumPy operations: 10-100x faster than pure Python")
print("✓ @ operator: Essential for ML matrix operations")
print("✓ Classes: Organize complex ML workflows")
print("✓ All together: Professional ML preprocessing pipeline")

print("\n=== YOU'RE NOW READY FOR ===")
print("• Pandas DataFrame operations")
print("• Scikit-learn model training")
print("• TensorFlow/PyTorch neural networks")
print("• Large dataset processing")
print("• Production ML systems")
```

**Remember: Performance matters when datasets grow to millions of samples!**

---

---

## Quick Reference

```python
# Essential patterns for ML
data = [process(x) for x in raw_data if valid(x)]  # Clean & filter
X = np.array(features)  # Convert to NumPy
y_pred = X @ weights    # Matrix multiplication
normalized = (X - X.mean(axis=0)) / X.std(axis=0)  # Normalize
class MLModel: pass     # Organize complex workflows
```

*Questions? Office hours: Monday/Wednesday 10:30am-12:00pm, 1:00pm–3:00pm (EGR333)*