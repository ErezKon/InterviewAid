# 2050. Parallel Courses III

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parallel-courses-iii](https://leetcode.com/problems/parallel-courses-iii)
**Companies:** Acko, Amazon, Citadel, Google, Microsoft, Snowflake, Stripe, Tiktok, Two Sigma

---

## Problem Description
You are given `n` courses labeled from `1` to `n`. Each course `i` takes `time[i-1]` semesters to complete. Prerequisite relations are given as a list of pairs `[prev, next]` meaning `prev` must be finished before `next` can start. Multiple courses can be taken in parallel as long as their prerequisites are satisfied. Return the minimum number of semesters required to finish all courses.

## Examples
**Example 1:**
```
Input: n = 3, relations = [[1,3],[2,3]], time = [3,2,5]
Output: 8
Explanation: Take courses 1 and 2 in parallel (3 and 2 semesters). After both finish, start course 3 which takes 5 semesters. Total = max(3,2) + 5 = 8.
```
**Example 2:**
```
Input: n = 5, relations = [[1,5],[2,5],[3,5],[4,5]], time = [1,1,1,1,1]
Output: 2
Explanation: Courses 1‑4 can be taken in semester 1, then course 5 in semester 2.
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
- **Space:** O(V + E) for adjacency list, in‑degree array, and DP array.

## Follow-Up Questions
1. How would you modify the algorithm if each semester has a limit on the number of concurrent courses?
2. Can you extend the solution to return the actual schedule (which courses in each semester) instead of just the total time?
3. What changes are needed if some courses can be taken only after a fixed number of semesters, regardless of prerequisites?

## Key Takeaway
The minimum time to finish all courses equals the length of the longest path in the prerequisite DAG, which can be computed with a topological sort combined with dynamic programming.
