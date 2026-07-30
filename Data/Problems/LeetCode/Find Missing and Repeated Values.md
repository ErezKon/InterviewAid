# 2965. Find Missing and Repeated Values

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-missing-and-repeated-values](https://leetcode.com/problems/find-missing-and-repeated-values)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
You are given an `n × n` integer matrix `grid` containing all numbers from `1` to `n²` exactly once, except that one number appears twice and another number is missing. Return an array `[repeated, missing]` where `repeated` is the duplicated value and `missing` is the absent value.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[[1,2],[2,4]]` | `[2,3]` | `2` appears twice, `3` is missing. |
| `[[9,2,3],[4,5,6],[7,8,9]]` | `[9,1]` | `9` duplicated, `1` missing. |
| `[[1,1]]` | `[1,2]` | Smallest grid, `1` repeated, `2` missing.

## Approach
Count occurrences of each value using a hash table (or an array of size `n² + 1`). Iterate over the grid, incrementing the count for each cell. After counting, scan the count array to locate the value with count `2` (repeated) and the value with count `0` (missing).

## Walkthrough
For `grid = [[1,2],[2,4]]` (n = 2):
| cell | value | count after update |
|------|-------|--------------------|
| (0,0) | 1 | count[1] = 1 |
| (0,1) | 2 | count[2] = 1 |
| (1,0) | 2 | count[2] = 2 (repeated) |
| (1,1) | 4 | count[4] = 1 |
After counting, scanning `1..4` finds `count[2]=2` → repeated `2`, `count[3]=0` → missing `3`.

## Complexity Analysis
- **Time:** O(n²) to traverse the grid once, plus O(n²) to scan the count array – overall O(n²).
- **Space:** O(n²) for the count array (can be reduced to O(1) by in‑place marking, but hash table is clearer).

## Follow-Up Questions
- How would you solve the problem with O(1) extra space?
- Can you extend the solution to handle multiple duplicated/missing numbers?
- What changes are needed if the grid is not square?

## Key Takeaway
A simple frequency count quickly reveals the duplicated and missing values in a matrix containing a near‑complete range of numbers.
