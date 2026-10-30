# 1928. Minimum Cost to Reach Destination in Time

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time](https://leetcode.com/problems/minimum-cost-to-reach-destination-in-time)
**Companies:** Airbnb, Amazon, Databricks, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Dijkstra on (cost, time) — O(E·T log(E·T))](#approach-dijkstra-on-cost-time--oet-loget)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a country of `n` cities numbered from `0` to `n - 1` where **all the cities are connected** by bi-directional roads. The roads are represented as a 2D integer array `edges` where `edges[i] = [xi, yi, timei]` denotes a road between cities `xi` and `yi` that takes `timei` minutes to travel. There may be multiple roads of differing travel times connecting the same two cities, but no road connects a city to itself.

Each time you pass through a city, you must pay a passing fee. This is represented as a **0-indexed** integer array `passingFees` of length `n` where `passingFees[j]` is the amount of dollars you must pay when you pass through city `j`.

In the beginning, you are at city `0` and want to reach city `n - 1` in `maxTime` **minutes or less**. The **cost** of your journey is the **summation of passing fees** for each city that you passed through at some moment of your journey (**including** the source and destination cities).

Given `maxTime`, `edges`, and `passingFees`, return *the **minimum cost** to complete your journey, or* `-1` *if you cannot complete it within* `maxTime` *minutes*.

**Constraints:**
- `1 ≤ maxTime ≤ 1000`
- `n == passingFees.length`
- `2 ≤ n ≤ 1000`
- `n - 1 ≤ edges.length ≤ 1000`
- `0 ≤ xi, yi ≤ n - 1`
- `1 ≤ timei ≤ 1000`
- `1 ≤ passingFees[j] ≤ 1000`
- The graph may contain multiple edges between two nodes.
- The graph does not contain self loops.

---

## Examples

```
Example 1:
  Input: maxTime = 30, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
  Output: 11
  Explanation: The path to take is 0 -> 1 -> 2 -> 5, which takes 30 minutes and has $11 worth of passing fees.
```

```
Example 2:
  Input: maxTime = 29, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
  Output: 48
  Explanation: The path to take is 0 -> 3 -> 4 -> 5, which takes 26 minutes and has $48 worth of passing fees.
  You cannot take path 0 -> 1 -> 2 -> 5 since it would take too long.
```

```
Example 3:
  Input: maxTime = 25, edges = [[0,1,10],[1,2,10],[2,5,10],[0,3,1],[3,4,10],[4,5,15]], passingFees = [5,1,2,20,20,3]
  Output: -1
  Explanation: There is no way to reach city 5 from city 0 within 25 minutes.
```

---

## Key Insight

> This is a **constrained shortest path** problem: minimize cost subject to a time budget. Use Dijkstra with state `(cost, time, node)`, prioritizing by cost. Track the minimum time seen at each node to prune dominated states.

The key pruning: if we reach a node with more time than previously seen, skip it — a faster path with equal or lower cost already exists.

---

## Approach: Dijkstra on (cost, time) — O(E·T log(E·T)) ✅

```
FUNCTION minCost(maxTime, edges, passingFees):
    n = len(passingFees)
    graph = adjacency list

    // dist[node] = min time to reach node with best known cost
    minTime = [infinity] * n
    heap = [(passingFees[0], 0, 0)]    // (cost, time, node)

    WHILE heap:
        (cost, time, node) = heap.POP()
        IF node == n - 1: RETURN cost
        IF time >= minTime[node]: CONTINUE
        minTime[node] = time

        FOR (neighbor, edgeTime) IN graph[node]:
            newTime = time + edgeTime
            IF newTime < maxTime AND newTime < minTime[neighbor]:
                heap.PUSH((cost + passingFees[neighbor], newTime, neighbor))

    RETURN -1
```

---

## Walkthrough

```
maxTime=30, passingFees=[5,1,2,20,20,3]
Path: 0 → 1 → 2 → 5
```

| Step | Node | Time | Cost | Action |
|------|------|------|------|--------|
| 1 | 0 | 0 | 5 | Start (pay fee 5) |
| 2 | 1 | 10 | 6 | 0→1 (time +10, fee +1) |
| 3 | 2 | 20 | 8 | 1→2 (time +10, fee +2) |
| 4 | 5 | 30 | 11 | 2→5 (time +10, fee +3) — destination reached! |

**Result:** Cost = **11**, time = 30 ≤ maxTime ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · T · log(E · T)) — states bounded by edges × maxTime |
| **Space** | O(V + E) — graph + heap |

---

## Follow-Up Questions

1. **Why not standard Dijkstra on cost alone?** We need to respect the time constraint — a cheaper path might exceed the time budget.
2. **Why track minTime instead of minCost per node?** We prioritize cost (heap ordering), but prune by time. A slower arrival is never useful if a faster one was already processed (since cost is non-decreasing from the heap).
3. **Could we use DP instead?** Yes — `dp[node][time]` = min cost. Works since time is bounded (≤ 1000).
4. **What if time could be negative?** Dijkstra wouldn't work; you'd need Bellman-Ford or similar.

---

## Key Takeaway

> For constrained shortest-path problems (minimize one metric subject to a budget on another), expand the Dijkstra state to include the constraint dimension and prune dominated states aggressively.
