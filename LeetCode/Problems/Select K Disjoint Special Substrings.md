# 3458. Select K Disjoint Special Substrings

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/select-k-disjoint-special-substrings](https://leetcode.com/problems/select-k-disjoint-special-substrings)
**Companies:** Amazon

---

## Problem Description

Given a string `s` and integer `k`, determine if you can select `k` **disjoint special substrings**. A substring is "special" if it contains all occurrences of every character that appears in it (i.e., no character appears both inside and outside the substring).

---

## Key Insight

> For each character, its "special span" is the range `[first_occurrence, last_occurrence]`. A valid special substring must include the full span of every character it contains. Expand intervals greedily, then find the maximum number of non-overlapping valid intervals ≥ k.

---

## Approach

```
FUNCTION maxDisjointSubstrings(s, k):
    // Find first/last occurrence of each char
    // Expand each starting char's interval until stable
    // Collect all minimal valid intervals
    // Greedy interval scheduling: sort by end, pick non-overlapping
    RETURN count >= k
```

---

## Key Takeaway

> "Special substrings" require interval closure — expand until all characters' full ranges are included. Then it reduces to the classic **interval scheduling** problem (max non-overlapping intervals).
