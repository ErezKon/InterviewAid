# 2389. Longest Subsequence With Limited Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/longest-subsequence-with-limited-sum](https://leetcode.com/problems/longest-subsequence-with-limited-sum)
**Companies:** Amazon, Google, Meta, Uber

---

## 1. Problem Description

For each query, find the maximum number of elements from `nums` whose sum ≤ query value.

---

## 2. Approach: Sort + Prefix Sum + Binary Search — O(n log n) ✅

```
FUNCTION answerQueries(nums, queries):
    SORT nums
    prefix = [0]
    FOR num IN nums: prefix.ADD(prefix[-1] + num)
    RETURN [bisect_right(prefix, q) - 1 for q in queries]
```

| Time | Space |
|------|-------|
| O(n log n + q log n) | O(n) |

---

## 3. Key Takeaway

> Greedy: take smallest elements first to maximize count. Sort, prefix sum, then binary search for each query.
