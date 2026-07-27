# 411. Minimum Unique Word Abbreviation

**Difficulty:** 🔴 Hard

**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bitmask Enumeration — O(2ⁿ · m)](#3-approach-bitmask-enumeration)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given a target word and a dictionary, find the **shortest** abbreviation of `target` that doesn't match any word in the dictionary. An abbreviation replaces contiguous substrings with their lengths.

**Constraints:**
- `1 <= target.length <= 21`
- `1 <= dictionary.length <= 1000`

---

## 2. Key Insight

> Use a bitmask over target's characters: `1` = keep character, `0` = abbreviate. For each mask, generate the abbreviation string and check it doesn't match any dictionary word. Find the mask that yields the shortest valid abbreviation.

---

## 3. Approach: Bitmask Enumeration — O(2ⁿ · m) ✅

```
FUNCTION minAbbreviation(target, dictionary):
    n = len(target)
    // Precompute: for each dict word of same length, compute conflict bitmask
    // conflictMask[w] = bits where target[i] == w[i]
    // An abbreviation mask is valid if for every dict word,
    //   mask & conflictMask[w] != mask (at least one kept char differs)

    bestLen = infinity; bestAbbr = target
    FOR mask ← 0 TO (1 << n) - 1:
        abbr = generateAbbr(target, mask)
        IF len(abbr) >= bestLen: CONTINUE
        IF isValid(mask, conflictMasks):
            bestLen = len(abbr)
            bestAbbr = abbr

    RETURN bestAbbr
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(2ⁿ · m) — n = target length, m = dict size |
| **Space** | O(m) |

---

## 5. Key Takeaway

> **Bitmask over characters for abbreviation enumeration.** Conflict masks precompute which characters match each dictionary word. Valid abbreviation = at least one kept character differs from every dictionary word.
