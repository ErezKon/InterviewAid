# 960. Delete Columns to Make Sorted III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/delete-columns-to-make-sorted-iii](https://leetcode.com/problems/delete-columns-to-make-sorted-iii)
**Companies:** Amazon, Google

---

## Problem Description

Delete minimum columns so that each remaining row is non-decreasing (each row's remaining characters are sorted).

---

## Key Insight

This is a **Longest Increasing Subsequence (LIS)** on columns. Column `j` can follow column `i` if `strs[r][i] <= strs[r][j]` for all rows. Answer = total columns - LIS length.

---

## Approach

```
FUNCTION minDeletionSize(strs):
    m = len(strs[0])
    dp = [1] * m    // LIS of compatible columns

    FOR j ← 1 TO m - 1:
        FOR i ← 0 TO j - 1:
            IF ALL(strs[r][i] <= strs[r][j] for r in range(len(strs))):
                dp[j] = MAX(dp[j], dp[i] + 1)

    RETURN m - MAX(dp)
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(m² × n) |
| **Space** | O(m) |

---

## Key Takeaway

> **Multi-row sorted columns = LIS on columns with compatibility check across all rows. Answer = total columns minus longest compatible subsequence.**
