# 80. Remove Duplicates from Sorted Array II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii](https://leetcode.com/problems/remove-duplicates-from-sorted-array-ii)
**Companies:** Accolite, Amazon, Bloomberg, Freshworks, Google, Meta, Microsoft, Tcs, Tiktok

---

## Approach: Two Pointers — O(n) ✅

```
FUNCTION removeDuplicates(nums):
    IF len(nums) <= 2: RETURN len(nums)
    write = 2

    FOR read ← 2 TO n - 1:
        IF nums[read] != nums[write - 2]:
            nums[write] = nums[read]
            write += 1

    RETURN write
```

Allow at most 2 duplicates. Compare with element 2 positions back in the write array.
