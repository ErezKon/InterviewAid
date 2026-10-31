# 1061. Lexicographically Smallest Equivalent String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lexicographically-smallest-equivalent-string](https://leetcode.com/problems/lexicographically-smallest-equivalent-string)
**Companies:** Amazon, Bloomberg, Cloudera, Google, Meta

---

## Problem Description

You are given two strings of the same length `s1` and `s2` and a string `baseStr`.

We say `s1[i]` and `s2[i]` are equivalent characters.

- For example, if `s1 = "abc"` and `s2 = "cde"`, then we have `'a' == 'c'`, `'b' == 'd'`, and `'c' == 'e'`.

Equivalent characters follow the usual rules of any equivalence relation:

- **Reflexivity:** `'a' == 'a'`.
- **Symmetry:** `'a' == 'b'` implies `'b' == 'a'`.
- **Transitivity:** `'a' == 'b'` and `'b' == 'c'` implies `'a' == 'c'`.

For example, given the equivalency information from `s1 = "abc"` and `s2 = "cde"`, `"acd"` and `"aab"` are equivalent strings of `baseStr = "eed"`, and `"aab"` is the lexicographically smallest equivalent string of `baseStr`.

Return *the lexicographically smallest equivalent string of* `baseStr` *by using the equivalency information from* `s1` *and* `s2`.

**Constraints:**
- `1 <= s1.length, s2.length, baseStr <= 1000`
- `s1.length == s2.length`
- `s1`, `s2`, and `baseStr` consist of lowercase English letters.

## Examples

```
Example 1:
  Input: s1 = "parker", s2 = "morris", baseStr = "parser"
  Output: "makkek"
  Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [m,p], [a,o], [k,r,s], [e,i].
  The characters in each group are equivalent and sorted in lexicographical order.
  So the answer is "makkek".
```

```
Example 2:
  Input: s1 = "hello", s2 = "world", baseStr = "hold"
  Output: "hdld"
  Explanation: Based on the equivalency information in s1 and s2, we can group their characters as [h,w], [d,e,o], [l,r].
  So only the second letter 'o' in baseStr is changed to 'd', the answer is "hdld".
```

```
Example 3:
  Input: s1 = "leetcode", s2 = "programs", baseStr = "sourcecode"
  Output: "aauaaaaada"
  Explanation: We group the equivalent characters in s1 and s2 as [a,o,e,r,s,c], [l,p], [g,t] and [d,m],
  thus all letters in baseStr except 'u' and 'd' are transformed to 'a', the answer is "aauaaaaada".
```

## Approach

Union-Find with smallest-root invariant — O(n) ✅

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

> Union-Find where the root is always the smallest character in each group ensures direct retrieval of the lexicographically smallest equivalent.
