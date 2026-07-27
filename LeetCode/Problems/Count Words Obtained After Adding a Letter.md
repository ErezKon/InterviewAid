# 2135. Count Words Obtained After Adding a Letter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-words-obtained-after-adding-a-letter](https://leetcode.com/problems/count-words-obtained-after-adding-a-letter)
**Companies:** Google

---

## Problem Description

Given `startWords` and `targetWords`, count target words that can be formed by adding exactly one letter to some start word and rearranging.

---

## Key Insight

Since order doesn't matter, represent each word as a **bitmask** of 26 bits. A target is achievable if removing any one of its set bits yields a mask present in the start set.

---

## Approach

```
FUNCTION wordCount(startWords, targetWords):
    startSet = SET()
    FOR w IN startWords: startSet.ADD(bitmask(w))

    count = 0
    FOR w IN targetWords:
        mask = bitmask(w)
        FOR each set bit b in mask:
            IF (mask ^ (1 << b)) IN startSet:
                count += 1; BREAK

    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O((n + m) × 26) |
| **Space** | O(n) for start set |

---

## Key Takeaway

> **Bitmask representation for character sets ignores order. To check "add one letter and rearrange", try removing each bit from the target mask and look up in the start set.**
