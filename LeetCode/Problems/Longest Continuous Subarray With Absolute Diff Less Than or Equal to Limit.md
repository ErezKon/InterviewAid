# 1438. Longest Continuous Subarray With Absolute Diff ≤ Limit

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit](https://leetcode.com/problems/longest-continuous-subarray-with-absolute-diff-less-than-or-equal-to-limit)
**Companies:** Amazon, Bloomberg, Capital One, Ebay, Google, Meta, Microsoft, Moloco, Nvidia, Phonepe, Salesforce, Sumologic, Uber, Visa, Yandex

---

## 1. Problem Description

Find the longest contiguous subarray where `max - min ≤ limit`.

---

## 2. Approach: Sliding Window + Two Deques — O(n) ✅

Monotonic deques track the current window's max and min in O(1).

```
FUNCTION longestSubarray(nums, limit):
    maxDeque = deque()    // decreasing
    minDeque = deque()    // increasing
    left = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        WHILE maxDeque AND nums[right] > maxDeque.BACK():
            maxDeque.POP_BACK()
        maxDeque.PUSH_BACK(nums[right])

        WHILE minDeque AND nums[right] < minDeque.BACK():
            minDeque.POP_BACK()
        minDeque.PUSH_BACK(nums[right])

        WHILE maxDeque.FRONT() - minDeque.FRONT() > limit:
            IF maxDeque.FRONT() == nums[left]: maxDeque.POP_FRONT()
            IF minDeque.FRONT() == nums[left]: minDeque.POP_FRONT()
            left += 1

        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## 3. Key Takeaway

> Two monotonic deques (one for max, one for min) enable O(1) range max/min queries within a sliding window. Shrink left when `max - min > limit`.
