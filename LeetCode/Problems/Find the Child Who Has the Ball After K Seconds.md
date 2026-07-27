# 3178. Find the Child Who Has the Ball After K Seconds

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds](https://leetcode.com/problems/find-the-child-who-has-the-ball-after-k-seconds)
**Companies:** Agoda

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Modular Arithmetic — O(1) ✅](#4-approach-modular-arithmetic--o1-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are `n` children standing in a line numbered `0` to `n-1`. The ball starts with child `0` and is passed to the right. When it reaches child `n-1`, direction reverses. After `k` seconds, which child has the ball?

**Constraints:**
- `2 <= n <= 50`
- `1 <= k <= 50`

---

## 2. Examples

```
Example 1:
  Input:  n = 3, k = 5
  Output: 1
  Reason: Ball path: 0→1→2→1→0→1. After 5 seconds: child 1.

Example 2:
  Input:  n = 4, k = 2
  Output: 2
```

---

## 3. Key Insight

> The ball bounces back and forth with period `2(n-1)`. Use `k mod 2(n-1)` to reduce, then determine position: if remainder < n, position = remainder; else position = `2(n-1) - remainder`.

---

## 4. Approach: Modular Arithmetic — O(1) ✅

```
FUNCTION findChild(n, k):
    cycle ← 2 * (n - 1)
    k ← k MOD cycle
    IF k < n THEN
        RETURN k
    ELSE
        RETURN cycle - k
```

---

## 5. Walkthrough

```
n = 3, k = 5
cycle = 2 * 2 = 4
k mod 4 = 5 mod 4 = 1
1 < 3 → RETURN 1 ✅

Ball path: 0→1→2→1→0→1 (positions at t=0,1,2,3,4,5)
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Bouncing patterns** have period `2(n-1)`. Reduce with modulo, then map the remainder to position using a simple conditional.
