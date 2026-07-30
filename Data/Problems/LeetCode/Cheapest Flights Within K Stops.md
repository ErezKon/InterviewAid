# 787. Cheapest Flights Within K Stops

**Difficulty:** 🟡 Medium
**Acceptance:** 38.0%
**LeetCode:** [https://leetcode.com/problems/cheapest-flights-within-k-stops](https://leetcode.com/problems/cheapest-flights-within-k-stops)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, De Shaw, Expedia, Flipkart, Google, Htc, Intuit, Makemytrip, Meta, Microsoft, Snapchat, Snowflake, Stripe, Tiktok, Uber

---

## 1. Problem Description

Find the cheapest price from `src` to `dst` with at most `k` stops. Return -1 if no such route.

---

## Examples

| n | flights | src | dst | k | Output |
|---|---------|-----|-----|---|--------|
| 3 | [[0,1,100],[1,2,100],[0,2,500]] | 0 | 2 | 1 | 200 |
| 3 | [[0,1,100],[1,2,100],[0,2,500]] | 0 | 2 | 0 | 500 |
| 4 | [[0,1,1],[0,2,5],[1,2,1],[2,3,1]] | 0 | 3 | 2 | 3 |

*Explanation:* With at most 1 stop, the cheapest route from 0→2 is 0→1→2 costing 200.

---

## 2. Approach: Bellman-Ford (k+1 iterations) — O(k·E) ✅

```text
FUNCTION findCheapestPrice(n, flights, src, dst, k):
    // Initialize distances
    SET prices ← array of size n filled with INFINITY
    SET prices[src] ← 0

    FOR i ← 0 TO k:
        SET tempPrices ← copy of prices
        FOR each [from, to, cost] IN flights:
            IF prices[from] != INFINITY:
                SET tempPrices[to] ← MIN(tempPrices[to], prices[from] + cost)
        SET prices ← tempPrices

    RETURN prices[dst] IF prices[dst] != INFINITY ELSE -1
```

### Why Not Dijkstra?

Standard Dijkstra doesn't handle the "at most k stops" constraint well. Modified Dijkstra with `(cost, node, stops)` in the heap works but can be slower.

---

## Walkthrough

1. **Initialize** `prices` with ∞ except `src` = 0.
2. **Iteration 0** (allow 0 stops): copy `prices` to `tempPrices`. Relax each edge; only direct flights from `src` update their destinations.
3. **Iteration 1** (allow 1 stop): use `prices` from previous iteration to relax edges again, now paths with one intermediate node are considered.
4. Continue until `k` iterations. The final `prices[dst]` holds the cheapest cost using ≤ k stops because each iteration adds the possibility of one more stop.

---

## Complexity Analysis

- **Time:** O(k · E) – each of the `k+1` passes scans all edges.
- **Space:** O(V) – distance array for each vertex.

---

## Follow‑Up Questions

- How would you adapt the solution to also return the actual flight path?
- Can you improve the runtime using a priority queue with stop count tracking?
- What changes are needed if edge weights can be negative?

---

## Key Takeaway

> Bellman‑Ford with exactly `k+1` relaxation rounds naturally handles the "at most k stops" constraint. Copy prices before each round to prevent cascading updates within the same round.
