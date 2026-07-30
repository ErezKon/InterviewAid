# 2242. Maximum Score of a Node Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-a-node-sequence](https://leetcode.com/problems/maximum-score-of-a-node-sequence)
**Companies:** Google
---

## Problem Description
Given a directed graph where each node `i` has a value `val[i]`, you may start at any node and traverse edges to form a sequence of distinct nodes. The score of a sequence is the sum of the node values in the order visited. Return the maximum possible score of any such node sequence.

## Examples
**Example 1:**
```
val = [5,2,3]
edges = [[0,1],[1,2]]
Maximum score = 5+2+3 = 10 (path 0→1→2)
```
**Example 2:**
```
val = [4,1,6,2]
edges = [[0,2],[0,3],[2,1]]
Maximum score = 4+6+1 = 11 (path 0→2→1)
```

## Approach
The problem reduces to finding the maximum‑weight path in a DAG (or handling cycles by DP with memoization). Perform a topological sort; then compute `dp[node]` = `val[node]` + max(`dp[prev]`) over all incoming edges. The answer is the maximum `dp` value.

```text
FUNCTION MaxScore(vals, edges):
    n ← LENGTH(vals)
    adj ← LIST OF LISTS size n
    indeg ← ARRAY[n] filled with 0
    FOR each (u, v) IN edges:
        APPEND v TO adj[u]
        SET indeg[v] ← indeg[v] + 1
    queue ← ALL nodes i WHERE indeg[i] = 0
    dp ← ARRAY[n] where dp[i] ← vals[i]
    WHILE queue NOT EMPTY:
        SET u ← POP(queue)
        FOR each v IN adj[u]:
            SET dp[v] ← MAX(dp[v], dp[u] + vals[v])
            SET indeg[v] ← indeg[v] - 1
            IF indeg[v] = 0:
                PUSH v INTO queue
    RETURN MAXIMUM value IN dp
```

## Walkthrough
Consider `vals = [4,1,6,2]` and edges `[[0,2],[0,3],[2,1]]`.
1. Topological order: 0,2,3,1.
2. Initialize `dp = [4,1,6,2]`.
3. Process 0: update `dp[2]=MAX(6,4+6)=10`, `dp[3]=MAX(2,4+2)=6`.
4. Process 2: update `dp[1]=MAX(1,10+1)=11`.
5. Remaining nodes keep their dp values. Max dp = 11.

## Complexity Analysis
- Time: `O(n + m)` where `n` is number of nodes and `m` edges.
- Space: `O(n + m)` for adjacency list and DP array.

## Follow-Up Questions
1. How would you handle graphs with cycles?
2. What if each edge also has a weight that contributes to the score?
3. Can you extend the solution to return the actual sequence, not just its score?

## Key Takeaway
Topological ordering lets you compute the maximum‑weight path in linear time by propagating best scores along directed edges.
