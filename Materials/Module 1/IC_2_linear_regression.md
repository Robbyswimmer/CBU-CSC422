# Linear Regression & Optimization (CSC 422)

**Duration:** 2 hours  
**Format:** Live coding with student participation  
**Course:** CSC 422 - Machine and Deep Learning

---

## Learning Goals

By the end of class, students will:
- Understand why brute force parameter search doesn't scale to real ML
- Implement gradient descent from scratch for linear regression
- Visualize loss landscapes and optimization paths
- Connect mathematical gradients to practical "walking downhill" intuition
- Bridge from simple linear models to upcoming neural networks

---

## ⏱Timeline

- **0–10 min** — Hook: Why We Need Smart Optimization
- **10–45 min** — Brute Force Grid Search (The Baseline)
- **45–60 min** — Theory Bridge: Gradients & Intuition
- **60–90 min** — Gradient Descent Implementation
- **90–110 min** — Variants & Performance Comparison
- **110–120 min** — Wrap-up & Neural Network Connections

---

## Setup

```python
import numpy as np
import matplotlib.pyplot as plt

# Reproducibility
np.random.seed(42)
```

---

# 0–10 min: Hook - Why We Need Smart Optimization

**Goal:** Show the elegant final result, then work backwards to understand how we got there

```python
# The end result we're building towards
print("TODAY'S GOAL: Train a linear model y = ax + b")
print("Method 1: Try every possible (a,b) combination  → SLOW")
print("Method 2: Use calculus to walk directly downhill → FAST")
print("This is the foundation of ALL neural network training!")
```

## Generate Synthetic Data

```python
# True relationship we're trying to discover
a_true, b_true = 2.5, -1.0
n_points = 100

# Generate noisy linear data
x = np.random.uniform(-2, 2, n_points)
y = a_true * x + b_true + np.random.normal(0, 0.5, n_points)

# Split into train/test
split_idx = int(0.8 * n_points)
x_train, y_train = x[:split_idx], y[:split_idx]
x_test, y_test = x[split_idx:], y[split_idx:]

# Quick visualization
plt.figure(figsize=(8, 4))
plt.subplot(1, 2, 1)
plt.scatter(x_train, y_train, alpha=0.6, label='Train')
plt.plot(x, a_true * x + b_true, 'r--', label=f'True: y = {a_true}x + {b_true}')
plt.legend()
plt.title('Training Data')

plt.subplot(1, 2, 2)
plt.scatter(x_test, y_test, alpha=0.6, color='orange', label='Test')
plt.plot(x, a_true * x + b_true, 'r--', label=f'True: y = {a_true}x + {b_true}')
plt.legend()
plt.title('Test Data')
plt.tight_layout()
plt.show()

print(f"✅ Data ready: {len(x_train)} train, {len(x_test)} test points")
```

## Define Model & Loss

```python
def predict(a, b, x):
    """Linear model: y = ax + b"""
    return a * x + b

def mse_loss(a, b, x, y):
    """Mean squared error loss"""
    predictions = predict(a, b, x)
    residuals = y - predictions
    return np.mean(residuals ** 2)

# Test with true parameters
true_loss = mse_loss(a_true, b_true, x_train, y_train)
print(f"MSE with true parameters: {true_loss:.4f}")
```

**Ask students:** *"How would you find the best values for `a` and `b`?"*

---

# 10–45 min: Brute Force Grid Search (The Baseline)

**Goal:** Implement exhaustive search to understand the problem, then see why it doesn't scale

## The Naive Approach: Try Everything

**Concept:** Instead of being smart about optimization, let's just try every possible combination of parameters and pick the best one.

Think of it like finding the lowest point in a landscape:
- **Brute force approach:** Visit every single spot on a grid and measure the elevation
- **Smart approach (coming later):** Use the slope to walk downhill efficiently

