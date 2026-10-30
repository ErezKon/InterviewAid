# 1494. Parallel Courses II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/parallel-courses-ii](https://leetcode.com/problems/parallel-courses-ii)
**Companies:** Amazon, Google, Snowflake

---

## Problem Description
You are given an integer `n`, which indicates that there are `n` courses labeled from `1` to `n`. You are also given an array `relations` where `relations[i] = [prevCourse_i, nextCourse_i]`, representing a prerequisite relationship between course `prevCourse_i` and course `nextCourse_i`: course `prevCourse_i` has to be taken before course `nextCourse_i`. Also, you are given the integer `k`.

In one semester, you can take **at most** `k` courses as long as you have taken all the prerequisites in the **previous** semesters for the courses you are taking.

Return *the **minimum** number of semesters needed to take all courses*. The testcases will be generated such that it is possible to take every course.

**Constraints:**

- `1 <= n <= 15`
- `1 <= k <= n`
- `0 <= relations.length <= n * (n-1) / 2`
- `relations[i].length == 2`
- `1 <= prevCourse_i, nextCourse_i <= n`
- `prevCourse_i != nextCourse_i`
- All the pairs `[prevCourse_i, nextCourse_i]` are **unique**.
- The given graph is a directed acyclic graph.

## Examples

```
Example 1:
  Input: n = 4, relations = [[2,1],[3,1],[1,4]], k = 2
  Output: 3
  Explanation: The graph has edges 2->1, 3->1, 1->4.
  In the first semester, you can take courses 2 and 3.
  In the second semester, you can take course 1.
  In the third semester, you can take course 4.
```

```
Example 2:
  Input: n = 5, relations = [[2,1],[3,1],[4,1],[1,5]], k = 2
  Output: 4
  Explanation: The graph has edges 2->1, 3->1, 4->1, 1->5.
  In the first semester, you can only take courses 2 and 3 since you cannot take more than two per semester.
  In the second semester, you can take course 4.
  In the third semester, you can take course 1.
  In the fourth semester, you can take course 5.
```

## Approach
Use bitmask DP. Represent a set of completed courses as a bitmask `mask`. For each state, compute the set of courses whose prerequisites are satisfied (`available`). Enumerate all subsets of `available` with size ≤ `k` and transition to `mask | subset`. The DP value stores the minimum semesters to reach each mask.

```text
FUNCTION minNumberOfSemesters(n, relations, k):
    prereq ← ARRAY n WITH BITMASK 0
    FOR [pre, nxt] IN relations:
        prereq[nxt-1] ← prereq[nxt-1] OR (1 << (pre-1))
    total ← (1 << n) - 1
    dp ← MAP DEFAULT INF
    dp[0] ← 0
    queue ← [0]
    WHILE queue NOT EMPTY:
        mask ← POP(queue)
        IF mask = total:
            RETURN dp[mask]
        // courses whose prereqs are satisfied
        available ← 0
        FOR i ← 0 TO n-1:
            IF (mask >> i) AND 1 = 0 AND (prereq[i] AND mask) = prereq[i]:
                available ← available OR (1 << i)
        // enumerate subsets of available up to size k
        sub ← available
        WHILE sub > 0:
            IF POPCOUNT(sub) ≤ k:
                newMask ← mask OR sub
                IF dp[newMask] > dp[mask] + 1:
                    dp[newMask] ← dp[mask] + 1
                    PUSH(queue, newMask)
            sub ← (sub - 1) AND available
        // also consider taking no courses (should not happen)
    RETURN -1
```

## Walkthrough
For the first example (`n=4, k=2`):
1. Start `mask=0`. Available courses = {2,3}. Subsets of size ≤2: {2}, {3}, {2,3}. Choose {2,3} → `mask=1100`.
2. From `mask=1100`, available = {1}. Take it → `mask=1110`.
3. From `mask=1110`, available = {4}. Take it → `mask=1111`. Total semesters = 3.

## Complexity Analysis
- **Time:** O(3^n) in the worst case due to subset enumeration, but practical for n ≤ 15‑20.
- **Space:** O(2^n) for the DP table.

## Follow-Up Questions
1. How would you modify the algorithm for larger `n` (e.g., up to 10^5) using BFS with topological sorting?
2. Can you incorporate course weights (different durations) into the DP?
3. What changes if the limit `k` varies per semester?

## Key Takeaway
Bitmask DP enumerates all feasible sets of courses each semester, guaranteeing the minimal number of semesters when prerequisites are respected.
