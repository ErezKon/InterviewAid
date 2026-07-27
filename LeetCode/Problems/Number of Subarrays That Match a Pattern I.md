# 3034. Number of Subarrays That Match a Pattern I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i](https://leetcode.com/problems/number-of-subarrays-that-match-a-pattern-i)
**Companies:** Amazon, Autodesk, Capital One, Uber, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force — O(n · m)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Count subarrays of `nums` of length `m+1` that match a given pattern of increases (1), decreases (-1), and equals (0).

---

## 2. Approach: Brute Force — O(n · m) ✅

```
FUNCTION countMatchingSubarrays(nums, pattern):
    count = 0
    FOR i ← 0 TO len(nums) - len(pattern) - 1:
        match = true
        FOR j ← 0 TO len(pattern) - 1:
            diff = nums[i+j+1] - nums[i+j]
            IF (pattern[j] == 1 AND diff <= 0) OR
               (pattern[j] == -1 AND diff >= 0) OR
               (pattern[j] == 0 AND diff != 0):
                match = false; BREAK
        IF match: count += 1
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Convert consecutive differences to a pattern signature, then match.** For Part II, use KMP/Z-algorithm on the difference array for O(n + m).
