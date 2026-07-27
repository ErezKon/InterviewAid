# 930. Binary Subarrays With Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-subarrays-with-sum](https://leetcode.com/problems/binary-subarrays-with-sum)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION numSubarraysWithSum(nums, goal):
    RETURN atMost(nums, goal) - atMost(nums, goal - 1)

FUNCTION atMost(nums, goal):
    IF goal < 0: RETURN 0
    left = 0; count = 0; s = 0
    FOR right ← 0 TO n - 1:
        s += nums[right]
        WHILE s > goal:
            s -= nums[left]; left += 1
        count += right - left + 1
    RETURN count
```

Exactly K = At Most K - At Most (K-1).
