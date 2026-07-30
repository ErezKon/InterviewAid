# 1816. Truncate Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/truncate-sentence](https://leetcode.com/problems/truncate-sentence)
**Companies:** Amazon, Bloomberg

---

## Problem Description
Given a string `s` consisting of words separated by single spaces and an integer `k`, return the first `k` words of `s` as a new string. The order of words must be preserved and words are separated by a single space.

## Examples
**Example 1:**
Input: `s = "Hello how are you Contestants"`, `k = 4`
Output: `"Hello how are you"`
Explanation: The first four words are returned.

**Example 2:**
Input: `s = "What is the solution?"`, `k = 3`
Output: `"What is the solution?"`
Explanation: The string has exactly three words.

## Approach
Iterate over the characters of `s`, counting spaces. When the count of spaces reaches `k-1`, slice the string up to that position. If the end of the string is reached before counting `k-1` spaces, return the whole string.

## Walkthrough
| Index | Char | Space Count | Action |
|-------|------|-------------|--------|
| 0‑4   | H e l l o | 0 | continue |
| 5     | space | 1 | continue |
| ...   | ... | ... | ... |
| when space count = k‑1 (3) at position 19, slice `s[0:19]` → `"Hello how are you"` |

## Complexity Analysis
- **Time:** `O(n)` where `n` is the length of `s`.
- **Space:** `O(1)` additional space (output string shares original characters).

## Follow‑Up Questions
1. How would you handle multiple consecutive spaces?
2. Can the solution be adapted to return the last `k` words?
3. What if the input is a stream of characters rather than a full string?

## Key Takeaway
Counting spaces while scanning the string lets you locate the cut‑off point for the first `k` words in a single linear pass.
