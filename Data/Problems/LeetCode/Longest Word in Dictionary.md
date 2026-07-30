# 720. Longest Word in Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary](https://leetcode.com/problems/longest-word-in-dictionary)
**Companies:** Amazon, Google, Pinterest

---

## Problem Description
Given an array of strings `words`, return the longest word that can be built one character at a time by other words in the array. A word is buildable if every prefix of the word also appears in `words`. If multiple words qualify, return the lexicographically smallest.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| ["w","wo","wor","worl","world"] | "world" | Each prefix of "world" exists in the list. |
| ["a","banana","app","appl","ap","apply","apple"] | "apple" | "apply" cannot be built because "appl" is missing a prefix.

## Approach
Sort the words so that shorter (and lexicographically smaller) words come first, then use a hash set to track buildable words.

```text
FUNCTION longestWord(words):
    SORT words  // primary by length, secondary lexicographically
    built ← SET containing ""
    result ← ""
    FOR word IN words:
        IF word[0:-1] IN built:
            ADD word TO built
            IF LENGTH(word) > LENGTH(result) OR (LENGTH(word) == LENGTH(result) AND word < result):
                result ← word
    RETURN result
```
A Trie can achieve the same with a depth‑first search.

## Walkthrough
For the list `["w","wo","wor","worl","world"]`:
1. "w" has prefix "" → add to `built`.
2. "wo" prefix "w" exists → add.
3. Continue until "world" passes the check, becoming `result`.

## Complexity Analysis
*Time*: **O(n·L·log n)** for sorting (`n` words, average length `L`).
*Space*: **O(n·L)** for the set (or Trie).

## Follow‑Up Questions
1. How would you modify the algorithm to return **all** buildable words, not just the longest?
2. Can you solve the problem in **O(n·L)** time without sorting, using a bucket‑by‑length approach?
3. How would a Trie‑based solution differ in space usage?

## Key Takeaway
Sorting ensures that when a word is examined, all its possible prefixes have already been processed, allowing a simple hash‑set check to verify buildability.
