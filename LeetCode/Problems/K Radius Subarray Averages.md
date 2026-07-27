# 2090. K Radius Subarray Averages

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-radius-subarray-averages](https://leetcode.com/problems/k-radius-subarray-averages)
**Companies:** Bloomberg, Duolingo, Google, Meta

---

## 1. Problem Description

For each index `i`, compute the average of elements in `nums[i-k..i+k]`. If the window goes out of bounds, the answer is -1.

---

## 2. Approach: Sliding Window — O(n) ✅

```
FUNCTION getAverages(nums, k):
    n = len(nums); result = [-1] * n
    IF 2 * k + 1 > n: RETURN result
    windowSum = SUM(nums[:2*k+1])
    result[k] = windowSum // (2*k+1)
    FOR i ← k + 1 TO n - k - 1:
        windowSum += nums[i+k] - nums[i-k-1]
        result[i] = windowSum // (2*k+1)
    RETURN result
```

| Time | Space |
|------|-------|
| O(n) | O(n) output |

---

## 3. Key Takeaway

> Fixed-size sliding window of `2k+1` elements. Slide by adding the new right element and removing the old left. Classic prefix sum / sliding window pattern.
