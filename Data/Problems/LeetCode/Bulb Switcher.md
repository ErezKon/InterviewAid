# 319. Bulb Switcher

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/bulb-switcher](https://leetcode.com/problems/bulb-switcher)
**Companies:** Accenture, Amazon, Bloomberg, Google, Infosys, Linkedin, Meta, Microsoft, Tcs

---

## Problem Description

There are `n` bulbs that are initially off. You first turn on all the bulbs, then you turn off every second bulb.

On the third round, you toggle every third bulb (turning on if it's off or turning off if it's on). For the `i^th` round, you toggle every `i` bulb. For the `n^th` round, you only toggle the last bulb.

Return *the number of bulbs that are on after `n` rounds*.

**Constraints:**
- `0 <= n <= 10^9`

## Examples

**Example 1:**
```
Input: n = 3
Output: 1
Explanation: At first, the three bulbs are [off, off, off].
After the first round, the three bulbs are [on, on, on].
After the second round, the three bulbs are [on, off, on].
After the third round, the three bulbs are [on, off, off].
So you should return 1 because there is only one bulb is on.
```

**Example 2:**
```
Input: n = 0
Output: 0
```

**Example 3:**
```
Input: n = 1
Output: 1
```

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
