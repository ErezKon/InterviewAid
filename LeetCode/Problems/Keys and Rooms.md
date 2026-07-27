# 841. Keys and Rooms

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/keys-and-rooms](https://leetcode.com/problems/keys-and-rooms)
**Companies:** Amazon, Apple, Cadence, Google, Graviton, Infosys, Meta, Microsoft, Oracle, Snowflake

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: DFS — O(V+E) ✅](#4-approach-dfs--ove-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

There are `n` rooms (0 to n-1). Room 0 is unlocked; each room contains keys to other rooms. Return `true` if you can visit all rooms.

**Constraints:**
- `2 <= n <= 1000`
- `0 <= rooms[i][j] < n`

---

## 2. Examples

```
Input: rooms = [[1],[2],[3],[]]
Output: true (0→1→2→3)

Input: rooms = [[1,3],[3,0,1],[2],[0]]
Output: false (room 2 unreachable)
```

---

## 3. Key Insight

This is **graph reachability** from node 0. Each room is a node, each key is a directed edge. DFS/BFS from room 0 and check if all rooms are visited.

---

## 4. Approach: DFS — O(V+E) ✅

```
FUNCTION canVisitAllRooms(rooms):
    visited = {0}
    stack = [0]

    WHILE stack:
        room = stack.POP()
        FOR key IN rooms[room]:
            IF key NOT IN visited:
                visited.ADD(key)
                stack.PUSH(key)

    RETURN len(visited) == len(rooms)
```

---

## 5. Walkthrough

```
rooms = [[1],[2],[3],[]]
```

| Step | Room | Keys | Visited |
|------|------|------|---------|
| 1 | 0 | [1] | {0, 1} |
| 2 | 1 | [2] | {0, 1, 2} |
| 3 | 2 | [3] | {0, 1, 2, 3} |
| 4 | 3 | [] | {0, 1, 2, 3} |

`len(visited) == 4 == len(rooms)` → **true** ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(V + E) | Visit each room and key once |
| Space | O(V) | Visited set + stack |

---

## 7. Key Takeaway

> Pure graph reachability from node 0. DFS or BFS — doesn't matter. Check if visited count equals total rooms. A clean introduction to directed graph traversal.
