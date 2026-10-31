# 1462. Course Schedule IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/course-schedule-iv](https://leetcode.com/problems/course-schedule-iv)
**Companies:** Amazon, Google, Meta, Microsoft, Tiktok, Uber

---

## Problem Description

There are a total of `numCourses` courses you have to take, labeled from `0` to `numCourses - 1`. You are given an array `prerequisites` where `prerequisites[i] = [a_i, b_i]` indicates that you **must** take course `a_i` first if you want to take course `b_i`.

- For example, the pair `[0, 1]` indicates that you have to take course `0` before you can take course `1`.

Prerequisites can also be **indirect**. If course `a` is a prerequisite of course `b`, and course `b` is a prerequisite of course `c`, then course `a` is a prerequisite of course `c`.

You are also given an array `queries` where `queries[j] = [u_j, v_j]`. For the `j`-th query, you should answer whether course `u_j` is a prerequisite of course `v_j` or not.

Return *a boolean array* `answer`*, where* `answer[j]` *is the answer to the* `j`*-th query.*

**Constraints:**
- `2 <= numCourses <= 100`
- `0 <= prerequisites.length <= (numCourses * (numCourses - 1) / 2)`
- `prerequisites[i].length == 2`
- `0 <= a_i, b_i <= numCourses - 1`
- `a_i != b_i`
- All the pairs `[a_i, b_i]` are **unique**.
- The prerequisites graph has no cycles.
- `1 <= queries.length <= 10^4`
- `0 <= u_i, v_i <= numCourses - 1`
- `u_i != v_i`

---

## Examples

```
Example 1:
  Input: numCourses = 2, prerequisites = [[1,0]], queries = [[0,1],[1,0]]
  Output: [false,true]
  Explanation: The pair [1, 0] indicates that you have to take course 1 before you can take course 0.
  Course 0 is not a prerequisite of course 1, but the opposite is true.
```

```
Example 2:
  Input: numCourses = 2, prerequisites = [], queries = [[1,0],[0,1]]
  Output: [false,false]
  Explanation: There are no prerequisites, and each course is independent.
```

```
Example 3:
  Input: numCourses = 3, prerequisites = [[1,2],[1,0],[2,0]], queries = [[1,0],[1,2]]
  Output: [true,true]
```

---

## Approach: Floyd-Warshall — O(n³) ✅

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
| **Time** | O(n³ + Q) – Floyd-Warshall plus answering Q queries |
| **Space** | O(n²) – boolean matrix |

---

## Follow-Up Questions

1. How would you improve the time complexity if the number of courses `n` is large but the number of queries `Q` is small?
2. Can the problem be solved using BFS/DFS from each source node instead of Floyd-Warshall?
3. How would you adapt the solution to handle dynamic addition of new prerequisite edges?

---

## Key Takeaway

> **Transitive closure via Floyd-Warshall efficiently answers all prerequisite queries in a DAG by iteratively propagating reachability through intermediate courses.**