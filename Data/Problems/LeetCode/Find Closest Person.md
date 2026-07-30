# 3516. Find Closest Person

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-closest-person](https://leetcode.com/problems/find-closest-person)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## Problem Description

Two people at positions `x` and `y`, target at `z`. Return which person is closer (1 or 2), or 0 if equidistant.

---

## Examples

**Example 1:**
```
x = 1, y = 2, z = 3
Output: 2
Explanation: Distance from x to z is 2, from y to z is 1, so person 2 is closer.
```

**Example 2:**
```
x = 5, y = 5, z = 10
Output: 0
Explanation: Both are equally distant (5 units) from the target.
```

---

## Approach: Distance Comparison — O(1) ✅

```text
FUNCTION closestPerson(x, y, z):
    SET d1 ← ABS(x - z)
    SET d2 ← ABS(y - z)
    IF d1 < d2:
        RETURN 1
    ELSE IF d2 < d1:
        RETURN 2
    ELSE:
        RETURN 0
```

---

## Walkthrough

| Step | x | y | z | d1 = |x‑z| | d2 = |y‑z| | Decision |
|------|---|---|---|--------|--------|----------|
| 1    | 1 | 2 | 3 | 2      | 1      | d2 < d1 → return 2 |
| 2    | 5 | 5 |10 | 5      | 5      | equal → return 0 |

---

## Complexity Analysis

- **Time:** O(1) – constant number of arithmetic operations.
- **Space:** O(1) – only a few scalar variables.

---

## Follow-Up Questions

1. How would you extend this to handle *n* people and find the closest one?
2. What if the positions were in 2‑D space? How would you compute distances?
3. Could you solve it without using the absolute function by comparing squares?

---

## Key Takeaway

> **Compare absolute distances; return the index of the nearer person or 0 on a tie.**