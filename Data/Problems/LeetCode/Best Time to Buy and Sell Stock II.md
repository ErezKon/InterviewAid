# 122. Best Time to Buy and Sell Stock II

**Difficulty:** 🟡 Medium
**Acceptance:** 67.0%
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii](https://leetcode.com/problems/best-time-to-buy-and-sell-stock-ii)
**Companies:** Accenture, Agoda, Amazon, Apple, Bloomberg, Capital One, Careem, Ctc, De Shaw, Deutsche Bank, Ebay, Geico, Goldman Sachs, Google, Infosys, Jpmorgan, Meta, Microsoft, Nike, Optiver, Servicenow, Sigmoid, Tcs, Tiktok, Toast, Visa, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Greedy — O(n) ✅](#3-approach-greedy--on-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

You are given an integer array `prices` where `prices[i]` is the price of a given stock on the `iᵗʰ` day.

On each day, you may decide to buy and/or sell the stock. You can only hold **at most one** share of the stock at any time. However, you can sell and buy the stock multiple times on the **same day**, ensuring you never hold more than one share of the stock.

Find and return *the **maximum** profit you can achieve*.

**Constraints:**
- `1 ≤ prices.length ≤ 3 * 10⁴`
- `0 ≤ prices[i] ≤ 10⁴`

---

## 2. Examples

```
Example 1:
  Input: prices = [7,1,5,3,6,4]
  Output: 7
  Explanation: Buy on day 2 (price = 1) and sell on day 3 (price = 5), profit = 5-1 = 4.
  Then buy on day 4 (price = 3) and sell on day 5 (price = 6), profit = 6-3 = 3.
  Total profit is 4 + 3 = 7.

Example 2:
  Input: prices = [1,2,3,4,5]
  Output: 4
  Explanation: Buy on day 1 (price = 1) and sell on day 5 (price = 5), profit = 5-1 = 4.
  Total profit is 4.

Example 3:
  Input: prices = [7,6,4,3,1]
  Output: 0
  Explanation: There is no way to make a positive profit, so we never buy the stock to achieve the maximum profit of 0.
```

---

## 3. Approach: Greedy — O(n) ✅

### Key Insight

Capture **every upward movement**. If `prices[i] > prices[i-1]`, add the difference to profit.

This is equivalent to buying at every local minimum and selling at every local maximum.

```
FUNCTION maxProfit(prices):
    profit = 0

    FOR i ← 1 TO n - 1:
        IF prices[i] > prices[i - 1]:
            profit += prices[i] - prices[i - 1]

    RETURN profit
```

### Why This Works

Any profit from a multi-day hold can be decomposed into daily gains:
`profit(day1→day4) = (day2-day1) + (day3-day2) + (day4-day3)`

---

## 4. Walkthrough

```
prices = [7, 1, 5, 3, 6, 4]

i=1: 1 < 7 → skip
i=2: 5 > 1 → profit += 4 = 4
i=3: 3 < 5 → skip
i=4: 6 > 3 → profit += 3 = 7
i=5: 4 < 6 → skip

Result: 7 ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

### 6.1 Best Time to Buy and Sell Stock I (LeetCode #121)?

One transaction only. Track min price seen so far, maximize `price - minPrice`.

### 6.2 Best Time to Buy and Sell Stock III (LeetCode #123)?

At most 2 transactions. DP with states: `buy1, sell1, buy2, sell2`.

### 6.3 Best Time to Buy and Sell Stock IV (LeetCode #188)?

At most k transactions. DP: `dp[k][n]` states. When k ≥ n/2, reduce to problem II (unlimited transactions).

### 6.4 With cooldown (LeetCode #309)?

After selling, must wait one day. DP with states: `held`, `sold`, `rest`.

### 6.5 With transaction fee (LeetCode #714)?

Same as unlimited transactions but subtract fee per transaction. Greedy or DP.

---

## Key Takeaway

> When allowed unlimited transactions, the greedy approach of **capturing every daily gain** is optimal. The mathematical insight — any multi-day profit equals the sum of consecutive daily gains — is elegant and worth understanding deeply.
