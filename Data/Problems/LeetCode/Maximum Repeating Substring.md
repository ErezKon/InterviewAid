# 1668. Maximum Repeating Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-repeating-substring](https://leetcode.com/problems/maximum-repeating-substring)
**Companies:** Amazon, Asana, Bloomberg, Google, Pure Storage, Turing

---

## Problem Description
Given two strings `sequence` and `word`, determine the maximum integer `k` such that the string formed by concatenating `word` to itself `k` times (`word` repeated `k` times) is a substring of `sequence`. If `word` does not appear in `sequence`, the answer is `0`.

## Examples
**Example 1:**
```
Input: sequence = "ababc", word = "ab"
Output: 2
Explanation: "ab" repeated twice is "abab", which appears starting at index 0.
```
**Example 2:**
```
Input: sequence = "abcd", word = "abc"
Output: 1
Explanation: "abc" appears once; repeating it twice would be "abcabc" which is not a substring.
```

## Approach
The problem can be solved by iteratively checking whether `word` repeated `k+1` times is a substring of `sequence`. Increment `k` while the condition holds.

```text
FUNCTION maxRepeating(sequence, word):
    SET k ← 0
    WHILE (word REPEAT (k + 1)) IS SUBSTRING OF sequence:
        SET k ← k + 1
    RETURN k
```
The `REPEAT` operation denotes concatenating `word` `(k+1)` times.

## Walkthrough
Consider `sequence = "ababc"` and `word = "ab"`.
| k | word repeated k times | Substring in sequence? |
|---|-----------------------|------------------------|
| 0 | ""                    | always true            |
| 1 | "ab"                  | yes (index 0)          |
| 2 | "abab"                | yes (index 0)          |
| 3 | "ababab"              | no                     |
The loop stops at `k = 2`, which is returned.

## Complexity Analysis
- **Time:** Each substring check scans `sequence`, leading to `O(n * k)` where `n` is `len(sequence)` and `k` is the final answer (worst‑case `O(n * m)` with `m = len(word)`).
- **Space:** `O(1)` extra space.

## Follow-Up Questions
1. How would you modify the solution if overlapping occurrences of `word` should be counted separately?
2. Can the problem be solved in `O(n)` time using string matching algorithms like KMP?
3. What if `word` can be any permutation of a set of characters?

## Key Takeaway
Repeatedly concatenate `word` and check for its presence in `sequence`; the loop naturally yields the maximum repeat count.
