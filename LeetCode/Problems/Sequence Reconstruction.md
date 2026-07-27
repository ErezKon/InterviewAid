# 444. Sequence Reconstruction

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

## Problem Description

Given a permutation `nums` and a list of `sequences` (subsequences), determine if `nums` is the **only** shortest supersequence of the given sequences.

---

## Approach: Topological Sort — O(V + E) ✅

```
FUNCTION sequenceReconstruction(nums, sequences):
    graph ← adjacency list from consecutive pairs in each sequence
    indegree ← count incoming edges for each node
    queue ← nodes with indegree 0

    WHILE queue:
        IF SIZE(queue) > 1: RETURN false  // ambiguous order
        node ← queue.DEQUEUE()
        FOR neighbor IN graph[node]:
            indegree[neighbor] -= 1
            IF indegree[neighbor] == 0: queue.ENQUEUE(neighbor)

    RETURN all nodes visited
```

| Time | Space |
|------|-------|
| O(V + E) | O(V + E) |

---

## Key Takeaway

> Unique supersequence ↔ unique topological order. At every step in BFS topo sort, the queue must have **exactly one** element — otherwise the order is ambiguous.
