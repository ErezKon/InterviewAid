# 280. Wiggle Sort

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/wiggle-sort](https://leetcode.com/problems/wiggle-sort)
**Companies:** Amazon, Google, Myntra, Tiktok

---

```
FUNCTION wiggleSort(nums):
    FOR i ← 1 TO n - 1:
        IF (i % 2 == 1 AND nums[i] < nums[i-1]) OR
           (i % 2 == 0 AND nums[i] > nums[i-1]):
            SWAP(nums[i], nums[i-1])
```

Single pass: at odd indices ensure >= previous, at even indices ensure <= previous.
