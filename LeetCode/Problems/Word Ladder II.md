# 126. Word Ladder II

**Difficulty:** 🔴 Hard
**Acceptance:** 27.0%
**LeetCode:** [https://leetcode.com/problems/word-ladder-ii](https://leetcode.com/problems/word-ladder-ii)
**Companies:** Amazon, Apple, Bloomberg, Box, Citadel, Google, Linkedin, Lyft, Meta, Microsoft, Nutanix, Okta, Tesla, Tiktok, Uber, Yelp

---

## 1. Problem Description

Find all shortest transformation sequences from `beginWord` to `endWord`, where each adjacent pair of words differs by one letter and every word is in `wordList`.

---

## 2. Approach: BFS + DFS Backtracking — O(N·26^L) ✅

1. **BFS** to find shortest distance from `beginWord` to all words (build a parent map).
2. **DFS/Backtracking** from `endWord` to `beginWord` using the parent map to reconstruct all shortest paths.

```
FUNCTION findLadders(beginWord, endWord, wordList):
    wordSet = SET(wordList)
    IF endWord NOT IN wordSet: RETURN []

    // BFS to build parent map
    parents = {}     // word → set of parent words
    queue = [beginWord]
    visited = {beginWord}
    found = false

    WHILE queue AND NOT found:
        levelVisited = set()
        FOR word IN queue:
            FOR each one-letter variation newWord:
                IF newWord == endWord: found = true
                IF newWord IN wordSet AND newWord NOT IN visited:
                    parents[newWord].ADD(word)
                    levelVisited.ADD(newWord)
        visited |= levelVisited
        queue = levelVisited

    // DFS to reconstruct paths
    result = []
    backtrack(endWord, beginWord, parents, [endWord], result)
    RETURN result

FUNCTION backtrack(word, beginWord, parents, path, result):
    IF word == beginWord:
        result.ADD(REVERSE(copy of path))
        RETURN
    FOR parent IN parents[word]:
        path.ADD(parent)
        backtrack(parent, beginWord, parents, path, result)
        path.REMOVE_LAST()
```

---

## Key Takeaway

> Two-phase approach: BFS finds shortest distances (and builds a DAG of parent pointers), DFS reconstructs all shortest paths from the DAG. Don't remove words from the set mid-level — track per-level visited to allow multiple parents.
