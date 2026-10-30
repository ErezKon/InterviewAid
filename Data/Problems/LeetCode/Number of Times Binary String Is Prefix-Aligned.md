# 1375. Number of Times Binary String Is Prefix-Aligned

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned](https://leetcode.com/problems/number-of-times-binary-string-is-prefix-aligned)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Track Max — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You have a **1-indexed** binary string of length `n` where all the bits are `0` initially. We will flip all the bits of this binary string (i.e., change them from `0` to `1`) one by one. You are given a **1-indexed** integer array `flips` where `flips[i]` indicates that the bit at index `flips[i]` will be flipped in the `i^th` step.

A binary string is **prefix-aligned** if, after the `i^th` step, all the bits in the **inclusive** range `[1, i]` are ones and all the other bits are zeros.

Return *the number of times the binary string is **prefix-aligned** during the flipping process*.

**Constraints:**
- `n == flips.length`
- `1 <= n <= 5 * 10^4`
- `flips` is a permutation of the integers in the range `[1, n]`.

---

## 2. Examples

**Example 1:**
```
Input: flips = [3,2,4,1,5]
Output: 2
Explanation: The binary string is initially "00000".
After applying step 1: The string becomes "00100", which is not prefix-aligned.
After applying step 2: The string becomes "01100", which is not prefix-aligned.
After applying step 3: The string becomes "01110", which is not prefix-aligned.
After applying step 4: The string becomes "11110", which is prefix-aligned.
After applying step 5: The string becomes "11111", which is prefix-aligned.
We can see that the string was prefix-aligned 2 times, so we return 2.
```

**Example 2:**
```
Input: flips = [4,1,2,3]
Output: 1
Explanation: The binary string is initially "0000".
After applying step 1: The string becomes "0001", which is not prefix-aligned.
After applying step 2: The string becomes "1001", which is not prefix-aligned.
After applying step 3: The string becomes "1101", which is not prefix-aligned.
After applying step 4: The string becomes "1111", which is prefix-aligned.
We can see that the string was prefix-aligned 1 time, so we return 1.
```

---

## 3. Approach: Track Max — O(n) ✅

```text
FUNCTION countPrefixAligned(flips):
    // flips[i] is the position (1‑based) flipped at step i+1
    SET maxFlip ← 0
    SET result ← 0
    FOR i ← 0 TO LENGTH(flips) - 1:
        SET maxFlip ← MAX(maxFlip, flips[i])
        // step number is i+1
        IF maxFlip == i + 1:
            SET result ← result + 1
    RETURN result
```

---

## 4. Walkthrough

Consider `flips = [3,2,4,1,5]`.

| Step (i) | flips[i] | maxFlip after update | i+1 | Prefix‑aligned? |
|----------|----------|----------------------|-----|-----------------|
| 0        | 3        | 3                    | 1   | No (3 ≠ 1)      |
| 1        | 2        | 3                    | 2   | No (3 ≠ 2)      |
| 2        | 4        | 4                    | 3   | No (4 ≠ 3)      |
| 3        | 1        | 4                    | 4   | Yes (4 = 4)     |
| 4        | 5        | 5                    | 5   | Yes (5 = 5)     |

The algorithm counts the two steps where `maxFlip` equals the step count.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would the solution change if flips could contain duplicate positions?
- Can you extend the approach to report the actual prefix‑aligned intervals, not just the count?
- What is the complexity if the input size is massive and must be processed in a streaming fashion?

---

## 7. Key Takeaway

> **Prefix‑aligned ↔ max flipped position == step number.** Tracking the running maximum lets us determine alignment in constant space.
