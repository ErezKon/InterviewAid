
# 207. Course Schedule

**Difficulty:** 🟡 Medium
**Acceptance:** 47.3%
**LeetCode:** [https://leetcode.com/problems/course-schedule](https://leetcode.com/problems/course-schedule)
**Companies:** Adobe, Amazon, Anduril, Apple, Bitgo, Bloomberg, Bytedance, Citadel, Cloudflare, Coupang, Crowdstrike, Cruise Automation, Doordash, Ebay, Flipkart, Google, Graviton, Ixl, Linkedin, Liveramp, Meta, Microsoft, Nordstrom, Nvidia, Oracle, Paypal, Roblox, Salesforce, Snapchat, Snowflake, State Farm, Swiggy, Tesla, Tiktok, Uber, Visa, Walmart Labs, Yelp, Zenefits, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight: Cycle Detection in a Directed Graph](#3-key-insight-cycle-detection-in-a-directed-graph)
4. [Approach 1: BFS — Kahn's Algorithm (Topological Sort) — O(V+E) ✅](#4-approach-1-bfs--kahns-algorithm--ove-)
5. [Approach 2: DFS — Cycle Detection — O(V+E)](#5-approach-2-dfs--cycle-detection--ove)
6. [Walkthrough (BFS)](#6-walkthrough-bfs)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

There are `numCourses` courses labeled `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a, b]` means you **must** take course `b` before course `a`.

Return `true` if you can finish all courses (i.e., there is a valid ordering), or `false` otherwise.

---

## 2. Examples

```
Example 1:
  Input:  numCourses = 2, prerequisites = [[1, 0]]
  Output: true
  Reason: Take 0 → then 1.

Example 2:
  Input:  numCourses = 2, prerequisites = [[1, 0], [0, 1]]
  Output: false
  Reason: Circular dependency — 0 needs 1, and 1 needs 0.
```

---

## 3. Key Insight: Cycle Detection in a Directed Graph

Model courses as **nodes** and prerequisites as **directed edges**. The question becomes: **does the directed graph have a cycle?**

- **No cycle** → valid topological ordering exists → can finish all courses.
- **Cycle** → impossible to satisfy all prerequisites.

---

## 4. Approach 1: BFS — Kahn's Algorithm — O(V+E) ✅

### How It Works

1. Compute **in-degree** (number of prerequisites) for each course.
2. Add all courses with **in-degree 0** to a queue (no prerequisites).
3. Process queue: for each course, reduce in-degree of its dependents.
4. If a dependent's in-degree reaches 0, add it to the queue.
5. If all courses are processed, there's no cycle.

```
FUNCTION canFinish(numCourses, prerequisites):
    // Build adjacency list and in-degree array
    adj = ARRAY of numCourses empty lists
    inDegree = ARRAY of numCourses zeros

    FOR each [a, b] IN prerequisites:
        adj[b].ADD(a)              // b → a (must take b before a)
        inDegree[a] += 1

    // Initialize queue with courses having no prerequisites
    queue = []
    FOR i ← 0 TO numCourses - 1:
        IF inDegree[i] == 0:
            queue.ENQUEUE(i)

    count = 0                      // courses successfully processed

    WHILE queue IS NOT EMPTY:
        course = queue.DEQUEUE()
        count += 1

        FOR each neighbor IN adj[course]:
            inDegree[neighbor] -= 1
            IF inDegree[neighbor] == 0:
                queue.ENQUEUE(neighbor)

    RETURN count == numCourses
```

---

## 5. Approach 2: DFS — Cycle Detection — O(V+E)

Use three states: `UNVISITED`, `VISITING` (in current DFS path), `VISITED` (fully processed).

A cycle exists if we encounter a `VISITING` node during DFS.

```
FUNCTION canFinish(numCourses, prerequisites):
    adj = build adjacency list
    state = ARRAY of numCourses, all UNVISITED

    FUNCTION hasCycle(course):
        IF state[course] == VISITING:
            RETURN TRUE                // cycle detected
        IF state[course] == VISITED:
            RETURN FALSE               // already processed

        state[course] = VISITING

        FOR each neighbor IN adj[course]:
            IF hasCycle(neighbor):
                RETURN TRUE

        state[course] = VISITED
        RETURN FALSE

    FOR i ← 0 TO numCourses - 1:
        IF hasCycle(i):
            RETURN FALSE

    RETURN TRUE
```

---

## 6. Walkthrough (BFS)

```
numCourses = 4, prerequisites = [[1,0], [2,0], [3,1], [3,2]]

Graph:  0 → 1 → 3
        0 → 2 → 3

adj:     0: [1, 2]
         1: [3]
         2: [3]
         3: []

inDegree: [0, 1, 1, 2]

Initial queue: [0] (only course 0 has inDegree 0)

Process 0: count=1
  neighbor 1: inDegree[1] = 1-1 = 0 → enqueue 1
  neighbor 2: inDegree[2] = 1-1 = 0 → enqueue 2
  queue: [1, 2]

Process 1: count=2
  neighbor 3: inDegree[3] = 2-1 = 1
  queue: [2]

Process 2: count=3
  neighbor 3: inDegree[3] = 1-1 = 0 → enqueue 3
  queue: [3]

Process 3: count=4
  no neighbors
  queue: []

count(4) == numCourses(4) → RETURN TRUE ✅
Valid order: 0, 1, 2, 3
```

---

## 7. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(V + E) — visit every node and edge once |
| **Space** | O(V + E) — adjacency list + queue/stack |

---

## 8. Follow-Up Questions

### 8.1 Course Schedule II (LeetCode #210) — Return the ordering

Same as Kahn's algorithm, but collect the processing order:

```
FUNCTION findOrder(numCourses, prerequisites):
    // Same BFS setup...
    order = []

    WHILE queue IS NOT EMPTY:
        course = queue.DEQUEUE()
        order.ADD(course)
        // ... same logic

    RETURN order IF LENGTH(order) == numCourses ELSE []
```

### 8.2 Course Schedule III (LeetCode #630)

Take the maximum number of courses given deadlines. Uses a **greedy + max-heap** approach (not graph-based).

### 8.3 What if courses have parallel processing?

This becomes **parallel task scheduling**. The minimum time = the length of the **longest path** in the DAG (critical path).

```
FUNCTION minimumSemesters(n, relations):
    // Topological sort with level tracking
    // Each level = one semester
    // Count levels = min semesters needed
```

### 8.4 Alien Dictionary (LeetCode #269)

Given a sorted list of words in an alien language, determine the character order. Build a directed graph of character precedence, then topological sort.

---

## Topological Sort Problem Family

| Problem | Application | Technique |
|---------|------------|-----------|
| **Course Schedule** (#207) | Cycle detection | BFS (Kahn's) or DFS |
| **Course Schedule II** (#210) | Find valid ordering | Kahn's (record order) |
| **Alien Dictionary** (#269) | Character ordering | Build graph + topo sort |
| **Parallel Courses** (#1136) | Critical path length | BFS level counting |
| **Build Order** | Dependency resolution | Topological sort |

---

## Key Takeaway

> Course Schedule is the canonical **topological sort** problem. Kahn's BFS algorithm is intuitive: repeatedly process nodes with no remaining dependencies. If all nodes get processed, the graph is a DAG. This pattern applies to any **dependency resolution** problem — build systems, task schedulers, compilation order, etc.
