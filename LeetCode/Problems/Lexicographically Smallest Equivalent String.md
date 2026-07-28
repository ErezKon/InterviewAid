# 1061. Lexicographically Smallest Equivalent String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-equivalent-string](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

## Problem Description

Given two strings `s1` and `s2` of equal length representing equivalence pairs of characters, and a `baseStr`, replace each character in `baseStr` with the smallest character in its equivalence class to obtain the lexicographically smallest possible result.

## Examples

| s1 | s2 | baseStr | Output |
|----|----|----------|--------|
| "parker" | "morris" | "parser" | "makkek" |
| "hello" | "world" | "hold" | "hdld" |

*Explanation*: Characters are grouped via union‑find; each group’s root is the smallest character, which is used for replacement.

## Approach

Union‑Find with smallest‑root invariant — O(n) ✅

```text
FUNCTION smallestEquivalentString(s1, s2, baseStr):
    uf ← UnionFind(26)
    // Ensure the smaller character becomes the root
    FOR a, b IN zip(s1, s2):
        SET idxA ← ord(a) - ord('a')
        SET idxB ← ord(b) - ord('a')
        uf.union(idxA, idxB)
    // Build result using the smallest root for each character
    SET result ← ""
    FOR c IN baseStr:
        SET rootIdx ← uf.find(ord(c) - ord('a'))
        APPEND chr(rootIdx + ord('a')) TO result
    RETURN result
```

## Walkthrough

For `s1 = "parker"`, `s2 = "morris"`, `baseStr = "parser"`:

1. Union pairs: (p,m), (a,o), (r,r), (k,r), (e,i), (r,s).
2. After unions, each set’s root is the smallest character: `{a,o}` → a, `{e,i}` → e, `{k,m,p,r,s}` → k, etc.
3. Replace each char in `parser` using roots: p→k, a→a, r→k, s→k, e→e, r→k → result `makkek`.

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n · α(26)) ≈ O(n) | O(26) = O(1) |

## Follow-Up Questions

1. How would you handle Unicode characters beyond the English alphabet?
2. Can the approach be extended to support dynamic updates to equivalence pairs?
3. What if the goal were the lexicographically **largest** equivalent string?

## Key Takeaway

> Union‑Find where the root is always the smallest character in each group ensures direct retrieval of the lexicographically smallest equivalent.
