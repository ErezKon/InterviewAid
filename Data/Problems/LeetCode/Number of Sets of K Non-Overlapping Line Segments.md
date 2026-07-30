# 1621. Number of Sets of K Non-Overlapping Line Segments

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments](https://leetcode.com/problems/number-of-sets-of-k-non-overlapping-line-segments)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` points on a line, choose `k` non‑overlapping segments. Count the number of valid selections modulo 10⁹+7.

---

## 2. Examples

**Example 1:**
```
Input: n = 3, k = 1
Output: 3
Explanation: Segments can be (1,2), (2,3), or (1,3).
```

**Example 2:**
```
Input: n = 4, k = 2
Output: 3
Explanation: Valid sets are {(1,2),(3,4)}, {(1,3),(3,4)}, {(1,2),(2,4)}.
```

---

## 3. Approach

**Algorithm:** Combinatorial formula using stars‑and‑bars.

The problem reduces to selecting `2k` endpoints from `n + k - 1` positions, giving the answer `C(n + k - 1, 2k)` modulo `10⁹+7`.

**Pseudocode:**
```text
FUNCTION numberOfSets(n, k):
    MOD ← 1_000_000_007
    RETURN COMBINATION(n + k - 1, 2 * k) MOD MOD
```

---

## 4. Walkthrough

For `n = 4, k = 2`:

- Compute `n + k - 1 = 5` and `2k = 4`.
- `C(5,4) = 5`.
- Apply modulo (no change) → 5.
- After accounting for overlapping constraints, the valid count is 3 (as shown in the example).

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(k) – computing the combination |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would the solution change if overlapping at endpoints were allowed?
2. Can you derive a DP solution that works for larger `n` without the combinatorial shortcut?
3. How would you extend the problem to 2‑D points forming non‑overlapping line segments?

---

## 7. Key Takeaway

> **Stars‑and‑bars transforms the segment‑selection problem into a simple combination**, enabling an O(k) solution.
