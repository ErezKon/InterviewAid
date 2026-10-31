# 1180. Count Substrings with Only One Distinct Letter

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter](https://leetcode.com/problems/count-substrings-with-only-one-distinct-letter)
**Companies:** Virtu

---

## Problem Description

Given a string `s`, return *the number of substrings that have only **one distinct** letter*.

**Constraints:**
- `1 <= s.length <= 1000`
- `s[i]` consists of only lowercase English letters.

---

## Examples

```
Example 1:
  Input: s = "aaaba"
  Output: 8
  Explanation: The substrings with one distinct letter are "aaa", "aa", "a", "b".
  "aaa" occurs 1 time.
  "aa" occurs 2 times.
  "a" occurs 4 times.
  "b" occurs 1 time.
  So the answer is 1 + 2 + 4 + 1 = 8.
```

```
Example 2:
  Input: s = "aaaaaaaaaa"
  Output: 55
```

---

## Approach

Group consecutive identical characters into runs. A run of length `L` contributes `L × (L + 1) / 2` substrings (triangular number).

```text
FUNCTION countSubstrings(s):
    total ← 0
    run ← 1
    FOR i ← 1 TO LENGTH(s) - 1 DO
        IF s[i] == s[i-1]:
            run ← run + 1
        ELSE:
            total ← total + run * (run + 1) / 2
            run ← 1
    total ← total + run * (run + 1) / 2
    RETURN total
```

---

## Walkthrough

Consider `s = "aaabb"`:

1. Initialize `total = 0`, `run = 1`.
2. `i=1`: `s[1] == s[0]` (`a`), `run = 2`.
3. `i=2`: `s[2] == s[1]` (`a`), `run = 3`.
4. `i=3`: `s[3] != s[2]` (`b` vs `a`), add `3*4/2 = 6` to `total` → `total = 6`, reset `run = 1`.
5. `i=4`: `s[4] == s[3]` (`b`), `run = 2`.
6. End of loop: add `2*3/2 = 3` to `total` → `total = 9`.
7. Return `9`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass through the string |
| **Space** | O(1) — only a few counters |

---

## Follow-Up Questions

* How would you modify the algorithm to count substrings with at most two distinct letters?
* Can you extend this to handle Unicode characters efficiently?

---

## Key Takeaway

> **Count single-character substrings by grouping runs. Each run of length L contributes L(L+1)/2 substrings — the triangular number formula.**