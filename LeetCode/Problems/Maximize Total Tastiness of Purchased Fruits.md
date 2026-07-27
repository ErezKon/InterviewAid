# 2431. Maximize Total Tastiness of Purchased Fruits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits](https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits)
**Companies:** Linkedin

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Knapsack DP — O(n · maxAmount · maxCoupons)](#approach-knapsack-dp)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given arrays of fruit prices, tastiness values, a budget `maxAmount`, and `maxCoupons` (each coupon halves a fruit's price), maximize total tastiness within budget.

This is a **0/1 Knapsack with coupons** variant.

---

## Key Insight

> Standard knapsack with an extra dimension for coupon usage. State: `dp[i][budget][coupons]` = max tastiness considering first `i` fruits with remaining budget and coupons.

---

## Approach: Knapsack DP — O(n · maxAmount · maxCoupons) ✅

```
FUNCTION maxTastiness(price, tastiness, maxAmount, maxCoupons):
    n = len(price)
    dp = (maxAmount+1) × (maxCoupons+1) of 0

    FOR i ← 0 TO n - 1:
        FOR j ← maxAmount DOWNTO 0:
            FOR c ← maxCoupons DOWNTO 0:
                // Buy without coupon
                IF j >= price[i]:
                    dp[j][c] = MAX(dp[j][c], dp[j - price[i]][c] + tastiness[i])
                // Buy with coupon (half price)
                half = price[i] // 2
                IF c > 0 AND j >= half:
                    dp[j][c] = MAX(dp[j][c], dp[j - half][c - 1] + tastiness[i])

    RETURN dp[maxAmount][maxCoupons]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 3D Knapsack | **O(n · A · C)** | O(A · C) |

---

## Key Takeaway

> **Knapsack with coupons adds a coupon dimension.** For each item, consider three choices: skip, buy at full price, or buy at half price (using a coupon).
