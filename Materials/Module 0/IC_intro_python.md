# Module 0: Clean Python for Machine Learning
## 35-Minute Code-Along

**Course:** CSC 422 - Machine and Deep Learning  
**Duration:** 35 minutes  
**Format:** Live coding with elegant examples

---

## Learning Objectives

By the end of this session, students will:
- Write clean, concise Python using comprehensions and modern patterns
- Master NumPy fundamentals for ML computations
- Organize data processing code with simple classes
- Build readable, maintainable ML workflows

---

## Session Timeline

- **0-3 min:** Python Elegance Hook
- **3-11 min:** List/Dict Comprehensions
- **11-21 min:** NumPy Essentials
- **21-26 min:** Simple OOP for Data
- **26-35 min:** Clean ML Pipeline

---

## Setup
```python
import numpy as np
from collections import defaultdict, Counter
```

---

# Phase 1: Python Elegance Hook (3 minutes)
**Goal: Show the beauty of clean, concise Python**

```python
# Challenge: Clean messy student data
raw_data = [
    "Alice,85,Math", "Bob,92,CS", "Carol,,Physics", 
    "David,78,Math", "Eve,94,CS", "Frank,88,Physics"
]

# Verbose approach (what many students write)
students = []
for line in raw_data:
    parts = line.split(',')
    if len(parts) == 3 and parts[1]:  # Valid and has score
        student = {}
        student['name'] = parts[0]
        student['score'] = int(parts[1])
        student['major'] = parts[2]
        students.append(student)

# Clean Python approach (what we'll learn)
students = [
    {'name': parts[0], 'score': int(parts[1]), 'major': parts[2]}
    for line in raw_data
    for parts in [line.split(',')]
    if len(parts) == 3 and parts[1]
]

print(f"Parsed {len(students)} students")
print(f"First student: {students[0]}")
```

---

---

# Phase 2: List/Dict Comprehensions (8 minutes)
**Goal: Master Python's most elegant data transformation patterns**

## List Comprehensions - The Essential Pattern

```python
# Transform and filter in one line
scores = [78, 85, 92, 67, 88, 95, 73]

# Basic transformations
curved = [score + 5 for score in scores]
percentages = [score / 100 for score in scores]

# Filtering
passing = [score for score in scores if score >= 80]

# Combined transform + filter
grade_points = [4.0 if s >= 90 else 3.0 if s >= 80 else 2.0 
                for s in scores if s >= 70]

print(f"Curved: {curved}")
print(f"Passing: {passing}")
print(f"Grade points: {grade_points}")
```

## Dictionary Comprehensions

```python
# Create dictionaries elegantly
names = ['Alice', 'Bob', 'Carol']
scores = [85, 92, 78]

# Name -> score mapping
grade_book = {name: score for name, score in zip(names, scores)}

# Filter and transform
high_achievers = {name: f"{score}% (A)" 
                 for name, score in grade_book.items() 
                 if score >= 90}

# Count by category
data = ['apple', 'banana', 'apple', 'cherry', 'banana', 'apple']
counts = {item: data.count(item) for item in set(data)}

print(f"Grade book: {grade_book}")
print(f"High achievers: {high_achievers}")
print(f"Counts: {counts}")
```

## Advanced Patterns

```python
# Flatten nested lists
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
flat = [num for row in matrix for num in row]

# Parse structured data
log_lines = ["ERROR:404", "INFO:200", "ERROR:500", "INFO:200"]
errors = [line.split(':')[1] for line in log_lines if line.startswith('ERROR')]

# ML preprocessing example
features = [1.5, -0.8, 2.1, -1.2, 0.9]
# Apply ReLU activation: max(0, x)
activated = [max(0, x) for x in features]
# Normalize to [0, 1]
max_val = max(features)
normalized = [x / max_val for x in features if x > 0]

print(f"Flat matrix: {flat}")
print(f"Error codes: {errors}")
print(f"ReLU: {activated}")
print(f"Normalized: {normalized}")
```

---

# Phase 3: NumPy Essentials (10 minutes)
**Goal: Master the core NumPy operations for ML**

## Arrays vs Lists - The Foundation

```python
# Create arrays
data = [1, 2, 3, 4, 5]
arr = np.array(data)

# Element-wise operations (vectorization)
python_way = [x * 2 for x in data]  # Loops
numpy_way = arr * 2                  # Vectorized

print(f"Python: {python_way}")
print(f"NumPy:  {numpy_way}")

# Useful array creation
zeros = np.zeros(5)           # [0. 0. 0. 0. 0.]
ones = np.ones(3)             # [1. 1. 1.]
range_arr = np.arange(0, 10, 2)  # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5)  # [0.0 0.25 0.5 0.75 1.0]

print(f"Zeros: {zeros}")
print(f"Range: {range_arr}")
```

## The @ Operator - Matrix Magic

