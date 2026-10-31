# 336. Palindrome Pairs

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/palindrome-pairs](https://leetcode.com/problems/palindrome-pairs)
**Companies:** Airbnb, Amazon, Goldman Sachs, Google, Meta, Microsoft, Wix

---

## Problem Description
You are given a **0-indexed** array of **unique** strings `words`.

A **palindrome pair** is a pair of integers `(i, j)` such that:

- `0 <= i, j < words.length`,
- `i != j`, and
- `words[i] + words[j]` (the concatenation of the two strings) is a palindrome.

Return *an array of all the **palindrome pairs** of* `words`.

You must write an algorithm with `O(sum of words[i].length)` runtime complexity.

**Constraints:**

- `1 <= words.length <= 5000`
- `0 <= words[i].length <= 300`
- `words[i]` consists of lowercase English letters.

## Examples

```
Example 1:
  Input: words = ["abcd","dcba","lls","s","sssll"]
  Output: [[0,1],[1,0],[3,2],[2,4]]
  Explanation: The palindromes are ["abcddcba","dcbaabcd","slls","llssssll"]
```

```
Example 2:
  Input: words = ["bat","tab","cat"]
  Output: [[0,1],[1,0]]
  Explanation: The palindromes are ["battab","tabbat"]
```

```
Example 3:
  Input: words = ["a",""]
  Output: [[0,1],[1,0]]
  Explanation: The palindromes are ["a","a"]
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
By breaking each word into all possible prefix/suffix splits and leveraging a hash map of reversed strings, we can efficiently discover all palindrome-forming pairs.
