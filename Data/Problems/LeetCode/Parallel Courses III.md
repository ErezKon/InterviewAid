# 2050. Parallel Courses III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parallel-courses-iii](https://leetcode.com/problems/parallel-courses-iii)
**Companies:** Acko, Amazon, Citadel, Google, Microsoft, Snowflake, Stripe, Tiktok, Two Sigma

---

## Problem Description
You are given an integer `n`, which indicates that there are `n` courses labeled from `1` to `n`. You are also given a 2D integer array `relations` where `relations[j] = [prevCourse_j, nextCourse_j]` denotes that course `prevCourse_j` has to be completed **before** course `nextCourse_j` (prerequisite relationship). Furthermore, you are given a **0-indexed** integer array `time` where `time[i]` denotes how many **months** it takes to complete the `(i+1)`-th course.

You must find the **minimum** number of months needed to complete all the courses following these rules:

- You may start taking a course at **any time** if the prerequisites are met.
- **Any number of courses** can be taken at the **same time**.

Return *the **minimum** number of months needed to complete all the courses*.

**Note:** The test cases are generated such that it is possible to complete every course (i.e., the graph is a directed acyclic graph).

**Constraints:**

- `1 <= n <= 5 * 10^4`
- `0 <= relations.length <= min(n * (n - 1) / 2, 5 * 10^4)`
- `relations[j].length == 2`
- `1 <= prevCourse_j, nextCourse_j <= n`
- `prevCourse_j != nextCourse_j`
- All the pairs `[prevCourse_j, nextCourse_j]` are **unique**.
- `time.length == n`
- `1 <= time[i] <= 10^4`
- The given graph is a directed acyclic graph.

## Examples

```
Example 1:
  Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
  Output: 8
  Explanation: The graph has edges 1->3 and 2->3.
  We start course 1 and course 2 simultaneously at month 0.
  Course 1 takes 3 months and course 2 takes 2 months to complete respectively.
  Thus, the earliest time we can start course 3 is at month 3, and the total time required is 3 + 5 = 8 months.
```

```
Example 2:
  Input: n = 5, relations = [[1,5],[2,5],[3,5],[3,4],[4,5]], time = [1,2,3,4,5]
  Output: 12
  Explanation: The graph has edges 1->5, 2->5, 3->5, 3->4, 4->5.
  You can start courses 1, 2, and 3 at month 0.
  You can complete them after 1, 2, and 3 months respectively.
  Course 4 can be taken only after course 3 is completed, i.e., after 3 months. It is completed after 3 + 4 = 7 months.
  Course 5 can be taken only after courses 1, 2, 3, and 4 have been completed, i.e., after max(1,2,3,7) = 7 months.
  Thus, the minimum time needed to complete all the courses is 7 + 5 = 12 months.
```

## Approach
Topological Sort + DP — O(V+E) ✅

```text
FUNCTION minimumTime(n, relations, time):
    graph ← adjacency list
    inDegree ← ARRAY[0..n] OF 0
    FOR [prev, next] IN relations:
        graph[prev].ADD(next)
        inDegree[next] ← inDegree[next] + 1

    dist ← ARRAY[0..n] OF 0
    queue ← []
    FOR i ← 1 TO n:
        dist[i] ← time[i-1]
        IF inDegree[i] = 0:
            queue.ENQUEUE(i)

    WHILE queue NOT EMPTY:
        u ← queue.DEQUEUE()
        FOR v IN graph[u]:
            dist[v] ← MAX(dist[v], dist[u] + time[v-1])
            inDegree[v] ← inDegree[v] - 1
            IF inDegree[v] = 0:
                queue.ENQUEUE(v)

    RETURN MAX(dist)
```

The DP array `dist[i]` stores the earliest semester when course `i` can finish. Processing nodes in topological order guarantees all prerequisites are considered.

## Walkthrough
| Step | Processed Course | Queue | dist values |
|------|------------------|-------|-------------|
| 1 | Initialize with courses 1,2 (inDegree 0) | [1,2] | dist[1]=3, dist[2]=2 |
| 2 | Dequeue 1, update 3: dist[3]=max(0,3+5)=8, inDegree[3]=1 | [2] | ... |
| 3 | Dequeue 2, update 3: dist[3]=max(8,2+5)=8, inDegree[3]=0, enqueue 3 | [3] | ... |
| 4 | Dequeue 3, no outgoing edges | [] | final max = 8 |

## Complexity Analysis
- **Time:** O(V + E) – each course and prerequisite edge is processed once.
- **Space:** O(V + E) for adjacency list, in-degree array, and DP array.

## Follow-Up Questions
1. How would you modify the algorithm if each semester has a limit on the number of concurrent courses?
2. Can you extend the solution to return the actual schedule (which courses in each semester) instead of just the total time?
3. What changes are needed if some courses can be taken only after a fixed number of semesters, regardless of prerequisites?

## Key Takeaway
The minimum time to finish all courses equals the length of the longest path in the prerequisite DAG, which can be computed with a topological sort combined with dynamic programming.
