# 780. Reaching Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reaching-points](https://leetcode.com/problems/reaching-points)
**Companies:** Amazon, Blackstone, Cloudflare, Coursera, Goldman Sachs, Google, Jpmorgan, Kla, Kla Tencor, Microsoft, Paypal, Snapchat, Wayfair

---

## Problem Description
Given four integers `sx`, `sy`, `tx`, and `ty`, return `true` *if it is possible to convert the point* `(sx, sy)` *to the point* `(tx, ty)` *through some operations, or* `false` *otherwise*.

The allowed operation on some point `(x, y)` is to convert it to either `(x, x + y)` or `(x + y, y)`.

**Constraints:**

- `1 <= sx, sy, tx, ty <= 10⁹`

## Examples

```
Example 1:
  Input: sx = 1, sy = 1, tx = 3, ty = 5
  Output: true
  Explanation:
    One series of moves that transforms the starting point to the target is:
    (1, 1) -> (1, 2)
    (1, 2) -> (3, 2)
    (3, 2) -> (3, 5)
```

```
Example 2:
  Input: sx = 1, sy = 1, tx = 2, ty = 2
  Output: false
```

```
Example 3:
  Input: sx = 1, sy = 1, tx = 1, ty = 1
  Output: true
```

## Approach
Work **backwards** from the target to the start using modulo to skip many subtractions. While both coordinates are larger than the start, repeatedly replace the larger coordinate with the remainder after dividing by the smaller one. When one coordinate matches the start, check if the other can be reduced to the start by a multiple of the matched coordinate.

```text
FUNCTION reachingPoints(sx, sy, tx, ty):
    WHILE tx > sx AND ty > sy:
        IF tx > ty:
            tx ← tx MOD ty
        ELSE:
            ty ← ty MOD tx
    IF tx = sx AND ty = sy: RETURN true
    IF tx = sx:
        RETURN ty > sy AND (ty - sy) MOD sx = 0
    IF ty = sy:
        RETURN tx > sx AND (tx - sx) MOD sy = 0
    RETURN false
```

## Walkthrough
| Step | tx | ty | Action |
|------|----|----|--------|
| Start | 3 | 5 | both > start (1,1) |
| ty > tx → ty = 5 MOD 3 = 2 |
| Now tx=3, ty=2 → tx > ty → tx = 3 MOD 2 = 1 |
| tx=1 matches sx, check (ty - sy) MOD sx = (2-1) MOD 1 = 0 → true |
Thus reachable.

## Complexity Analysis
- **Time:** `O(log max(tx, ty))` because each modulo reduces a coordinate substantially.
- **Space:** `O(1)` – only a few integer variables.

## Follow-Up Questions
1. How would the solution change if moves allowed subtraction instead of addition?
2. Can you extend the algorithm to count the minimum number of moves required?
3. What if the grid contains obstacles that block certain coordinates?

## Key Takeaway
Reversing the process and using modulo lets you collapse many forward steps into a single operation, yielding a logarithmic-time decision.
