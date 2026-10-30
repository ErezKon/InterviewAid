# 3842. Toggle Light Bulbs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/toggle-light-bulbs](https://leetcode.com/problems/toggle-light-bulbs)
**Companies:** Juspay

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve LC 319 "Bulb Switcher", a different problem. Correct idea: keep a parity array `st[1..100]`, XOR `st[x] ^= 1` for each `x` in `bulbs`, and return the indices with `st[i] == 1` in increasing order. O(n + 100).*

You are given an array `bulbs` of integers between 1 and 100.

There are 100 light bulbs numbered from 1 to 100. All of them are switched off initially.

For each element `bulbs[i]` in the array `bulbs`:

- If the `bulbs[i]`th light bulb is currently off, switch it on.
- Otherwise, switch it off.

Return the list of integers denoting the light bulbs that are on in the end, **sorted** in **ascending** order. If no bulb is on, return an empty list.

**Constraints:**
- `1 <= bulbs.length <= 100`
- `1 <= bulbs[i] <= 100`

## Examples

**Example 1:**
```
Input: bulbs = [10,30,20,10]
Output: [20,30]
Explanation:
- The bulbs[0] = 10th light bulb is currently off. We switch it on.
- The bulbs[1] = 30th light bulb is currently off. We switch it on.
- The bulbs[2] = 20th light bulb is currently off. We switch it on.
- The bulbs[3] = 10th light bulb is currently on. We switch it off.
- In the end, the 20th and the 30th light bulbs are on.
```

**Example 2:**
```
Input: bulbs = [100,100]
Output: []
Explanation:
- The bulbs[0] = 100th light bulb is currently off. We switch it on.
- The bulbs[1] = 100th light bulb is currently on. We switch it off.
- In the end, no light bulb is on.
```

## Approach
A bulb ends up on only if it is toggled an odd number of times. Bulb `k` is toggled once for each divisor of `k`. Numbers have an odd number of divisors exactly when they are perfect squares. Hence the answer equals the count of perfect squares ≤ `n`, which is `⌊√n⌋`.

```text
FUNCTION bulbSwitch(n):
    RETURN FLOOR(SQRT(n))
```

## Walkthrough
For `n = 5`:
- Perfect squares ≤ 5 are 1 and 4 → count = 2 → bulbs 1 and 4 are on.

## Complexity Analysis
*Time*: O(1) – direct formula.
*Space*: O(1).

## Follow‑Up Questions
1. How would you modify the solution if the toggle pattern changes (e.g., toggle every `i`‑th bulb starting from offset `i-1`)?
2. Can you list the indices of the bulbs that remain on without iterating over all bulbs?
3. What is the result if the initial state is all **on**?

## Key Takeaway
The number of bulbs left on equals the integer square root of `n`, because only perfect‑square positions have an odd divisor count.
