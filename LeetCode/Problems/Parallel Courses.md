# 1136. Parallel Courses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/parallel-courses](https://leetcode.com/problems/parallel-courses)
**Companies:** Amazon, Google, Meta, Netflix, Snowflake, Tiktok, Uber

---

## Problem Description
There are `n` courses labeled from `1` to `n`. Some courses have prerequisites given as pairs `[prev, next]` meaning `prev` must be taken before `next`. In each semester you can take any number of courses as long as all their prerequisites have been completed. Return the minimum number of semesters required to finish all courses. If it is impossible (due to a cycle), return `-1`.

## Examples
**Example 1:**
```
Input: n = 3, relations = [[1,3],[2,3]]
Output: 2
Explanation: Semester 1: take courses 1 and 2. Semester 2: take course 3.
```
**Example 2:**
```
Input: n = 3, relations = [[1,2],[2,3],[3,1]]
Output: -1
Explanation: Cycle exists, cannot complete all courses.
```

## Approach
Perform a BFS topological sort. Courses with zero in-degree are available in the current semester. Process all such courses, decrement in-degrees of their neighbors, and collect newly available courses for the next semester. Count semesters (BFS levels). If after processing all levels the number of studied courses is less than `n`, a cycle exists.

```text
FUNCTION minimumSemesters(n, relations):
    graph ← ADJACENCY LIST of size n+1
    indegree ← ARRAY n+1 WITH 0
    FOR [pre, nxt] IN relations:
        graph[pre].ADD(nxt)
        indegree[nxt] ← indegree[nxt] + 1
    queue ← LIST of i WHERE indegree[i] = 0
    semesters ← 0
    studied ← 0
    WHILE queue NOT EMPTY:
        semesters ← semesters + 1
        nextQueue ← []
        FOR course IN queue:
            studied ← studied + 1
            FOR neighbor IN graph[course]:
                indegree[neighbor] ← indegree[neighbor] - 1
                IF indegree[neighbor] = 0:
                    nextQueue.ADD(neighbor)
        queue ← nextQueue
    RETURN semesters IF studied = n ELSE -1
```

## Walkthrough
For `n=3, relations=[[1,3],[2,3]]`:
1. Initial queue = [1,2]; semester 1 processes both, studied=2, indegree[3] becomes 0.
2. Queue = [3]; semester 2 processes 3, studied=3.
3. All courses studied, return 2 semesters.

## Complexity Analysis
- **Time:** O(V + E) where V = n and E = number of prerequisite pairs.
- **Space:** O(V + E) for the adjacency list and indegree array.

## Follow-Up Questions
1. How would you adapt the algorithm if you could take at most `k` courses per semester?
2. Can you compute the order of courses for each semester (a valid schedule)?
3. How does the solution change if courses have different durations?

## Key Takeaway
BFS level order on the prerequisite graph naturally yields the minimum semesters, with a cycle detection via unfinished nodes.
