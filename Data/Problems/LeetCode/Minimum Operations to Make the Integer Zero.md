# 2749. Minimum Operations to Make the Integer Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero](https://leetcode.com/problems/minimum-operations-to-make-the-integer-zero)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Enumerate Operations — O(60)](#4-approach-enumerate-operations--o60)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two integers `num1` and `num2`.

In one operation, you can choose integer `i` in the range `[0, 60]` and subtract `2^i + num2` from `num1`.

Return *the integer denoting the **minimum** number of operations needed to make* `num1` *equal to* `0`.

If it is impossible to make `num1` equal to `0`, return `-1`.

**Constraints:**
- `1 <= num1 <= 10⁹`
- `-10⁹ <= num2 <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: num1 = 3, num2 = -2
  Output: 3
  Explanation: We can make 3 equal to 0 with the following operations:
  - We choose i = 2 and subtract 2² + (-2) from 3, 3 - (4 + (-2)) = 1.
  - We choose i = 2 and subtract 2² + (-2) from 1, 1 - (4 + (-2)) = -1.
  - We choose i = 0 and subtract 2⁰ + (-2) from -1, (-1) - (1 + (-2)) = 0.
  It can be proven, that 3 is the minimum number of operations that we need to perform.
```

```
Example 2:
  Input: num1 = 5, num2 = 7
  Output: -1
  Explanation: It can be proven, that it is impossible to make 5 equal to 0 with the given operation.
```

---

## 3. Key Insight

> After `k` operations, we subtract `k * num2` plus a sum of `k` powers of 2 (each chosen from `2⁰` to `2⁶⁰`). So we need `target = num1 - k * num2` to be expressible as a sum of exactly `k` (possibly repeated) powers of 2.

**When can a number `target` be expressed as a sum of exactly `k` powers of 2?**
- **Minimum powers needed** = `popcount(target)` (its set bits — each bit is one power of 2)
- **Maximum powers allowed** = `target` itself (all 1s, i.e., `target` copies of `2⁰`)
- So we need: `popcount(target) ≤ k ≤ target` **and** `target ≥ 0`

---

## 4. Approach: Enumerate Operations — O(60) ✅

```
FUNCTION makeTheIntegerZero(num1, num2):
    FOR k ← 1 TO 60:
        target = num1 - k * num2
        IF target < 0: CONTINUE
        IF bin(target).count('1') <= k <= target: RETURN k
    RETURN -1
```

**Why 60?** The maximum value of `num1` is `10⁹ < 2³⁰`, and each operation subtracts at least `2⁰ = 1` in the power-of-2 part. Since `i` ranges up to 60, and we need at most 60 bits, iterating `k` up to 60 is sufficient.

---

## 5. Walkthrough

```
num1 = 3, num2 = -2

k=1: target = 3 - 1*(-2) = 5, popcount(5)=2, need 2 ≤ 1? NO
k=2: target = 3 - 2*(-2) = 7, popcount(7)=3, need 3 ≤ 2? NO
k=3: target = 3 - 3*(-2) = 9, popcount(9)=2, need 2 ≤ 3 ≤ 9? YES ✅

Return 3

Verification: 9 = 2³ + 2⁰ (2 powers), but we need 3 powers.
Split: 9 = 2³ + 2⁰ = 8 + 1. Split 8 = 4 + 4: 9 = 4 + 4 + 1 = 2² + 2² + 2⁰. ✅
Three operations: subtract (2² + (-2)), (2² + (-2)), (2⁰ + (-2)) = 6 + 6 + 3 = 15... 
Actually: num1 becomes 3 - (4-2) - (4-2) - (1-2) = 3 - 2 - 2 + 1 = 0 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(60) = O(1) — fixed loop bound |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

**Q1: Why can't k exceed 60?**
If `num2 ≥ 0`, each operation subtracts `2^i + num2 ≥ 1`, so after 60 operations `num1` would be well below 0 (since `num1 ≤ 10⁹ < 2³⁰`). If `num2 < 0`, `target` grows with `k`, and once `target > 2⁶⁰`, `popcount ≤ 60` is trivially satisfied and `k ≤ target` too.

**Q2: Can we split any power of 2 into smaller ones?**
Yes. `2^a = 2^(a-1) + 2^(a-1)`. So we can always increase the count of powers by 1 (splitting one into two), up to `target` total (all 1s).

**Q3: What if num2 = 0?**
Then `target = num1` for all `k`, and the answer is `popcount(num1)`.

---

## 8. Key Takeaway

> **Bit manipulation meets enumeration** — the key is recognizing that `k` powers of 2 can sum to `target` iff `popcount(target) ≤ k ≤ target`. The bounded loop makes this O(1).
