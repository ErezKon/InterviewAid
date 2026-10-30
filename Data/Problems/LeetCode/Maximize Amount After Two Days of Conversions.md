# 3387. Maximize Amount After Two Days of Conversions

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-amount-after-two-days-of-conversions](https://leetcode.com/problems/maximize-amount-after-two-days-of-conversions)
**Companies:** Google, Rippling, Uber

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: BFS/DFS on Currency Graph — O(V + E)](#approach-bfsdfs-on-currency-graph--ov--e-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a string `initialCurrency`, and you start with `1.0` of `initialCurrency`.

You are also given four arrays with currency pairs (strings) and rates (real numbers):

- `pairs1[i] = [startCurrency_i, targetCurrency_i]` denotes that you can convert from `startCurrency_i` to `targetCurrency_i` at a rate of `rates1[i]` on **day 1**.
- `pairs2[i] = [startCurrency_i, targetCurrency_i]` denotes that you can convert from `startCurrency_i` to `targetCurrency_i` at a rate of `rates2[i]` on **day 2**.
- Also, each `targetCurrency` can be converted back to its corresponding `startCurrency` at a rate of `1 / rate`.

You can perform **any** number of conversions, **including zero**, using `rates1` on day 1, **followed** by any number of additional conversions, **including zero**, using `rates2` on day 2.

Return the **maximum** amount of `initialCurrency` you can have after performing any number of conversions on both days **in order**.

**Note: **Conversion rates are valid, and there will be no contradictions in the rates for either day. The rates for the days are independent of each other.

**Constraints:**
- `1 <= initialCurrency.length <= 3`
- `initialCurrency` consists only of uppercase English letters.
- `1 <= n == pairs1.length <= 10`
- `1 <= m == pairs2.length <= 10`
- `pairs1[i] == [startCurrency_i, targetCurrency_i]`
- `pairs2[i] == [startCurrency_i, targetCurrency_i]`
- `1 <= startCurrency_i.length, targetCurrency_i.length <= 3`
- `startCurrency_i` and `targetCurrency_i` consist only of uppercase English letters.
- `rates1.length == n`
- `rates2.length == m`
- `1.0 <= rates1[i], rates2[i] <= 10.0`
- The input is generated such that there are no contradictions or cycles in the conversion graphs for either day.
- The input is generated such that the output is **at most** `5 * 10^10`.

---

## Examples

**Example 1:**
```
Input: initialCurrency = "EUR", pairs1 = [["EUR","USD"],["USD","JPY"]], rates1 = [2.0,3.0], pairs2 = [["JPY","USD"],["USD","CHF"],["CHF","EUR"]], rates2 = [4.0,5.0,6.0]
Output: 720.00000
Explanation: To get the maximum amount of EUR, starting with 1.0 EUR:
- On Day 1:
- Convert EUR to USD to get 2.0 USD.
- Convert USD to JPY to get 6.0 JPY.
- On Day 2:
- Convert JPY to USD to get 24.0 USD.
- Convert USD to CHF to get 120.0 CHF.
- Finally, convert CHF to EUR to get 720.0 EUR.
```

**Example 2:**
```
Input: initialCurrency = "NGN", pairs1 = [["NGN","EUR"]], rates1 = [9.0], pairs2 = [["NGN","EUR"]], rates2 = [6.0]
Output: 1.50000
Explanation: Converting NGN to EUR on day 1 and EUR to NGN using the inverse rate on day 2 gives the maximum amount.
```

**Example 3:**
```
Input: initialCurrency = "USD", pairs1 = [["USD","EUR"]], rates1 = [1.0], pairs2 = [["EUR","JPY"]], rates2 = [10.0]
Output: 1.00000
Explanation: In this example, there is no need to make any conversions on either day.
```

---

## Key Insight

> Build a currency graph for each day. Use **BFS/DFS** from the initial currency to find the best conversion rate to every reachable currency on Day 1. Then from each reachable currency, use BFS/DFS on the Day 2 graph to find the best rate back to the initial currency. The answer is `max(day1_rate[c] * day2_rate_back[c])` over all intermediate currencies `c`.

---

## Approach: BFS/DFS on Currency Graph — O(V + E) ✅

```
FUNCTION maxAmount(initialCurrency, day1Pairs, day2Pairs):
    // Build adjacency lists for each day
    graph1 = BUILD_GRAPH(day1Pairs)
    graph2 = BUILD_GRAPH(day2Pairs)

    // BFS/DFS from initial currency on day 1
    rates1 = BFS(graph1, initialCurrency)    // currency → max rate from initial

    // BFS/DFS from initial currency on day 2 (reverse direction)
    rates2 = BFS(graph2, initialCurrency)    // currency → max rate from initial

    // For each currency reachable on both days, compute round-trip
    maxAmount = 1.0    // can always keep original
    FOR currency IN rates1:
        IF currency IN rates2:
            maxAmount = MAX(maxAmount, rates1[currency] * rates2[currency])

    RETURN maxAmount

FUNCTION BFS(graph, start):
    rates = {start: 1.0}
    queue = [start]
    WHILE queue not empty:
        curr = queue.DEQUEUE()
        FOR (neighbor, rate) IN graph[curr]:
            newRate = rates[curr] * rate
            IF neighbor NOT IN rates OR newRate > rates[neighbor]:
                rates[neighbor] = newRate
                queue.ENQUEUE(neighbor)
    RETURN rates
```

---

## Walkthrough

```
Day 1 graph: EUR →(2.0)→ USD →(3.0)→ JPY
Day 2 graph: JPY →(4.0)→ USD →(0.5)→ EUR
```

**Day 1 BFS from EUR:** EUR=1.0, USD=2.0, JPY=6.0
**Day 2 BFS from EUR:** EUR=1.0, USD=2.0, JPY=0.5

Wait — for Day 2 we need rates *to* EUR, not *from* EUR. Use reverse graph or BFS from EUR on Day 2 gives rates from EUR. We need: for each currency c, what's the rate from c → EUR on Day 2. That equals `1 / rates2[c]`... or just BFS from all currencies. Simpler: BFS from EUR on reverse Day 2 graph.

Actually the correct approach: `rates1[c]` = how much of c you have. `rates2_reverse[c]` = rate from c back to EUR on Day 2. Result = `rates1[c] * rates2_reverse[c]`.

**Result:** 6.0 * 2.0 = 12.0 ✅ (JPY→USD at 4.0 then USD→EUR at 0.5 = 2.0 rate from JPY→EUR)

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| BFS on both day graphs | **O(V + E)** per day | O(V + E) |

Where V = number of currencies, E = number of conversion pairs.

---

## Follow-Up Questions

**Q1: What if there are arbitrage cycles?**
With cycles, BFS might not terminate. Use Bellman-Ford on log-rates or detect negative cycles in the log-transformed graph.

**Q2: What if you had k days instead of 2?**
Chain k BFS passes, carrying forward the best rates achievable at each intermediate currency.

**Q3: Why BFS instead of Dijkstra?**
We're maximizing products (multiplicative weights). We can use BFS/DFS with relaxation. Alternatively, take log of rates and use shortest-path algorithms on additive weights.

---

## Key Takeaway

> **Currency conversion is a graph problem: BFS/DFS finds the best conversion rate from a source currency to all others.** For multi-day problems, chain the results: Day 1 rates × Day 2 reverse rates gives the round-trip gain.
