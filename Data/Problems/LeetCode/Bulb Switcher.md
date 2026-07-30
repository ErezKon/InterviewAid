# 319. Bulb Switcher

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulb-switcher](https://leetcode.com/problems/bulb-switcher)
**Companies:** Accenture, Amazon, Bloomberg, Google, Infosys, Linkedin, Meta, Microsoft, Tcs

---

## Problem Description
There are `n` light bulbs initially off, numbered from `1` to `n`. You toggle the state of each bulb in `n` rounds: in round `i` you toggle every `i`‑th bulb (i.e., bulbs whose numbers are multiples of `i`). Return the number of bulbs that are on after the `n` rounds.

## Examples
- Input: `n = 3` → Output: `1`. Only bulb 1 is on (toggled in rounds 1 and 3).
- Input: `n = 5` → Output: `2`. Bulbs 1 and 4 remain on.

## Approach
**Mathematical Insight** – A bulb ends up on if it is toggled an odd number of times, which happens exactly when it has an odd number of divisors. Only perfect squares have an odd number of divisors, so the answer is the count of perfect squares ≤ `n`.

```text
FUNCTION bulbSwitch(n):
    RETURN FLOOR(SQRT(n))
```

## Walkthrough
For `n = 5`:
- Perfect squares ≤ 5 are `1` and `4` → count = 2.
- Hence 2 bulbs remain on.

## Complexity Analysis
- **Time:** O(1) – direct computation.
- **Space:** O(1) – constant extra space.

## Follow‑Up Questions
1. How would you modify the solution to return the actual indices of the bulbs that remain on?
2. Can you derive a formula for the sum of the numbers of the bulbs that stay on?
3. What if the toggling pattern changes to toggling every `i`‑th bulb starting from an offset?

## Key Takeaway
The problem reduces to counting perfect squares because only they have an odd divisor count, yielding a simple O(1) solution.
