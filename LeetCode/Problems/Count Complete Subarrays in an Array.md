# 2799. Count Complete Subarrays in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-complete-subarrays-in-an-array](https://leetcode.com/problems/count-complete-subarrays-in-an-array)
**Companies:** Amazon, Google, Meta, Tiktok

---

```
FUNCTION countCompleteSubarrays(nums):
    total = len(SET(nums))
    count = 0; left = 0; window = Counter()
    FOR right ← 0 TO len(nums) - 1:
        window[nums[right]] += 1
        WHILE len(window) == total:
            count += len(nums) - right
            window[nums[left]] -= 1
            IF window[nums[left]] == 0: DEL window[nums[left]]
            left += 1
    RETURN count
```
