# 425. Word Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/word-squares](https://leetcode.com/problems/word-squares)
**Companies:** Google

---

## Problem Description
Given a list of unique words of the same length, construct all possible word squares. A word square is an arrangement of words such that the kth row and kth column read the same string for all k.

## Examples
**Example 1:**
Input: ["area","lead","wall","lady","ball"]
Output: [["wall","area","lead","lady"],["ball","area","lead","lady"]]
Explanation: Both squares satisfy the symmetric property.

**Example 2:**
Input: ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atal"]]

## Approach
Use backtracking combined with a Trie to efficiently find candidate words sharing a required prefix.

```text
FUNCTION wordSquares(words):
    trie ← buildTrie(words)
    result ← []
    FOR w IN words:
        backtrack([w], trie, result)
    RETURN result

FUNCTION backtrack(square, trie, result):
    IF LENGTH(square) == LENGTH(square[0]):
        result.ADD(copy(square))
        RETURN
    idx ← LENGTH(square)
    prefix ← "".JOIN(square[i][idx] FOR i FROM 0 TO idx-1)
    FOR candidate IN trie.getWordsWithPrefix(prefix):
        square.ADD(candidate)
        backtrack(square, trie, result)
        square.REMOVE_LAST()
```

## Walkthrough
| Step | Square so far | Needed prefix | Candidates |
|------|---------------|---------------|------------|
| 1 | ["wall"] | "a" (col 1) | ["area"] |
| 2 | ["wall","area"] | "le" (col 2) | ["lead"] |
| 3 | ["wall","area","lead"] | "lad" (col 3) | ["lady"] |
| 4 | Completed square |

## Complexity Analysis
Time: O(N·L·26^L) where N is number of words and L is word length (Trie lookup is O(L)).
Space: O(N·L) for the Trie plus O(L²) for recursion stack.

## Follow-Up Questions
1. How would you modify the algorithm for words of varying lengths?
2. Can you generate word squares using only a dictionary API without building a Trie?
3. What is the impact of using a hash map of prefixes instead of a Trie?

## Key Takeaway
Backtracking with a prefix‑search structure (Trie) prunes the search space dramatically, enabling efficient construction of word squares.
