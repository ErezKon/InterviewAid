# 886. Possible Bipartition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/possible-bipartition](https://leetcode.com/problems/possible-bipartition)
**Companies:** Amazon, Google, Linkedin, Meesho, Meta, Microsoft, Samsung, Snapchat, Tiktok, Uber

---

## Problem Description
Given an integer `n` representing `n` people labeled from `1` to `n` and an array `dislikes` where each element `[a, b]` indicates that person `a` and person `b` dislike each other, determine whether it is possible to split all people into two groups such that no pair of people who dislike each other are in the same group. Return `true` if such a bipartition exists, otherwise return `false`.

## Examples
**Example 1:**
```
Input: n = 4, dislikes = [[1,2],[1,3],[2,4]]
Output: true
Explanation: One possible partition is {1,4} and {2,3}.
```
**Example 2:**
```
Input: n = 3, dislikes = [[1,2],[1,3],[2,3]]
Output: false
Explanation: No valid bipartition exists because the three people form a triangle of mutual dislikes.
```

## Approach
**Algorithm:** Graph coloring using BFS/DFS (check bipartite) 
**Key Insight:** The dislike relationships form an undirected graph. A valid bipartition exists iff the graph is bipartite, i.e., it can be colored with two colors without adjacent nodes sharing the same color.

```text
FUNCTION possibleBipartition(n, dislikes):
    // Build adjacency list
    graph ← ARRAY of n+1 empty lists
    FOR each [a, b] IN dislikes:
        APPEND b TO graph[a]
        APPEND a TO graph[b]
    color ← ARRAY of n+1 values -1   // -1 = uncolored, 0/1 = two groups
    FOR i ← 1 TO n:
        IF color[i] != -1:
            CONTINUE
        // start BFS from i
        queue ← [i]
        color[i] ← 0
        WHILE queue NOT EMPTY:
            node ← DEQUEUE(queue)
            FOR neighbor IN graph[node]:
                IF color[neighbor] == -1:
                    color[neighbor] ← 1 - color[node]
                    ENQUEUE(neighbor, queue)
                ELSE IF color[neighbor] == color[node]:
                    RETURN false
    RETURN true
```

## Walkthrough
Consider `n = 4, dislikes = [[1,2],[1,3],[2,4]]`.
1. Build graph: 1↔2, 1↔3, 2↔4.
2. Start BFS at node 1, color 1 = 0.
3. Visit neighbors 2 and 3, assign color 1 to both.
4. Dequeue 2, its neighbor 4 is uncolored → assign color 0.
5. No conflict encountered; all nodes colored → return `true`.

## Complexity Analysis
- **Time:** O(n + m) where `m` is the number of dislike pairs (edges).
- **Space:** O(n + m) for the adjacency list and the color array.

## Follow‑Up Questions
1. How would you adapt the solution to output the actual two groups instead of just a boolean?
2. Can the algorithm be extended to handle a scenario where more than two groups are allowed (k‑colorability)?
3. What changes are needed if the graph is directed, i.e., dislikes are not necessarily mutual?

## Key Takeaway
A set of mutual dislikes can be partitioned into two groups exactly when the corresponding undirected graph is bipartite; BFS/DFS coloring provides a linear‑time verification.
