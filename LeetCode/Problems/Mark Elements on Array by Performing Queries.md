# 3080. Mark Elements on Array by Performing Queries

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mark-elements-on-array-by-performing-queries](https://leetcode.com/problems/mark-elements-on-array-by-performing-queries)
**Companies:** Barclays, Samsung

---

## 1. Problem Description

Process queries that mark an index and then mark `k` smallest unmarked elements. After each query, return the sum of unmarked elements.

---

## 2. Approach: Min-Heap + Tracking — O(n log n) ✅

```
// Sort by value, break ties by index
// Use min-heap or sorted order to efficiently find smallest unmarked
// Track total sum, subtract when marking
```

| Time | Space |
|------|-------|
| O((n + q·k) log n) | O(n) |

---

## 3. Key Takeaway

> Pre-sort elements by value. Use a pointer to track the next smallest unmarked element. Maintain running sum and subtract marked elements.
