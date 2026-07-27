# 1208. Get Equal Substrings Within Budget

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/get-equal-substrings-within-budget](https://leetcode.com/problems/get-equal-substrings-within-budget)
**Companies:** Ibm, Jpmorgan, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Sliding Window — O(n) ✅](#2-approach-sliding-window--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given strings `s` and `t` of equal length, find the longest substring of `s` that can be changed to the corresponding substring of `t` with total cost ≤ `maxCost`. Cost of changing `s[i]` to `t[i]` is `|s[i] - t[i]|`.

---

## 2. Approach: Sliding Window — O(n) ✅

```
FUNCTION equalSubstring(s, t, maxCost):
    left = 0; cost = 0; maxLen = 0
    FOR right ← 0 TO n - 1:
        cost += ABS(ord(s[right]) - ord(t[right]))
        WHILE cost > maxCost:
            cost -= ABS(ord(s[left]) - ord(t[left]))
            left += 1
        maxLen = MAX(maxLen, right - left + 1)
    RETURN maxLen
```

---

## 3. Key Takeaway

> Classic **sliding window with budget** — expand right, shrink left when cost exceeds budget. O(n) time.
