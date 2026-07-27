# 1227. Airplane Seat Assignment Probability

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/airplane-seat-assignment-probability](https://leetcode.com/problems/airplane-seat-assignment-probability)
**Companies:** Google, Microstrategy, Toptal

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Math — O(1) ✅](#4-approach-math--o1-)
5. [Proof Sketch](#5-proof-sketch)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

`n` passengers board a plane with `n` seats. The first passenger lost their ticket and picks a seat **uniformly at random**. Each subsequent passenger sits in their assigned seat if available; otherwise picks a random remaining seat. What is the probability that the **nth (last) passenger** gets their assigned seat?

**Constraints:**
- `1 ≤ n ≤ 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  n = 1
  Output: 1.0
  Explanation: Only 1 passenger, they always get their seat.

Example 2:
  Input:  n = 2
  Output: 0.5
  Explanation: Passenger 1 picks seat 1 (50%) or seat 2 (50%).
```

---

## 3. Key Insight

> For n ≥ 2, the answer is **always 0.5**. The first passenger's random choice creates a chain of displacements, but by symmetry, the last seat is equally likely to be seat 1 (first person's) or seat n (last person's) — all intermediate seats get resolved before the last person boards.

---

## 4. Approach: Math — O(1) ✅

```
FUNCTION nthPersonGetsNthSeat(n):
    RETURN 1.0 IF n == 1 ELSE 0.5
```

| Time | Space |
|------|-------|
| O(1) | O(1) |

---

## 5. Proof Sketch

Define `f(n)` = probability the last person gets their seat.

- When person 1 picks seat 1 (prob 1/n): everyone sits correctly → last person gets seat n. ✓
- When person 1 picks seat n (prob 1/n): last person's seat is taken. ✗
- When person 1 picks seat k (2 ≤ k ≤ n-1, prob 1/n each): persons 2..k-1 sit normally. Person k faces the same subproblem with n-k+1 remaining people.

By induction: `f(n) = 1/n + 0/n + (1/n)·Σf(k) = 1/n + (1/n)·(n-2)·0.5 = 0.5` for all n ≥ 2.

---

## 6. Key Takeaway

> A beautiful probability puzzle where the answer is always 0.5 for n ≥ 2. The symmetry argument — the last seat is equally likely to be seat 1 or seat n — is the elegant proof. Recognizing when a complex recurrence collapses to a constant is a valuable math skill.
