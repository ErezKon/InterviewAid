# 192. Word Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-frequency](https://leetcode.com/problems/word-frequency)
**Companies:** Google, Meta, Microsoft

---

## Problem Description
Given an array of strings `words`, return a list of strings representing each unique word and its frequency, sorted by descending frequency. If two words have the same frequency, sort them lexicographically.

## Examples
**Example 1:**
```
Input: words = ["apple", "banana", "apple", "orange", "banana", "apple"]
Output: ["apple 3", "banana 2", "orange 1"]
```
**Example 2:**
```
Input: words = ["cat", "dog", "cat", "dog", "cat", "dog"]
Output: ["cat 3", "dog 3"] // same frequency, alphabetical order
```

## Approach
Use a hash map to count occurrences, then sort the entries by frequency descending and word ascending.

```text
FUNCTION WordFrequency(words):
    SET freqMap ← EMPTY MAP
    FOR word IN words:
        IF word IN freqMap:
            SET freqMap[word] ← freqMap[word] + 1
        ELSE:
            SET freqMap[word] ← 1
    SET entries ← LIST OF (word, count) FROM freqMap
    SORT entries BY (count DESC, word ASC)
    SET result ← []
    FOR (word, count) IN entries:
        APPEND word + " " + STRING(count) TO result
    RETURN result
```

## Walkthrough
| Step | word | freqMap after step |
|------|------|-------------------|
| 1 | "apple" | {"apple":1} |
| 2 | "banana" | {"apple":1, "banana":1} |
| 3 | "apple" | {"apple":2, "banana":1} |
| ... | ... | ... |
After processing all words, `freqMap` = {"apple":3, "banana":2, "orange":1}. Sorting yields the output list.

## Complexity Analysis
- Time: O(n log n) where n is number of unique words (due to sorting).
- Space: O(n) for the hash map and sorted list.

## Follow-Up Questions
1. How would you modify the solution to return the top k frequent words?
2. Can you solve it in O(n) time using a bucket sort approach?
3. How would you handle streaming input where words arrive continuously?

## Key Takeaway
Counting frequencies with a hash map and then sorting by custom criteria provides a clear and efficient solution.
