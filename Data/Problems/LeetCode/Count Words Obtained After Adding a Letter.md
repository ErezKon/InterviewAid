# 2135. Count Words Obtained After Adding a Letter

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-words-obtained-after-adding-a-letter](https://leetcode.com/problems/count-words-obtained-after-adding-a-letter)
**Companies:** Google

---

## Problem Description

Given `startWords` and `targetWords`, count target words that can be formed by adding exactly one letter to some start word and rearranging.

---

## Examples

**Example 1:**
```
startWords = ["ant","act","tack"]
targetWords = ["tack","act","acti"]
Output: 2
Explanation:
- "tack" can be formed by adding 'k' to "act" and rearranging.
- "acti" can be formed by adding 'i' to "act" and rearranging.
- "tack" is also a start word, but we need to add a letter, so it does not count.
```

**Example 2:**
```
startWords = ["ab","a"]
targetWords = ["abc","abd","abf","abg"]
Output: 4
Explanation: Adding 'c', 'd', 'f', or 'g' to "ab" yields each target word.
```

---

## Key Insight

Since order doesn't matter, represent each word as a **bitmask** of 26 bits. A target is achievable if removing any one of its set bits yields a mask present in the start set.

---

## Approach

```text
FUNCTION wordCount(startWords, targetWords):
    startSet ← SET()
    FOR w IN startWords:
        startSet.ADD(bitmask(w))

    count ← 0
    FOR w IN targetWords:
        mask ← bitmask(w)
        FOR each set bit b IN mask:
            IF (mask XOR (1 LEFT_SHIFT b)) IN startSet:
                count ← count + 1
                BREAK
    RETURN count
```

---

## Walkthrough

**Using Example 1**
| Step | Action | Explanation |
|------|--------|-------------|
| 1 | Build `startSet` | Convert "ant", "act", "tack" to bitmasks and store in a set. |
| 2 | Process target "tack" | Its mask has bits for {a,c,k,t}. Remove each bit:
- Remove 'a' → mask for {c,k,t} not in set
- Remove 'c' → {a,k,t} not in set
- Remove 'k' → {a,c,t} matches mask of "act" → count++ |
| 3 | Process target "act" | Removing any bit never matches a start mask (needs addition), so skip. |
| 4 | Process target "acti" | Mask {a,c,i,t}. Removing 'i' yields {a,c,t} which matches "act" → count++ |
| 5 | Final count | 2 targets are reachable. |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O((n + m) × 26) |
| **Space** | O(n) for start set |

---

## Follow-Up Questions

- How would you modify the solution if you could add **multiple** letters?
- Can this approach be extended to handle deletions instead of additions?
- What if the alphabet size is larger than 26 (e.g., Unicode characters)?

---

## Key Takeaway

> **Bitmask representation for character sets ignores order. To check "add one letter and rearrange", try removing each bit from the target mask and look up in the start set.**