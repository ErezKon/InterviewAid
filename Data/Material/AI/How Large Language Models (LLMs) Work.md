## 2. How Large Language Models (LLMs) Work

### 2.1 Core Concept

An LLM is a deep neural network — specifically a **Transformer** — trained to
predict the next token in a sequence. Despite this seemingly simple objective,
scale (billions of parameters + massive data) produces emergent capabilities
like reasoning, translation, code generation, and summarization.

### 2.2 Architecture — The Transformer

The Transformer architecture (Vaswani et al., 2017, "Attention Is All You Need")
is the foundation of all modern LLMs.

```mermaid
flowchart TD
    Input["Input Text"]
    Tokenizer[Tokenizer\n"Hello world" → [15496, 995]]
    Embedding["Embedding Layer\nToken IDs → dense vectors (e.g., 4096-dim)"]

    subgraph Transformer["Transformer Blocks (×N)"]
        Attention["Multi-Head Self-Attention\n\"Which tokens should I attend to?\""]
        FFN["Feed-Forward Network\nNon-linear transformation"]
        Norm["Layer Norm + Residual Connection"]
    end

    Linear["Linear + Softmax\nLogits over vocabulary (~100k tokens)"]
    Output["Next Token Prediction\n(highest probability or sampled)"]

    Input --> Tokenizer --> Embedding --> Attention --> FFN --> Norm
    Norm --> Attention
    Norm --> Linear --> Output
```

### 2.3 Key Concepts

#### Tokenization
Text is split into sub-word units called **tokens**.

```
"unhappiness" → ["un", "happiness"]
"ChatGPT"    → ["Chat", "G", "PT"]
```

Common tokenizers: BPE (Byte-Pair Encoding), SentencePiece, tiktoken.

#### Self-Attention Mechanism
Every token computes **attention scores** against every other token, enabling the
model to understand relationships regardless of distance in the text.

```
Query (Q), Key (K), Value (V) matrices:

Attention(Q, K, V) = softmax(Q × Kᵀ / √d_k) × V
```

This is what allows the model to understand that in "The cat sat on the mat
because **it** was tired," the word "it" refers to "cat."

#### Training Phases

| Phase | What happens | Data |
|---|---|---|
| **Pre-training** | Next-token prediction on massive corpus | Trillions of tokens from the internet |
| **Supervised Fine-Tuning (SFT)** | Train on curated prompt-response pairs | High-quality human-written examples |
| **RLHF / RLAIF** | Reinforce preferred responses using human or AI feedback | Comparison / preference data |

#### Inference Parameters

| Parameter | Effect |
|---|---|
| **Temperature** | Controls randomness. 0 = deterministic, 1+ = creative |
| **Top-p (nucleus sampling)** | Only sample from tokens comprising the top p% of probability mass |
| **Top-k** | Only sample from the k most likely tokens |
| **Max tokens** | Hard cap on output length |
| **Stop sequences** | Strings that signal the model to stop generating |

### Top-k vs Top-p Sampling

#### Top-k: Fixed Number of Candidates

Top-k keeps exactly the **k most probable tokens**, regardless of their actual probabilities.

```
Example: top_k = 3

Token        Probability
─────────    ───────────
"Paris"      0.50   ✅ (rank 1)
"London"     0.25   ✅ (rank 2)
"Berlin"     0.10   ✅ (rank 3)
"Madrid"     0.05   ❌ (rank 4 — cut off)
"Rome"       0.04   ❌
"Tokyo"      0.03   ❌
...others    0.03   ❌

→ Model samples from {"Paris", "London", "Berlin"} only
→ Always exactly 3 candidates, no matter what
```

**The problem with top-k:** It's blind to the probability distribution.

