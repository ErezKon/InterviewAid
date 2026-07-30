# 2431. Maximize Total Tastiness of Purchased Fruits

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits](https://leetcode.com/problems/maximize-total-tastiness-of-purchased-fruits)
**Companies:** Linkedin

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Knapsack DP — O(n · maxAmount · maxCoupons)](#approach-knapsack-dp)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
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

```text
FUNCTION maxTastiness(price, tastiness, maxAmount, maxCoupons):
    n = len(price)
    dp = (maxAmount+1) × (maxCoupons+1) matrix initialized to 0

    FOR i ← 0 TO n - 1:
        FOR j ← maxAmount DOWNTO 0:
            FOR c ← maxCoupons DOWNTO 0:
                // Skip fruit i
                dp[j][c] = dp[j][c]
                // Buy without coupon
                IF j >= price[i]:
                    dp[j][c] = MAX(dp[j][c], dp[j - price[i]][c] + tastiness[i])
                // Buy with coupon (half price, rounded down)
                half = price[i] // 2
                IF c > 0 AND j >= half:
                    dp[j][c] = MAX(dp[j][c], dp[j - half][c - 1] + tastiness[i])

    RETURN dp[maxAmount][maxCoupons]
```

---

## Examples

**Example 1:**
```
Input: price = [2,3,5], tastiness = [5,6,8], maxAmount = 5, maxCoupons = 1
Output: 11
Explanation:
- Use coupon on fruit with price 5 (half price = 2) and buy fruit with price 2.
- Total cost = 2 (coupon fruit) + 2 = 4 ≤ 5.
- Total tastiness = 8 + 5 = 13, but we exceed budget if we also buy the 3‑price fruit.
- Best achievable tastiness is 11 by buying fruit 0 (price 2, tastiness 5) and fruit 1 with coupon (price 1, tastiness 6).
```

**Example 2:**
```
Input: price = [4,4,4], tastiness = [10,10,10], maxAmount = 8, maxCoupons = 2
Output: 20
Explanation: Use coupons on any two fruits (cost 2 each) and buy them, total cost 4, tastiness 20.
```

---

## Walkthrough

Consider the first example.
| i (fruit) | price[i] | tastiness[i] | dp after processing i (budget × coupons) |
|-----------|----------|--------------|--------------------------------------------|
|0|2|5|`dp[2][0]=5`, `dp[1][1]=5` (using coupon) |
|1|3|6|Update states: buying without coupon uses budget 3, with coupon uses 1. Best combos give `dp[5][0]=11` (fruits 0+1) |
|2|5|8|Even with coupon (cost 2) we exceed remaining budget, so no improvement.
The final answer is `dp[5][1]=11`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| 3D Knapsack | **O(n · A · C)** | O(A · C) |

---

## Key Takeaway

> **Knapsack with coupons adds a coupon dimension.** For each item, consider three choices: skip, buy at full price, or buy at half price (using a coupon).