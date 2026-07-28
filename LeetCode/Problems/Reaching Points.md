# 780. Reaching Points

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/reaching-points](https://leetcode.com/problems/reaching-points)
**Companies:** Amazon, Blackstone, Cloudflare, Coursera, Goldman Sachs, Google, Jpmorgan, Kla, Kla Tencor, Microsoft, Paypal, Snapchat, Wayfair

---

## Problem Description
Given a start point `(sx, sy)` and a target point `(tx, ty)` on a 2‑D grid, you may repeatedly transform a point `(x, y)` to either `(x + y, y)` or `(x, x + y)`. Determine whether the target point can be reached from the start point.

## Examples
**Example 1:**
```
sx = 1, sy = 1, tx = 3, ty = 5
```
Sequence: `(1,1) → (2,1) → (3,1) → (3,4) → (3,5)` → reachable, return `true`.

**Example 2:**
```
sx = 1, sy = 1, tx = 2, ty = 2
```
No sequence of allowed moves reaches `(2,2)`, return `false`.

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

## Follow‑Up Questions
1. How would the solution change if moves allowed subtraction instead of addition?
2. Can you extend the algorithm to count the minimum number of moves required?
3. What if the grid contains obstacles that block certain coordinates?

## Key Takeaway
Reversing the process and using modulo lets you collapse many forward steps into a single operation, yielding a logarithmic‑time decision.