```python
# Conceptual analogy
print("🗺️  PARAMETER SPACE EXPLORATION:")
print("   Our goal: Find the best (a, b) values for y = ax + b")
print("   Naive method: Test every combination in a grid")
print("   - Try a = -1.0, -0.97, -0.94, ..., 4.97, 5.0")
print("   - Try b = -3.0, -2.97, -2.94, ..., 1.97, 2.0")
print("   - For each (a, b) pair: compute loss, remember the best")
print("   ⚠️  This requires testing 40,401 combinations!")
```

**Ask students:** *"How would you find the lowest point in a mountainous area if you had unlimited time but were blindfolded to gradients?"*

## Grid Search Implementation

```python
# Define parameter grids
a_grid = np.linspace(-1, 5, 201)    # 201 values for slope
b_grid = np.linspace(-3, 2, 201)    # 201 values for intercept

print(f"Grid size: {len(a_grid)} × {len(b_grid)} = {len(a_grid) * len(b_grid):,} combinations")

# Compute loss for every combination (this is the expensive part!)
A_mesh, B_mesh = np.meshgrid(a_grid, b_grid)
loss_grid = np.zeros_like(A_mesh)

for i, a in enumerate(a_grid):
    for j, b in enumerate(b_grid):
        loss_grid[j, i] = mse_loss(a, b, x_train, y_train)

print("✅ Grid search complete!")
```

## Find Best Parameters

```python
# Find minimum loss location
min_idx = np.unravel_index(np.argmin(loss_grid), loss_grid.shape)
a_best = a_grid[min_idx[1]]
b_best = b_grid[min_idx[0]]
best_loss = loss_grid[min_idx]

print(f"🎯 GRID SEARCH RESULTS:")
print(f"   Best (a, b): ({a_best:.3f}, {b_best:.3f})")
print(f"   Train loss: {best_loss:.4f}")
print(f"   Test loss: {mse_loss(a_best, b_best, x_test, y_test):.4f}")
print(f"   True params: ({a_true:.3f}, {b_true:.3f})")
```

## Visualize the Loss Landscape

```python
plt.figure(figsize=(12, 4))

# 3D surface plot
ax1 = plt.subplot(1, 3, 1, projection='3d')
ax1.plot_surface(A_mesh, B_mesh, loss_grid, alpha=0.7, cmap='viridis')
ax1.scatter([a_best], [b_best], [best_loss], color='red', s=100, label='Grid Best')
ax1.scatter([a_true], [b_true], [mse_loss(a_true, b_true, x_train, y_train)], 
           color='blue', s=100, label='True')
ax1.set_xlabel('a (slope)')
ax1.set_ylabel('b (intercept)')
ax1.set_zlabel('MSE Loss')
ax1.set_title('3D Loss Surface')

# Contour plot
plt.subplot(1, 3, 2)
plt.contour(A_mesh, B_mesh, loss_grid, levels=20, cmap='viridis')
plt.colorbar(label='MSE Loss')
plt.scatter(a_best, b_best, color='red', s=100, label='Grid Best', zorder=5)
plt.scatter(a_true, b_true, color='blue', s=100, label='True', zorder=5)
plt.xlabel('a (slope)')
plt.ylabel('b (intercept)')
plt.legend()
plt.title('Loss Contours')

# Final fit visualization
plt.subplot(1, 3, 3)
plt.scatter(x_train, y_train, alpha=0.6, label='Data')
plt.plot(x, predict(a_true, b_true, x), 'b--', label=f'True: y = {a_true}x + {b_true}')
plt.plot(x, predict(a_best, b_best, x), 'r-', label=f'Grid: y = {a_best:.2f}x + {b_best:.2f}')
plt.legend()
plt.title('Model Comparison')
plt.tight_layout()
plt.show()
```

## Mini Exercise (5 minutes)

**Challenge:** What happens if we make the grid coarser or finer?

```python
# Student TODO: Try different grid resolutions and see the effect
# Coarse grid: 51 x 51 points
# Fine grid: 401 x 401 points
# Which is better? What's the tradeoff?
```

