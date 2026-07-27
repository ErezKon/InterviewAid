# 2543. Check if Point Is Reachable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-point-is-reachable](https://leetcode.com/problems/check-if-point-is-reachable)
**Companies:** Phonepe

---

## 1. Problem Description

Starting from `(1, 1)`, you can move to `(x+y, y)`, `(x, x+y)`, `(2x, y)`, or `(x, 2y)`. Determine if you can reach `(targetX, targetY)`.

---

## 2. Key Insight

> Work backwards. From `(targetX, targetY)`: dividing by 2 is always allowed (reverse of doubling). If both are odd, we can reverse-subtract: but `gcd(targetX, targetY)` must be a power of 2, since the subtraction moves preserve gcd, and doubling only adds factors of 2. Starting gcd is `gcd(1,1) = 1`.

So: **divide out all factors of 2 from both, then check if `gcd == 1`**.

---

## 3. Approach: GCD Check — O(log n) ✅

```
FUNCTION isReachable(targetX, targetY):
    // Remove all factors of 2
    WHILE targetX % 2 == 0: targetX /= 2
    WHILE targetY % 2 == 0: targetY /= 2
    RETURN gcd(targetX, targetY) == 1
```

| Time | Space |
|------|-------|
| O(log n) | O(1) |

---

## Key Takeaway

> The doubling operations let us freely add/remove factors of 2. The addition operations behave like the Euclidean algorithm. So reachability reduces to: after removing all factors of 2, is gcd = 1?
