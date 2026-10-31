# 2022. Convert 1D Array Into 2D Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-1d-array-into-2d-array](https://leetcode.com/problems/convert-1d-array-into-2d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
You are given a **0-indexed** 1-dimensional (1D) integer array `original`, and two integers, `m` and `n`. You are tasked with creating a 2-dimensional (2D) array with `m` rows and `n` columns using **all** the elements from `original`.

The elements from indices `0` to `n - 1` (**inclusive**) of `original` should form the first row of the constructed 2D array, the elements from indices `n` to `2 * n - 1` (**inclusive**) should form the second row of the constructed 2D array, and so on.

Return *an* `m x n` *2D array constructed according to the above procedure, or an empty 2D array if it is impossible*.

**Constraints:**
- `1 <= original.length <= 5 * 10^4`
- `1 <= original[i] <= 10^5`
- `1 <= m, n <= 4 * 10^4`

## Examples
```
Example 1:
  Input: original = [1,2,3,4], m = 2, n = 2
  Output: [[1,2],[3,4]]
  Explanation: The constructed 2D array should contain 2 rows and 2 columns.
    The first group of n=2 elements in original, [1,2], becomes the first row in the constructed 2D array.
    The second group of n=2 elements in original, [3,4], becomes the second row in the constructed 2D array.
```
```
Example 2:
  Input: original = [1,2,3], m = 1, n = 3
  Output: [[1,2,3]]
  Explanation: The constructed 2D array should contain 1 row and 3 columns.
    Put all three elements in original into the first row of the constructed 2D array.
```
```
Example 3:
  Input: original = [1,2], m = 1, n = 1
  Output: []
  Explanation: There are 2 elements in original.
    It is impossible to fit 2 elements in a 1x1 2D array, so return an empty 2D array.
```

## Approach
Check the size constraint `m * n == len(original)`. If it holds, iterate over the original array and slice `n` elements at a time to build each row.

**Pseudocode**
```text
FUNCTION construct2DArray(original, m, n):
    IF m * n ≠ LENGTH(original):
        RETURN []
    SET result ← []
    FOR i FROM 0 TO m-1:
        SET start ← i * n
        SET row ← original[start : start + n]
        APPEND row TO result
    RETURN result
```

## Walkthrough
For `original = [1,2,3,4]`, `m = 2`, `n = 2`:
| i | start | row | result after iteration |
|---|-------|-----|------------------------|
|0|0|[1,2]|[[1,2]]|
|1|2|[3,4]|[[1,2],[3,4]]|
The final `result` matches the expected output.

## Complexity Analysis
- **Time:** O(m·n) – each element is visited once.
- **Space:** O(m·n) for the output array.

## Follow-Up Questions
1. How would you modify the algorithm to reshape in column-major order?
2. Can the solution be adapted to work in-place for mutable array structures?
3. What if the input were a stream of numbers; how would you produce rows lazily?

## Key Takeaway
Validate the total size first, then slice the original array sequentially to build each row.
