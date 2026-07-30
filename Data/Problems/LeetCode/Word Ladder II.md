# 126. Word Ladder II

**Difficulty:** 🔴 Hard
**Acceptance:** 27.0%
**LeetCode:** [https://leetcode.com/problems/word-ladder-ii](https://leetcode.com/problems/word-ladder-ii)
**Companies:** Amazon, Apple, Bloomberg, Box, Citadel, Google, Linkedin, Lyft, Meta, Microsoft, Nutanix, Okta, Tesla, Tiktok, Uber, Yelp

---

## 1. Problem Description

Find all shortest transformation sequences from `beginWord` to `endWord`, where each adjacent pair of words differs by one letter and every word is in `wordList`.

---

## 2. Examples

| beginWord | endWord | wordList | Output |
|-----------|---------|----------|--------|
| "hit" | "cog" | ["hot","dot","dog","lot","log","cog"] | [["hit","hot","dot","dog","cog"],["hit","hot","lot","log","cog"]] |
| "hit" | "cog" | ["hot","dot","dog","lot","log"] | [] |

*Explanation*: The first case has two shortest ladders of length 5. The second case is impossible because `cog` is missing.

---

## 3. Approach: BFS + DFS Backtracking — O(N·26^L) ✅

1. **BFS** to find shortest distance from `beginWord` to all words (build a parent map).
2. **DFS/Backtracking** from `endWord` to `beginWord` using the parent map to reconstruct all shortest paths.

```text
FUNCTION findLadders(beginWord, endWord, wordList):
    wordSet ← SET(wordList)
    IF endWord NOT IN wordSet: RETURN []

    parents ← MAP()               // word → SET of parent words
    queue ← [beginWord]
    visited ← {beginWord}
    found ← false

    WHILE queue NOT EMPTY AND NOT found:
        levelVisited ← SET()
        FOR word IN queue:
            FOR each one-letter variation newWord:
                IF newWord == endWord: found ← true
                IF newWord IN wordSet AND newWord NOT IN visited:
                    parents[newWord].ADD(word)
                    levelVisited.ADD(newWord)
        visited ← visited ∪ levelVisited
        queue ← LIST(levelVisited)

    result ← []
    backtrack(endWord, beginWord, parents, [endWord], result)
    RETURN result

FUNCTION backtrack(word, beginWord, parents, path, result):
    IF word == beginWord:
        result.ADD(REVERSE(COPY(path)))
        RETURN
    FOR parent IN parents[word]:
        path.ADD(parent)
        backtrack(parent, beginWord, parents, path, result)
        path.REMOVE_LAST()
```

---

## 4. Walkthrough

Consider the first example. BFS builds the following parent map (partial):

| Word | Parents |
|------|---------|
| "hot" | {"hit"} |
| "dot" | {"hot"} |
| "lot" | {"hot"} |
| "dog" | {"dot"} |
| "log" | {"lot"} |
| "cog" | {"dog", "log"} |

DFS starts from `cog` and walks back using parents, generating two paths:
1. `cog` → `dog` → `dot` → `hot` → `hit`
2. `cog` → `log` → `lot` → `hot` → `hit`
Both are reversed to produce the final ladders.

---

## 5. Complexity Analysis

- **Time**: BFS O(N·26^L) where N is number of words and L is word length; DFS enumerates all shortest paths, proportional to number of results.
- **Space**: O(N·L) for the parent map and BFS queue.

---

## 6. Follow-Up Questions

1. How would you modify the algorithm to return only one shortest ladder?
2. Can you adapt the solution for weighted transformations where each letter change has a cost?
3. How would you handle very large word lists that cannot fit in memory?

---

## Key Takeaway

> Two-phase approach: BFS finds shortest distances (and builds a DAG of parent pointers), DFS reconstructs all shortest paths from the DAG. Don't remove words from the set mid-level — track per-level visited to allow multiple parents.
