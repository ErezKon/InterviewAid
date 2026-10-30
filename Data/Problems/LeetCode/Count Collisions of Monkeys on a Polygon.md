# 2550. Count Collisions of Monkeys on a Polygon

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-collisions-of-monkeys-on-a-polygon](https://leetcode.com/problems/count-collisions-of-monkeys-on-a-polygon)
**Companies:** Amazon, Goldman Sachs, Microsoft

---

## Problem Description
There is a regular convex polygon with `n` vertices. The vertices are labeled from `0` to `n - 1` in a clockwise direction, and each vertex has **exactly one monkey**.

Simultaneously, each monkey moves to a neighboring vertex. A **collision** happens if at least two monkeys reside on the same vertex after the movement or intersect on an edge.

Return the number of ways the monkeys can move so that at least **one collision** happens. Since the answer may be very large, return it modulo `10^9 + 7`.

**Constraints:**
- `3 <= n <= 10^9`

## Examples
```
Example 1:
  Input: n = 3
  Output: 6
  Explanation: There are 8 total possible movements.
  Two ways such that they collide at some point are:
  - Monkey 1 moves in a clockwise direction; monkey 2 moves in an anticlockwise direction; monkey 3 moves
    in a clockwise direction. Monkeys 1 and 2 collide.
  - Monkey 1 moves in an anticlockwise direction; monkey 2 moves in an anticlockwise direction; monkey 3
    moves in a clockwise direction. Monkeys 1 and 3 collide.
```

```
Example 2:
  Input: n = 4
  Output: 14
```

(Of the `2^3 = 8` movements for n = 3, the only 2 collision‑free arrangements are where all move clockwise or all counter‑clockwise.)

## Approach
Each monkey has two choices, giving `2^n` total configurations. The only collision‑free configurations are the two where every monkey moves uniformly clockwise or uniformly counter‑clockwise. Subtract these from the total and apply modulo.

### Pseudocode
```text
FUNCTION monkeyMove(n):
    MOD ← 1_000_000_007
    total ← POWER(2, n) MOD MOD
    SET result ← (total - 2) % MOD
    RETURN result
```

## Walkthrough
For `n = 3`:
1. Total configurations = `2^3 = 8`.
2. Collision‑free: all clockwise, all counter‑clockwise → 2 configurations.
3. Result = `8 - 2 = 6`.

## Complexity Analysis
- Time: O(log n) for exponentiation (fast power).
- Space: O(1).

## Follow-Up Questions
- How would the answer change if monkeys could also stay in place?
- What is the count when the polygon is not regular (different numbers of neighboring vertices)?
- Can you generalize to `k` possible jump directions per monkey?

## Key Takeaway
The collision count equals `2^n - 2`, derived by subtracting the two uniform‑direction configurations from all possible jumps.
