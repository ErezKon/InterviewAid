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

## 2. Approach: Sliding Window — O(n) ✅

```text
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

## Examples

| s | t | maxCost | Expected Output |
|---|---|---------|-----------------|
| "abcd" | "bcdf" | 3 | 3 |
| "abcd" | "cdef" | 3 | 1 |
| "abcd" | "acde" | 0 | 1 |

## Walkthrough

1. Initialize `left = 0`, `cost = 0`, `maxLen = 0`.
2. Expand `right` pointer, adding the cost of converting `s[right]` to `t[right]`.
3. If `cost` exceeds `maxCost`, shrink the window by moving `left` forward and subtracting the leftmost cost.
4. After each expansion, update `maxLen` with the current window size `right - left + 1`.
5. Continue until `right` reaches the end of the strings; `maxLen` holds the longest valid substring length.

## Complexity Analysis

- **Time:** O(n) – each character is visited at most twice (once by `right`, once by `left`).
- **Space:** O(1) – only a few integer variables are used.

## Follow‑Up Questions

- How would you adapt the solution if the cost function were non‑linear?
- Can you extend the approach to handle multiple strings simultaneously?
- What if you needed to return the actual substring instead of its length?

---

## Key Takeaway

> Classic **sliding window with budget** — expand right, shrink left when cost exceeds budget. O(n) time.
