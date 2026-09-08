---
title: "CA.05: Transformer Architecture Fundamentals"
description: "Understanding and implementing the core components of transformer architecture"
module: "Module 4"
points: 3
estimated_hours: 2
difficulty: "Intermediate-Advanced"
---

## Assignment Overview

This comprehensive coding assignment introduces you to **transformer architectures**, the revolutionary neural networks that power modern AI systems like ChatGPT, BERT, and GPT-4. You'll build a transformer from the ground up, implementing core components like self-attention, multi-head attention, and position embeddings. The assignment concludes with training a mini-transformer on a text classification task to understand how these powerful models learn from sequential data.

**Points:** 3  
**Estimated Time:** 2 hours  
**Difficulty:** Intermediate-Advanced

## Learning Goals

By completing this assignment, you will:

1. **Understand transformer architecture** and why it revolutionized natural language processing
2. **Implement tokenization and embeddings** for converting text to numerical representations
3. **Master the attention mechanism** including self-attention and multi-head attention
4. **Build transformer components** including layer normalization and feed-forward networks
5. **Train a complete mini-transformer** on a real text classification task
6. **Analyze transformer capabilities** and compare with previous architectures (RNNs/CNNs)
7. **Reflect critically** on the impact and ethics of large language models

## Assignment Structure

This assignment is divided into six progressive parts, designed to build your understanding from basic concepts to a working transformer:

### Part 1: Understanding Transformers (20 minutes)
- Learn what problems transformers solve (sequence modeling without recurrence)
- Understand the key innovation: attention mechanism
- Explore high-level architecture overview
- Discover why position embeddings are necessary

### Part 2: Tokenization & Embeddings (20 minutes)
- Implement text tokenization strategies
- Build token embedding layers
- Create positional embeddings (sinusoidal encoding)
- Combine embeddings into unified representation

### Part 3: Self-Attention Mechanism (25 minutes)
- Understand Query, Key, Value matrix intuition
- Implement scaled dot-product attention from scratch
- Build multi-head attention mechanism
- Visualize attention patterns to understand model focus

### Part 4: Transformer Block Components (20 minutes)
- Implement layer normalization for stable training
- Build add & norm residual connections
- Create feed-forward network layers
- Assemble complete transformer block

### Part 5: Mini Transformer Implementation (25 minutes)
- Combine all components into working transformer
- Apply to sentiment analysis classification task
- Train on real text data with proper evaluation
- Analyze learning curves and attention patterns

### Part 6: Critical Analysis & Applications (10 minutes)
- Compare transformers with RNNs and CNNs
- Explore real-world applications (GPT, BERT, T5)
- Discuss computational complexity and scaling
- Address ethics, bias, and societal implications

## Technical Requirements

### Software Requirements
- Python 3.11+
- Jupyter Notebook or Google Colab
- Required libraries: `torch`, `numpy`, `matplotlib`, `seaborn`, `pandas`, `scikit-learn`, `tqdm`
- Optional: `transformers` (for comparison), `tensorboard` (for visualization)

### Dataset
You will work with a **simplified sentiment analysis dataset**, which includes:
- **Text:** Movie reviews expressing positive or negative sentiment
- **Labels:** Binary classification (positive/negative)
- **Size:** ~5,000 samples for manageable training time
- **Context:** Real text data requiring sequence understanding

### Hardware Considerations
- **Memory:** At least 8GB RAM recommended for transformer training
- **Time:** Training may take 10-20 minutes depending on hardware
- **GPU:** Optional but recommended for faster experimentation

## What You Need to Turn In

**Submit one completed Jupyter notebook (`ca5.ipynb`) and .PDF that includes:**
- All code cells executed and showing output
- Complete transformer implementation with working components
- Sentiment analysis training results with evaluation metrics
- Attention visualization plots showing model interpretability
- Written responses to all reflection questions
- Performance analysis comparing different configurations

## Grading Rubric (3 Points Total)

