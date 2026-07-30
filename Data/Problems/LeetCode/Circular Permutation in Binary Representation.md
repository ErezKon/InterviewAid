# 1238. Circular Permutation in Binary Representation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/circular-permutation-in-binary-representation](https://leetcode.com/problems/circular-permutation-in-binary-representation)
**Companies:** Walmart Labs

---

## 1. Problem Description

Given an integer `n` (the number of bits) and a starting integer `start`, return a permutation of all `2^n` integers in the range `[0, 2^n - 1]` such that each pair of consecutive numbers (including the last and first) differs by exactly one bit. The sequence must begin with `start`. Constraints: `1 ≤ n ≤ 16`, `0 ≤ start < 2^n`.

---

## 2. Key Insight

> Standard Gray code for index `i` is `i ^ (i >> 1)`. XOR‑ing every Gray code value with `start` rotates the sequence so it begins at `start` while preserving the one‑bit difference property.

---

## 3. Approach: Gray Code + XOR Shift — O(2^n) ✅

```text
FUNCTION circularPermutation(n, start):
    SET result ← []
    FOR i ← 0 TO (1 << n) - 1:
        // Gray code for i
        SET gray ← i XOR (i >> 1)
        // Shift start point
        APPEND (gray XOR start) TO result
    RETURN result
```

| Time | Space |
|------|-------|
| O(2^n) | O(2^n) |

---

## Examples

| Input | Output |
|-------|--------|
| `n = 2, start = 1` | `[1,0,2,3]` |
| `n = 3, start = 2` | `[2,3,1,0,4,5,7,6]` |

---

## Walkthrough

1. **First example** (`n=2`): generate Gray codes `[0,1,3,2]`.
2. XOR each with `start=1` → `[1,0,2,3]`.
3. Verify adjacent pairs differ by one bit: `1↔0` (bit 0), `0↔2` (bit 1), `2↔3` (bit 0), `3↔1` (bit 1) – condition satisfied.

---

## Complexity Analysis

- **Time:** O(2^n) – we iterate over all possible codes.
- **Space:** O(2^n) – storing the resulting permutation.

---

## Follow-Up Questions

- How would you generate the sequence iteratively without storing the entire list?
- Can you adapt the method for a non‑binary Gray code (e.g., ternary)?
- What is the effect of using a different start value on the adjacency property?

---

## Key Takeaway

> Generate standard Gray code and XOR each value with `start` to obtain a circular permutation beginning at any desired integer.
