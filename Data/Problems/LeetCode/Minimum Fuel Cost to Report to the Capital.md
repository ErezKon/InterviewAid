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

A tree of `n` cities rooted at city 0 (the capital). Each person lives in a city and must travel to city 0. Cars have `seats` capacity. Traveling one edge costs 1 unit of fuel per car. Return the **minimum total fuel** to get everyone to city 0.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ seats ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: roads = [[0,1],[0,2],[0,3]], seats = 5
Output: 3
Explanation: 3 people each drive 1 edge → 3 fuel. (Each fits in one car.)
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
