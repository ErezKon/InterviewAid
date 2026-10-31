# 720. Longest Word in Dictionary

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-word-in-dictionary](https://leetcode.com/problems/longest-word-in-dictionary)
**Companies:** Amazon, Google, Pinterest

---

## Problem Description

Given an array of strings `words` representing an English Dictionary, return *the longest word in* `words` *that can be built one character at a time by other words in* `words`.

If there is more than one possible answer, return the longest word with the smallest lexicographical order. If there is no answer, return the empty string.

Note that the word should be built from left to right with each additional character being added to the end of a previous word.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 30`
- `words[i]` consists of lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["w","wo","wor","worl","world"]
Output: "world"
Explanation: The word "world" can be built one character at a time by "w", "wo", "wor", and "worl".
```

**Example 2:**
```
Input: words = ["a","banana","app","appl","ap","apply","apple"]
Output: "apple"
Explanation: Both "apply" and "apple" can be built from other words in the dictionary. However, "apple" is lexicographically smaller than "apply".
```

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
A Trie can achieve the same with a depth-first search.

## Walkthrough
For the list `["w","wo","wor","worl","world"]`:
1. "w" has prefix "" → add to `built`.
2. "wo" prefix "w" exists → add.
3. Continue until "world" passes the check, becoming `result`.

## Complexity Analysis
*Time*: **O(n·L·log n)** for sorting (`n` words, average length `L`).
*Space*: **O(n·L)** for the set (or Trie).

## Follow-Up Questions
1. How would you modify the algorithm to return **all** buildable words, not just the longest?
2. Can you solve the problem in **O(n·L)** time without sorting, using a bucket-by-length approach?
3. How would a Trie-based solution differ in space usage?

## Key Takeaway
Sorting ensures that when a word is examined, all its possible prefixes have already been processed, allowing a simple hash-set check to verify buildability.
