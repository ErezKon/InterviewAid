
# 121. Best Time to Buy and Sell Stock

**Difficulty:** 🟢 Easy
**Acceptance:** 56.8%
**LeetCode:** [https://leetcode.com/problems/best-time-to-buy-and-sell-stock](https://leetcode.com/problems/best-time-to-buy-and-sell-stock)
**Companies:** Accenture, Accolite, Adobe, Agoda, Airtel, Akamai, Amazon, American Express, Apple, Aqr Capital Management, Atlassian, Bank Of America, Blackrock, Bloomberg, Bny Mellon, Bolt, Bytedance, Capgemini, Capital One, Carwale, Cisco, Citadel, Citi, Cognizant, Coinbase, Comcast, De Shaw, Deloitte, Deutsche Bank, Epam Systems, Expedia, Fanatics, Flipkart, Garmin, Goldman Sachs, Google, Groww, Hcl, Hsbc, Ibm, Impact Analytics, Infosys, Intuit, Jpmorgan, Lg Electronics, Linkedin, Mastercard, Meta, Microsoft, Microstrategy, Millennium, Morgan Stanley, Murex, Myntra, Nasdaq, Nvidia, Optiver, Oracle, Ozon, Paypal, Paytm, Phonepe, Qualys, Rbc, Remitly, Robinhood, Salesforce, Samsung, Sap, Servicenow, Sigmoid, Snowflake, Societe Generale, Squarepoint Capital, Swiggy, Tcs, Tech Mahindra, Tesla, Tiger Analytics, Tiktok, Toast, Turing, Uber, Visa, Vk, Walmart Labs, Yandex, Zeta Suite, Zoho, Zoox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Brute Force — O(n²)](#3-approach-1-brute-force--on²)
4. [Approach 2: One Pass — O(n) ✅](#4-approach-2-one-pass--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up: The Stock Problem Family](#7-follow-up-the-stock-problem-family)

---

## 1. Problem Description

You are given an array `prices` where `prices[i]` is the price of a given stock on the `i`th day.

You want to maximize your profit by choosing a **single day** to buy and a **single day** in the future to sell.

Return the maximum profit. If no profit is possible, return `0`.

---

## 2. Examples

```
Example 1:
  Input:  [7, 1, 5, 3, 6, 4]
  Output: 5
  Reason: Buy on day 1 (price=1), sell on day 4 (price=6) → profit = 5

Example 2:
  Input:  [7, 6, 4, 3, 1]
  Output: 0
  Reason: Prices only decrease — no profitable transaction.
```

---

## 3. Approach 1: Brute Force — O(n²)

```
FUNCTION maxProfitBrute(prices):
    maxProfit = 0

    FOR i ← 0 TO n - 2:
        FOR j ← i + 1 TO n - 1:
            profit = prices[j] - prices[i]
            maxProfit = MAX(maxProfit, profit)

    RETURN maxProfit
```

---

## 4. Approach 2: One Pass — O(n) ✅

### Key Insight

Track the **minimum price seen so far**. At each day, the best profit achievable is `prices[i] - minPrice`. Update the global max.

```
FUNCTION maxProfit(prices):

    minPrice  = INFINITY
    maxProfit = 0

    FOR each price IN prices:
        minPrice  = MIN(minPrice, price)
        maxProfit = MAX(maxProfit, price - minPrice)

    RETURN maxProfit
```

### Why This Works

- We always buy at the **cheapest** price seen so far.
- We compute the profit of selling **today** at every step.
- Because we iterate left to right, the buy day is always before the sell day.

---

## 5. Walkthrough

```
prices = [7, 1, 5, 3, 6, 4]

Day 0: price=7  minPrice=7   profit=7-7=0   maxProfit=0
Day 1: price=1  minPrice=1   profit=1-1=0   maxProfit=0
Day 2: price=5  minPrice=1   profit=5-1=4   maxProfit=4
Day 3: price=3  minPrice=1   profit=3-1=2   maxProfit=4
Day 4: price=6  minPrice=1   profit=6-1=5   maxProfit=5  ★
Day 5: price=4  minPrice=1   profit=4-1=3   maxProfit=5

Result: 5 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Brute Force | O(n²) | O(1) |
| **One Pass** | **O(n)** | **O(1)** |

---

## 7. Follow-Up: The Stock Problem Family

### 7.1 Best Time to Buy and Sell Stock II (LeetCode #122)

**Unlimited transactions.** Collect every upward price movement:

```
FUNCTION maxProfitII(prices):
    profit = 0

    FOR i ← 1 TO n - 1:
        IF prices[i] > prices[i-1]:
            profit += prices[i] - prices[i-1]

    RETURN profit
```

**Time:** O(n), **Space:** O(1)

---

### 7.2 Best Time to Buy and Sell Stock III (LeetCode #123)

**At most 2 transactions.** Use state machine DP:

```
FUNCTION maxProfitIII(prices):
    buy1  = -INFINITY
    sell1 = 0
    buy2  = -INFINITY
    sell2 = 0

    FOR each price IN prices:
        buy1  = MAX(buy1,  -price)           // best profit after 1st buy
        sell1 = MAX(sell1, buy1 + price)     // best profit after 1st sell
        buy2  = MAX(buy2,  sell1 - price)    // best profit after 2nd buy
        sell2 = MAX(sell2, buy2 + price)     // best profit after 2nd sell

    RETURN sell2
```

**Time:** O(n), **Space:** O(1)

---

### 7.3 Best Time to Buy and Sell Stock IV (LeetCode #188)

**At most k transactions.** Generalize the state machine:

```
FUNCTION maxProfitIV(k, prices):
    IF k >= n / 2:
        RETURN maxProfitII(prices)      // unlimited transactions

    buy  = ARRAY of k elements, all = -INFINITY
    sell = ARRAY of k elements, all = 0

    FOR each price IN prices:
        FOR j ← 0 TO k - 1:
            buy[j]  = MAX(buy[j],  (j > 0 ? sell[j-1] : 0) - price)
            sell[j] = MAX(sell[j], buy[j] + price)

    RETURN sell[k-1]
```

**Time:** O(n·k), **Space:** O(k)

---

### 7.4 With Cooldown (LeetCode #309)

After selling, you must **wait one day** before buying again.

```
FUNCTION maxProfitCooldown(prices):
    hold     = -INFINITY       // holding a stock
    sold     = 0               // just sold
    cooldown = 0               // in cooldown (can buy next)

    FOR each price IN prices:
        prevHold = hold
        hold     = MAX(hold, cooldown - price)
        cooldown = MAX(cooldown, sold)
        sold     = prevHold + price

    RETURN MAX(sold, cooldown)
```

---

### 7.5 With Transaction Fee (LeetCode #714)

Unlimited transactions, but each has a fixed fee.

```
FUNCTION maxProfitFee(prices, fee):
    hold = -prices[0]
    cash = 0

    FOR i ← 1 TO n - 1:
        hold = MAX(hold, cash - prices[i])
        cash = MAX(cash, hold + prices[i] - fee)

    RETURN cash
```

---

## Stock Problems Summary

| Problem | Constraint | Key Technique | Time |
|---------|-----------|---------------|------|
| **I** (#121) | 1 transaction | Track min price | O(n) |
| **II** (#122) | Unlimited | Sum all gains | O(n) |
| **III** (#123) | At most 2 | State machine (4 states) | O(n) |
| **IV** (#188) | At most k | Generalized state machine | O(nk) |
| **Cooldown** (#309) | 1-day cooldown | 3-state DP | O(n) |
| **Fee** (#714) | Transaction fee | 2-state DP | O(n) |

---

## Key Takeaway

> The stock problems form a family unified by **state machine DP**. States represent whether you're holding, sold, or in cooldown. Transitions represent buying, selling, or waiting. The simplest version (#121) reduces to tracking a running minimum — but understanding the general framework lets you tackle all variants.
