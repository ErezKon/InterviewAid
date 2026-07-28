# 2743. Count Substrings Without Repeating Character

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-substrings-without-repeating-character](https://leetcode.com/problems/count-substrings-without-repeating-character)
**Companies:** Yandex

---

## Problem Description

Given a string `s`, return the number of substrings that have **no repeating characters** (all characters are unique).

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "abc"` | `6` | All substrings are unique: `a`, `b`, `c`, `ab`, `bc`, `abc`.
| `s = "aba"` | `5` | Valid substrings: `a`(pos0), `b`, `a`(pos2), `ab`, `ba`.

---

## Approach

```text
FUNCTION countSubstrings(s):
    SET left ← 0; SET result ← 0
    SET seen ← {}  // map char → last index
    FOR right ← 0 TO LENGTH(s) - 1 DO
        IF s[right] IN seen AND seen[s[right]] ≥ left:
            SET left ← seen[s[right]] + 1
        SET seen[s[right]] ← right
        SET result ← result + (right - left + 1)
    RETURN result
```

---

## Walkthrough

Consider `s = "aba"`.

| step | left | right | char | window | result |
|------|------|-------|------|--------|--------|
| init | 0 | - | - | '' | 0 |
| 1 | 0 | 0 | `a` | `a` | +1 → 1 |
| 2 | 0 | 1 | `b` | `ab` | +2 → 3 |
| 3 | 0 | 2 | `a` (repeat) | move left to 1, window `ba` | +2 → 5 |

The sum of window lengths gives the total count `5`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(σ) where σ is alphabet size (≤26 for lowercase) |

---

## Follow-Up Questions

1. How would the solution change for Unicode characters with a large alphabet?
2. Can you adapt the algorithm to return the **longest** substring without repeating characters instead of counting all?
3. What if you need to count substrings with at most `k` distinct characters?

---

## Key Takeaway

> **Counting all-unique-character substrings = sliding window tracking last seen index. Each position contributes `window_length` valid substrings ending there.**