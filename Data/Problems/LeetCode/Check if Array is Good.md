# 2784. Check if Array is Good

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/check-if-array-is-good](https://leetcode.com/problems/check-if-array-is-good)
**Companies:** Bloomberg, Google, Microsoft

---

## Problem Description
You are given an integer array `nums`. We consider an array **good** if it is a permutation of an array `base[n]`.

`base[n] = [1, 2, ..., n - 1, n, n]` (in other words, it is an array of length `n + 1` which contains `1` to `n - 1` exactly once, plus two occurrences of `n`). For example, `base[1] = [1, 1]` and `base[3] = [1, 2, 3, 3]`.

Return `true` *if the given array is good, otherwise return* `false`.

**Note:** A permutation of integers represents an arrangement of these numbers.

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= num[i] <= 200`

## Examples
```
Example 1:
  Input: nums = [2, 1, 3]
  Output: false
  Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. However, base[3] has four elements but array nums has three. Therefore, it can not be a permutation of base[3] = [1, 2, 3, 3]. So the answer is false.
```

```
Example 2:
  Input: nums = [1, 3, 3, 2]
  Output: true
  Explanation: Since the maximum element of the array is 3, the only candidate n for which this array could be a permutation of base[n], is n = 3. It can be seen that nums is a permutation of base[3] = [1, 2, 3, 3] (by swapping the second and fourth elements in nums, we reach base[3]). Therefore, the answer is true.
```

```
Example 3:
  Input: nums = [1, 1]
  Output: true
  Explanation: Since the maximum element of the array is 1, the only candidate n for which this array could be a permutation of base[n], is n = 1. It can be seen that nums is a permutation of base[1] = [1, 1]. Therefore, the answer is true.
```

```
Example 4:
  Input: nums = [3, 4, 4, 1, 2, 1]
  Output: false
  Explanation: Since the maximum element of the array is 4, the only candidate n for which this array could be a permutation of base[n], is n = 4. However, base[4] has five elements but array nums has six. Therefore, it can not be a permutation of base[4] = [1, 2, 3, 4, 4]. So the answer is false.
```

## Approach
Sort the array and compare it against the expected pattern generated on the fly.

```text
FUNCTION isGood(nums):
    SET n ← LENGTH(nums) - 1
    SORT nums IN NON-DECREASING ORDER
    FOR i ← 0 TO n-1:
        IF nums[i] != i + 1:
            RETURN false
    IF nums[n] != n:
        RETURN false
    RETURN true
```

## Walkthrough
| Step | Sorted nums | Check index | Expected | Result |
|------|-------------|-------------|----------|--------|
|0|[1,2,3,3]|0|1|match|
|1|[1,2,3,3]|1|2|match|
|2|[1,2,3,3]|2|3|match|
|final|[1,2,3,3]|n=3|3|match → return true|

## Complexity Analysis
- **Time:** O(n log n) due to sorting.
- **Space:** O(1) additional space if an in-place sort is used; otherwise O(n).

## Follow-Up Questions
1. How can you achieve O(n) time without sorting, using a frequency array?
2. What modifications are needed if the duplicate element could be any value, not necessarily `n`?
3. How would you extend the check to validate multiple duplicate occurrences?

## Key Takeaway
Sorting the array and verifying the expected sequence provides a straightforward way to confirm the "good" property.
