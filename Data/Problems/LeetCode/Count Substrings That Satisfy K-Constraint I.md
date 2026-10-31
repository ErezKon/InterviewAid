# 3258. Count Substrings That Satisfy K-Constraint I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i](https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i)
**Companies:** Google

---

## Problem Description

You are given a **binary** string `s` and an integer `k`.

A **binary string** satisfies the **k-constraint** if **either** of the following conditions holds:

- The number of `0`'s in the string is at most `k`.
- The number of `1`'s in the string is at most `k`.

Return an integer denoting the number of substrings of `s` that satisfy the **k-constraint**.

**Constraints:**
- `1 <= s.length <= 50`
- `1 <= k <= s.length`
- `s[i]` is either `'0'` or `'1'`.

---

## Examples

```
Example 1:
  Input: s = "10101", k = 1
  Output: 12
  Explanation: Every substring of s except the substrings "1010", "10101", and "0101" satisfies the k-constraint.
```

```
Example 2:
  Input: s = "1010101", k = 2
  Output: 25
  Explanation: Every substring of s except the substrings with a length greater than 5 satisfies the k-constraint.
```

```
Example 3:
  Input: s = "11111", k = 1
  Output: 15
  Explanation: All substrings of s satisfy the k-constraint.
```

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
| 5 | 2 | 4 | `101` | 1 | 2 | valid, +3 → 11 (but only 9 distinct substrings, duplicates counted in sliding-window formula) |

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