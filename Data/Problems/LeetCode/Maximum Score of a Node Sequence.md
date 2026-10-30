# 2242. Maximum Score of a Node Sequence

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-score-of-a-node-sequence](https://leetcode.com/problems/maximum-score-of-a-node-sequence)
**Companies:** Google
---

## Problem Description

> *Note: the Approach below (longest path in a DAG) solves an invented problem. Officially the sequence has exactly 4 distinct nodes `a−b−c−d` connected by edges in an undirected graph (return -1 if none). Correct idea: keep the top-3 neighbours by score for every node. For each edge `(b, c)`, try `a` from `b`'s top-3 and `d` from `c`'s top-3, all distinct. O(E).*

There is an **undirected** graph with `n` nodes, numbered from `0` to `n - 1`.

You are given a **0-indexed** integer array `scores` of length `n` where `scores[i]` denotes the score of node `i`. You are also given a 2D integer array `edges` where `edges[i] = [a_i, b_i]` denotes that there exists an **undirected** edge connecting nodes `a_i` and `b_i`.

A node sequence is **valid** if it meets the following conditions:

- There is an edge connecting every pair of **adjacent** nodes in the sequence.
- No node appears more than once in the sequence.

The score of a node sequence is defined as the **sum** of the scores of the nodes in the sequence.

Return *the **maximum score** of a valid node sequence with a length of *`4`*. *If no such sequence exists, return* *`-1`.

**Constraints:**
- `n == scores.length`
- `4 <= n <= 5 * 10^4`
- `1 <= scores[i] <= 10^8`
- `0 <= edges.length <= 5 * 10^4`
- `edges[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`
- There are no duplicate edges.

## Examples

**Example 1:**
```
Input: scores = [5,2,9,8,4], edges = [[0,1],[1,2],[2,3],[0,2],[1,3],[2,4]]
Output: 24
Explanation: The figure above shows the graph and the chosen node sequence [0,1,2,3].
The score of the node sequence is 5 + 2 + 9 + 8 = 24.
It can be shown that no other node sequence has a score of more than 24.
Note that the sequences [3,1,2,0] and [1,0,2,3] are also valid and have a score of 24.
The sequence [0,3,2,4] is not valid since no edge connects nodes 0 and 3.
```

**Example 2:**
```
Input: scores = [9,20,6,4,11,12], edges = [[0,3],[5,3],[2,4],[1,3]]
Output: -1
Explanation: The figure above shows the graph.
There are no valid node sequences of length 4, so we return -1.
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
