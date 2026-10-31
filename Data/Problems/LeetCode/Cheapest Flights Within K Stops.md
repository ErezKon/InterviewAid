# 787. Cheapest Flights Within K Stops

**Difficulty:** 🟡 Medium
**Acceptance:** 38.0%
**LeetCode:** [https://leetcode.com/problems/cheapest-flights-within-k-stops](https://leetcode.com/problems/cheapest-flights-within-k-stops)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, De Shaw, Expedia, Flipkart, Google, Htc, Intuit, Makemytrip, Meta, Microsoft, Snapchat, Snowflake, Stripe, Tiktok, Uber

---

## 1. Problem Description

There are `n` cities connected by some number of flights. You are given an array `flights` where `flights[i] = [from_i, to_i, price_i]` indicates that there is a flight from city `from_i` to city `to_i` with cost `price_i`.

You are also given three integers `src`, `dst`, and `k`, return ***the cheapest price** from *`src`* to *`dst`* with at most *`k`* stops. *If there is no such route, return* *`-1`.

**Constraints:**
- `2 <= n <= 100`
- `0 <= flights.length <= (n * (n - 1) / 2)`
- `flights[i].length == 3`
- `0 <= from_i, to_i < n`
- `from_i != to_i`
- `1 <= price_i <= 10^4`
- There will not be any multiple flights between two cities.
- `0 <= src, dst, k < n`
- `src != dst`

---

## Examples

**Example 1:**
```
Input: n = 4, flights = [[0,1,100],[1,2,100],[2,0,100],[1,3,600],[2,3,200]], src = 0, dst = 3, k = 1
Output: 700
Explanation: The graph is shown above.
The optimal path with at most 1 stop from city 0 to 3 is marked in red and has cost 100 + 600 = 700.
Note that the path through cities [0,1,2,3] is cheaper but is invalid because it uses 2 stops.
```

**Example 2:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 1
Output: 200
Explanation: The graph is shown above.
The optimal path with at most 1 stop from city 0 to 2 is marked in red and has cost 100 + 100 = 200.
```

**Example 3:**
```
Input: n = 3, flights = [[0,1,100],[1,2,100],[0,2,500]], src = 0, dst = 2, k = 0
Output: 500
Explanation: The graph is shown above.
The optimal path with no stops from city 0 to 2 is marked in red and has cost 500.
```

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
4. Continue until `k` iterations. The final `prices[dst]` holds the cheapest cost using ≤ k stops because each iteration adds the possibility of one more stop.

---

## Complexity Analysis

- **Time:** O(k · E) – each of the `k+1` passes scans all edges.
- **Space:** O(V) – distance array for each vertex.

---

## Follow-Up Questions

- How would you adapt the solution to also return the actual flight path?
- Can you improve the runtime using a priority queue with stop count tracking?
- What changes are needed if edge weights can be negative?

---

## Key Takeaway

> Bellman-Ford with exactly `k+1` relaxation rounds naturally handles the "at most k stops" constraint. Copy prices before each round to prevent cascading updates within the same round.
