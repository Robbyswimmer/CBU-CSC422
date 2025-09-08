# 📝 Advanced Python Crash Course (CSC 422)

**Duration:** 45 minutes  
**Format:** Live coding with student participation  
**Course:** CSC 422 - Machine and Deep Learning

---

## 🎯 Learning Goals

By the end of class, students will:
- Use Python comprehensions to clean/transform data elegantly
- Understand NumPy arrays vs. Python lists
- Apply vectorization, broadcasting, and the @ operator for ML-style computations
- Build a mini end-to-end pipeline that parses, cleans, and analyzes data

---

## ⏱️ Timeline

- **0–5 min** — Hook: Clean Python vs. Verbose Python
- **5–15 min** — Comprehensions for Data Cleaning
- **15–30 min** — NumPy Essentials
- **30–42 min** — Mini ML-Style Pipeline
- **42–45 min** — Recap & Next Steps

---

## Setup

```python
import numpy as np
from collections import defaultdict, Counter
```

---

# 🚀 0–5 min: Hook - Clean Python vs. Verbose Python

**Goal:** Set tone that Python elegance = productivity

```python
# Challenge: Parse student data from messy strings
raw_data = [
    "Alice,85,Math", "Bob,92,CS", "Carol,,Physics", 
    "David,78,Math", "Eve,94,CS"
]

# ❌ VERBOSE APPROACH (what many students write)
students = []
for line in raw_data:
    parts = line.split(',')
    if len(parts) == 3:
        if parts[1] != '':  # Has score
            student = {}
            student['name'] = parts[0]
            student['score'] = int(parts[1])
            student['major'] = parts[2]
            students.append(student)

print(f"Verbose approach: {len(students)} students")

# ✅ CLEAN PYTHON APPROACH (what we'll learn today)
students = [
    {'name': p[0], 'score': int(p[1]), 'major': p[2]}
    for line in raw_data
    for p in [line.split(',')]
    if len(p) == 3 and p[1]
]

print(f"Clean approach: {len(students)} students")
print(f"First student: {students[0]}")
```

**Ask students:** *"Which one would you rather maintain in a real ML pipeline?"*

---

# 📊 5–15 min: Comprehensions for Data Cleaning

**Goal:** Master Python's most elegant data transformation patterns

## List Comprehensions - Transform & Filter

```python
# Sample data
scores = [78, 85, 92, 67, 88, 95, 73]

# Basic transformations
curved = [score + 5 for score in scores]
percentages = [score / 100 for score in scores]

# Filtering
passing = [score for score in scores if score >= 80]

# Combined logic
letter_grades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' 
                for s in scores if s >= 70]

print(f"Original: {scores}")
print(f"Passing: {passing}")
print(f"Letter grades: {letter_grades}")
```

## Dictionary Comprehensions

```python
# Create elegant mappings
names = ['Alice', 'Bob', 'Carol', 'David']
scores = [85, 92, 78, 96]

# Name → score mapping
gradebook = {name: score for name, score in zip(names, scores)}

# Filter high achievers
high_achievers = {name: score for name, score in gradebook.items() 
                 if score >= 90}

# Transform values
grade_labels = {name: f"{score}% ({'A' if score >= 90 else 'B'})" 
               for name, score in gradebook.items()}

print(f"Gradebook: {gradebook}")
print(f"High achievers: {high_achievers}")
```

## 🏃‍♂️ Mini Exercise (2 minutes)
**Challenge:** Write a one-liner to square only even numbers from this list:
```python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
# Your code here: squared_evens = ???
```

**Solution:**
```python
squared_evens = [n**2 for n in numbers if n % 2 == 0]
print(squared_evens)  # [4, 16, 36, 64, 100]
```

**Key takeaway:** *"Comprehensions let you build data transformations that are short, readable, and ML-ready."*

---

# 🔢 15–30 min: NumPy Essentials

**Goal:** Understand vectorization and ML-ready operations

## Arrays vs Lists

```python
# Python lists vs NumPy arrays
data = [1, 2, 3, 4, 5]
arr = np.array(data)

# The difference
python_doubled = [x * 2 for x in data]  # Loop required
numpy_doubled = arr * 2                 # Vectorized!

print(f"Python way: {python_doubled}")
print(f"NumPy way: {numpy_doubled}")

# Element-wise operations
print(f"Add 10: {arr + 10}")
print(f"Square: {arr ** 2}")
print(f"Boolean: {arr > 3}")
```

## Useful Array Creators

```python
# Essential for ML initialization
zeros = np.zeros(5)              # [0. 0. 0. 0. 0.]
ones = np.ones(3)                # [1. 1. 1.]
range_arr = np.arange(0, 10, 2)  # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5)  # [0.0 0.25 0.5 0.75 1.0]

print(f"Zeros: {zeros}")
print(f"Range: {range_arr}")
print(f"Linspace: {linspace}")
```

## The @ Operator - Matrix Magic

