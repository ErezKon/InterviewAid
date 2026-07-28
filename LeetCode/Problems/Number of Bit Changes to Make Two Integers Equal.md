# 3226. Number of Bit Changes to Make Two Integers Equal

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal](https://leetcode.com/problems/number-of-bit-changes-to-make-two-integers-equal)
**Companies:** Thoughtworks

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Bit Manipulation — O(1)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` and `k`, you can only change 1-bits of `n` to 0. Return the number of changes needed to make `n == k`, or `-1` if impossible.

---

## 2. Key Insight

> Impossible if `k` has a 1-bit where `n` has 0 (can't set 0→1). Otherwise, count bits that are 1 in `n` but 0 in `k`: `popcount(n & ~k)`. Check `(k & ~n) == 0` for validity.

---

## 3. Approach: Bit Manipulation — O(1) ✅

```text
FUNCTION minChanges(n, k):
    // feasibility check: k must not have 1 where n has 0
    IF (k AND NOT n) != 0:
        RETURN -1
    // count bits that differ (all are 1→0 flips)
    RETURN popcount(n XOR k)
```

---

## 4. Examples

**Example 1:**
```
Input: n = 10 (1010₂), k = 8 (1000₂)
Output: 1
Explanation: Only the second least‑significant 1‑bit needs to be flipped to 0.
```

**Example 2:**
```
Input: n = 7 (0111₂), k = 8 (1000₂)
Output: -1
Explanation: k has a 1‑bit at position 3 while n has 0; cannot set 0→1.
```

---

## 5. Walkthrough

Take `n = 13 (1101₂)`, `k = 9 (1001₂)`.
1. Feasibility: `k & ~n = 1001₂ & 0010₂ = 0` → possible.
2. XOR: `n XOR k = 1101₂ XOR 1001₂ = 0100₂`.
3. Popcount of `0100₂` is 1 → one flip needed (the second bit from the left).

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would the solution change if you could also flip 0‑bits to 1 at a cost?
- What if you needed to output the actual positions of bits to flip?

---

## 5. Key Takeaway

> **One-directional bit flips.** Only 1→0 allowed. Check feasibility with `k & ~n`, count changes with `popcount(n ^ k)`.
