# 2301. Match Substring After Replacement

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/match-substring-after-replacement](https://leetcode.com/problems/match-substring-after-replacement)
**Companies:** Discord

---

## 1. Problem Description

Check if `sub` can match some substring of `s` after allowed character replacements (given as mapping pairs).

---

## 2. Approach: Brute Force with Mapping Set — O(n·m) ✅

```
// Build set of allowed replacements: (old, new) pairs
// For each starting position in s, check if sub matches character by character
// A character matches if equal or replacement (sub[j] → s[i+j]) is allowed
```

| Time | Space |
|------|-------|
| O(n · m) | O(|mappings|) |

---

## 3. Key Takeaway

> Pre-build a set of allowed (old→new) pairs. Slide `sub` over `s` and check each position. Each character match is O(1) via set lookup.
