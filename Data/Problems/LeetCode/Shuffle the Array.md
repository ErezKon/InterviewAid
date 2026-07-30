# 1470. Shuffle the Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shuffle-the-array](https://leetcode.com/problems/shuffle-the-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Morgan Stanley

---

## Problem Description

Given the array `nums` consisting of `2n` elements in the form `[x1,x2,...,xn,y1,y2,...,yn]`, return the array in the form `[x1,y1,x2,y2,...,xn,yn]`.

### Examples

**Example 1:**
- **Input:** `nums = [2,5,1,3,4,7]`, `n = 3`
- **Output:** `[2,3,5,4,1,7]`
- **Explanation:** `[x1,x2,x3,y1,y2,y3]` → `[x1,y1,x2,y2,x3,y3]` = `[2,3,5,4,1,7]`

**Example 2:**
- **Input:** `nums = [1,2,3,4,4,3,2,1]`, `n = 4`
- **Output:** `[1,4,2,3,3,2,4,1]`

### Constraints

- `1 <= n <= 500`
- `nums.length == 2n`
- `1 <= nums[i] <= 10³`

---

## Approach: Interleave — O(n) ✅

Simply interleave elements from the first and second halves.

```
FUNCTION shuffle(nums, n):
    result = []
    FOR i ← 0 TO n - 1:
        result.ADD(nums[i])
        result.ADD(nums[i + n])
    RETURN result
```

### Walkthrough — `nums = [2,5,1,3,4,7]`, `n = 3`

| i | nums[i] | nums[i+n] | result so far |
|---|---------|-----------|---------------|
| 0 | 2       | 3         | [2, 3]        |
| 1 | 5       | 4         | [2, 3, 5, 4]  |
| 2 | 1       | 7         | [2, 3, 5, 4, 1, 7] |

Result: `[2, 3, 5, 4, 1, 7]`

| Time | Space |
|------|-------|
| O(n) | O(n) |