**Ask students:** *"Why can't we use this approach for a neural network with 1 million parameters?"*

---

# 45–60 min: Theory Bridge - Gradients & Intuition

**Goal:** Connect mathematical gradients to the intuitive idea of "walking downhill"

## The Mathematical Foundation

For linear regression with loss function:
$$L(a, b) = \frac{1}{n} \sum_{i=1}^{n} (y_i - (ax_i + b))^2$$

The gradients are:
$$\frac{\partial L}{\partial a} = \frac{2}{n} \sum_{i=1}^{n} (ax_i + b - y_i) x_i$$
$$\frac{\partial L}{\partial b} = \frac{2}{n} \sum_{i=1}^{n} (ax_i + b - y_i)$$

## The Intuitive Explanation

```python
# Demonstrate gradient intuition
def plot_gradient_intuition():
    # Take a slice of the loss surface at b = b_true
    a_slice = np.linspace(0, 4, 100)
    loss_slice = [mse_loss(a, b_true, x_train, y_train) for a in a_slice]
    
    plt.figure(figsize=(10, 4))
    
    # Plot loss curve
    plt.subplot(1, 2, 1)
    plt.plot(a_slice, loss_slice, 'b-', linewidth=2, label='Loss vs. slope (a)')
    plt.axvline(a_true, color='green', linestyle='--', label=f'True a = {a_true}')
    plt.xlabel('Slope (a)')
    plt.ylabel('MSE Loss')
    plt.legend()
    plt.title('Loss Landscape Slice')
    
    # Show gradient direction
    test_points = [1.0, 2.5, 3.5]
    colors = ['red', 'orange', 'purple']
    
    for i, a_test in enumerate(test_points):
        loss_val = mse_loss(a_test, b_true, x_train, y_train)
        # Approximate gradient with finite difference
        eps = 0.01
        grad = (mse_loss(a_test + eps, b_true, x_train, y_train) - loss_val) / eps
        
        plt.scatter(a_test, loss_val, color=colors[i], s=100, zorder=5)
        # Draw arrow showing gradient direction (opposite to gradient for descent)
        arrow_len = 0.3
        arrow_dx = -arrow_len * np.sign(grad)
        plt.arrow(a_test, loss_val, arrow_dx, 0, head_width=5, 
                 head_length=0.05, fc=colors[i], ec=colors[i])
        plt.text(a_test, loss_val + 10, f'∇L = {grad:.1f}', 
                ha='center', color=colors[i], fontweight='bold')
    
    plt.subplot(1, 2, 2)
    # Show what "walking downhill" means
    x_demo = np.linspace(-2, 2, 50)
    for i, a_test in enumerate(test_points):
        y_pred = predict(a_test, b_true, x_demo)
        plt.plot(x_demo, y_pred, color=colors[i], alpha=0.7, 
                label=f'a = {a_test}, loss = {mse_loss(a_test, b_true, x_train, y_train):.1f}')
    
    plt.scatter(x_train, y_train, alpha=0.5, color='gray', label='Data')
    plt.plot(x_demo, predict(a_true, b_true, x_demo), 'g--', linewidth=2, label='True line')
    plt.legend()
    plt.title('Different Slopes & Their Fit')
    plt.tight_layout()
    plt.show()

plot_gradient_intuition()
```

**Key insight:** *The gradient tells us which direction makes the loss worse. So we step in the opposite direction!*

**Ask students:** *"If you were standing on a hill in fog, how would you find the bottom?"*

---

# 60–90 min: Gradient Descent Implementation

**Goal:** Code the gradient descent algorithm from scratch and watch it converge

## Vectorized Gradient Functions

