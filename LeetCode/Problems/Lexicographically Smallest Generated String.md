# 3474. Lexicographically Smallest Generated String

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-generated-string](https://leetcode.com/problems/lexicographically-smallest-generated-string)
**Companies:** Amazon, Barclays, Google, Microsoft, Tiktok

---

## 1. Problem Description

Generate the lexicographically smallest string satisfying given generation constraints.

---

## 2. Approach: Greedy + Constraint Propagation ✅

```
// Greedy: assign smallest valid character at each position
// Propagate constraints forward
// Backtrack if contradiction found
```

| Time | Space |
|------|-------|
| Problem-dependent | O(n) |

---

## 3. Key Takeaway

> Build greedily from left to right, choosing the smallest character that satisfies all constraints. Use constraint propagation to prune invalid choices early.
