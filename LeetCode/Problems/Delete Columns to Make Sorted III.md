# 960. Delete Columns to Make Sorted III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-iii](https://leetcode.com/problems/delete-columns-to-make-sorted-iii)
**Companies:** Amazon, Google

---

## Problem Description

Delete minimum columns so that each remaining row is non-decreasing (each row's remaining characters are sorted).

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| ["cba","daf","ghi"] | 1 | Delete column 0 to get ["ba","af","hi"] which are non‑decreasing per row. |
| ["a","b","c"] | 0 | Each row already sorted; no deletions needed. |

---

## Approach

```
FUNCTION minDeletionSize(strs):
    // Find longest compatible subsequence of columns (LIS across rows)
    m ← LENGTH(strs[0])
    dp ← ARRAY OF 1 WITH SIZE m
    FOR j ← 1 TO m - 1:
        FOR i ← 0 TO j - 1:
            compatible ← TRUE
            FOR r ← 0 TO LENGTH(strs) - 1:
                IF strs[r][i] > strs[r][j]:
                    compatible ← FALSE
                    BREAK
            IF compatible:
                dp[j] ← MAX(dp[j], dp[i] + 1)
    RETURN m - MAX(dp)
```

---

## Walkthrough

Input: ["cba","daf","ghi"]

1. Columns = 3. Initialize dp = [1,1,1].
2. j=1 (second column): compare with i=0.
   - Row 0: 'c' ≤ 'b'? No → not compatible.
   - dp stays [1,1,1].
3. j=2 (third column): compare i=0 and i=1.
   - i=0: 'c' ≤ 'a'? No.
   - i=1: 'b' ≤ 'a'? No.
   - dp unchanged.
4. Max dp = 1 → longest compatible subsequence length = 1.
5. Deletions = m - 1 = 2. (Delete columns 0 and 1, keep column 2) resulting rows "a","f","i" are sorted.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m² × n) |
| **Space** | O(m) |

---

## Follow-Up Questions

- How would you extend this to allow reordering columns instead of only deletions?
- Can the solution be optimized to O(m·n) using a more clever greedy approach?

---

## Key Takeaway

> **Multi-row sorted columns = LIS on columns with compatibility check across all rows. Answer = total columns minus longest compatible subsequence.**