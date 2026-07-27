# 413. Arithmetic Slices

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/arithmetic-slices](https://leetcode.com/problems/arithmetic-slices)
**Companies:** Aetion, Amazon, Baidu, Google, Meta, Tiktok

---

```
FUNCTION numberOfArithmeticSlices(nums):
    count = 0; curr = 0
    FOR i ← 2 TO n - 1:
        IF nums[i] - nums[i-1] == nums[i-1] - nums[i-2]:
            curr += 1
            count += curr
        ELSE:
            curr = 0
    RETURN count
```

Each new element extending an arithmetic sequence adds `curr` more slices.
