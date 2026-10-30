# 444. Sequence Reconstruction

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sequence-reconstruction](https://leetcode.com/problems/sequence-reconstruction)

**Companies:** Amazon, Google
---

## Problem Description

You are given an integer array `nums` of length `n` where `nums` is a permutation of the integers in the range `[1, n]`. You are also given a 2D integer array `sequences` where `sequences[i]` is a subsequence of `nums`.

Check if `nums` is the shortest possible and the only **supersequence**. The shortest **supersequence** is a sequence **with the shortest length** and has all `sequences[i]` as subsequences. There could be multiple valid **supersequences** for the given array `sequences`.

- For example, for `sequences = [[1,2],[1,3]]`, there are two shortest **supersequences**, `[1,2,3]` and `[1,3,2]`.
- While for `sequences = [[1,2],[1,3],[1,2,3]]`, the only shortest **supersequence** possible is `[1,2,3]`. `[1,2,3,4]` is a possible supersequence but not the shortest.

Return `true` *if* `nums` *is the only shortest **supersequence** for* `sequences`*, or* `false` *otherwise*.

A **subsequence** is a sequence that can be derived from another sequence by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**

- `n == nums.length`
- `1 <= n <= 10^4`
- `nums` is a permutation of all the integers in the range `[1, n]`.
- `1 <= sequences.length <= 10^4`
- `1 <= sequences[i].length <= 10^4`
- `1 <= sum(sequences[i].length) <= 10^5`
- `1 <= sequences[i][j] <= n`
- All the arrays of `sequences` are **unique**.
- `sequences[i]` is a subsequence of `nums`.

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

```
Example 1:
  Input: nums = [1,2,3], sequences = [[1,2],[1,3]]
  Output: false
  Explanation: There are two possible supersequences: [1,2,3] and [1,3,2].
  The sequence [1,2] is a subsequence of both: [1,2,3] and [1,3,2].
  The sequence [1,3] is a subsequence of both: [1,2,3] and [1,3,2].
  Since nums is not the only shortest supersequence, we return false.
```

```
Example 2:
  Input: nums = [1,2,3], sequences = [[1,2]]
  Output: false
  Explanation: The shortest possible supersequence is [1,2].
  The sequence [1,2] is a subsequence of it: [1,2].
  Since nums is not the shortest supersequence, we return false.
```

```
Example 3:
  Input: nums = [1,2,3], sequences = [[1,2],[1,3],[2,3]]
  Output: true
  Explanation: The shortest possible supersequence is [1,2,3].
  The sequence [1,2] is a subsequence of it: [1,2,3].
  The sequence [1,3] is a subsequence of it: [1,2,3].
  The sequence [2,3] is a subsequence of it: [1,2,3].
  Since nums is the only shortest supersequence, we return true.
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
