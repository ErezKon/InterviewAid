# 3258. Count Substrings That Satisfy K-Constraint I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i](https://leetcode.com/problems/count-substrings-that-satisfy-k-constraint-i)
**Companies:** Google

---

## Problem Description

Given a binary string `s` and integer `k`, count substrings where the number of `0`s ≤ `k` **or** the number of `1`s ≤ `k`.

---

## Approach

```
FUNCTION countKConstraintSubstrings(s, k):
    count = 0; zeros = 0; ones = 0; left = 0
    FOR right ← 0 TO LENGTH(s) - 1 DO
        IF s[right] == '0': zeros += 1
        ELSE: ones += 1
        WHILE zeros > k AND ones > k:
            IF s[left] == '0': zeros -= 1
            ELSE: ones -= 1
            left += 1
        count += right - left + 1
    RETURN count
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(1) |

---

## Key Takeaway

> **Sliding window for binary string constraint: shrink from the left when both counts exceed k. The OR condition means only both exceeding k is invalid.**
