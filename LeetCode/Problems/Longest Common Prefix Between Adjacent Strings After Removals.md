# 3598. Longest Common Prefix Between Adjacent Strings After Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals](https://leetcode.com/problems/longest-common-prefix-between-adjacent-strings-after-removals)
**Companies:** Amazon

---

## 1. Problem Description

Given an array of strings, for each removal of one string, find the max LCP between any pair of adjacent strings in the resulting array.

---

## 2. Approach: Precompute Adjacent LCPs ✅

```
// Precompute lcp[i] = LCP(words[i], words[i+1]) for all adjacent pairs
// For each removal of words[j]:
//   New adjacent pairs: (j-1, j+1) replaces (j-1,j) and (j,j+1)
//   Compute LCP(words[j-1], words[j+1]) on the fly
//   Answer = max of all remaining lcp values
// Use prefix/suffix max for efficiency
```

| Time | Space |
|------|-------|
| O(n · L) where L = max string length | O(n) |

---

## 3. Key Takeaway

> Precompute all adjacent LCPs. On removal, only two pairs change. Use prefix max and suffix max arrays to query the max over remaining pairs in O(1).
