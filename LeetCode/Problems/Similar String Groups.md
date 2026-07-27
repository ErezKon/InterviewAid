# 839. Similar String Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/similar-string-groups](https://leetcode.com/problems/similar-string-groups)
**Companies:** Amazon, Apple, Doordash, Google, Meta

---

## Problem Description

Two strings `X` and `Y` are **similar** if we can swap two letters (in different positions) of `X` to equal `Y`, or if `X == Y`.

A group of strings forms a **connected component** under this similarity relation. Given a list of strings `strs` (all anagrams of each other), return the number of groups.

### Examples

**Example 1:**
- **Input:** `strs = ["tars","rats","arts","star"]`
- **Output:** `2`
- **Explanation:** `"tars"` ~ `"rats"` ~ `"arts"` form one group. `"star"` forms another.

**Example 2:**
- **Input:** `strs = ["omv","ovm"]`
- **Output:** `1`

### Constraints

- `1 <= strs.length <= 300`
- `1 <= strs[i].length <= 300`
- All strings are anagrams of each other.

---

## Approach: Union-Find — O(n²·L) ✅

Check every pair of strings for similarity (exactly 0 or 2 positions differ). Union similar strings and count connected components.

```
FUNCTION numSimilarGroups(strs):
    uf = UnionFind(len(strs))

    FUNCTION isSimilar(a, b):
        diffs = SUM(1 for x, y in zip(a, b) if x != y)
        RETURN diffs == 0 OR diffs == 2

    FOR i ← 0 TO n - 1:
        FOR j ← i + 1 TO n - 1:
            IF isSimilar(strs[i], strs[j]):
                uf.union(i, j)

    RETURN number of distinct components
```

### Walkthrough — `strs = ["tars","rats","arts","star"]`

| Pair | diffs | Similar? | Union |
|------|-------|----------|-------|
| tars, rats | 2 (t↔r) | Yes | {0,1} |
| tars, arts | 2 (t↔a, a↔t) | Yes | {0,1,2} |
| tars, star | 4 | No | — |
| rats, star | 4 | No | — |
| arts, star | 4 | No | — |

Components: `{tars, rats, arts}`, `{star}` → Result: `2`

| Time | Space |
|------|-------|
| O(n² · L) | O(n) |

---

## Follow-up

- When `n` is large but `L` is small, the O(n²) pair check dominates. When `L` is large but `n` is small, generating all single-swap variants per string and checking membership in a set is faster: O(n · L²).