```python
def compute_gradients(a, b, x, y):
    """Compute gradients of MSE loss with respect to a and b"""
    n = len(x)
    predictions = predict(a, b, x)
    residuals = predictions - y
    
    grad_a = (2.0 / n) * np.sum(residuals * x)
    grad_b = (2.0 / n) * np.sum(residuals)
    
    return grad_a, grad_b

# Test gradient computation
grad_a, grad_b = compute_gradients(1.0, 0.0, x_train, y_train)
print(f"Gradients at (a=1, b=0): grad_a = {grad_a:.3f}, grad_b = {grad_b:.3f}")
```

## Gradient Descent Training Loop

```python
def train_gradient_descent(x, y, learning_rate=0.1, max_steps=1000, tolerance=1e-6):
    """Train linear regression using gradient descent"""
    
    # Initialize parameters
    a, b = 0.0, 0.0
    history = []
    
    for step in range(max_steps):
        # Compute current loss and gradients
        loss = mse_loss(a, b, x, y)
        grad_a, grad_b = compute_gradients(a, b, x, y)
        
        # Store history
        history.append({'step': step, 'a': a, 'b': b, 'loss': loss, 
                       'grad_a': grad_a, 'grad_b': grad_b})
        
        # Check convergence
        if abs(grad_a) < tolerance and abs(grad_b) < tolerance:
            print(f"✅ Converged at step {step}")
            break
        
        # Update parameters (gradient descent step)
        a = a - learning_rate * grad_a
        b = b - learning_rate * grad_b
        
        # Print progress
        if step % 100 == 0 or step < 10:
            print(f"Step {step:3d}: a = {a:6.3f}, b = {b:6.3f}, loss = {loss:.6f}")
    
    return a, b, history

# Train the model
print("🚀 Training with Gradient Descent:")
a_gd, b_gd, history = train_gradient_descent(x_train, y_train, learning_rate=0.1)

print(f"\n🎯 GRADIENT DESCENT RESULTS:")
print(f"   Final (a, b): ({a_gd:.3f}, {b_gd:.3f})")
print(f"   Train loss: {mse_loss(a_gd, b_gd, x_train, y_train):.6f}")
print(f"   Test loss: {mse_loss(a_gd, b_gd, x_test, y_test):.6f}")
print(f"   Grid search: ({a_best:.3f}, {b_best:.3f})")
print(f"   True params: ({a_true:.3f}, {b_true:.3f})")
```

## Visualize Training Progress

```python
# Extract history for plotting
history_array = np.array([(h['step'], h['a'], h['b'], h['loss']) for h in history])
steps, a_path, b_path, loss_path = history_array.T

plt.figure(figsize=(15, 4))

# Parameter convergence
plt.subplot(1, 3, 1)
plt.plot(steps, a_path, 'b-', label='a (slope)', linewidth=2)
plt.plot(steps, b_path, 'r-', label='b (intercept)', linewidth=2)
plt.axhline(a_true, color='blue', linestyle='--', alpha=0.7, label=f'True a = {a_true}')
plt.axhline(b_true, color='red', linestyle='--', alpha=0.7, label=f'True b = {b_true}')
plt.xlabel('Training Step')
plt.ylabel('Parameter Value')
plt.legend()
plt.title('Parameter Convergence')

# Loss convergence
plt.subplot(1, 3, 2)
plt.plot(steps, loss_path, 'g-', linewidth=2)
plt.xlabel('Training Step')
plt.ylabel('MSE Loss')
plt.title('Loss Convergence')
plt.yscale('log')

# Optimization path on loss contours
plt.subplot(1, 3, 3)
plt.contour(A_mesh, B_mesh, loss_grid, levels=20, alpha=0.7, cmap='viridis')
plt.plot(a_path, b_path, 'ro-', markersize=3, linewidth=2, label='GD Path')
plt.scatter(a_path[0], b_path[0], color='green', s=100, label='Start', zorder=5)
plt.scatter(a_path[-1], b_path[-1], color='red', s=100, label='End', zorder=5)
plt.scatter(a_true, b_true, color='blue', s=100, label='True', zorder=5)
plt.xlabel('a (slope)')
plt.ylabel('b (intercept)')
plt.legend()
plt.title('Optimization Path')
plt.tight_layout()
plt.show()
```

