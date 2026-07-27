# 210. Course Schedule II

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/course-schedule-ii](https://leetcode.com/problems/course-schedule-ii)
**Companies:** Amazon, Anduril, Apple, Arista Networks, Aurora, Bloomberg, Citadel, Coinbase, Doordash, Flipkart, Goldman Sachs, Google, Ibm, Instabase, Intuit, Linkedin, Meta, Microsoft, Moloco, Mongodb, Netflix, Nutanix, Nvidia, Oracle, Palantir, Qualcomm, Remitly, Roblox, Salesforce, Snapchat, Snowflake, Tiktok, Uber, Walmart Labs, Zenefits

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: BFS (Kahn's Algorithm) — O(V+E) ✅](#3-approach-1-bfs-kahns-algorithm--ove-)
4. [Approach 2: DFS — O(V+E)](#4-approach-2-dfs--ove)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

There are `numCourses` courses labeled `0` to `numCourses - 1`. You are given `prerequisites` where `prerequisites[i] = [aᵢ, bᵢ]` means you must take course `bᵢ` before course `aᵢ`.

Return the ordering of courses you should take to finish all courses. If there are multiple valid orderings, return **any** of them. If it is impossible (cycle exists), return an **empty array**.

**Constraints:**
- `1 <= numCourses <= 2000`
- `0 <= prerequisites.length <= numCourses × (numCourses - 1)`
- All prerequisite pairs are unique.

---

## 2. Examples

```
Example 1:
  Input:  numCourses = 2, prerequisites = [[1,0]]
  Output: [0,1]

Example 2:
  Input:  numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]
  Output: [0,1,2,3] or [0,2,1,3]

Example 3:
  Input:  numCourses = 1, prerequisites = []
  Output: [0]
```

---

## 3. Approach 1: BFS (Kahn's Algorithm) — O(V+E) ✅

### Pseudocode

```
FUNCTION findOrder(numCourses, prerequisites):
    // Build graph and compute in-degrees
    graph = adjacency list (n empty lists)
    inDegree = array of n zeros

    FOR [a, b] IN prerequisites:
        graph[b].ADD(a)
        inDegree[a] += 1

    // Start with courses having no prerequisites
    queue = all courses where inDegree == 0
    order = []

    WHILE queue not empty:
        course = queue.DEQUEUE()
        order.ADD(course)

        FOR neighbor IN graph[course]:
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0:
                queue.ENQUEUE(neighbor)

    IF len(order) == numCourses:
        RETURN order
    ELSE:
        RETURN []       // cycle detected
```

---

## 4. Approach 2: DFS — O(V+E)

Use DFS with three states: `unvisited`, `visiting` (in current path), `visited`.

```
FUNCTION findOrder(numCourses, prerequisites):
    graph = build adjacency list
    state = array of UNVISITED
    order = []

    FOR each course:
        IF NOT dfs(course, graph, state, order):
            RETURN []

    RETURN REVERSE(order)

FUNCTION dfs(course, graph, state, order):
    IF state[course] == VISITING:
        RETURN false        // cycle
    IF state[course] == VISITED:
        RETURN true

    state[course] = VISITING

    FOR neighbor IN graph[course]:
        IF NOT dfs(neighbor, graph, state, order):
            RETURN false

    state[course] = VISITED
    order.ADD(course)       // post-order → reverse gives topo order
    RETURN true
```

---

## 5. Walkthrough

```
numCourses = 4, prerequisites = [[1,0],[2,0],[3,1],[3,2]]

Graph: 0→[1,2], 1→[3], 2→[3]
InDegree: [0, 1, 1, 2]

BFS:
  queue = [0] (inDegree 0)
  Process 0: order=[0], decrement 1→0, 2→0, queue=[1,2]
  Process 1: order=[0,1], decrement 3→1, queue=[2]
  Process 2: order=[0,1,2], decrement 3→0, queue=[3]
  Process 3: order=[0,1,2,3]

  len(order)==4==numCourses → RETURN [0,1,2,3] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **BFS (Kahn's)** | **O(V+E)** | **O(V+E)** |
| DFS | O(V+E) | O(V+E) |

---

## 7. Follow-Up Questions

### 7.1 What if we need all valid topological orderings?

Backtracking: at each step, choose any node with in-degree 0, recurse, then restore. This generates all valid orderings. Exponential in worst case.

### 7.2 Parallel Course Scheduling (LeetCode #1136)?

Find the minimum number of semesters (levels in BFS). Each BFS level = one semester. Answer = number of BFS levels.

### 7.3 Alien Dictionary (LeetCode #269)?

Build a character dependency graph from the sorted word list, then topological sort. Same Kahn's algorithm on characters instead of courses.

### 7.4 Course Schedule III (LeetCode #630)?

Different problem: each course has a deadline. Greedy approach: sort by deadline, use a max-heap to drop the longest course when the current time exceeds a deadline.

---

## Key Takeaway

> **Topological sort** is the answer whenever you need to order items with dependency constraints. Kahn's (BFS) is usually preferred in interviews — it's iterative, naturally detects cycles (output.length < V), and gives a level-order view for parallelization questions.
