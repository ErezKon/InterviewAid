# 2213. Longest Substring of One Repeating Character

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/longest-substring-of-one-repeating-character](https://leetcode.com/problems/longest-substring-of-one-repeating-character)
**Companies:** Pickrr

---

## 1. Problem Description

Given a string and update queries (change character at index), after each update return the length of the longest substring of one repeating character.

---

## 2. Approach: Segment Tree with Merge — O(n + q log n) ✅

```
// Each segment tree node stores:
//   leftChar, rightChar, leftLen, rightLen, maxLen, totalLen
// Merge: if left.rightChar == right.leftChar, combine the run
// Update: point update, then propagate merge info up
```

| Time | Space |
|------|-------|
| O(n + q · log n) | O(n) |

---

## 3. Key Takeaway

> Segment tree where each node tracks the longest run, plus prefix/suffix run info for merging across children. Point updates + pushup in O(log n).
