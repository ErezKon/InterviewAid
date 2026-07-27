# 3011. Find if Array Can Be Sorted

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-if-array-can-be-sorted](https://leetcode.com/problems/find-if-array-can-be-sorted)
**Companies:** Amazon, Edelweiss, Google, Meta, Microsoft

---

```
FUNCTION canSortArray(nums):
    // Group consecutive elements with same popcount
    // Check if max of each group ≤ min of next group
    groups = []
    i = 0
    WHILE i < len(nums):
        j = i
        bits = bin(nums[i]).count('1')
        WHILE j < len(nums) AND bin(nums[j]).count('1') == bits: j += 1
        groups.ADD((MIN(nums[i:j]), MAX(nums[i:j])))
        i = j

    FOR i ← 1 TO len(groups) - 1:
        IF groups[i][0] < groups[i-1][1]: RETURN false
    RETURN true
```
