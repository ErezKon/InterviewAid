# 1765. Map of Highest Peak

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/map-of-highest-peak](https://leetcode.com/problems/map-of-highest-peak)
**Companies:** Amazon, Bloomberg, Google

---

## 1. Problem Description

You are given an integer matrix `isWater` of size `m x n` that represents a map of **land** and **water** cells.

- If `isWater[i][j] == 0`, cell `(i, j)` is a **land** cell.
- If `isWater[i][j] == 1`, cell `(i, j)` is a **water** cell.

You must assign each cell a height in a way that follows these rules:

- The height of each cell must be non-negative.
- If the cell is a **water** cell, its height must be `0`.
- Any two adjacent cells must have an absolute height difference of **at most** `1`. A cell is adjacent to another cell if the former is directly north, east, south, or west of the latter (i.e., their sides are touching).

Find an assignment of heights such that the maximum height in the matrix is **maximized**.

Return *an integer matrix* `height` *of size* `m x n` *where* `height[i][j]` *is cell* `(i, j)`*'s height. If there are multiple solutions, return **any** of them*.

**Constraints:**

- `m == isWater.length`
- `n == isWater[i].length`
- `1 <= m, n <= 1000`
- `isWater[i][j]` is `0` or `1`.
- There is at least **one** water cell.

**Note:** This question is the same as 542: [01 Matrix](https://leetcode.com/problems/01-matrix/)

---

## 2. Examples

```
Example 1:
  Input: isWater = [[0,1],[0,0]]
  Output: [[1,0],[2,1]]
  Explanation: The assigned heights of each cell are shown in the output.
  The cell (0,1) is the water cell, and the other cells are the land cells.
```

```
Example 2:
  Input: isWater = [[0,0,1],[1,0,0],[0,0,0]]
  Output: [[1,1,0],[0,1,1],[1,2,2]]
  Explanation: A height of 2 is the maximum possible height of any assignment.
  Any height assignment that has a maximum height of 2 while still meeting the rules will also be accepted.
```

---

## 3. Walkthrough

1. **Initialize** a queue with all water cells and set their height to 0.
2. **BFS**: Pop a cell, examine its four neighbors. If a neighbor has not been assigned a height, set its height to `current height + 1` and enqueue it.
3. Continue until the queue is empty. Because BFS expands uniformly outward, each land cell receives the shortest distance to any water cell, which is the maximal feasible height under the adjacency constraint.

---

## 4. Complexity Analysis

- **Time:** O(m · n) – each cell is visited once in the multi-source BFS.
- **Space:** O(m · n) – storage for the height matrix and the BFS queue.

---

## 5. Follow-Up Questions

- How would you adapt the algorithm if diagonal adjacency also required a height difference ≤ 1?
- Can you compute the result in-place without an extra height matrix?
- How would you handle very large grids that do not fit into memory?

---

## 3. Key Takeaway

> Multi-source BFS from all water cells simultaneously assigns each land cell its minimum distance to water, yielding the highest possible minimum height while respecting the adjacency constraint.
