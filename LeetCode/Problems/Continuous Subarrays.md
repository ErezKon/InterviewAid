# 2762. Continuous Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/continuous-subarrays](https://leetcode.com/problems/continuous-subarrays)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber

---

## Approach: Sliding Window + Sorted Container — O(n log n) ✅

```
FUNCTION continuousSubarrays(nums):
    from sortedcontainers import SortedList
    sl = SortedList()
    left = 0; count = 0

    FOR right ← 0 TO n - 1:
        sl.ADD(nums[right])
        WHILE sl[-1] - sl[0] > 2:
            sl.REMOVE(nums[left])
            left += 1
        count += right - left + 1

    RETURN count
```

Window is valid if max - min ≤ 2. Use sorted container for O(log n) min/max queries.
