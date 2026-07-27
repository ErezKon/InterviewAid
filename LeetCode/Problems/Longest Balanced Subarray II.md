# 3721. Longest Balanced Subarray II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-balanced-subarray-ii](https://leetcode.com/problems/longest-balanced-subarray-ii)
**Companies:** Amazon, Google

---

## 1. Problem Description

Find the longest subarray where every element appears the same number of times.

---

## 2. Approach: Normalized Frequency State + Hash Map ✅

```
// Track relative frequencies (subtract count of first element)
// Hash the frequency state → first occurrence index
// When same state repeats, the subarray between is balanced
```

| Time | Space |
|------|-------|
| O(n · k) where k = distinct values | O(n) |

---

## 3. Key Takeaway

> Normalize frequency counts by subtracting one reference count. Same normalized state at two indices means the subarray between them is balanced. Classic "prefix state hashing" technique.
