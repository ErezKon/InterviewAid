# 444. Sequence Reconstruction

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

## Problem Description

Given a permutation `nums` of the integers from `1` to `n` and a list of subsequences `sequences`, determine whether `nums` is the **only** shortest common supersequence that contains all subsequences in `sequences`.

---

## Approach: Topological Sort — O(V + E) ✅

```text
FUNCTION sequenceReconstruction(nums, sequences):
    SET graph ← empty adjacency list
    SET indegree ← map with default 0 for each node
    FOR each seq IN sequences:
        FOR i FROM 0 TO LENGTH(seq) - 2:
            SET u ← seq[i]
            SET v ← seq[i+1]
            IF v NOT IN graph[u]:
                APPEND v TO graph[u]
                indegree[v] ← indegree[v] + 1
    SET queue ← all nodes with indegree 0
    WHILE queue IS NOT EMPTY:
        IF SIZE(queue) > 1: RETURN false  // multiple choices → not unique
        SET node ← DEQUEUE(queue)
        FOR each neighbor IN graph[node]:
            indegree[neighbor] ← indegree[neighbor] - 1
            IF indegree[neighbor] == 0:
                ENQUEUE(neighbor, queue)
    RETURN true IF all nodes visited ELSE false
```

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3], sequences = [[1,2],[1,3]]
Output: false
Explanation: Both [1,2,3] and [1,3,2] satisfy the subsequences, so the supersequence is not unique.
```

**Example 2:**
```
Input: nums = [1,2,3], sequences = [[1,2],[2,3]]
Output: true
Explanation: The only supersequence that respects both subsequences is [1,2,3].
```

---

## Walkthrough

Consider `nums = [1,2,3]` and `sequences = [[1,2],[2,3]]`:
| Step | Action | Queue | Visited |
|------|--------|-------|---------|
| 1 | Build graph: 1→2, 2→3; indegrees: 1:0, 2:1, 3:1 | — | — |
| 2 | Initialize queue with nodes indegree 0 → [1] | [1] | — |
| 3 | Dequeue 1 (only element) → visit 1, reduce indegree of 2 to 0, enqueue 2 | [2] | [1] |
| 4 | Dequeue 2 → visit 2, reduce indegree of 3 to 0, enqueue 3 | [3] | [1,2] |
| 5 | Dequeue 3 → visit 3, queue empty, all visited → unique.
```

---

## Complexity Analysis

- **Time:** O(V + E) where V is the number of distinct integers and E is the total number of edges derived from `sequences`.
- **Space:** O(V + E) for the adjacency list and indegree map.

---

## Follow-Up Questions

1. How would you adapt the algorithm if `sequences` could contain duplicate edges?
2. Can you solve the problem using a DFS based topological ordering check?
3. What changes are needed if the input may contain numbers outside the range `1..n`?

---

## Key Takeaway

> Unique reconstruction is equivalent to a unique topological ordering; the BFS queue must never have more than one candidate at any step.
