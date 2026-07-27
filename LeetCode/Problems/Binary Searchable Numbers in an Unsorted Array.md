# 1966. Binary Searchable Numbers in an Unsorted Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array](https://leetcode.com/problems/binary-searchable-numbers-in-an-unsorted-array)
**Companies:** Google, Microsoft, Uber

---

```
FUNCTION binarySearchableNumbers(nums):
    n = len(nums)
    prefixMax = [-infinity] * n; suffixMin = [infinity] * n
    FOR i ← 1 TO n - 1: prefixMax[i] = MAX(prefixMax[i-1], nums[i-1])
    FOR i ← n - 2 DOWN TO 0: suffixMin[i] = MIN(suffixMin[i+1], nums[i+1])
    RETURN SUM(1 for i in range(n) if prefixMax[i] < nums[i] < suffixMin[i])
```
