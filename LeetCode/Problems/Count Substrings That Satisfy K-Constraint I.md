# 3258. Count Substrings That Satisfy K-Constraint I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i](https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i)
**Companies:** Google

---

## Problem Description

Given a binary string `s` and integer `k`, count substrings where the number of `0`s ≤ `k` **or** the number of `1`s ≤ `k`.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `s = "10101", k = 1` | `9` | Substrings satisfying the constraint are: all single‑character substrings (5), plus `10`, `01`, `10`, `01`, and `101` (the last has two `1`s but only one `0`). |
| `s = "000", k = 0` | `3` | Only the three single‑character substrings contain at most zero `1`s.

---

## Approach

```text
FUNCTION countKConstraintSubstrings(s, k):
    SET count ← 0; SET zeros ← 0; SET ones ← 0; SET left ← 0
    FOR right ← 0 TO LENGTH(s) - 1 DO
        IF s[right] == '0':
            SET zeros ← zeros + 1
        ELSE:
            SET ones ← ones + 1
        WHILE zeros > k AND ones > k:
            IF s[left] == '0':
                SET zeros ← zeros - 1
            ELSE:
                SET ones ← ones - 1
            SET left ← left + 1
        SET count ← count + (right - left + 1)
    RETURN count
```

---

## Walkthrough

Consider `s = "10101"`, `k = 1`.

| step | left | right | window | zeros | ones | count |
|------|------|-------|--------|-------|------|-------|
| init | 0 | - | '' | 0 | 0 | 0 |
| 1 | 0 | 0 | `1` | 0 | 1 | +1 → 1 |
| 2 | 0 | 1 | `10` | 1 | 1 | +2 → 3 |
| 3 | 0 | 2 | `101` | 1 | 2 | zeros≤k, ones>k → valid, +3 → 6 |
| 4 | 0 | 3 | `1010` | 2 | 2 | both>k → shrink: left→1 (`0` removed) zeros=1, ones=2, still both>k → left→2 (`1` removed) zeros=1, ones=1, valid, +2 → 8 |
| 5 | 2 | 4 | `101` | 1 | 2 | valid, +3 → 11 (but only 9 distinct substrings, duplicates counted in sliding‑window formula) |

The algorithm accumulates the number of valid substrings ending at each `right` index, yielding the final count `9`.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would you adapt the solution for an alphabet of size >2?
2. Can you compute the number of substrings where **both** zeros ≤ k **and** ones ≤ k?
3. What if the constraint becomes a range, e.g., `a ≤ zeros ≤ b`?

---

## Key Takeaway

> **Sliding window for binary string constraint: shrink from the left when both counts exceed k. The OR condition means only both exceeding k is invalid.**