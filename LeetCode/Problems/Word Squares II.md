# 3799. Word Squares II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/word-squares-ii](https://leetcode.com/problems/word-squares-ii)
**Companies:** Oracle

---

## Problem Description
Given a list of words of equal length, construct all possible word squares. A word square is an arrangement of `n` words (where each word has length `n`) such that the `k`‑th row and `k`‑th column read the same string for all `0 ≤ k < n`.

## Examples
**Example 1:**
```
Input: words = ["area","lead","wall","lady","ball"]
Output: [["wall","area","lead","lady"],["ball","area","lead","lady"]]
```
**Example 2:**
```
Input: words = ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atan"],["baba","abat","baba","atal"]]
```

## Approach
Use backtracking with a prefix‑hash map. For each partial square, the next word must have a prefix matching the characters in the current column position.

```text
FUNCTION buildWordSquares(words):
    SET n ← LENGTH(words[0])
    CREATE prefixMap ← MAP FROM prefix TO LIST OF words
    FOR each word IN words:
        FOR i FROM 0 TO n:
            SET prefix ← SUBSTRING(word, 0, i)
            ADD word TO prefixMap[prefix]
    SET results ← []
    FOR each word IN words:
        CALL backtrack([word], n, prefixMap, results)
    RETURN results

FUNCTION backtrack(square, n, prefixMap, results):
    IF LENGTH(square) = n:
        APPEND COPY(square) TO results
        RETURN
    SET idx ← LENGTH(square)
    SET prefix ← ""
    FOR each w IN square:
        SET prefix ← prefix + w[idx]
    FOR each candidate IN prefixMap.get(prefix, []):
        APPEND candidate TO square
        CALL backtrack(square, n, prefixMap, results)
        REMOVE LAST(square)
```

## Walkthrough
For the first example, start with "wall". The required prefix for the second word is "a" (second column). Candidates with prefix "a" are "area". Continue building until a full square of size 4 is formed.

## Complexity Analysis
- Time: O(m * n * 26) in practice, where `m` is number of words and `n` is word length, due to prefix lookups and backtracking.
- Space: O(m * n) for the prefix map and recursion stack.

## Follow‑Up Questions
1. How would you adapt the solution for words of varying lengths?
2. Can you improve performance by using a Trie instead of a hash map for prefix queries?
3. How would you generate word squares when the input list is extremely large (e.g., streaming words)?

## Key Takeaway
Backtracking combined with a prefix map efficiently prunes invalid candidates, enabling construction of all valid word squares.
