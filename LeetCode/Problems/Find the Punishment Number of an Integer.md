# 2698. Find the Punishment Number of an Integer

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-punishment-number-of-an-integer](https://leetcode.com/problems/find-the-punishment-number-of-an-integer)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(n · 2^d) ✅](#3-approach-backtracking--on--2d-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

The **punishment number** of `n` is the sum of `i²` for all `i` in [1, n] where the decimal representation of `i²` can be partitioned into substrings whose integer values sum to `i`.

**Constraints:**
- `1 <= n <= 1000`

---

## 2. Key Insight

> For each `i`, check if the string representation of `i²` can be split into contiguous parts summing to `i`. This is a backtracking/recursion problem on digit strings.

---

## 3. Approach: Backtracking — O(n · 2^d) ✅

```
FUNCTION punishmentNumber(n):
    FUNCTION canPartition(s, target):
        IF target == 0 AND s == "": RETURN true
        IF target < 0 OR s == "": RETURN false
        FOR i ← 1 TO len(s):
            IF canPartition(s[i:], target - int(s[:i])): RETURN true
        RETURN false

    total = 0
    FOR i ← 1 TO n:
        IF canPartition(str(i * i), i):
            total += i * i
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 2^d) where d = digits of i² (at most 7) |
| **Space** | O(d) — recursion depth |

---

## 5. Key Takeaway

> **Backtracking on digit partitions** — try all ways to split the squared number's string and check if parts sum to `i`. The small digit count (≤ 7) keeps it fast.
