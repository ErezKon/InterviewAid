# 3387. Maximize Amount After Two Days of Conversions

**Difficulty:** 🟡 Medium
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

You start with `1.0` unit of a given currency. Over two days, you can perform currency conversions using exchange rates provided for each day. On each day, you can make any number of conversions (including chains through intermediaries). After both days, return the **maximum amount** of the initial currency you can end up with.

Each day's exchange rates form a graph: currencies are nodes and conversion rates are weighted edges (bidirectional — if A→B has rate r, then B→A has rate 1/r).

**Constraints:**
- Small number of currencies and conversions per day.

---

## Examples

**Example 1:**
```
Input:  initialCurrency = "EUR"
        Day 1: [["EUR","USD",2.0], ["USD","JPY",3.0]]
        Day 2: [["JPY","USD",4.0], ["USD","EUR",0.5]]
Output: 12.0
Explanation: Day 1: EUR → USD (2.0) → JPY (6.0)
             Day 2: JPY → USD (24.0) → EUR (12.0)
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
