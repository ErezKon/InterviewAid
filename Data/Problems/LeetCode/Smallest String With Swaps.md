# 1202. Smallest String With Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-with-swaps](https://leetcode.com/problems/smallest-string-with-swaps)
**Companies:** Bloomberg, Google, Microsoft, Palantir, Paypal, Phonepe, Rubrik, Uber

---

## Problem Description

Given a string `s` and a list of index pairs where you can swap characters, return the lexicographically smallest string achievable after any number of swaps.

### Examples

- **Input:** `s = "dcab", pairs = [[0,3],[1,2]]` → **Output:** `"bacd"` (swap indices 0↔3 and 1↔2)
- **Input:** `s = "dcab", pairs = [[0,3],[1,2],[0,2]]` → **Output:** `"abcd"` (all connected, full sort)

## Approach: Union-Find + Sort Components — O(n log n) ✅

**Key Insight:** Characters in the same connected component can be freely rearranged → sort them independently.

```
FUNCTION smallestStringWithSwaps(s, pairs):
    uf = UnionFind(len(s))
    FOR [i, j] IN pairs:
        uf.union(i, j)

    // Group indices by component
    components = {}
    FOR i ← 0 TO n - 1:
        root = uf.find(i)
        components.setdefault(root, []).ADD(i)

    // Sort characters within each component
    result = list(s)
    FOR indices IN components.values():
        chars = SORT([s[i] for i in indices])
        sortedIndices = SORT(indices)
        FOR i, idx IN enumerate(sortedIndices):
            result[idx] = chars[i]

    RETURN JOIN(result)
```

### Complexity

| | |
|---|---|
| **Time** | O(n log n) |
| **Space** | O(n) |
