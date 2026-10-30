# 1306. Jump Game III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-iii](https://leetcode.com/problems/jump-game-iii)
**Companies:** Amazon, Microsoft, Tanium

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS — O(n) ✅](#4-approach-bfs--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of non-negative integers `arr`, you are initially positioned at `start` index of the array. When you are at index `i`, you can jump to `i + arr[i]` or `i - arr[i]`, check if you can reach **any** index with value 0.

Notice that you can not jump outside of the array at any time.

**Constraints:**
- `1 <= arr.length <= 5 * 10^4`
- `0 <= arr[i] < arr.length`
- `0 <= start < arr.length`

---

## 2. Examples

**Example 1:**
```
Input: arr = [4,2,3,0,3,1,2], start = 5
Output: true
Explanation: All possible ways to reach at index 3 with value 0 are:
index 5 -> index 4 -> index 1 -> index 3
index 5 -> index 6 -> index 4 -> index 1 -> index 3
```

**Example 2:**
```
Input: arr = [4,2,3,0,3,1,2], start = 0
Output: true
Explanation: One possible way to reach at index 3 with value 0 is:
index 0 -> index 4 -> index 1 -> index 3
```

**Example 3:**
```
Input: arr = [3,0,2,1,2], start = 2
Output: false
Explanation: There is no way to reach at index 1 with value 0.
```

---

## 3. Key Insight

This is a **graph reachability** problem. From each index `i`, there are at most 2 edges (i±arr[i]). BFS or DFS from `start` to find any index with value 0.

---

## 4. Approach: BFS — O(n) ✅

```
FUNCTION canReach(arr, start):
    queue = [start]; visited = set()
    WHILE queue:
        i = queue.POPLEFT()
        IF arr[i] == 0: RETURN true
        IF i IN visited: CONTINUE
        visited.ADD(i)
        FOR next IN [i + arr[i], i - arr[i]]:
            IF 0 <= next < len(arr): queue.ADD(next)
    RETURN false
```

---

## 5. Walkthrough

```
arr = [4,2,3,0,3,1,2], start = 5
```

| Step | i | arr[i] | Neighbors | Queue |
|------|---|--------|-----------|-------|
| 1 | 5 | 1 | 6, 4 | [6, 4] |
| 2 | 6 | 2 | -, 4 | [4] |
| 3 | 4 | 3 | -, 1 | [1] |
| 4 | 1 | 2 | 3, - | [3] |
| 5 | 3 | **0** | Found! | ✅ |

**Result:** `true` ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index visited at most once |
| Space | O(n) | Visited set + queue |

---

## 7. Key Takeaway

> Jump Game III is pure graph BFS/DFS from a start node. Each index has ≤ 2 outgoing edges. The target is any node with value 0. Standard reachability in O(n).
