# 787. Cheapest Flights Within K Stops

**Difficulty:** 🟡 Medium
**Acceptance:** 38.0%
**LeetCode:** [https://leetcode.com/problems/cheapest-flights-within-k-stops](https://leetcode.com/problems/cheapest-flights-within-k-stops)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, De Shaw, Expedia, Flipkart, Google, Htc, Intuit, Makemytrip, Meta, Microsoft, Snapchat, Snowflake, Stripe, Tiktok, Uber

---

## 1. Problem Description

Find the cheapest price from `src` to `dst` with at most `k` stops. Return -1 if no such route.

---

## 2. Approach: Bellman-Ford (k+1 iterations) — O(k·E) ✅

```
FUNCTION findCheapestPrice(n, flights, src, dst, k):
    prices = array of n infinities
    prices[src] = 0

    FOR i ← 0 TO k:
        tempPrices = copy of prices

        FOR [from, to, cost] IN flights:
            IF prices[from] != infinity:
                tempPrices[to] = MIN(tempPrices[to], prices[from] + cost)

        prices = tempPrices

    RETURN prices[dst] IF prices[dst] != infinity ELSE -1
```

### Why Not Dijkstra?

Standard Dijkstra doesn't handle the "at most k stops" constraint well. Modified Dijkstra with `(cost, node, stops)` in the heap works but can be slower.

| Time | Space |
|------|-------|
| O(k · E) | O(V) |

---

## Key Takeaway

> Bellman-Ford with exactly `k+1` relaxation rounds naturally handles the "at most k stops" constraint. Copy prices before each round to prevent cascading updates within the same round.