| Points | Performance Level | Description |
|--------|------------------|-------------|
| **3 - Excellent** | Assignment Fully Complete | All transformer components implemented correctly, demonstrates deep understanding of attention mechanisms, successful training with meaningful results, thoughtful analysis of transformer capabilities and limitations, code runs without errors and produces insightful visualizations |
| **2 - Proficient** | Assignment Mostly Complete | Most components implemented adequately with minor gaps, shows good understanding of core concepts, training mostly successful with some analysis, code mostly functional with minor issues |
| **1 - Developing** | Assignment Partially Complete | Some components incomplete or incorrect, shows basic understanding but struggles with complex concepts, limited training success or analysis, significant code issues |
| **0 - Incomplete** | Assignment Not Submitted | No submission or assignment shows no meaningful effort toward completion |

## Step-by-Step Instructions

### Getting Started
1. Download the `ca5.ipynb` notebook from the course materials
2. Set up your Python environment with required libraries
3. Ensure you have access to sufficient memory for transformer training
4. Begin with Part 1: Understanding Transformers

### Part 1: Understanding Transformers
1. **Study the attention revolution**
   - Learn how transformers replaced RNNs for sequence modeling
   - Understand the "Attention Is All You Need" breakthrough
   - Compare sequential vs. parallel processing advantages

2. **Explore transformer architecture**
   ```python
   # TODO: Analyze transformer components
   # - Multi-head self-attention layers
   # - Position-wise feed-forward networks
   # - Residual connections and layer normalization
   # - Positional encoding for sequence information
   ```

### Part 2: Tokenization & Embeddings
1. **Implement text tokenization**
   ```python
   class SimpleTokenizer:
       def __init__(self, vocab_size=5000):
           # TODO: Build vocabulary from training text
           # Create word-to-index mappings
           
       def tokenize(self, text):
           # TODO: Convert text to token indices
           # Handle unknown words with special tokens
   ```

2. **Build embedding layers**
   ```python
   class TransformerEmbeddings(nn.Module):
       def __init__(self, vocab_size, d_model, max_length):
           # TODO: Token embedding layer
           # TODO: Positional embedding layer
           
       def forward(self, input_ids):
           # TODO: Combine token and position embeddings
   ```

### Part 3: Self-Attention Mechanism
1. **Implement scaled dot-product attention**
   ```python
   def scaled_dot_product_attention(Q, K, V, mask=None):
       # TODO: Compute attention scores: QK^T / sqrt(d_k)
       # TODO: Apply softmax to get attention weights
       # TODO: Apply weights to values: Attention(Q,K,V) = softmax(QK^T/√d_k)V
   ```

2. **Build multi-head attention**
   ```python
   class MultiHeadAttention(nn.Module):
       def __init__(self, d_model, num_heads):
           # TODO: Linear projections for Q, K, V
           # TODO: Output projection layer
           
       def forward(self, x):
           # TODO: Split into multiple heads
           # TODO: Apply attention to each head
           # TODO: Concatenate and project outputs
   ```

### Part 4: Transformer Block Components
1. **Implement transformer block**
   ```python
   class TransformerBlock(nn.Module):
       def __init__(self, d_model, num_heads, d_ff, dropout=0.1):
           # TODO: Multi-head attention layer
           # TODO: Feed-forward network
           # TODO: Layer normalization layers
           # TODO: Dropout for regularization
           
       def forward(self, x):
           # TODO: Attention with residual connection
           # TODO: Feed-forward with residual connection
   ```

### Part 5: Complete Transformer
1. **Assemble full transformer**
   ```python
   class MiniTransformer(nn.Module):
       def __init__(self, vocab_size, d_model, num_heads, num_layers, num_classes):
           # TODO: Embedding layer
           # TODO: Stack of transformer blocks
           # TODO: Classification head
           
       def forward(self, input_ids):
           # TODO: Embed inputs
           # TODO: Pass through transformer blocks
           # TODO: Global pooling and classification
   ```

2. **Train on sentiment analysis**
   - Load and preprocess movie review dataset
   - Train transformer with appropriate hyperparameters
   - Monitor training progress and validate performance
   - Visualize attention patterns to understand model behavior

