# 660. Remove 9

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/remove-9](https://leetcode.com/problems/remove-9)
**Companies:** Houzz

---

## Problem Description
Given a non‑negative integer represented as a string, remove exactly one occurrence of the digit `9` to obtain the largest possible integer. The resulting number should not contain leading zeros.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| "1923" | "923" | Removing the first `9` yields `923`, which is larger than removing any other digit. |
| "999" | "99" | Any removal of a `9` results in `99`. |
| "123" | "123" | No `9` present; the number remains unchanged.

## Approach
**Greedy** – Scan the string from left to right and remove the first `9` that is followed by a digit smaller than `9`. If no such `9` exists, remove the last `9`.

## Walkthrough
Consider `"1923"`:
1. Index 0: `1` → not `9`.
2. Index 1: `9` and next digit `2` < `9` → remove this `9`.
3. Remaining characters: `1 2 3` → result `923`.

## Complexity Analysis
- **Time:** O(n) where n is the length of the string.
- **Space:** O(1) additional space (output can be built in‑place).

## Follow‑Up Questions
- How would you handle removal of any digit to maximize the number?
- What if you could remove up to k digits?
- Extend to binary representation and remove a `1`.

## Key Takeaway
Removing the first `9` that is followed by a smaller digit yields the maximal result; if none, drop the last `9`.
