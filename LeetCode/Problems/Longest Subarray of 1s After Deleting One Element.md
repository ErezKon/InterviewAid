# 1493. Longest Subarray of 1's After Deleting One Element

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element](https://leetcode.com/problems/longest-subarray-of-1s-after-deleting-one-element)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tcs, Vk, Yandex

---

## 1. Problem Description

Delete exactly one element from a binary array. Return the longest subarray of all 1s.

---

## 2. Approach: Sliding Window — O(n) ✅

Same as Max Consecutive Ones III with k=1, but we must delete exactly one element (so result is windowSize - 1).

```
FUNCTION longestSubarray(nums):
    left = 0
    zeros = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        IF nums[right] == 0: zeros += 1
        WHILE zeros > 1:
            IF nums[left] == 0: zeros -= 1
            left += 1
        maxLen = MAX(maxLen, right - left)    // -1 for the deleted element

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Key Takeaway

> Sliding window allowing at most 1 zero. Answer = `right - left` (not +1) because one element must be deleted.
