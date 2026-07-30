# 3167. Better Compression of String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/better-compression-of-string](https://leetcode.com/problems/better-compression-of-string)
**Companies:** Goldman Sachs, Riot Games

---

## Problem Description

Given a compressed string like `"a3b2c1a2"`, return the **sorted** compressed form by combining counts of repeated characters: `"a5b2c1"`.

---

## Approach

Parse character‑count pairs, aggregate in a map, sort by character, reconstruct. Standard string parsing pattern.

```text
FUNCTION betterCompression(compressed):
    // Map character → total count
    SET countMap ← empty map
    SET i ← 0
    WHILE i < LENGTH(compressed):
        SET ch ← compressed[i]
        SET i ← i + 1
        SET num ← 0
        WHILE i < LENGTH(compressed) AND IS_DIGIT(compressed[i]):
            SET num ← num * 10 + TO_INT(compressed[i])
            SET i ← i + 1
        SET countMap[ch] ← countMap.get(ch, 0) + num
    // Build sorted result
    SET result ← ""
    FOR each ch IN SORTED_KEYS(countMap):
        SET result ← result + ch + TO_STRING(countMap[ch])
    RETURN result
```

---

## Examples

| Input | Output |
|-------|--------|
| `"a3b2c1a2"` | `"a5b2c1"` |
| `"z1y2z3"`   | `"y2z4"` |

---

## Walkthrough

Take `"a3b2c1a2"`.

1. Parse `a3` → countMap[`a`] = 3
2. Parse `b2` → countMap[`b`] = 2
3. Parse `c1` → countMap[`c`] = 1
4. Parse `a2` → countMap[`a`] = 3 + 2 = 5
5. Sort keys → `a`, `b`, `c`
6. Concatenate → `"a5b2c1"`

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n + k log k) where n is input length, k ≤ 26 distinct chars | O(k) |

---

## Follow-Up Questions

1. How would you modify the algorithm to handle uppercase and lowercase as distinct characters?
2. Can you output the result without sorting, preserving original order of first appearance?
3. What if the counts can be very large (beyond 32‑bit)?

---

## Key Takeaway

> Parse character‑count pairs, aggregate in a map, sort by character, and rebuild the compressed string.
