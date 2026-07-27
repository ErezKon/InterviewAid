# 2093. Minimum Cost to Reach City With Discounts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts](https://leetcode.com/problems/minimum-cost-to-reach-city-with-discounts)
**Companies:** Flipkart, Goldman Sachs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Modified Dijkstra — O(E·D log(V·D))](#approach-modified-dijkstra--oed-logvd)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` cities connected by highways. Each highway has a toll cost. You have `discounts` discount coupons — each can halve the toll of one highway (integer division). Find the **minimum total toll** to travel from city `0` to city `n - 1`.

**Constraints:**
- `2 ≤ n ≤ 1000`
- `1 ≤ highways.length ≤ 10⁴`
- `0 ≤ discounts ≤ 500`
- `1 ≤ toll ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input: n = 5, highways = [[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]], discounts = 1
Output: 9
Explanation: Go 0→1 (toll 4) → 1→4 (toll 11, use discount → 5). Total = 4 + 5 = 9.
```

**Example 2:**
```
Input: n = 4, highways = [[1,3,17],[1,2,7],[3,2,5],[0,1,6],[3,0,20]], discounts = 20
Output: 8
Explanation: 0→1 (6, discount → 3) → 1→2 (7, discount → 3) → 2→3 (5, discount → 2). Total = 3+3+2 = 8.
```

---

## Key Insight

> Expand the state to `(city, discounts_used)`. Run Dijkstra on this 2D state space where each edge can be taken at full cost or at half cost (if discounts remain).

---

## Approach: Modified Dijkstra — O(E·D log(V·D)) ✅

```
FUNCTION minimumCost(n, highways, discounts):
    graph ← adjacency list from highways
    dist ← n × (discounts + 1) matrix of infinity
    dist[0][0] ← 0
    heap ← [(0, 0, 0)]   // (cost, city, discountsUsed)

    WHILE heap:
        (cost, city, used) ← heap.POP()
        IF city == n - 1: RETURN cost
        IF cost > dist[city][used]: CONTINUE

        FOR (neighbor, toll) IN graph[city]:
            // Without discount
            IF cost + toll < dist[neighbor][used]:
                dist[neighbor][used] ← cost + toll
                heap.PUSH((cost + toll, neighbor, used))
            // With discount
            IF used < discounts AND cost + toll / 2 < dist[neighbor][used + 1]:
                dist[neighbor][used + 1] ← cost + toll / 2
                heap.PUSH((cost + toll / 2, neighbor, used + 1))

    RETURN -1
```

---

## Walkthrough

```
n=5, highways=[[0,1,4],[2,1,3],[1,4,11],[3,2,3],[3,4,2]], discounts=1
```

| Step | State (city, used) | Cost | Action |
|------|--------------------|------|--------|
| 1 | (0, 0) | 0 | Start |
| 2 | (1, 0) | 4 | 0→1 full price |
| 3 | (1, 1) | 2 | 0→1 with discount (4/2=2) |
| 4 | (4, 1) | 9 | From (1,0): 1→4 with discount (4+11/2=4+5=9) |
| 5 | (4, 0) | 15 | From (1,0): 1→4 full (4+11=15) — worse |

**Result:** Reach city 4 with cost **9** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E · D · log(V · D)) — Dijkstra on expanded state space |
| **Space** | O(V · D) — distance array |

---

## Follow-Up Questions

1. **Why not DP?** Dijkstra naturally handles the shortest-path aspect with the discount dimension.
2. **What if discounts could double the toll instead?** Same structure — just add an edge option with `2 * toll`.
3. **What if discounts stacked (e.g., 2 discounts = 1/4 cost)?** Expand state to track count; each combination is a new state.

---

## Key Takeaway

> When you have a **limited resource** (discounts, fuel, etc.) that affects edge weights, expand the Dijkstra state to include resource usage as an extra dimension.
