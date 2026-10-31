# 660. Remove 9

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-9](https://leetcode.com/problems/remove-9)
**Companies:** Houzz

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Start from integer `1`, remove any integer that contains `9` such as `9`, `19`, `29`...

Now, you will have a new integer sequence `[1, 2, 3, 4, 5, 6, 7, 8, 10, 11, ...]`.

Given an integer `n`, return *the* `n^th` (**1-indexed**) integer in the new sequence.

**Constraints:**
- `1 <= n <= 8 * 10^8`

## Examples

**Example 1:**
```
Input: n = 9
Output: 10
```

**Example 2:**
```
Input: n = 10
Output: 11
```

## Approach
**Greedy** – Scan the string from left to right and remove the first `9` that is followed by a digit smaller than `9`. If no such `9` exists, remove the last `9`.

## Walkthrough
Consider `"1923"`:
1. Index 0: `1` → not `9`.
2. Index 1: `9` and next digit `2` < `9` → remove this `9`.
3. Remaining characters: `1 2 3` → result `923`.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(1) additional space (output can be built in-place).

## Follow-Up Questions
- How would you handle removal of any digit to maximize the number?
- What if you could remove up to k digits?
- Extend to binary representation and remove a `1`.

## Key Takeaway
Removing the first `9` that is followed by a smaller digit yields the maximal result; if none, drop the last `9`.
