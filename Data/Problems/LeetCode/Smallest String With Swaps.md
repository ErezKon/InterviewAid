# 1202. Smallest String With Swaps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/smallest-string-with-swaps](https://leetcode.com/problems/smallest-string-with-swaps)
**Companies:** Bloomberg, Google, Microsoft, Palantir, Paypal, Phonepe, Rubrik, Uber

---

## Problem Description

You are given a string `s`, and an array of pairs of indices in the string `pairs` where `pairs[i] = [a, b]` indicates 2 indices (0-indexed) of the string.

You can swap the characters at any pair of indices in the given `pairs` **any number of times**.

Return the lexicographically smallest string that `s` can be changed to after using the swaps.

**Constraints:**
- `1 <= s.length <= 10^5`
- `0 <= pairs.length <= 10^5`
- `0 <= pairs[i][0], pairs[i][1] < s.length`
- `s` only contains lower case English letters.

### Examples

```
Example 1:
  Input: s = "dcab", pairs = [[0,3],[1,2]]
  Output: "bacd"
  Explanation:
    Swap s[0] and s[3], s = "bcad"
    Swap s[1] and s[2], s = "bacd"
```

```
Example 2:
  Input: s = "dcab", pairs = [[0,3],[1,2],[0,2]]
  Output: "abcd"
  Explanation:
    Swap s[0] and s[3], s = "bcad"
    Swap s[0] and s[2], s = "acbd"
    Swap s[1] and s[2], s = "abcd"
```

```
Example 3:
  Input: s = "cba", pairs = [[0,1],[1,2]]
  Output: "abc"
  Explanation:
    Swap s[0] and s[1], s = "bca"
    Swap s[1] and s[2], s = "bac"
    Swap s[0] and s[1], s = "abc"
```

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
