# 2550. Count Collisions of Monkeys on a Polygon

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Goldman Sachs, Microsoft

---

## Problem Description
Given `n` monkeys positioned at the vertices of a regular polygon, each monkey simultaneously jumps to one of the two neighboring vertices. A collision occurs when two or more monkeys land on the same vertex. Compute the number of possible jump configurations that result in at least one collision, modulo `10^9 + 7`.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 2 | 2 | Both monkeys can jump to the same vertex in two ways. |
| 3 | 6 | Total configurations `2^3 = 8`; subtract the 2 collision‑free arrangements where all jump clockwise or all counter‑clockwise. |

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
