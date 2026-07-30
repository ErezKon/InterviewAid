# 582. Kill Process

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/kill-process](https://leetcode.com/problems/kill-process)
**Companies:** Amazon, Bloomberg, Microsoft, Oracle

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS on Tree — O(n) ✅](#4-approach-bfs-on-tree--on-)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Given process IDs `pid[]` and their parent IDs `ppid[]`, killing a process also kills all its descendants. Return all process IDs that would be killed.

---

## 2. Examples

```
Input: pid = [1,3,10,5], ppid = [3,0,5,3], kill = 5
Output: [5,10]
```

---

## 3. Key Insight

Build a parent→children map, then BFS/DFS from the killed process to collect all descendants.

---

## 4. Approach: BFS on Tree — O(n) ✅

```
FUNCTION killProcess(pid, ppid, kill):
    children = defaultdict(list)
    FOR i in range(len(pid)):
        children[ppid[i]].ADD(pid[i])

    result = []
    queue = [kill]
    WHILE queue:
        p = queue.DEQUEUE()
        result.ADD(p)
        queue.extend(children[p])
    RETURN result
```

---

## 5. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Build tree + BFS |
| Space | O(n) | Children map + result |

---

## 6. Key Takeaway

> Build a tree from `ppid` → `pid`, then BFS/DFS from the kill target. Classic tree traversal to collect a subtree.
