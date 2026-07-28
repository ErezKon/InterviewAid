# 3842. Toggle Light Bulbs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toggle-light-bulbs](https://leetcode.com/problems/toggle-light-bulbs)
**Companies:** Juspay

---

## Problem Description
There are `n` light bulbs, initially all turned **off**. You make `n` passes over the bulbs. On the `i`‑th pass, you toggle (turn on if off, turn off if on) every `i`‑th bulb (i.e., bulbs whose indices are multiples of `i`). After completing all passes, return the number of bulbs that remain **on**.

## Examples
| n | Output | Explanation |
|---|--------|-------------|
| 3 | 1 | Bulbs states after passes: `[off, on, off]` → only bulb 2 is on. |
| 5 | 2 | Bulbs on are 2 and 4 (perfect squares). |

## Approach
A bulb ends up on only if it is toggled an odd number of times. Bulb `k` is toggled once for each divisor of `k`. Numbers have an odd number of divisors exactly when they are perfect squares. Hence the answer equals the count of perfect squares ≤ `n`, which is `⌊√n⌋`.

```text
FUNCTION bulbSwitch(n):
    RETURN FLOOR(SQRT(n))
```

## Walkthrough
For `n = 5`:
- Perfect squares ≤ 5 are 1 and 4 → count = 2 → bulbs 1 and 4 are on.

## Complexity Analysis
*Time*: O(1) – direct formula.
*Space*: O(1).

## Follow‑Up Questions
1. How would you modify the solution if the toggle pattern changes (e.g., toggle every `i`‑th bulb starting from offset `i-1`)?
2. Can you list the indices of the bulbs that remain on without iterating over all bulbs?
3. What is the result if the initial state is all **on**?

## Key Takeaway
The number of bulbs left on equals the integer square root of `n`, because only perfect‑square positions have an odd divisor count.
