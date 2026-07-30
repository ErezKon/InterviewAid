# 2022. Convert 1D Array Into 2D Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/convert-1d-array-into-2d-array](https://leetcode.com/problems/convert-1d-array-into-2d-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
Given a one‑dimensional integer array `original` and two integers `m` and `n`, reshape it into an `m`‑by‑`n` two‑dimensional array. If `m * n` does not equal the length of `original`, return an empty array.

## Examples
**Example 1:**
```
Input: original = [1,2,3,4], m = 2, n = 2
Output: [[1,2],[3,4]]
```
**Example 2:**
```
Input: original = [1,2,3], m = 1, n = 3
Output: [[1,2,3]]
```
**Example 3:**
```
Input: original = [1,2], m = 2, n = 2
Output: []
Explanation: 2*2 != 2, so reshaping is impossible.
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

## Follow‑Up Questions
1. How would you modify the algorithm to reshape in column‑major order?
2. Can the solution be adapted to work in‑place for mutable array structures?
3. What if the input were a stream of numbers; how would you produce rows lazily?

## Key Takeaway
Validate the total size first, then slice the original array sequentially to build each row.
