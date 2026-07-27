# 1708. Largest Subarray Length K

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/largest-subarray-length-k](https://leetcode.com/problems/largest-subarray-length-k)
**Companies:** Google

---

## 1. Problem Description

Given an array of **distinct** integers and integer `k`, return the lexicographically largest subarray of length `k`.

---

## 2. Approach: Find Max Start — O(n) ✅

Since all elements are distinct, the lexicographically largest subarray starts at the maximum element among valid starting positions.

```
FUNCTION largestSubarray(nums, k):
    maxIdx = 0
    FOR i ← 1 TO n - k:
        IF nums[i] > nums[maxIdx]:
            maxIdx = i
    RETURN nums[maxIdx : maxIdx + k]
```

| Time | Space |
|------|-------|
| O(n) | O(k) output |

---

## 3. Key Takeaway

> With distinct elements, lexicographic order is determined by the first element. Find the max among positions `[0, n-k]` and return the subarray starting there.