### Part 6: Critical Analysis
Answer all written questions thoroughly, demonstrating your understanding of:
- How transformers revolutionized sequence modeling
- Advantages of attention mechanisms over recurrent approaches
- Computational trade-offs and scaling considerations
- Real-world applications and societal implications
- Future directions in transformer research

## Tips for Success

### Programming Tips
- **Start with simple versions** - Implement single-head attention before multi-head
- **Debug with small examples** - Test attention with 2-3 word sequences first
- **Visualize attention weights** - Understanding what the model attends to is crucial
- **Monitor training carefully** - Transformers can be sensitive to hyperparameters

### Mathematical Tips
- **Understand matrix dimensions** - Attention involves many matrix multiplications
- **Review dot products** - Attention scores are essentially similarity measures
- **Check attention weights** - They should sum to 1 after softmax
- **Verify positional encodings** - Different positions should have different encodings

### Transformer-Specific Tips
- **Use appropriate learning rates** - Transformers often need careful scheduling
- **Apply gradient clipping** - Prevents exploding gradients during training
- **Implement masking correctly** - For padding and causal attention
- **Scale embeddings properly** - Often scaled by sqrt(d_model)

### Common Pitfalls to Avoid
- **Attention mask errors** - Incorrect masking can break training
- **Dimension mismatches** - Multi-head attention involves complex reshaping
- **Vanishing gradients** - Use proper initialization and layer normalization
- **Memory issues** - Attention has quadratic complexity in sequence length
- **Positional encoding bugs** - Wrong encoding can destroy position information

## Extension Opportunities

For students who finish early or want extra challenge:

1. **Advanced Architectures** - Implement encoder-decoder transformer
2. **Different Tasks** - Try machine translation or text generation
3. **Optimization Techniques** - Add techniques like gradient clipping, learning rate scheduling
4. **Attention Analysis** - Deep dive into what different heads learn
5. **Comparison Studies** - Compare with LSTM/GRU on same tasks
6. **Modern Variants** - Explore RoPE, ALiBi, or other position encodings

## Resources

### Transformer Fundamentals
- "Attention Is All You Need" - Original transformer paper
- "The Illustrated Transformer" - Visual explanation by Jay Alammar
- 3Blue1Brown: Attention in Neural Networks
- Harvard NLP: The Annotated Transformer

### Implementation Guides
- PyTorch transformer tutorials and documentation
- Hugging Face transformers library examples
- "Building Transformers from Scratch" tutorials

### Mathematical Background
- Linear algebra review: matrix multiplication, eigenvalues
- Probability theory: softmax, attention as probability distribution
- Information theory: understanding attention as information routing

### Applications and Ethics
- GPT, BERT, T5 architecture papers
- "On the Dangers of Stochastic Parrots" - Ethics of large language models
- "Language Models are Few-Shot Learners" - GPT-3 capabilities

## Submission Instructions

1. **Complete all TODO sections** in the notebook
2. **Answer all written questions** with thoughtful, detailed responses
3. **Ensure notebook runs completely** without errors (test in clean environment)
4. **Include attention visualizations** showing what your model learned
5. **Save as PDF** in addition to .ipynb format
6. **Upload both files** to the course management system
7. **Include your name and student ID** in the notebook header

## Academic Integrity

This is an individual assignment. While you may discuss concepts with classmates, all code and written work must be your own. Properly cite any external resources used beyond the course materials. Do not share your implementation details or results with other students.

## Getting Help

- **Office Hours:** Bring specific questions about attention mechanisms or implementation challenges
- **Discussion Forum:** Post conceptual questions (without code solutions)
- **Documentation:** PyTorch transformer docs and tutorials are your friend
- **Research Papers:** Referenced papers provide mathematical details and intuition

---

**Ready to revolutionize your understanding of modern AI?** This assignment will give you hands-on experience with the architecture powering ChatGPT, BERT, and the current AI revolution. Enjoy building the future of artificial intelligence!