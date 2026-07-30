# 2904. Shortest and Lexicographically Smallest Beautiful String

**Difficulty:** 🟡 Medium

**Companies:** Ibm, Wells Fargo, Yelp
---

## Problem Description

Given a binary string `s` and an integer `k`, find the shortest substring that contains exactly `k` ones. If multiple substrings have the same minimal length, return the lexicographically smallest one.

---

## Approach

```
FUNCTION shortestBeautifulSubstring(s, k):
    best ← ''
    minLen ← INFINITY
    left ← 0
    ones ← 0
    FOR right ← 0 TO len(s) - 1:
        ones ← ones + (s[right] == '1')
        WHILE ones > k OR (left <= right AND s[left] == '0'):
            ones ← ones - (s[left] == '1')
            left ← left + 1
        IF ones == k:
            sub ← s[left : right + 1]
            IF len(sub) < minLen OR (len(sub) == minLen AND sub < best):
                minLen ← len(sub)
                best ← sub
    RETURN best
```

---

## Examples

**Example 1:**
```
Input: s = "0100101", k = 2
Output: "0010"
Explanation: The substring "0010" (indices 2‑5) has exactly two ones and is the shortest possible.
```

**Example 2:**
```
Input: s = "111", k = 2
Output: "11"
Explanation: Both "11" substrings have length 2; the leftmost is returned.
```

---

## Walkthrough

| Step | right | left | ones | Current Substring | Action |
|------|-------|------|------|-------------------|--------|
| 1 | 0 | 0 | 0 | "0" | ones < k, continue |
| 2 | 1 | 0 | 1 | "01" | ones < k |
| 3 | 2 | 0 | 1 | "010" | ones < k |
| 4 | 3 | 0 | 2 | "0100" | ones == k → candidate "0100" (len 4) |
| 5 | 4 | 1 | 2 | "1001" | shrink left while possible, best remains "0010" after later steps |
| ... | ... | ... | ... | ... | ... |

The algorithm slides the window, maintaining exactly `k` ones and updating the best substring.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) — single pass over the string | O(1) |

---

## Follow-Up Questions

1. How would you modify the solution to handle substrings with **at most** `k` ones?
2. Can the approach be extended to find the longest substring with exactly `k` ones?

---

## Key Takeaway

> A sliding‑window maintains the count of ones, allowing O(n) identification of the shortest qualifying substring while handling tie‑breaking lexicographically.
