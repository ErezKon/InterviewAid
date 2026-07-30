# 634. Find the Derangement of An Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-derangement-of-an-array](https://leetcode.com/problems/find-the-derangement-of-an-array)
**Companies:** Ixl

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DP Recurrence — O(n) ✅](#4-approach-dp-recurrence--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a positive integer `n`, find the number of **derangements** of `[1, 2, ..., n]` — permutations where no element appears in its original position. Return the result modulo `10⁹ + 7`.

**Constraints:**
- `1 <= n <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input:  n = 3
  Output: 2
  Reason: [2,3,1] and [3,1,2] are the only derangements of [1,2,3].

Example 2:
  Input:  n = 2
  Output: 1
  Reason: [2,1] is the only derangement.
```

---

## 3. Key Insight

> The derangement recurrence is `D(n) = (n-1) * (D(n-1) + D(n-2))`. Element 1 goes to some position `k` (n-1 choices). If element `k` goes to position 1, the rest is D(n-2). If not, it's like a derangement of n-1 elements.

---

## 4. Approach: DP Recurrence — O(n) ✅

```
FUNCTION findDerangement(n):
    IF n == 1 THEN RETURN 0
    IF n == 2 THEN RETURN 1
    MOD ← 10^9 + 7

    prev2 ← 0    // D(1)
    prev1 ← 1    // D(2)

    FOR i ← 3 TO n DO
        curr ← ((i - 1) * (prev1 + prev2)) MOD MOD
        prev2 ← prev1
        prev1 ← curr

    RETURN prev1
```

---

## 5. Walkthrough

```
n = 4

D(1) = 0, D(2) = 1
D(3) = 2 * (1 + 0) = 2    → [2,3,1], [3,1,2]
D(4) = 3 * (2 + 1) = 9    → 9 derangements of [1,2,3,4] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass |
| **Space** | O(1) — two variables |

---

## 7. Follow-Up Questions

### 7.1 What's the closed-form formula?

`D(n) = n! * Σ((-1)^k / k!) for k=0..n` ≈ `n! / e` (rounded to nearest integer).

### 7.2 What's the probability a random permutation is a derangement?

Approximately `1/e ≈ 0.3679` for large n. This converges rapidly.

### 7.3 Can this be extended to partial derangements (exactly k fixed points)?

Yes — use inclusion-exclusion: `C(n,k) * D(n-k)` counts permutations with exactly k fixed points.

---

## 8. Key Takeaway

> The derangement recurrence `D(n) = (n-1)(D(n-1) + D(n-2))` is a classic combinatorial formula. It can be computed iteratively in O(n) time and O(1) space.
