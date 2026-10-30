# 2477. Minimum Fuel Cost to Report to the Capital

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital](https://leetcode.com/problems/minimum-fuel-cost-to-report-to-the-capital)
**Companies:** Amazon, Google, Meta, Microsoft, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DFS Counting People — O(n)](#approach-dfs-counting-people--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There is a tree (i.e., a connected, undirected graph with no cycles) structure country network consisting of `n` cities numbered from `0` to `n - 1` and exactly `n - 1` roads. The capital city is city `0`. You are given a 2D integer array `roads` where `roads[i] = [a_i, b_i]` denotes that there exists a **bidirectional road** connecting cities `a_i` and `b_i`.

There is a meeting for the representatives of each city. The meeting is in the capital city.

There is a car in each city. You are given an integer `seats` that indicates the number of seats in each car.

A representative can use the car in their city to travel or change the car and ride with another representative. The cost of traveling between two cities is one liter of fuel.

Return *the minimum number of liters of fuel to reach the capital city*.

**Constraints:**
- `1 <= n <= 10^5`
- `roads.length == n - 1`
- `roads[i].length == 2`
- `0 <= a_i, b_i < n`
- `a_i != b_i`
- `roads` represents a valid tree.
- `1 <= seats <= 10^5`

---

## Examples

**Example 1:**
```
Input: roads = [[0,1],[0,2],[0,3]], seats = 5
Output: 3
Explanation: - Representative_1 goes directly to the capital with 1 liter of fuel.
- Representative_2 goes directly to the capital with 1 liter of fuel.
- Representative_3 goes directly to the capital with 1 liter of fuel.
It costs 3 liters of fuel at minimum.
It can be proven that 3 is the minimum number of liters of fuel needed.
```

**Example 2:**
```
Input: roads = [[3,1],[3,2],[1,0],[0,4],[0,5],[4,6]], seats = 2
Output: 7
Explanation: - Representative_2 goes directly to city 3 with 1 liter of fuel.
- Representative_2 and representative_3 go together to city 1 with 1 liter of fuel.
- Representative_2 and representative_3 go together to the capital with 1 liter of fuel.
- Representative_1 goes directly to the capital with 1 liter of fuel.
- Representative_5 goes directly to the capital with 1 liter of fuel.
- Representative_6 goes directly to city 4 with 1 liter of fuel.
- Representative_4 and representative_6 go together to the capital with 1 liter of fuel.
It costs 7 liters of fuel at minimum.
It can be proven that 7 is the minimum number of liters of fuel needed.
```

**Example 3:**
```
Input: roads = [], seats = 1
Output: 0
Explanation: No representatives need to travel to the capital city.
```

---

## Key Insight

> At each edge, count how many people pass through it (= subtree size). They need `ceil(people / seats)` cars. Sum fuel across all edges.

---

## Approach: DFS Counting People — O(n) ✅

```
FUNCTION minimumFuelCost(roads, seats):
    graph = adjacency list
    fuel = [0]

    FUNCTION dfs(node, parent):
        people = 1
        FOR child IN graph[node]:
            IF child == parent: CONTINUE
            people += dfs(child, node)
        IF node != 0:
            fuel[0] += ceil(people / seats)
        RETURN people

    dfs(0, -1)
    RETURN fuel[0]
```

---

## Walkthrough

```
Tree: 0 — 1 — 3, 0 — 2, seats = 2
Subtree sizes: node 3→1, node 1→2, node 2→1
```

| Edge | People | Cars (ceil) | Fuel |
|------|--------|-------------|------|
| 3→1 | 1 | ceil(1/2)=1 | 1 |
| 1→0 | 2 | ceil(2/2)=1 | 1 |
| 2→0 | 1 | ceil(1/2)=1 | 1 |

**Total fuel:** 3 ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single DFS |
| **Space** | O(n) — recursion stack |

---

## Follow-Up Questions

1. **Why ceil?** Partial cars still need to exist — 3 people with 2 seats = 2 cars.
2. **Why is greedy optimal?** People always share rides maximally within their subtree path — there's no benefit to splitting earlier.
3. **What if the tree were a general graph?** Then shortest paths matter and it becomes much harder (network flow).

---

## Key Takeaway

> For tree carpooling problems, DFS computes subtree sizes; each edge's fuel = `ceil(subtree_people / seats)`. The greedy approach is optimal because the tree structure forces a unique path.
