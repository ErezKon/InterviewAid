# 839. Similar String Groups

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/similar-string-groups](https://leetcode.com/problems/similar-string-groups)
**Companies:** Amazon, Apple, Doordash, Google, Meta

---

## Problem Description

Two strings, `X` and `Y`, are considered similar if either they are identical or we can make them equivalent by swapping at most two letters (in distinct positions) within the string `X`.

For example, `"tars"` and `"rats"` are similar (swapping at positions `0` and `2`), and `"rats"` and `"arts"` are similar, but `"star"` is not similar to `"tars"`, `"rats"`, or `"arts"`.

Together, these form two connected groups by similarity: `{"tars", "rats", "arts"}` and `{"star"}`.  Notice that `"tars"` and `"arts"` are in the same group even though they are not similar.  Formally, each group is such that a word is in the group if and only if it is similar to at least one other word in the group.

We are given a list `strs` of strings where every string in `strs` is an anagram of every other string in `strs`. How many groups are there?

**Constraints:**
- `1 <= strs.length <= 300`
- `1 <= strs[i].length <= 300`
- `strs[i]` consists of lowercase letters only.
- All words in `strs` have the same length and are anagrams of each other.

**Examples:**

**Example 1:**
```
Input: strs = ["tars","rats","arts","star"]
Output: 2
```

**Example 2:**
```
Input: strs = ["omv","ovm"]
Output: 1
```

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
