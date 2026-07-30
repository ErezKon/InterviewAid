# 2851. String Transformation

**Difficulty:** 🔴 Hard
**Companies:** Google, Mathworks, Snowflake

---

## Problem Description
Given two strings `s` and `t` of equal length consisting of lowercase letters, you may repeatedly rotate `s` (move the first character to the end) and apply a set of allowed operations to transform `s` into `t`. Determine the number of distinct sequences of operations that convert `s` to `t` modulo 10⁹+7.

## Examples
- **Input:** `s = "abc", t = "bca"` **Output:** `2` // Two ways: rotate once then match, or match then rotate.
- **Input:** `s = "aaaa", t = "aaaa"` **Output:** `1` // Already equal; only the empty sequence.

## Approach
**Algorithm:** Combine KMP to find all rotation matches and matrix exponentiation for counting sequences.
- **Insight 1:** All rotations of `s` that equal `t` correspond to occurrences of `t` in `s+s` using KMP pattern matching.
- **Insight 2:** The transformation process can be modeled as a linear recurrence; using matrix exponentiation we compute the number of ways for a given number of steps.

### Pseudocode
```text
FUNCTION countTransformations(s, t):
    n ← LENGTH(s)
    // Step 1: Find rotation offsets where s rotated equals t
    pattern ← t
    text ← s + s
    offsets ← KMP_SEARCH(text, pattern)   // returns start indices < n
    // Step 2: Build transition matrix M where M[i][j] = number of ways to go from state i to j in one step
    // (states represent rotation offsets)
    M ← BUILD_TRANSITION_MATRIX(n)
    // Step 3: Raise M to the power of k (number of allowed steps) using fast exponentiation
    // If no step limit is given, compute total ways using combinatorial formula based on offsets.
    result ← 0
    FOR offset IN offsets:
        result ← result + MATRIX_POWER_SUM(M, offset)
    RETURN result MOD 1_000_000_007
```

## Walkthrough
For `s = "abc"`, `t = "bca"`:
1. `s+s = "abcabc"`. KMP finds match at index 1 → rotation offset 1.
2. Transition matrix for 3 rotations allows moving clockwise or staying.
3. After exponentiation, sum of paths that end at offset 1 yields 2 distinct sequences.

## Complexity Analysis
- **Time:** O(n) for KMP search plus O(log k · n³) for matrix exponentiation (n is string length, k is step count).
- **Space:** O(n²) for the transition matrix.

## Follow-Up Questions
- How would the solution change if rotations could be performed in both directions?
- Can the counting be done without explicit matrix exponentiation using combinatorial formulas?
- What is the complexity if the alphabet size is large (e.g., Unicode)?

## Key Takeaway
KMP efficiently discovers matching rotations, and matrix exponentiation counts transformation sequences by treating rotations as states in a linear recurrence.
