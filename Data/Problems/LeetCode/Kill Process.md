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

> *Note: premium problem — statement verified via doocs/leetcode.*

You have `n` processes forming a rooted tree structure. You are given two integer arrays `pid` and `ppid`, where `pid[i]` is the ID of the `i^th` process and `ppid[i]` is the ID of the `i^th` process's parent process.

Each process has only **one parent process** but may have multiple children processes. Only one process has `ppid[i] = 0`, which means this process has **no parent process** (the root of the tree).

When a process is **killed**, all of its children processes will also be killed.

Given an integer `kill` representing the ID of a process you want to kill, return *a list of the IDs of the processes that will be killed. You may return the answer in **any order**.*

**Constraints:**
- `n == pid.length`
- `n == ppid.length`
- `1 <= n <= 5 * 10^4`
- `1 <= pid[i] <= 5 * 10^4`
- `0 <= ppid[i] <= 5 * 10^4`
- Only one process has no parent.
- All the values of `pid` are **unique**.
- `kill` is **guaranteed** to be in `pid`.

---

## 2. Examples

**Example 1:**
```
Input: pid = [1,3,10,5], ppid = [3,0,5,3], kill = 5
Output: [5,10]
Explanation: The processes colored in red are the processes that should be killed.
```

**Example 2:**
```
Input: pid = [1], ppid = [0], kill = 1
Output: [1]
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
