# 487. Max Consecutive Ones II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/max-consecutive-ones-ii](https://leetcode.com/problems/max-consecutive-ones-ii)
**Companies:** Bloomberg, Google, Meta

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION findMaxConsecutiveOnes(nums):
    left = 0
    zeros = 0
    maxLen = 0

    FOR right ← 0 TO n - 1:
        IF nums[right] == 0: zeros += 1
        WHILE zeros > 1:
            IF nums[left] == 0: zeros -= 1
            left += 1
        maxLen = MAX(maxLen, right - left + 1)

    RETURN maxLen
```

Same as Max Consecutive Ones III (#1004) with k=1. Follow-up: stream (can't go back) → track previous zero position.
