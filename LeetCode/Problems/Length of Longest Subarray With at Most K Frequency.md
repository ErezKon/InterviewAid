# 2958. Length of Longest Subarray With at Most K Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency](https://leetcode.com/problems/length-of-longest-subarray-with-at-most-k-frequency)
**Companies:** Amazon, Citadel, Google, Makemytrip

---

## 1. Problem Description

Find the longest subarray where no element appears more than `k` times.

---

## 2. Approach: Sliding Window — O(n) ✅

```
FUNCTION maxSubarrayLength(nums, k):
    count = Counter(); left = 0; maxLen = 0
    FOR right ← 0 TO len(nums) - 1:
        count[nums[right]] += 1
        WHILE count[nums[right]] > k:
            count[nums[left]] -= 1; left += 1
        maxLen = MAX(maxLen, right - left + 1)
    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Standard sliding window with frequency counter. Shrink left when any element exceeds frequency `k`.