```python
# Neural network example
# Input: 3 samples, 2 features
X = np.array([[1, 2],
              [3, 4], 
              [5, 6]])

# Weights: 2 features -> 3 outputs
W = np.array([[0.1, 0.2, 0.3],
              [0.4, 0.5, 0.6]])

print(f"Input shape: {X.shape}")
print(f"Weights shape: {W.shape}")

# Matrix multiplication with @
output = X @ W  # (3,2) @ (2,3) = (3,3)
print(f"Output shape: {output.shape}")
print(f"Output:\n{output}")

# Common ML operations
scores = np.array([85, 92, 78, 96, 88])
print(f"Mean: {scores.mean():.1f}")
print(f"Std: {scores.std():.1f}")
print(f"Max: {scores.max()}")
```



## Broadcasting & Indexing

```python
# Sample dataset
data = np.array([[1, 2, 3],
                 [4, 5, 6],
                 [7, 8, 9]])

# Broadcasting - operations with different shapes
result = data + 10        # Add scalar to all elements
row_add = data + [1, 2, 3]  # Add to each column

print(f"Original:\n{data}")
print(f"Add 10:\n{result}")
print(f"Add [1,2,3]:\n{row_add}")

# Boolean indexing - filter data
scores = np.array([85, 92, 78, 96, 88, 91, 73])
high_scores = scores[scores >= 90]
print(f"High scores: {high_scores}")

# Fancy indexing
indices = [0, 2, 4]  # Select specific elements
selected = scores[indices]
print(f"Selected scores: {selected}")
```

---

# Phase 4: Simple OOP for Data (5 minutes)
**Goal: Organize data with clean classes**

## Data Container Class

```python
class Student:
    """Simple data container with methods"""
    def __init__(self, name, scores):
        self.name = name
        self.scores = scores
    
    def average(self):
        return sum(self.scores) / len(self.scores)
    
    def letter_grade(self):
        avg = self.average()
        if avg >= 90: return 'A'
        elif avg >= 80: return 'B'
        elif avg >= 70: return 'C'
        else: return 'F'
    
    def __str__(self):
        return f"{self.name}: {self.average():.1f} ({self.letter_grade()})"

# Usage
students = [
    Student("Alice", [85, 90, 88]),
    Student("Bob", [92, 87, 94]),
    Student("Carol", [78, 82, 76])
]

for student in students:
    print(student)

# Find top performers
top_students = [s for s in students if s.average() >= 85]
print(f"\nTop performers: {[s.name for s in top_students]}")
```



---

# Phase 5: Clean ML Pipeline (9 minutes)
**Goal: Combine all techniques in a clean data processing workflow**

## Mini ML Pipeline Example

```python
# Raw survey data
responses = [
    "Alice,25,5,Yes", "Bob,35,3,No", "Carol,45,4,Yes",
    "David,30,5,Yes", "Eve,28,2,No", "Frank,,4,Yes"  # Missing age
]

print("Raw data:", responses[0])
```

## Clean Processing Pipeline

```python
# Step 1: Parse with comprehensions
clean_data = [
    {'name': parts[0], 'age': int(parts[1]) if parts[1] else None, 
     'rating': int(parts[2]), 'satisfied': parts[3] == 'Yes'}
    for line in responses
    for parts in [line.split(',')]
    if len(parts) == 4
]

# Step 2: Filter complete records
complete_data = [record for record in clean_data if record['age'] is not None]

print(f"Parsed: {len(clean_data)} records")
print(f"Complete: {len(complete_data)} records")
print(f"Sample: {complete_data[0]}")

# Step 3: Create NumPy arrays
ages = np.array([record['age'] for record in complete_data])
ratings = np.array([record['rating'] for record in complete_data])
satisfied = np.array([record['satisfied'] for record in complete_data])

# Step 4: Analysis with NumPy
print(f"\nAnalysis:")
print(f"Average age: {ages.mean():.1f}")
print(f"Average rating: {ratings.mean():.1f}")
print(f"Satisfaction rate: {satisfied.mean():.1%}")

# Step 5: Group analysis
high_rating = ratings >= 4
print(f"High ratings satisfaction: {satisfied[high_rating].mean():.1%}")
print(f"Low ratings satisfaction: {satisfied[~high_rating].mean():.1%}")
```

---

## What We've Learned

```python
print("=== MODERN PYTHON TECHNIQUES ===")
print("✓ Comprehensions: Clean data transformations")
print("✓ NumPy arrays: Vectorized mathematical operations")
print("✓ @ operator: Matrix multiplication for ML")
print("✓ Classes: Organize data and behavior")
print("✓ Clean pipelines: Readable, maintainable code")

print("\n=== YOU'RE READY FOR ===")
print("• Pandas DataFrames")
print("• Scikit-learn ML models")
print("• Neural networks (TensorFlow/PyTorch)")
print("• Professional data science workflows")
```

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