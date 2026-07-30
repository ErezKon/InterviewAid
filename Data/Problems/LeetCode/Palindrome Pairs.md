# 336. Palindrome Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-pairs](https://leetcode.com/problems/palindrome-pairs)
**Companies:** Airbnb, Amazon, Goldman Sachs, Google, Meta, Microsoft, Wix

---

## Problem Description
Given an array of unique words, return all the distinct pairs of indices `(i, j)` such that the concatenation `words[i] + words[j]` is a palindrome. A palindrome reads the same forward and backward.

## Examples
**Example 1:**
```
Input: ["bat","tab","cat"]
Output: [[0,1],[1,0]]
Explanation: "bat"+"tab" and "tab"+"bat" are palindromes.
```
**Example 2:**
```
Input: ["abcd","dcba","lls","s","sssll"]
Output: [[0,1],[1,0],[3,2],[2,4]]
```

## Approach
Use a hash map to store each word and its index. For each word, split it at every possible position into a prefix and suffix. If the prefix is a palindrome, check if the reversed suffix exists in the map; if so, the pair `(revIndex, currentIndex)` forms a palindrome. Similarly, if the suffix is a palindrome, the pair `(currentIndex, revIndex)` is valid.

```text
FUNCTION palindromePairs(words):
    wordMap ← {word: i FOR i, word IN ENUMERATE(words)}
    result ← []
    FOR i, word IN ENUMERATE(words):
        FOR j ← 0 TO LEN(word):
            prefix ← SUBSTRING(word, 0, j)
            suffix ← SUBSTRING(word, j, LEN(word))
            IF isPalindrome(prefix):
                rev ← REVERSE(suffix)
                IF rev IN wordMap AND wordMap[rev] ≠ i:
                    APPEND result WITH [wordMap[rev], i]
            IF j < LEN(word) AND isPalindrome(suffix):
                rev ← REVERSE(prefix)
                IF rev IN wordMap AND wordMap[rev] ≠ i:
                    APPEND result WITH [i, wordMap[rev]]
    RETURN result
```

## Walkthrough
| Step | Word (i) | Split j | Prefix | Suffix | Palindrome? | Rev Suffix | Pair Added |
|------|----------|---------|--------|--------|-------------|------------|------------|
| 1 | "bat" (0) | 0 | "" | "bat" | yes (empty) | "tab" exists → [1,0] | [1,0] |
| 2 | "bat" (0) | 3 | "bat" | "" | yes (empty) | "tab" exists → [0,1] | [0,1] |
| ... | ... | ... | ... | ... | ... | ... | ... |

## Complexity Analysis
- **Time:** O(n·k²) where *n* is the number of words and *k* is the maximum word length (splitting each word at every position).
- **Space:** O(n·k) for the hash map storing all words and their reversals.

## Follow-Up Questions
1. How would you modify the solution if duplicate words are allowed?
2. Can you solve the problem using a Trie to improve the average case performance?
3. How would you extend this to find the longest palindrome that can be formed by concatenating any subset of words?

## Key Takeaway
By breaking each word into all possible prefix/suffix splits and leveraging a hash map of reversed strings, we can efficiently discover all palindrome‑forming pairs.