```
SCENARIO A: Model is confident          SCENARIO B: Model is uncertain
top_k = 3                               top_k = 3

"Paris"   0.90  ✅                       "Paris"   0.12  ✅
"London"  0.04  ✅ ← noise, shouldn't    "London"  0.11  ✅
"Berlin"  0.02  ✅ ← be here             "Berlin"  0.10  ✅
"Madrid"  0.01  ❌                       "Madrid"  0.09  ❌ ← should be included
"Rome"    0.01  ❌                       "Rome"    0.08  ❌ ← should be included
                                         "Tokyo"   0.08  ❌ ← should be included

In A: top-k=3 includes junk tokens (too many candidates)
In B: top-k=3 excludes valid tokens (too few candidates)
```

---

#### Top-p (Nucleus Sampling): Dynamic Number Based on Cumulative Probability

Top-p keeps the **smallest set of tokens whose cumulative probability reaches p**, so the number of candidates **adapts** to the model's confidence.

```
Example: top_p = 0.90

Token        Probability   Cumulative
─────────    ───────────   ──────────
"Paris"      0.50          0.50   ✅ (still under 0.90)
"London"     0.25          0.75   ✅ (still under 0.90)
"Berlin"     0.10          0.85   ✅ (still under 0.90)
"Madrid"     0.05          0.90   ✅ (just hit 0.90 — include, then stop)
"Rome"       0.04          0.94   ❌ (over threshold)
"Tokyo"      0.03          0.97   ❌
...

→ Model samples from {"Paris", "London", "Berlin", "Madrid"}
→ 4 candidates this time — but could be 2 or 20 depending on distribution
```

**Top-p adapts automatically:**

```
SCENARIO A: Model is confident          SCENARIO B: Model is uncertain
top_p = 0.90                            top_p = 0.90

"Paris"   0.90  ✅  cum=0.90 STOP       "Paris"   0.12  ✅  cum=0.12
                                         "London"  0.11  ✅  cum=0.23
→ Only 1 candidate!                      "Berlin"  0.10  ✅  cum=0.33
   (Model is sure, so let it be sure)    "Madrid"  0.09  ✅  cum=0.42
                                         "Rome"    0.08  ✅  cum=0.50
                                         "Tokyo"   0.08  ✅  cum=0.58
                                         "Oslo"    0.07  ✅  cum=0.65
                                         "Cairo"   0.07  ✅  cum=0.72
                                         "Lima"    0.06  ✅  cum=0.78
                                         "Seoul"   0.06  ✅  cum=0.84
                                         "Delhi"   0.06  ✅  cum=0.90 STOP

                                         → 11 candidates!
                                            (Model is unsure, so explore more)
```

---

#### Side-by-Side Summary

| Dimension | Top-k | Top-p |
|---|---|---|
| **What it controls** | Number of candidate tokens | Probability mass of candidates |
| **Fixed or dynamic?** | Fixed count (always k tokens) | Dynamic count (adapts to confidence) |
| **When model is confident** | Still picks k tokens (may include noise) | Narrows to very few tokens |
| **When model is uncertain** | Still only k tokens (may miss good options) | Expands to many tokens |
| **Typical values** | k = 10–100 | p = 0.85–0.95 |
| **Analogy** | "Pick the top 5 students" | "Pick enough students to cover 90% of the total score" |

#### In Practice

Most modern APIs **default to top-p** (nucleus sampling) because it adapts better. Some APIs let you combine them — in that case, both filters are applied and the **more restrictive** one wins:

```
top_k = 50, top_p = 0.90

Step 1: Take top-50 tokens
Step 2: From those 50, keep only enough to reach 90% cumulative probability
→ You might end up with 5 tokens if the distribution is concentrated
```

**Rule of thumb:**
- Use **top-p** for most tasks (set between 0.9–0.95)
- Use **top-k** when you want a hard cap on candidate diversity
- Lower values → more focused/deterministic; higher values → more creative/random

### 2.4 Limitations

- **No true understanding** — statistical pattern matching, not comprehension
- **Hallucinations** — confidently produces plausible but incorrect information
- **Knowledge cutoff** — training data has a fixed date
- **Context window limits** — can only process a finite number of tokens at once
- **Expensive** — training costs millions of dollars; inference costs scale with usage
