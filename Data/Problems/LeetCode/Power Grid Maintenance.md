# 3607. Power Grid Maintenance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/power-grid-maintenance](https://leetcode.com/problems/power-grid-maintenance)
**Companies:** Amazon, Cisco, Google, Meta, Microsoft, Salesforce, Zeta

---

## Problem Description

You are given an integer `c` representing `c` power stations, each with a unique identifier `id` from 1 to `c` (1-based indexing).

These stations are interconnected via `n` **bidirectional** cables, represented by a 2D array `connections`, where each element `connections[i] = [u_i, v_i]` indicates a connection between station `u_i` and station `v_i`. Stations that are directly or indirectly connected form a **power grid**.

Initially, **all** stations are online (operational).

You are also given a 2D array `queries`, where each query is one of the following *two* types:

- `[1, x]`: A maintenance check is requested for station `x`. If station `x` is online, it resolves the check by itself. If station `x` is offline, the check is resolved by the operational station with the smallest `id` in the same **power grid** as `x`. If **no** **operational** station *exists* in that grid, return -1.
- `[2, x]`: Station `x` goes offline (i.e., it becomes non-operational).

Return an array of integers representing the results of each query of type `[1, x]` in the **order** they appear.

**Note:** The power grid preserves its structure; an offline (non-operational) node remains part of its grid and taking it offline does not alter connectivity.

**Constraints:**
- `1 <= c <= 10^5`
- `0 <= n == connections.length <= min(10^5, c * (c - 1) / 2)`
- `connections[i].length == 2`
- `1 <= u_i, v_i <= c`
- `u_i != v_i`
- `1 <= queries.length <= 2 * 10^5`
- `queries[i].length == 2`
- `queries[i][0]` is either 1 or 2.
- `1 <= queries[i][1] <= c`

## Examples

**Example 1:**
```
Input: c = 5, connections = [[1,2],[2,3],[3,4],[4,5]], queries = [[1,3],[2,1],[1,1],[2,2],[1,2]]
Output: [3,2,3]
Explanation:
- Initially, all stations {1, 2, 3, 4, 5} are online and form a single power grid.
- Query [1,3]: Station 3 is online, so the maintenance check is resolved by station 3.
- Query [2,1]: Station 1 goes offline. The remaining online stations are {2, 3, 4, 5}.
- Query [1,1]: Station 1 is offline, so the check is resolved by the operational station with the smallest id among {2, 3, 4, 5}, which is station 2.
- Query [2,2]: Station 2 goes offline. The remaining online stations are {3, 4, 5}.
- Query [1,2]: Station 2 is offline, so the check is resolved by the operational station with the smallest id among {3, 4, 5}, which is station 3.
```

**Example 2:**
```
Input: c = 3, connections = [], queries = [[1,1],[2,1],[1,1]]
Output: [1,-1]
Explanation:
- There are no connections, so each station is its own isolated grid.
- Query [1,1]: Station 1 is online in its isolated grid, so the maintenance check is resolved by station 1.
- Query [2,1]: Station 1 goes offline.
- Query [1,1]: Station 1 is offline and there are no other stations in its grid, so the result is -1.
```

## Approach
**Algorithm:** Union-Find to build the grids, plus one min-heap of station ids per grid with lazy deletion.
**Key Insight:** Taking a station offline never changes connectivity, so grids are fixed up front. Each query `[1, x]` for an offline `x` only needs the smallest online id in `x`'s grid. Keep every grid's ids in a min-heap; when a station goes offline just flag it, and discard flagged ids from the top of the heap only when a query looks at it. Each id is popped at most once.

```text
FUNCTION processQueries(c, connections, queries):
    dsu ← NEW UnionFind(c)
    FOR (u, v) IN connections:
        dsu.UNION(u, v)
    heaps ← MAP root → MIN-HEAP
    FOR id ← 1 TO c:
        PUSH id INTO heaps[dsu.FIND(id)]
    online ← ARRAY OF TRUE LENGTH c + 1
    result ← []
    FOR (type, x) IN queries:
        IF type == 2:
            online[x] ← FALSE              // lazy deletion
        ELSE IF online[x]:
            APPEND x TO result
        ELSE:
            h ← heaps[dsu.FIND(x)]
            WHILE h NOT EMPTY AND NOT online[TOP(h)]:
                POP h
            APPEND (TOP(h) IF h NOT EMPTY ELSE -1) TO result
    RETURN result
```

## Walkthrough
Example 1: `c = 5`, `connections = [[1,2],[2,3],[3,4],[4,5]]` → one grid, heap `[1,2,3,4,5]`.

| Query | Action | Heap top after cleanup | Output |
|-------|--------|------------------------|--------|
| `[1,3]` | 3 is online | - | `3` |
| `[2,1]` | mark 1 offline | (heap unchanged, lazy) | |
| `[1,1]` | 1 offline → pop 1 (offline), top = 2 online | 2 | `2` |
| `[2,2]` | mark 2 offline | | |
| `[1,2]` | 2 offline → pop 2, top = 3 online | 3 | `3` |

Result: `[3,2,3]`.

## Complexity Analysis
- **Time:** O((c + n) · α(c) + c log c + q log c) - building the DSU and heaps, then each id is popped at most once across all queries.
- **Space:** O(c) for the DSU, heaps, and online flags.

## Follow-Up Questions
1. What if stations could come back online (`[3, x]`)? (Use a sorted set per grid instead of a lazy heap, or re-push the id.)
2. What if cables could also be removed? (Process queries offline in reverse so removals become unions.)
3. How would you answer "largest online id" or "k-th smallest online id" in the grid?

## Key Takeaway
When the structure is static and only membership changes, precompute components once with Union-Find and use lazy deletion in a per-component heap so each removal costs amortized O(log c).
