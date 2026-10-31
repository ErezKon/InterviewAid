# 2543. Check if Point Is Reachable

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/check-if-point-is-reachable](https://leetcode.com/problems/check-if-point-is-reachable)
**Companies:** Phonepe

---

## 1. Problem Description

There exists an infinitely large grid. You are currently at point `(1, 1)`, and you need to reach the point `(targetX, targetY)` using a **finite** number of steps.

In one **step**, you can move from point `(x, y)` to any one of the following points:

- `(x, y - x)`
- `(x - y, y)`
- `(2 * x, y)`
- `(x, 2 * y)`

Given two integers `targetX` and `targetY` representing the X-coordinate and Y-coordinate of your final position, return `true` *if you can reach the point from* `(1, 1)` *using some number of steps, and* `false` *otherwise*.

**Constraints:**
- `1 <= targetX, targetY <= 10^9`

---

## 2. Key Insight

> Work backwards. From `(targetX, targetY)`: dividing by 2 is always allowed (reverse of doubling). If both are odd, we can reverse-subtract: but `gcd(targetX, targetY)` must be a power of 2, since the subtraction moves preserve gcd, and doubling only adds factors of 2. Starting gcd is `gcd(1,1) = 1`.

So: **divide out all factors of 2 from both, then check if `gcd == 1`**.

---

## 3. Approach: GCD Check — O(log n) ✅

```text
FUNCTION isReachable(targetX, targetY):
    // Remove all factors of 2 from both coordinates
    WHILE targetX MOD 2 = 0:
        SET targetX ← targetX / 2
    WHILE targetY MOD 2 = 0:
        SET targetY ← targetY / 2
    // After stripping powers of two, reachability reduces to gcd check
    RETURN gcd(targetX, targetY) = 1
```

---

## 4. Examples

```
Example 1:
  Input: targetX = 6, targetY = 9
  Output: false
  Explanation: It is impossible to reach (6,9) from (1,1) using any sequence of moves, so false is returned.
```

```
Example 2:
  Input: targetX = 4, targetY = 7
  Output: true
  Explanation: You can follow the path (1,1) -> (1,2) -> (1,4) -> (1,8) -> (1,7) -> (2,7) -> (4,7).
```

---

## 5. Walkthrough

Take `(targetX, targetY) = (12, 8)`.

1. Strip factors of 2:
   - `12` → `3` (divide by 2 three times)
   - `8` → `1` (divide by 2 three times)
2. Compute `gcd(3,1) = 1` → reachable.
3. Reverse the operations to construct a path:
   - Start `(1,1)` → double `x` three times to get `(8,1)` → add `y` to `x` repeatedly to reach `(12,1)` → double `y` three times to reach `(12,8)`.

---

## 6. Complexity Analysis

- **Time**: O(log max(targetX, targetY)) – each division by 2 and the Euclidean gcd run in logarithmic time.
- **Space**: O(1) – only a few integer variables are used.

---

## 7. Follow-Up Questions

- How would the solution change if the allowed moves were only `(x+y, y)` and `(x, x+y)`?
- Can you extend the approach to three-dimensional coordinates with similar operations?
- What if the doubling operation were replaced by multiplication by a constant `k`?

---

## Key Takeaway

> After removing all powers of two from the coordinates, reachability is equivalent to checking whether the remaining numbers are coprime (gcd = 1).