## Learning Rate Experiments

```python
# Test different learning rates
learning_rates = [0.01, 0.1, 0.5, 1.0]
results = {}

plt.figure(figsize=(12, 8))

for i, lr in enumerate(learning_rates):
    print(f"\n📊 Testing learning rate = {lr}")
    try:
        a_test, b_test, hist_test = train_gradient_descent(x_train, y_train, 
                                                          learning_rate=lr, max_steps=200)
        results[lr] = hist_test
        
        # Plot convergence
        loss_history = [h['loss'] for h in hist_test]
        plt.subplot(2, 2, i+1)
        plt.plot(loss_history, linewidth=2)
        plt.title(f'Learning Rate = {lr}')
        plt.xlabel('Step')
        plt.ylabel('Loss')
        plt.yscale('log')
        
        final_loss = loss_history[-1]
        print(f"   Final loss: {final_loss:.6f} ({len(hist_test)} steps)")
        
    except Exception as e:
        print(f"   ❌ Failed: {e}")

plt.tight_layout()
plt.show()
```

**Ask students:** *"What happens with learning rate too high? Too low? What's the sweet spot?"*

---

# 90–110 min: Variants & Performance Comparison

**Goal:** Show mini-batch SGD and compare all approaches

## Mini-Batch Stochastic Gradient Descent

```python
def train_mini_batch_sgd(x, y, batch_size=16, learning_rate=0.1, max_steps=500):
    """Train using mini-batch stochastic gradient descent"""
    
    n = len(x)
    a, b = 0.0, 0.0
    history = []
    
    for step in range(max_steps):
        # Randomly sample a mini-batch
        batch_indices = np.random.choice(n, size=batch_size, replace=False)
        x_batch = x[batch_indices]
        y_batch = y[batch_indices]
        
        # Compute gradients on mini-batch
        grad_a, grad_b = compute_gradients(a, b, x_batch, y_batch)
        
        # Update parameters
        a = a - learning_rate * grad_a
        b = b - learning_rate * grad_b
        
        # Record full dataset loss (for comparison)
        if step % 50 == 0:
            full_loss = mse_loss(a, b, x, y)
            history.append({'step': step, 'a': a, 'b': b, 'loss': full_loss})
            if step % 100 == 0:
                print(f"Step {step:3d}: a = {a:6.3f}, b = {b:6.3f}, loss = {full_loss:.6f}")
    
    return a, b, history

# Train with SGD
print("🔄 Training with Mini-Batch SGD:")
a_sgd, b_sgd, sgd_history = train_mini_batch_sgd(x_train, y_train, batch_size=16)

print(f"\n🎯 SGD RESULTS:")
print(f"   Final (a, b): ({a_sgd:.3f}, {b_sgd:.3f})")
print(f"   Train loss: {mse_loss(a_sgd, b_sgd, x_train, y_train):.6f}")
print(f"   Test loss: {mse_loss(a_sgd, b_sgd, x_test, y_test):.6f}")
```

## Performance Comparison

```python
# Compare all methods
methods = {
    'True Parameters': (a_true, b_true),
    'Grid Search': (a_best, b_best),
    'Gradient Descent': (a_gd, b_gd),
    'Mini-Batch SGD': (a_sgd, b_sgd)
}

print("📊 FINAL COMPARISON:")
print("-" * 60)
print(f"{'Method':<20} {'a':<8} {'b':<8} {'Train Loss':<12} {'Test Loss':<12}")
print("-" * 60)

for name, (a, b) in methods.items():
    train_loss = mse_loss(a, b, x_train, y_train)
    test_loss = mse_loss(a, b, x_test, y_test)
    print(f"{name:<20} {a:8.3f} {b:8.3f} {train_loss:12.6f} {test_loss:12.6f}")

print("-" * 60)
```

## Visual Comparison

