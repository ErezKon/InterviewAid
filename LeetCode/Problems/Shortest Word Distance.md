# 243. Shortest Word Distance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/shortest-word-distance](https://leetcode.com/problems/shortest-word-distance)
**Companies:** Amazon, Anduril, Apple, Linkedin, Microsoft, Patreon, Snowflake, Wix

---

## Problem Description

Given an array of strings `wordsDict` and two different strings `word1` and `word2` that both exist in the array, return the shortest distance between these two words in the array.

The distance between two words at indices `i` and `j` is `|i - j|`.

### Examples

**Example 1:**
- **Input:** `wordsDict = ["practice","makes","perfect","coding","makes"]`, `word1 = "coding"`, `word2 = "practice"`
- **Output:** `3`

**Example 2:**
- **Input:** `wordsDict = ["practice","makes","perfect","coding","makes"]`, `word1 = "makes"`, `word2 = "coding"`
- **Output:** `1`

### Constraints

- `2 <= wordsDict.length <= 3 × 10⁴`
- `word1 != word2`
- `word1` and `word2` are both in `wordsDict`

---

## Approach: One Pass — O(n) ✅

Track the most recent index of each word. Whenever both have been seen, update the minimum distance.

```
FUNCTION shortestDistance(wordsDict, word1, word2):
    idx1 = idx2 = -1
    minDist = infinity

    FOR i, word IN enumerate(wordsDict):
        IF word == word1: idx1 = i
        IF word == word2: idx2 = i
        IF idx1 != -1 AND idx2 != -1:
            minDist = MIN(minDist, ABS(idx1 - idx2))

    RETURN minDist
```

### Walkthrough — `word1 = "makes"`, `word2 = "coding"`

| i | word | idx1 | idx2 | dist | minDist |
|---|------|------|------|------|---------|
| 0 | practice | -1 | -1 | — | ∞ |
| 1 | makes | 1 | -1 | — | ∞ |
| 3 | coding | 1 | 3 | 2 | 2 |
| 4 | makes | 4 | 3 | 1 | 1 |

Result: `1`

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

### Follow-ups

- **#244 (Shortest Word Distance II)**: Multiple queries → precompute indices, two-pointer merge.
- **#245 (Shortest Word Distance III)**: word1 == word2 possible → track previous index.
