# 324. Wiggle Sort II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/wiggle-sort-ii](https://leetcode.com/problems/wiggle-sort-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION wiggleSort(nums):
    sorted_nums = sorted(nums)
    n = len(nums)
    mid = (n - 1) / 2

    // Place smaller half at even indices (reversed), larger at odd (reversed)
    small = sorted_nums[:mid+1][::-1]
    large = sorted_nums[mid+1:][::-1]

    FOR i ← 0 TO n - 1:
        IF i % 2 == 0: nums[i] = small[i // 2]
        ELSE: nums[i] = large[i // 2]
```

Split into two halves, interleave in reverse order to avoid equal adjacent elements.
