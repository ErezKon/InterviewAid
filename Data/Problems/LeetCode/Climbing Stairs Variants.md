# 70. Climbing Stairs (Extended)

See also: [Climbing Stairs.md](Climbing%20Stairs.md) for the basic solution.

**Companies:** Accenture, Accolite, Adobe, Agoda, Amazon, Amd, Apple, Barclays, Blackrock, Bloomberg, Bytedance, Citadel, Cognizant, Deloitte, Disney, Fractal Analytics, Goldman Sachs, Google, Grammarly, Hpe, Hsbc, Ibm, Infosys, Intuit, Josh Technology, Medianet, Meta, Microsoft, Nvidia, Oracle, Paypal, Qualcomm, Rakuten, Tcs, Tiktok, Uber, Zoho
---

## Problem Description
> *Note: constraints and examples are derived, not from an official LeetCode source.*

Given a staircase with `n` steps, you can climb the stairs using various step-size rules or incur costs/obstacles. Compute the number of distinct ways (or the minimum cost) to reach the top under each variant:

- **Variant 1 (k steps):** each move climbs between `1` and `k` steps. Count distinct ways to reach step `n`.
- **Variant 2 (min cost, LeetCode #746):** `cost[i]` is paid when stepping on stair `i`; you may start at index `0` or `1` and climb 1 or 2 steps. Return the minimum cost to reach the top (index `n`).
- **Variant 3 (obstacles):** some steps are blocked and cannot be stepped on. Count distinct ways using 1 or 2 steps.
- **Variant 4 (modulo):** same as the basic problem but `n` is large; return the count modulo `10^9 + 7`.

**Constraints (derived):**
- `1 <= n <= 10^5` (Variants 1, 3, 4); `1 <= n <= 45` without modulo
- `1 <= k <= n`
- `2 <= cost.length <= 1000`, `0 <= cost[i] <= 999`
- Blocked steps are given as a set of indices in `[1, n - 1]`

## Examples
```
Example 1 (Variant 1):
  Input: n = 3, k = 2
  Output: 3
  Explanation: 1+1+1, 1+2, 2+1.
```

```
Example 2 (Variant 2):
  Input: cost = [10,15,20]
  Output: 15
  Explanation: Start at index 1, pay 15, and climb two steps to reach the top.
```

```
Example 3 (Variant 3):
  Input: n = 4, blocked = {2}
  Output: 1
  Explanation: Step 2 cannot be used, so the only way is 1 -> 3 -> 4 (moves 1, 2, 1).
```

## Approach
Use dynamic programming where `dp[i]` stores the number of ways (or minimum cost) to reach step `i`. Transition depends on the variant.

## Walkthrough
| i | dp[i] (k=2) |
|---|------------|
|0|1 (base)|
|1|1|
|2|dp[1]+dp[0]=2|
|3|dp[2]+dp[1]=3|

## Complexity Analysis
Time: O(n·k) for variant 1, O(n) for others. Space: O(n) or O(1) with rolling variables.

## Follow-Up Questions
- How to handle very large `n` with modulo arithmetic?
- Extend to allow forbidden steps.
- Optimize space to O(1).

---

## Follow-Up Variants

### Variant 1: k steps (1 to k at a time)

```
dp[i] = sum(dp[i-j] for j in 1..k if i-j >= 0)
```

### Variant 2: Min cost climbing stairs (LeetCode #746)

```
FUNCTION minCostClimbingStairs(cost):
    a, b = cost[0], cost[1]
    FOR i ← 2 TO n-1:
        a, b = b, cost[i] + MIN(a, b)
    RETURN MIN(a, b)
```

### Variant 3: Climbing stairs with obstacles

If step `i` is blocked, `dp[i] = 0`. Otherwise, normal recurrence.

### Variant 4: Count ways modulo 10⁹+7

Same recurrence, just take mod at each step.

---

## Key Takeaway

> Climbing Stairs is the simplest DP problem (Fibonacci in disguise). Its variants teach modular arithmetic, variable step sizes, and cost optimization — all fundamental DP patterns.
