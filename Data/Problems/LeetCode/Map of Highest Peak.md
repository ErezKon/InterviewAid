# 1765. Map of Highest Peak

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-of-highest-peak](https://leetcode.com/problems/map-of-highest-peak)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

Assign heights to a grid where water cells have height 0 and any two adjacent cells (4‑directionally) must differ by at most 1. The goal is to produce a height map that satisfies the constraints while maximizing the minimum height among all land cells.

---

## 2. Examples

| Input (`isWater`) | Output (`height`) |
|-------------------|-------------------|
| `[[0,1,0],[0,0,0],[1,0,0]]` | `[[1,0,1],[2,1,2],[0,1,2]]` |
| `[[0,0,0],[0,1,0],[0,0,0]]` | `[[1,1,1],[1,0,1],[1,1,1]]` |

*Explanation*: Water cells stay 0. Each land cell receives the distance to the nearest water cell, which yields the maximal possible minimum height.

---

## 3. Walkthrough

1. **Initialize** a queue with all water cells and set their height to 0.
2. **BFS**: Pop a cell, examine its four neighbors. If a neighbor has not been assigned a height, set its height to `current height + 1` and enqueue it.
3. Continue until the queue is empty. Because BFS expands uniformly outward, each land cell receives the shortest distance to any water cell, which is the maximal feasible height under the adjacency constraint.

---

## 4. Complexity Analysis

- **Time:** O(m · n) – each cell is visited once in the multi‑source BFS.
- **Space:** O(m · n) – storage for the height matrix and the BFS queue.

---

## 5. Follow‑Up Questions

- How would you adapt the algorithm if diagonal adjacency also required a height difference ≤ 1?
- Can you compute the result in‑place without an extra height matrix?
- How would you handle very large grids that do not fit into memory?

---

## 3. Key Takeaway

> Multi‑source BFS from all water cells simultaneously assigns each land cell its minimum distance to water, yielding the highest possible minimum height while respecting the adjacency constraint.
