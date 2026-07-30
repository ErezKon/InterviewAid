# 1462. Course Schedule IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/course-schedule-iv](https://leetcode.com/problems/course-schedule-iv)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description

Given a directed acyclic graph (DAG) representing course prerequisites and a list of queries `[u, v]`, determine for each query whether course `u` is a prerequisite of course `v` (directly or indirectly).

---

## Examples

| numCourses | prerequisites | queries | Output | Explanation |
|------------|---------------|---------|--------|-------------|
| 3 | `[[0,1],[1,2]]` | `[[0,2],[2,0]]` | `[true,false]` | `0` → `1` → `2` so `0` is a prerequisite of `2`; `2` is not a prerequisite of `0`. |
| 4 | `[[1,2],[2,3]]` | `[[1,3],[0,2]]` | `[true,false]` | `1` → `2` → `3` makes `1` a prerequisite of `3`; `0` has no outgoing edges. |

---

## Approach: Floyd‑Warshall — O(n³) ✅

```text
FUNCTION checkIfPrerequisite(numCourses, prerequisites, queries):
    // reachable[i][j] = true if i is a prerequisite of j
    SET reachable ← MATRIX(numCourses, numCourses) FILLED WITH false
    FOR EACH [u, v] IN prerequisites:
        SET reachable[u][v] ← true

    // Transitive closure
    FOR k ← 0 TO numCourses - 1:
        FOR i ← 0 TO numCourses - 1:
            IF reachable[i][k]:
                FOR j ← 0 TO numCourses - 1:
                    SET reachable[i][j] ← reachable[i][j] OR reachable[k][j]

    // Answer queries
    SET answer ← []
    FOR EACH [u, v] IN queries:
        APPEND reachable[u][v] TO answer
    RETURN answer
```

---

## Walkthrough

Consider `numCourses = 3`, `prerequisites = [[0,1],[1,2]]`:

1. Initialise `reachable` matrix with false, then set `reachable[0][1] = true`, `reachable[1][2] = true`.
2. **k = 0**: no new paths because only `reachable[i][0]` are false.
3. **k = 1**: `reachable[0][1]` is true, so for all `j`, set `reachable[0][j] = reachable[0][j] OR reachable[1][j]`. This makes `reachable[0][2]` true.
4. **k = 2**: no further updates.
5. Final matrix shows `reachable[0][2] = true`, others false, answering queries accordingly.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n³ + Q) – Floyd‑Warshall plus answering Q queries |
| **Space** | O(n²) – boolean matrix |

---

## Follow‑Up Questions

1. How would you improve the time complexity if the number of courses `n` is large but the number of queries `Q` is small?
2. Can the problem be solved using BFS/DFS from each source node instead of Floyd‑Warshall?
3. How would you adapt the solution to handle dynamic addition of new prerequisite edges?

---

## Key Takeaway

> **Transitive closure via Floyd‑Warshall efficiently answers all prerequisite queries in a DAG by iteratively propagating reachability through intermediate courses.**