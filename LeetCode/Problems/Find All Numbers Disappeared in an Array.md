# 448. Find All Numbers Disappeared in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array](https://leetcode.com/problems/find-all-numbers-disappeared-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tinkoff

---

## Approach: Index Marking — O(n), O(1) ✅

```
FUNCTION findDisappearedNumbers(nums):
    FOR num IN nums:
        idx = ABS(num) - 1
        IF nums[idx] > 0:
            nums[idx] = -nums[idx]

    RETURN [i + 1 for i where nums[i] > 0]
```

Same index-marking technique as Find All Duplicates (#442). Unmarked indices are missing numbers.
