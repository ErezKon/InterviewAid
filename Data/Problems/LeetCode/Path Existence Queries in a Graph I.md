# 3532. Path Existence Queries in a Graph I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/path-existence-queries-in-a-graph-i](https://leetcode.com/problems/path-existence-queries-in-a-graph-i)
**Companies:** Google

---

## Problem Description
You are given an integer `n` representing the number of nodes in a graph, labeled from 0 to `n - 1`.

You are also given an integer array `nums` of length `n` sorted in **non-decreasing** order, and an integer `maxDiff`.

An **undirected** edge exists between nodes `i` and `j` if the **absolute** difference between `nums[i]` and `nums[j]` is **at most** `maxDiff` (i.e., `|nums[i] - nums[j]| <= maxDiff`).

You are also given a 2D integer array `queries`. For each `queries[i] = [u_i, v_i]`, determine whether there exists a path between nodes `u_i` and `v_i`.

Return a boolean array `answer`, where `answer[i]` is `true` if there exists a path between `u_i` and `v_i` in the `i`-th query and `false` otherwise.

**Constraints:**

- `1 <= n == nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `nums` is sorted in **non-decreasing** order.
- `0 <= maxDiff <= 10^5`
- `1 <= queries.length <= 10^5`
- `queries[i] == [u_i, v_i]`
- `0 <= u_i, v_i < n`

## Examples

```
Example 1:
  Input: n = 2, nums = [1,3], maxDiff = 1, queries = [[0,0],[0,1]]
  Output: [true,false]
  Explanation:
    - Query [0,0]: Node 0 has a trivial path to itself.
    - Query [0,1]: There is no edge between Node 0 and Node 1 because |nums[0] - nums[1]| = |1 - 3| = 2, which is greater than maxDiff.
    - Thus, the final answer after processing all the queries is [true, false].
```

```
Example 2:
  Input: n = 4, nums = [2,5,6,8], maxDiff = 2, queries = [[0,1],[0,2],[1,3],[2,3]]
  Output: [false,false,true,true]
  Explanation: The resulting graph has edges 1-2 and 2-3 (node 0 is isolated).
    - Query [0,1]: There is no edge between Node 0 and Node 1 because |nums[0] - nums[1]| = |2 - 5| = 3, which is greater than maxDiff.
    - Query [0,2]: There is no edge between Node 0 and Node 2 because |nums[0] - nums[2]| = |2 - 6| = 4, which is greater than maxDiff.
    - Query [1,3]: There is a path between Node 1 and Node 3 through Node 2 since |nums[1] - nums[2]| = |5 - 6| = 1 and |nums[2] - nums[3]| = |6 - 8| = 2, both of which are within maxDiff.
    - Query [2,3]: There is an edge between Node 2 and Node 3 because |nums[2] - nums[3]| = |6 - 8| = 2, which is equal to maxDiff.
    - Thus, the final answer after processing all the queries is [false, false, true, true].
```

## Approach
Edges are implicit (up to O(n^2) of them), so never build them. Because `nums` is sorted:
- If `nums[i] - nums[i-1] <= maxDiff`, nodes `i-1` and `i` are directly connected.
- If `nums[i] - nums[i-1] > maxDiff`, no node at index `<= i-1` can reach any node at index `>= i` (every such pair differs by even more).
- So connected components are **contiguous index ranges** split at "gaps". Label them with one scan: `comp[i] = comp[i-1] + (gap ? 1 : 0)`.
- Query `[u, v]` is `true` iff `comp[u] == comp[v]`.

```text
FUNCTION pathExistenceQueries(n, nums, maxDiff, queries):
    comp ← ARRAY n, comp[0] ← 0
    FOR i ← 1 TO n-1:
        IF nums[i] - nums[i-1] > maxDiff:
            comp[i] ← comp[i-1] + 1
        ELSE:
            comp[i] ← comp[i-1]
    answers ← []
    FOR each (u, v) IN queries:
        APPEND (comp[u] = comp[v]) TO answers
    RETURN answers
```

## Walkthrough
Example 2: `nums = [2,5,6,8]`, `maxDiff = 2`, `queries = [[0,1],[0,2],[1,3],[2,3]]`.

| i | nums[i] - nums[i-1] | Gap (> 2)? | comp |
|---|---------------------|------------|------|
| 0 | - | - | `[0]` |
| 1 | 5 - 2 = 3 | Yes | `[0,1]` |
| 2 | 6 - 5 = 1 | No | `[0,1,1]` |
| 3 | 8 - 6 = 2 | No | `[0,1,1,1]` |

- `[0,1]`: 0 vs 1 -> false
- `[0,2]`: 0 vs 1 -> false
- `[1,3]`: 1 vs 1 -> true
- `[2,3]`: 1 vs 1 -> true

Result: `[false,false,true,true]`.

## Complexity Analysis
- **Time:** O(n + q) - one scan to label components, O(1) per query.
- **Space:** O(n) for the `comp` array.

## Follow-Up Questions
1. How would you answer the minimum number of edges on a path between `u` and `v` (Path Existence Queries II)? Hint: binary lifting on the farthest reachable index.
2. What if `nums` were not sorted? (Sort indices by value, then apply the same idea.)
3. How would you support updates to `nums` between queries?

## Key Takeaway
With sorted values and a threshold-based edge rule, components are contiguous ranges, so a single "gap" scan replaces any graph construction or Union-Find.
