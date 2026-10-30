# 1816. Truncate Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/truncate-sentence](https://leetcode.com/problems/truncate-sentence)
**Companies:** Amazon, Bloomberg

---

## Problem Description

A **sentence** is a list of words that are separated by a single space with no leading or trailing spaces. Each of the words consists of **only** uppercase and lowercase English letters (no punctuation).

- For example, `"Hello World"`, `"HELLO"`, and `"hello world hello world"` are all sentences.

You are given a sentence `s` and an integer `k`. You want to **truncate** `s` such that it contains only the **first** `k` words. Return `s`* after **truncating** it.*

**Constraints:**
- `1 <= s.length <= 500`
- `k` is in the range `[1, the number of words in s]`.
- `s` consist of only lowercase and uppercase English letters and spaces.
- The words in `s` are separated by a single space.
- There are no leading or trailing spaces.

## Examples

**Example 1:**
```
Input: s = "Hello how are you Contestant", k = 4
Output: "Hello how are you"
Explanation: The words in s are ["Hello", "how", "are", "you", "Contestant"].
The first 4 words are ["Hello", "how", "are", "you"].
Hence, you should return "Hello how are you".
```

**Example 2:**
```
Input: s = "What is the solution to this problem", k = 4
Output: "What is the solution"
Explanation: The words in s are ["What", "is", "the", "solution", "to", "this", "problem"].
The first 4 words are ["What", "is", "the", "solution"].
Hence, you should return "What is the solution".
```

**Example 3:**
```
Input: s = "chopper is not a tanuki", k = 5
Output: "chopper is not a tanuki"
```

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
