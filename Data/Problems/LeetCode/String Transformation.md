# 2851. String Transformation

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/string-transformation](https://leetcode.com/problems/string-transformation)
**Companies:** Google, Mathworks, Snowflake

---

## Problem Description

You are given two strings `s` and `t` of equal length `n`. You can perform the following operation on the string `s`:

- Remove a **suffix** of `s` of length `l` where `0 < l < n` and append it at the start of `s`.
  For example, let `s = 'abcd'` then in one operation you can remove the suffix `'cd'` and append it in front of `s` making `s = 'cdab'`.

You are also given an integer `k`. Return *the number of ways in which* `s` *can be transformed into* `t` *in **exactly*** `k` *operations.*

Since the answer can be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `2 <= s.length <= 5 * 10^5`
- `1 <= k <= 10^15`
- `s.length == t.length`
- `s` and `t` consist of only lowercase English alphabets.

## Examples

**Example 1:**
```
Input: s = "abcd", t = "cdab", k = 2
Output: 2
Explanation:
First way:
In first operation, choose suffix from index = 3, so resulting s = "dabc".
In second operation, choose suffix from index = 3, so resulting s = "cdab".

Second way:
In first operation, choose suffix from index = 1, so resulting s = "bcda".
In second operation, choose suffix from index = 1, so resulting s = "cdab".
```

**Example 2:**
```
Input: s = "ababab", t = "ababab", k = 1
Output: 2
Explanation:
First way:
Choose suffix from index = 2, so resulting s = "ababab".

Second way:
Choose suffix from index = 4, so resulting s = "ababab".
```

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
