# 3454. Separate Squares II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/separate-squares-ii](https://leetcode.com/problems/separate-squares-ii)
**Companies:** Amazon, Google

---

## Problem Description

Same as Separate Squares I but squares can **overlap**. Find a horizontal line that divides the **union area** equally. Requires computing union area below a given y.

---

## Approach

Use **coordinate compression + sweep line** to compute union area below a given y, then binary search on y.

```
FUNCTION separateSquaresII(squares):
    // Binary search on y
    // For each y, sweep line computes union area below y
    // Use segment tree or sorted events for union width at each y-level
```

| Time | Space |
|------|-------|
| O(n² log n · log(range/ε)) or O(n log n) with segment tree | O(n) |

---

## Key Takeaway

> Overlapping areas require **sweep line + segment tree** to compute the union area, then binary search on the dividing line. A classic computational geometry combination.
