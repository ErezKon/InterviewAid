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

You are given two strings `s` and `t` of the same length and an integer `maxCost`.

You want to change `s` to `t`. Changing the `i`th character of `s` to `i`th character of `t` costs `|s[i] - t[i]|` (i.e., the absolute difference between the ASCII values of the characters).

Return *the maximum length of a substring of* `s` *that can be changed to be the same as the corresponding substring of* `t` *with a cost less than or equal to* `maxCost`. If there is no substring from `s` that can be changed to its corresponding substring from `t`, return `0`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `t.length == s.length`
- `0 <= maxCost <= 10^6`
- `s` and `t` consist of only lowercase English letters.

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

```
Example 1:
  Input: s = "abcd", t = "bcdf", maxCost = 3
  Output: 3
  Explanation: "abc" of s can change to "bcd".
  That costs 3, so the maximum length is 3.
```
```
Example 2:
  Input: s = "abcd", t = "cdef", maxCost = 3
  Output: 1
  Explanation: Each character in s costs 2 to change to character in t, so the maximum length is 1.
```
```
Example 3:
  Input: s = "abcd", t = "acde", maxCost = 0
  Output: 1
  Explanation: You cannot make any change, so the maximum length is 1.
```

## Walkthrough

1. Initialize `left = 0`, `cost = 0`, `maxLen = 0`.
2. Expand `right` pointer, adding the cost of converting `s[right]` to `t[right]`.
3. If `cost` exceeds `maxCost`, shrink the window by moving `left` forward and subtracting the leftmost cost.
4. After each expansion, update `maxLen` with the current window size `right - left + 1`.
5. Continue until `right` reaches the end of the strings; `maxLen` holds the longest valid substring length.

## Complexity Analysis

- **Time:** O(n) – each character is visited at most twice (once by `right`, once by `left`).
- **Space:** O(1) – only a few integer variables are used.

## Follow-Up Questions

- How would you adapt the solution if the cost function were non-linear?
- Can you extend the approach to handle multiple strings simultaneously?
- What if you needed to return the actual substring instead of its length?

---

## Key Takeaway

> Classic **sliding window with budget** — expand right, shrink left when cost exceeds budget. O(n) time.
