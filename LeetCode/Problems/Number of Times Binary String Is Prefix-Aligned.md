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

Bits are flipped one at a time in a given order. Count the number of steps where the string is prefix‑aligned (all set bits form a contiguous prefix).

---

## 2. Examples

**Example 1:**
```
Input: flips = [3,2,4,1,5]
Output: 2
Explanation: After step 4 the flipped bits are {1,2,3,4} forming a prefix, and after step 5 all bits 1..5 are set. So there are 2 prefix‑aligned steps.
```

**Example 2:**
```
Input: flips = [1,2,3]
Output: 3
Explanation: After each flip the prefix condition holds because the maximum flipped position equals the step number.
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
