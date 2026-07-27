# 1061. Lexicographically Smallest Equivalent String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-equivalent-string](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

## 1. Problem Description

Given equivalence pairs from `s1[i]` and `s2[i]`, transform `baseStr` so each character is replaced by the smallest equivalent.

---

## 2. Approach: Union-Find — O(n) ✅

```
FUNCTION smallestEquivalentString(s1, s2, baseStr):
    uf = UnionFind(26)
    // Always make smaller char the root
    FOR a, b IN zip(s1, s2):
        uf.union(ord(a) - ord('a'), ord(b) - ord('a'))

    RETURN JOIN(chr(uf.find(ord(c) - ord('a')) + ord('a')) for c in baseStr)
```

| Time | Space |
|------|-------|
| O(n · α(26)) ≈ O(n) | O(26) = O(1) |

---

## 3. Key Takeaway

> Union-Find where the root is always the smallest character in each group. This ensures `find()` directly returns the lexicographically smallest equivalent.
