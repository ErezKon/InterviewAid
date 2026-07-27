# 245. Shortest Word Distance III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-word-distance-iii](https://leetcode.com/problems/shortest-word-distance-iii)
**Companies:** Linkedin, Palantir

---

## Problem Description

Given an array of strings `wordsDict` and two strings `word1` and `word2`, return the shortest distance between these two words in the array.

Note that `word1` and `word2` **may be the same**. In that case, find the shortest distance between two different occurrences of the same word.

### Examples

**Example 1:**
- **Input:** `wordsDict = ["practice","makes","perfect","coding","makes"]`, `word1 = "makes"`, `word2 = "coding"`
- **Output:** `1`

**Example 2:**
- **Input:** `wordsDict = ["practice","makes","perfect","coding","makes"]`, `word1 = "makes"`, `word2 = "makes"`
- **Output:** `3`
- **Explanation:** The two occurrences of `"makes"` are at indices 1 and 4, distance = 3.

### Constraints

- `1 <= wordsDict.length <= 10⁵`
- `1 <= wordsDict[i].length <= 10`
- `word1` and `word2` are in `wordsDict`

---

## Approach: One Pass — O(n)

When `word1 == word2`, each new occurrence shifts the previous one to `idx1` and takes `idx2`. Otherwise, standard two-pointer tracking.

```
FUNCTION shortestWordDistance(wordsDict, word1, word2):
    minDist = infinity; idx1 = idx2 = -1
    FOR i, w IN enumerate(wordsDict):
        IF w == word1: 
            IF word1 == word2: idx1 = idx2; idx2 = i
            ELSE: idx1 = i
        ELSE IF w == word2: idx2 = i
        IF idx1 >= 0 AND idx2 >= 0 AND idx1 != idx2:
            minDist = MIN(minDist, ABS(idx1 - idx2))
    RETURN minDist
```

### Walkthrough — `word1 = "makes"`, `word2 = "makes"`

| i | word | idx1 | idx2 | dist | minDist |
|---|------|------|------|------|---------|
| 0 | practice | -1 | -1 | — | ∞ |
| 1 | makes | -1 | 1 | — | ∞ |
| 4 | makes | 1 | 4 | 3 | 3 |

Result: `3`

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-up

- See **Shortest Word Distance** (LC 243) for the simpler version where `word1 != word2`.
- See **Shortest Word Distance II** (LC 244) for a design problem supporting repeated queries.
