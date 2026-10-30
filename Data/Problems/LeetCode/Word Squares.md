# 425. Word Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/word-squares](https://leetcode.com/problems/word-squares)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array of **unique** strings `words`, return *all the ***word squares*** you can build from *`words`. The same word from `words` can be used **multiple times**. You can return the answer in **any order**.

A sequence of strings forms a valid **word square** if the `k^th` row and column read the same string, where `0 <= k < max(numRows, numColumns)`.

- For example, the word sequence `["ball","area","lead","lady"]` forms a word square because each word reads the same both horizontally and vertically.

**Constraints:**
- `1 <= words.length <= 1000`
- `1 <= words[i].length <= 4`
- All `words[i]` have the same length.
- `words[i]` consists of only lowercase English letters.
- All `words[i]` are **unique**.

## Examples

**Example 1:**
```
Input: words = ["area","lead","wall","lady","ball"]
Output: [["ball","area","lead","lady"],["wall","area","lead","lady"]]
Explanation: The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).
```

**Example 2:**
```
Input: words = ["abat","baba","atan","atal"]
Output: [["baba","abat","baba","atal"],["baba","abat","baba","atan"]]
Explanation: The output consists of two word squares. The order of output does not matter (just the order of words in each word square matters).
```

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
