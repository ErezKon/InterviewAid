# 70. Climbing Stairs (Extended)

See also: [Climbing Stairs.md](Climbing%20Stairs.md) for the basic solution.

**Companies:** Accenture, Accolite, Adobe, Agoda, Amazon, Amd, Apple, Barclays, Blackrock, Bloomberg, Bytedance, Citadel, Cognizant, Deloitte, Disney, Fractal Analytics, Goldman Sachs, Google, Grammarly, Hpe, Hsbc, Ibm, Infosys, Intuit, Josh Technology, Medianet, Meta, Microsoft, Nvidia, Oracle, Paypal, Qualcomm, Rakuten, Tcs, Tiktok, Uber, Zoho
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
