# 127. Word Ladder

**Difficulty:** 🔴 Hard
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/word-ladder](https://leetcode.com/problems/word-ladder)
**Companies:** Adobe, Amazon, Apple, Arcesium, Bloomberg, Box, Bytedance, Capital One, Citadel, Clevertap, Docusign, Ebay, Expedia, Fanatics, Flipkart, Goldman Sachs, Google, Linkedin, Makemytrip, Meta, Microsoft, Navan, Okta, Oracle, Phonepe, Reddit, Salesforce, Samsung, Servicenow, Snapchat, Sofi, Tcs, Tekion, Tesla, The Trade Desk, Tiktok, Uber, Visa, Yelp, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: BFS — O(M²·N) ✅](#3-approach-1-bfs--om²n-)
4. [Approach 2: Bidirectional BFS — O(M²·N)](#4-approach-2-bidirectional-bfs--om²n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

A **transformation sequence** from word `beginWord` to word `endWord` using a dictionary `wordList` is a sequence of words where:
- The first word is `beginWord`.
- The last word is `endWord`.
- Every adjacent pair of words differs by a **single letter**.
- Every word in the sequence (except `beginWord`) is in `wordList`.

Return the **number of words** in the **shortest transformation sequence**, or `0` if no such sequence exists.

**Constraints:**
- `1 <= beginWord.length <= 10`
- `endWord.length == beginWord.length`
- `1 <= wordList.length <= 5000`
- All words have the same length.
- All words consist of lowercase English letters.
- `beginWord != endWord`

---

## 2. Examples

```
Example 1:
  Input:  beginWord = "hit", endWord = "cog",
          wordList = ["hot","dot","dog","lot","log","cog"]
  Output: 5
  Reason: "hit" → "hot" → "dot" → "dog" → "cog"

Example 2:
  Input:  beginWord = "hit", endWord = "cog",
          wordList = ["hot","dot","dog","lot","log"]
  Output: 0
  Reason: endWord "cog" is not in wordList.
```

---

## 3. Approach 1: BFS — O(M²·N) ✅

### Key Insight

This is a **shortest path** problem in an unweighted graph. Each word is a node; edges connect words differing by one letter. BFS finds the shortest path.

### Building Adjacency via Wildcard Patterns

Instead of comparing every pair of words (O(N²·M)), map each word to wildcard patterns. E.g., `"hot"` → `"*ot"`, `"h*t"`, `"ho*"`. Words sharing a pattern are neighbors.

### Pseudocode

```
FUNCTION ladderLength(beginWord, endWord, wordList):

    IF endWord NOT IN wordList:
        RETURN 0

    // Build adjacency: pattern → list of words
    patternMap = {}
    wordSet = SET(wordList)
    wordSet.ADD(beginWord)

    FOR word IN wordSet:
        FOR i ← 0 TO len(word) - 1:
            pattern = word[0..i-1] + "*" + word[i+1..end]
            patternMap[pattern].ADD(word)

    // BFS
    queue = [(beginWord, 1)]
    visited = {beginWord}

    WHILE queue not empty:
        (word, level) = queue.DEQUEUE()

        FOR i ← 0 TO len(word) - 1:
            pattern = word[0..i-1] + "*" + word[i+1..end]

            FOR neighbor IN patternMap[pattern]:
                IF neighbor == endWord:
                    RETURN level + 1

                IF neighbor NOT IN visited:
                    visited.ADD(neighbor)
                    queue.ENQUEUE((neighbor, level + 1))

    RETURN 0
```

---

## 4. Approach 2: Bidirectional BFS — O(M²·N)

Start BFS from both `beginWord` and `endWord` simultaneously. At each step, expand the **smaller frontier**. When the two frontiers meet, the shortest path is found.

```
FUNCTION ladderLength(beginWord, endWord, wordList):

    IF endWord NOT IN wordList:
        RETURN 0

    frontSet = {beginWord}
    backSet  = {endWord}
    wordSet  = SET(wordList)
    visited  = {}
    level = 1

    WHILE frontSet AND backSet:
        // Always expand the smaller set
        IF len(frontSet) > len(backSet):
            SWAP(frontSet, backSet)

        nextSet = {}
        FOR word IN frontSet:
            FOR i ← 0 TO len(word) - 1:
                FOR c ← 'a' TO 'z':
                    newWord = word[0..i-1] + c + word[i+1..end]

                    IF newWord IN backSet:
                        RETURN level + 1

                    IF newWord IN wordSet AND newWord NOT IN visited:
                        visited.ADD(newWord)
                        nextSet.ADD(newWord)

        frontSet = nextSet
        level += 1

    RETURN 0
```

This dramatically reduces the search space — instead of exploring a sphere of radius `d`, we explore two spheres of radius `d/2`.

---

## 5. Walkthrough

```
beginWord = "hit", endWord = "cog"
wordList = ["hot","dot","dog","lot","log","cog"]

BFS:
Level 1: "hit"
Level 2: "hot" (h→h, i→o, t→t = differs by 1)
Level 3: "dot", "lot" (each differs from "hot" by 1)
Level 4: "dog", "log" (each differs from "dot"/"lot" by 1)
Level 5: "cog" (differs from "dog" or "log" by 1) → RETURN 5

Path: hit → hot → dot → dog → cog ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS | O(M² · N) | O(M² · N) |
| Bidirectional BFS | O(M² · N) but faster in practice | O(M · N) |

Where M = word length, N = number of words.

---

## 7. Follow-Up Questions

### 7.1 Word Ladder II (LeetCode #126)

Return **all shortest** transformation sequences. Use BFS to find the shortest distance, then DFS/backtracking to reconstruct all paths of that length. Track parent mappings during BFS.

### 7.2 What if words can differ by more than one letter per step?

Define a custom distance function. If distance ≤ k per step, build edges accordingly. BFS still works for shortest path in an unweighted graph.

### 7.3 What if the word list is very large?

- Use bidirectional BFS to reduce exploration.
- Instead of wildcard patterns, try all 26 letter substitutions per position — avoids building the pattern map upfront.

### 7.4 How does this relate to edit distance?

Word Ladder uses **Hamming distance** (substitution only, same length). Edit distance (Levenshtein) also allows insertion and deletion. Edit distance is typically solved with DP, not BFS.

---

## Key Takeaway

> Word Ladder is **graph BFS on an implicit graph**. The key trick is efficiently finding neighbors — either via wildcard patterns (O(M) per word) or trying all 26 substitutions per position (O(26·M) per word). Bidirectional BFS is the optimization to mention in interviews.
