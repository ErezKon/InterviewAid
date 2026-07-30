# 1859. Sorting the Sentence

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/sorting-the-sentence](https://leetcode.com/problems/sorting-the-sentence)
**Companies:** Amazon, Google, Microsoft

---

## Problem Description

A sentence is shuffled with each word appended by its 1-indexed position. Reconstruct the original sentence.

### Examples

- **Input:** `s = "is2 sentence4 This1 a3"` → **Output:** `"This is a sentence"`
- **Input:** `s = "Myself2 Me1 I4 and3"` → **Output:** `"Me Myself and I"`

## Approach: Parse Position — O(n) ✅

```
FUNCTION sortSentence(s):
    words = s.split()
    result = [''] * len(words)
    FOR word IN words:
        result[int(word[-1]) - 1] = word[:-1]
    RETURN JOIN(result, ' ')
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |
