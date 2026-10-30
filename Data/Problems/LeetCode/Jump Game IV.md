# 1345. Jump Game IV

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/jump-game-iv](https://leetcode.com/problems/jump-game-iv)
**Companies:** Amazon, Google, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: BFS + Clear Visited Groups — O(n) ✅](#4-approach-bfs--clear-visited-groups--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array of integers `arr`, you are initially positioned at the first index of the array.

In one step you can jump from index `i` to index:

- `i + 1` where: `i + 1 < arr.length`.
- `i - 1` where: `i - 1 >= 0`.
- `j` where: `arr[i] == arr[j]` and `i != j`.

Return *the minimum number of steps* to reach the **last index** of the array.

Notice that you can not jump outside of the array at any time.

**Constraints:**
- `1 <= arr.length <= 5 * 10^4`
- `-10^8 <= arr[i] <= 10^8`

---

## 2. Examples

**Example 1:**
```
Input: arr = [100,-23,-23,404,100,23,23,23,3,404]
Output: 3
Explanation: You need three jumps from index 0 --> 4 --> 3 --> 9. Note that index 9 is the last index of the array.
```

**Example 2:**
```
Input: arr = [7]
Output: 0
Explanation: Start index is the last index. You do not need to jump.
```

**Example 3:**
```
Input: arr = [7,6,9,6,9,6,9,7]
Output: 1
Explanation: You can jump directly from index 0 to index 7 which is last index of the array.
```

---

## 3. Key Insight

BFS gives shortest path, but naively exploring all same-value indices each time is O(n²). The trick: after processing all indices of a value, **clear that group** from the graph. Each index is explored at most once from the value group, giving O(n) total.

---

## 4. Approach: BFS + Clear Visited Groups — O(n) ✅

```
FUNCTION minJumps(arr):
    // BFS with adjacency: i±1 and all indices with same value
    graph = defaultdict(list)
    FOR i, val IN enumerate(arr): graph[val].ADD(i)

    queue = [0]; visited = {0}; steps = 0
    WHILE queue:
        nextQueue = []
        FOR i IN queue:
            IF i == len(arr) - 1: RETURN steps
            FOR next IN [i-1, i+1] + graph[arr[i]]:
                IF 0 <= next < len(arr) AND next NOT IN visited:
                    visited.ADD(next); nextQueue.ADD(next)
            graph[arr[i]].CLEAR()    // avoid revisiting
        queue = nextQueue; steps += 1
    RETURN -1
```

---

## 5. Walkthrough

```
arr = [100,-23,-23,404,100,23,23,23,3,404]
graph: 100→[0,4], -23→[1,2], 404→[3,9], 23→[5,6,7], 3→[8]
```

| Step | Queue | Check | Enqueue |
|------|-------|-------|---------|
| 0 | [0] | idx 0 → neighbors: 1, {4} (same val 100) | [1, 4], clear 100 |
| 1 | [1, 4] | idx 1 → {2} (same val -23); idx 4 → 3, 5 | [2, 3, 5], clear -23 |
| 2 | [2, 3, 5] | idx 3 → {9} (same val 404) | [..., 9] |
| 3 | [..., 9] | idx 9 == last index → **return 3** ✅ |

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Each index visited once; each value group cleared once |
| Space | O(n) | Graph + visited set + queue |

---

## 7. Follow-Up Questions

### 7.1 Why clear the graph group after processing?

Without clearing, the same group of indices could be re-traversed from multiple queue entries, leading to O(n²) in worst case (e.g., all elements equal).

### 7.2 Could bidirectional BFS help?

Yes — BFS from both start and end, meeting in the middle. This can reduce exploration significantly for large graphs.

---

## 8. Key Takeaway

> BFS with a **clear-after-visit** optimization on same-value groups. Without clearing, worst case is O(n²). With clearing, each value group is processed exactly once, giving amortized O(n). This pattern appears whenever edges are defined by value equality.