```python
# Mini neural network forward pass
# Input: 3 samples, 2 features
X = np.array([[1, 2],
              [3, 4], 
              [5, 6]])

# Weights: 2 features → 3 outputs  
W = np.array([[0.1, 0.2, 0.3],
              [0.4, 0.5, 0.6]])

print(f"Input shape: {X.shape}")
print(f"Weights shape: {W.shape}")

# Matrix multiplication with @
output = X @ W  # (3,2) @ (2,3) = (3,3)
print(f"Output shape: {output.shape}")
print(f"Output:\n{output}")
```

## Broadcasting & Indexing

```python
# Broadcasting - different shapes work together
data = np.array([[1, 2, 3],
                 [4, 5, 6]])

result = data + [10, 20, 30]  # Add to each column
print(f"Original:\n{data}")
print(f"Broadcasted:\n{result}")

# Boolean indexing
scores = np.array([85, 92, 78, 96, 88, 91, 73])
high_scores = scores[scores >= 90]
print(f"High scores: {high_scores}")
```

## 🏃‍♂️ Mini Check-in (2 minutes)
**Challenge:** Slice out all values > 90 from this NumPy array:
```python
values = np.array([85, 92, 78, 96, 88, 91, 73])
# Your code here: high_values = ???
```

**Solution:**
```python
high_values = values[values > 90]
print(high_values)  # [92 96 91]
```

---

# 🔄 30–42 min: Mini ML-Style Pipeline

**Goal:** Build end-to-end data processing workflow

## Start with Raw Data

```python
# Simulate CSV-style survey responses
raw_responses = [
    "Alice,25,5,Yes", "Bob,35,3,No", "Carol,45,4,Yes",
    "David,30,5,Yes", "Eve,28,2,No", "Frank,,4,Yes",  # Missing age
    "Grace,22,1,No", "Henry,40,5,Yes"
]

print("Raw data sample:", raw_responses[0])
```

## Step 1: Parse into Dicts (with comprehensions!)

```python
# Parse with comprehensions
parsed_data = [
    {'name': p[0], 'age': int(p[1]) if p[1] else None, 
     'rating': int(p[2]), 'satisfied': p[3] == 'Yes'}
    for response in raw_responses
    for p in [response.split(',')]
    if len(p) == 4
]

print(f"Parsed {len(parsed_data)} responses")
print(f"Sample: {parsed_data[0]}")
```

## Step 2: Filter Complete Records

```python
# Remove records with missing data
complete_data = [record for record in parsed_data if record['age'] is not None]

print(f"Complete records: {len(complete_data)}")
```

## Step 3: Convert to NumPy Arrays

```python
# Extract features for analysis
ages = np.array([record['age'] for record in complete_data])
ratings = np.array([record['rating'] for record in complete_data])
satisfied = np.array([record['satisfied'] for record in complete_data])

print(f"Ages shape: {ages.shape}")
print(f"Ratings shape: {ratings.shape}")
print(f"Satisfied shape: {satisfied.shape}")
```

## Step 4: Run Quick Analysis

```python
# Statistical analysis
print("\n📊 ANALYSIS RESULTS:")
print(f"Average age: {ages.mean():.1f}")
print(f"Average rating: {ratings.mean():.1f}")
print(f"Overall satisfaction: {satisfied.mean():.1%}")

# Segmented analysis
high_rating_mask = ratings >= 4
print(f"High ratings (4-5) satisfaction: {satisfied[high_rating_mask].mean():.1%}")
print(f"Low ratings (1-3) satisfaction: {satisfied[~high_rating_mask].mean():.1%}")

# Age groups
young_mask = ages < 30
print(f"Young (<30) satisfaction: {satisfied[young_mask].mean():.1%}")
print(f"Older (30+) satisfaction: {satisfied[~young_mask].mean():.1%}")
```

**Ask students:** *"Where did comprehensions help? Where did NumPy help?"*

---

# ✅ 42–45 min: Recap & Next Steps

## Checklist - What You've Mastered

```python
print("=== TODAY'S PYTHON SKILLS ✅ ===")
print("✓ List/Dict Comprehensions - elegant data transformations")
print("✓ NumPy arrays - vectorized operations vs Python loops")  
print("✓ Broadcasting - operations on different-shaped arrays")
print("✓ @ operator - matrix multiplication for ML")
print("✓ End-to-end pipeline - parse → clean → analyze")
```

## Connect Forward

**Next week:** We'll move to Pandas and Scikit-learn — today's tools are the building blocks.

- **Pandas DataFrames** will extend what we learned about data cleaning
- **Scikit-learn models** will use the NumPy arrays we created
- **Neural networks** will rely heavily on the @ operator

## Optional Reading

For students who want to go deeper:
- **OOP in Python** - Classes and methods for organizing ML code
- **Advanced comprehensions** - Nested comprehensions and generator expressions
- **NumPy documentation** - Broadcasting rules and advanced indexing

---

# 🚦 Pacing Tips

**Keep coding examples minimal but meaningful** - students will copy everything

**Use quick "write this in 60 seconds" micro-exercises** to keep engagement high

**If time runs short:** Skip broadcasting demo (less critical right away)

**If ahead of schedule:** Add more student exercises or dive deeper into the @ operator

**Energy check:** After NumPy section, ask "Questions so far?" before pipeline

---

*🎓 Remember: Python elegance = ML productivity!*