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

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given two non-negative integer arrays `price` and `tastiness`, both arrays have the same length `n`. You are also given two non-negative integers `maxAmount` and `maxCoupons`.

For every integer `i` in range `[0, n - 1]`:

- `price[i]` describes the price of `i^th` fruit.
- `tastiness[i]` describes the tastiness of `i^th` fruit.

You want to purchase some fruits such that total tastiness is maximized and the total price does not exceed `maxAmount`.

Additionally, you can use a coupon to purchase fruit for **half of its price** (rounded down to the closest integer). You can use at most `maxCoupons` of such coupons.

Return *the maximum total tastiness that can be purchased*.

**Note that:**

- You can purchase each fruit at most once.
- You can use coupons on some fruit at most once.

**Constraints:**
- `n == price.length == tastiness.length`
- `1 <= n <= 100`
- `0 <= price[i], tastiness[i], maxAmount <= 1000`
- `0 <= maxCoupons <= 5`

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
Input: price = [10,20,20], tastiness = [5,8,8], maxAmount = 20, maxCoupons = 1
Output: 13
Explanation: It is possible to make total tastiness 13 in following way:
- Buy first fruit without coupon, so that total price = 0 + 10 and total tastiness = 0 + 5.
- Buy second fruit with coupon, so that total price = 10 + 10 and total tastiness = 5 + 8.
- Do not buy third fruit, so that total price = 20 and total tastiness = 13.
It can be proven that 13 is the maximum total tastiness that can be obtained.
```

**Example 2:**
```
Input: price = [10,15,7], tastiness = [5,8,20], maxAmount = 10, maxCoupons = 2
Output: 28
Explanation: It is possible to make total tastiness 20 in following way:
- Do not buy first fruit, so that total price = 0 and total tastiness = 0.
- Buy second fruit with coupon, so that total price = 0 + 7 and total tastiness = 0 + 8.
- Buy third fruit with coupon, so that total price = 7 + 3 and total tastiness = 8 + 20.
It can be proven that 28 is the maximum total tastiness that can be obtained.
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