# 1668. Maximum Repeating Substring

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-repeating-substring](https://leetcode.com/problems/maximum-repeating-substring)
**Companies:** Amazon, Asana, Bloomberg, Google, Pure Storage, Turing

---

## Problem Description

For a string `sequence`, a string `word` is **`k`-repeating** if `word` concatenated `k` times is a substring of `sequence`. The `word`'s **maximum `k`-repeating value** is the highest value `k` where `word` is `k`-repeating in `sequence`. If `word` is not a substring of `sequence`, `word`'s maximum `k`-repeating value is `0`.

Given strings `sequence` and `word`, return *the **maximum `k`-repeating value** of `word` in `sequence`*.

**Constraints:**
- `1 <= sequence.length <= 100`
- `1 <= word.length <= 100`
- `sequence` and `word` contains only lowercase English letters.

## Examples

**Example 1:**
```
Input: sequence = "ababc", word = "ab"
Output: 2
Explanation: "abab" is a substring in "ababc".
```

**Example 2:**
```
Input: sequence = "ababc", word = "ba"
Output: 1
Explanation: "ba" is a substring in "ababc". "baba" is not a substring in "ababc".
```

**Example 3:**
```
Input: sequence = "ababc", word = "ac"
Output: 0
Explanation: "ac" is not a substring in "ababc".
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
- **Time:** Each substring check scans `sequence`, leading to `O(n * k)` where `n` is `len(sequence)` and `k` is the final answer (worst-case `O(n * m)` with `m = len(word)`).
- **Space:** `O(1)` extra space.

## Follow-Up Questions
1. How would you modify the solution if overlapping occurrences of `word` should be counted separately?
2. Can the problem be solved in `O(n)` time using string matching algorithms like KMP?
3. What if `word` can be any permutation of a set of characters?

## Key Takeaway
Repeatedly concatenate `word` and check for its presence in `sequence`; the loop naturally yields the maximum repeat count.
