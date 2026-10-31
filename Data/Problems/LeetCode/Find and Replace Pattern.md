# 890. Find and Replace Pattern

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-and-replace-pattern](https://leetcode.com/problems/find-and-replace-pattern)
**Companies:** Amazon, Google

---

## Problem Description

Given a list of strings `words` and a string `pattern`, return *a list of* `words[i]` *that match* `pattern`. You may return the answer in **any order**.

A word matches the pattern if there exists a permutation of letters `p` so that after replacing every letter `x` in the pattern with `p(x)`, we get the desired word.

Recall that a permutation of letters is a bijection from letters to letters: every letter maps to another letter, and no two letters map to the same letter.

**Constraints:**
- `1 <= pattern.length <= 20`
- `1 <= words.length <= 50`
- `words[i].length == pattern.length`
- `pattern` and `words[i]` are lowercase English letters.

## Examples

**Example 1:**
```
Input: words = ["abc","deq","mee","aqq","dkd","ccc"], pattern = "abb"
Output: ["mee","aqq"]
Explanation: "mee" matches the pattern because there is a permutation {a -> m, b -> e, ...}.
"ccc" does not match the pattern because {a -> c, b -> c, ...} is not a permutation, since a and b map to the same letter.
```

**Example 2:**
```
Input: words = ["a","b","c"], pattern = "a"
Output: ["a","b","c"]
```

## Approach
We check each word against the pattern using two hash maps to enforce a one-to-one correspondence.
1. Iterate characters of the word and pattern simultaneously.
2. For each pair `(cWord, cPat)`, ensure `mapWordToPat[cWord]` equals `cPat` and `mapPatToWord[cPat]` equals `cWord`.
3. If any mismatch occurs, the word does not match.
4. Collect all words that pass the check.

### Pseudocode
```text
FUNCTION findAndReplacePattern(words, pattern):
    SET result ← []
    FOR word IN words:
        IF matches(word, pattern):
            APPEND word TO result
    RETURN result

FUNCTION matches(word, pattern):
    SET mapWtoP ← {}
    SET mapPtoW ← {}
    FOR i ← 0 TO LENGTH(word) - 1:
        SET wChar ← word[i]
        SET pChar ← pattern[i]
        IF wChar IN mapWtoP AND mapWtoP[wChar] != pChar:
            RETURN FALSE
        IF pChar IN mapPtoW AND mapPtoW[pChar] != wChar:
            RETURN FALSE
        SET mapWtoP[wChar] ← pChar
        SET mapPtoW[pChar] ← wChar
    RETURN TRUE
```

## Walkthrough
Word = "mee", pattern = "abb"
| i | wChar | pChar | mapWtoP | mapPtoW |
|---|-------|-------|--------|--------|
|0| m | a | {m→a} | {a→m} |
|1| e | b | {m→a, e→b} | {a→m, b→e} |
|2| e | b | maps consistent → continue |
All positions consistent → word matches.

## Complexity Analysis
- **Time:** O(N × L) where N is number of words and L is length of each word.
- **Space:** O(L) for the two hash maps per word.

## Follow-Up Questions
1. How would you modify the solution to handle Unicode characters?
2. Can the algorithm be adapted to find words that match a pattern with wildcard characters?
3. What is the impact on performance if the list of words is extremely large and stored on disk?

## Key Takeaway
Using two synchronized hash maps enforces a bijective mapping, allowing linear-time verification of pattern conformity for each word.
