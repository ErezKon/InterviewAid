# 2263. Make Array Non-decreasing or Non-increasing

**Difficulty:** 🔴 Hard
**Companies:** Google, Oracle, Vmware

---

## 1. Problem Description

Find the minimum cost to make the array non-decreasing or non-increasing by changing elements.

---

## 2. Approach: Greedy with Priority Queue — O(n log n) ✅

```
// Slope trick / priority queue approach
// Process elements left to right
// Use max-heap to track median for optimal cost
// Similar to "make array non-decreasing with minimum cost"
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Slope trick / median-based greedy. Push each element, and if it violates monotonicity, pop from the heap and add the cost. Run twice (non-decreasing, non-increasing) and take the minimum.
