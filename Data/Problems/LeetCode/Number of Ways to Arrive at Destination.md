# 1976. Number of Ways to Arrive at Destination

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-ways-to-arrive-at-destination](https://leetcode.com/problems/number-of-ways-to-arrive-at-destination)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Dijkstra + Count Paths — O(E log V)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are in a city that consists of `n` intersections numbered from `0` to `n - 1` with **bi-directional** roads between some intersections. The inputs are generated such that you can reach any intersection from any other intersection and that there is at most one road between any two intersections.

You are given an integer `n` and a 2D integer array `roads` where `roads[i] = [u_i, v_i, time_i]` means that there is a road between intersections `u_i` and `v_i` that takes `time_i` minutes to travel. You want to know in how many ways you can travel from intersection `0` to intersection `n - 1` in the **shortest amount of time**.

Return *the **number of ways** you can arrive at your destination in the **shortest amount of time***. Since the answer may be large, return it **modulo** `10^9 + 7`.

**Constraints:**
- `1 <= n <= 200`
- `n - 1 <= roads.length <= n * (n - 1) / 2`
- `roads[i].length == 3`
- `0 <= u_i, v_i <= n - 1`
- `1 <= time_i <= 10^9`
- `u_i != v_i`
- There is at most one road connecting any two intersections.
- You can reach any intersection from any other intersection.

---

## 2. Key Insight

> Modified Dijkstra: track both distance and path count. When finding a shorter path, reset count. When finding an equal path, add to count.

---

## 3. Approach: Dijkstra + Count Paths — O(E log V) ✅

```text
FUNCTION countPaths(n, roads):
    MOD ← 10^9 + 7
    graph ← adjacency list of roads
    dist ← [∞] * n; dist[0] ← 0
    ways ← [0] * n; ways[0] ← 1
    heap ← MIN-HEAP containing (0, 0)

    WHILE heap NOT EMPTY:
        (d, u) ← heap.POP()
        IF d > dist[u]: CONTINUE
        FOR (v, w) IN graph[u]:
            IF dist[u] + w < dist[v]:
                dist[v] ← dist[u] + w
                ways[v] ← ways[u]
                heap.PUSH((dist[v], v))
            ELSE IF dist[u] + w == dist[v]:
                ways[v] ← (ways[v] + ways[u]) % MOD

    RETURN ways[n-1]
```

---

## 4. Examples

**Example 1:**
```
Input: n = 7, roads = [[0,6,7],[0,1,2],[1,2,3],[1,3,3],[6,3,3],[3,5,1],[6,5,1],[2,5,1],[0,4,5],[4,6,2]]
Output: 4
Explanation: The shortest amount of time it takes to go from intersection 0 to intersection 6 is 7 minutes.
The four ways to get there in 7 minutes are:
- 0 ➝ 6
- 0 ➝ 4 ➝ 6
- 0 ➝ 1 ➝ 2 ➝ 5 ➝ 6
- 0 ➝ 1 ➝ 3 ➝ 5 ➝ 6
```

**Example 2:**
```
Input: n = 2, roads = [[1,0,10]]
Output: 1
Explanation: There is only one way to go from intersection 0 to intersection 1, and it takes 10 minutes.
```

---

## 5. Walkthrough

**Example 1** (the first row above):
1. Initialise `dist[0]=0`, `ways[0]=1`.
2. Pop node 0 (distance 0). Relax edges to nodes 6, 1, 4.
3. Distances become: `dist[6]=7, ways[6]=1`; `dist[1]=2, ways[1]=1`; `dist[4]=5, ways[4]=1`.
4. Continue popping the smallest distance node (1). Relax its edges, eventually discovering a shorter path to node 5 via 1→3→5 with total distance 6.
5. When node 5 is reached with distance 6, `ways[5]=1`. Later node 6 also reaches 5 with distance 8, ignored.
6. Finally node 5 relaxes edge to node 6, but distance 7 already optimal, so `ways[6]` stays `1`.
7. The destination is node 6 (n‑1). `ways[6]=1` is returned.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(E log V) |
| **Space** | O(V + E) |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to return *all* shortest paths, not just the count?
- Can the same technique be applied to unweighted graphs using BFS?
- What changes are needed if edge weights can be negative but no negative cycles exist?

---

## 8. Key Takeaway

> **Dijkstra + path counting.** Same "dual tracking" pattern: reset count on new shortest, accumulate on tie. Classic extension of standard Dijkstra.