```python
plt.figure(figsize=(15, 5))

# All regression lines
plt.subplot(1, 3, 1)
x_line = np.linspace(-2, 2, 100)
plt.scatter(x_train, y_train, alpha=0.6, color='gray', label='Training Data')

colors = ['blue', 'red', 'green', 'orange']
for (name, (a, b)), color in zip(methods.items(), colors):
    y_line = predict(a, b, x_line)
    plt.plot(x_line, y_line, color=color, linewidth=2, label=f'{name}')

plt.legend()
plt.title('All Model Fits')
plt.xlabel('x')
plt.ylabel('y')

# Parameter space comparison
plt.subplot(1, 3, 2)
plt.contour(A_mesh, B_mesh, loss_grid, levels=15, alpha=0.7, cmap='viridis')
for (name, (a, b)), color in zip(methods.items(), colors):
    plt.scatter(a, b, color=color, s=100, label=name, zorder=5)
plt.xlabel('a (slope)')
plt.ylabel('b (intercept)')
plt.legend()
plt.title('Parameter Space')

# Loss comparison
plt.subplot(1, 3, 3)
method_names = list(methods.keys())[1:]  # Skip true parameters
train_losses = [mse_loss(methods[name][0], methods[name][1], x_train, y_train) 
                for name in method_names]
test_losses = [mse_loss(methods[name][0], methods[name][1], x_test, y_test) 
               for name in method_names]

x_pos = np.arange(len(method_names))
plt.bar(x_pos - 0.2, train_losses, 0.4, label='Train Loss', alpha=0.8)
plt.bar(x_pos + 0.2, test_losses, 0.4, label='Test Loss', alpha=0.8)
plt.xticks(x_pos, method_names, rotation=45)
plt.ylabel('MSE Loss')
plt.legend()
plt.title('Loss Comparison')
plt.tight_layout()
plt.show()
```

---

# 110–120 min: Wrap-up & Neural Network Connections

**Goal:** Connect today's concepts to upcoming deep learning topics

## Checklist - What You've Mastered

```python
print("=== TODAY'S OPTIMIZATION SKILLS ✅ ===")
print("✓ Brute force search - understand the baseline approach")
print("✓ Loss landscapes - visualize optimization as walking downhill")  
print("✓ Gradient computation - mathematical foundation of all ML")
print("✓ Gradient descent - the core algorithm behind neural networks")
print("✓ Learning rates - the most important hyperparameter to tune")
print("✓ Mini-batch SGD - bridge to deep learning optimization")
```

## Connect Forward to Neural Networks

**Next week's preview:**

```python
# What we learned today scales directly to neural networks!
print("\n🧠 NEURAL NETWORK CONNECTION:")
print("📈 Linear regression:     y = ax + b")
print("🔗 Neural network:        y = σ(W₂σ(W₁x + b₁) + b₂)")
print("⚡ Same optimization:      Gradient descent on W₁, W₂, b₁, b₂")
print("📊 Same loss functions:   MSE, cross-entropy, etc.")
print("🎯 Same goal:             Find parameters that minimize loss")
print("\nThe only difference? More parameters and more complex gradients!")
```

## Key Insights for Deep Learning

- **Scalability:** Grid search → impossible, Gradient descent → essential
- **Loss landscapes:** Neural networks have the same "hills and valleys"
- **Learning rates:** Even more critical with millions of parameters
- **Mini-batches:** Standard practice for large datasets
- **Convergence:** Same principles, just more complex optimization

## Quick Quiz (2 minutes)

**Challenge questions for students:**
1. Why does gradient descent scale to millions of parameters but grid search doesn't?
2. What happens if the learning rate is too high?
3. How does the gradient tell us which direction to move?

## Optional Advanced Topics

For students who want to explore further:
- **Momentum and Adam optimizers** - Advanced versions of gradient descent
- **Automatic differentiation** - How frameworks like PyTorch compute gradients
- **Second-order methods** - Newton's method and beyond

**Remember:** *Today's linear regression is tomorrow's neural network foundation!*