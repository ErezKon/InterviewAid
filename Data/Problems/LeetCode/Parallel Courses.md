# 1136. Parallel Courses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/parallel-courses](https://leetcode.com/problems/parallel-courses)
**Companies:** Amazon, Google, Meta, Netflix, Snowflake, Tiktok, Uber

---

## Problem Description
You are given an integer `n`, which indicates that there are `n` courses labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [prevCourse_i, nextCourse_i]`, representing a prerequisite relationship between course `prevCourse_i` and course `nextCourse_i`: course `prevCourse_i` has to be taken before course `nextCourse_i`.

In one semester, you can take **any number** of courses as long as you have taken all the prerequisites in the **previous** semester for the courses you are taking.

Return *the **minimum** number of semesters needed to take all courses*. If there is no way to take all the courses, return `-1`.

**Constraints:**

- `1 <= n <= 5000`
- `1 <= relations.length <= 5000`
- `relations[i].length == 2`
- `1 <= prevCourse_i, nextCourse_i <= n`
- `prevCourse_i != nextCourse_i`
- All the pairs `[prevCourse_i, nextCourse_i]` are **unique**.

## Examples

```
Example 1:
  Input: n = 3, relations = [[1,3],[2,3]]
  Output: 2
  Explanation: The graph has edges 1->3 and 2->3.
  In the first semester, you can take courses 1 and 2.
  In the second semester, you can take course 3.
```

```
Example 2:
  Input: n = 3, relations = [[1,2],[2,3],[3,1]]
  Output: -1
  Explanation: No course can be studied because they are prerequisites of each other.
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
