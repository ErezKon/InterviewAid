# 1314. Matrix Block Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/matrix-block-sum](https://leetcode.com/problems/matrix-block-sum)
**Companies:** Google, Visa

---

## 1. Problem Description

For each cell, compute the sum of all elements within a `k`-radius block.

---

## 2. Approach: 2D Prefix Sum — O(m·n) ✅

```
// Build 2D prefix sum matrix
// For each cell (i,j), query the rectangle sum:
//   [max(0,i-k), max(0,j-k)] to [min(m-1,i+k), min(n-1,j+k)]
```

| Time | Space |
|------|-------|
| O(m · n) | O(m · n) |

---

## 3. Key Takeaway

> Classic 2D prefix sum application. Build prefix once, then each block sum query is O(1) using inclusion-exclusion.
