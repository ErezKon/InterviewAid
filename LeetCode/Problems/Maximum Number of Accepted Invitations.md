# 1820. Maximum Number of Accepted Invitations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-accepted-invitations](https://leetcode.com/problems/maximum-number-of-accepted-invitations)
**Companies:** Bloomberg, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `m` boys and `n` girls at a party. Given an `m × n` matrix `grid` where `grid[i][j] = 1` means boy `i` can invite girl `j`. Each boy can invite at most one girl and each girl can accept at most one invitation.

Return the **maximum number of accepted invitations**.

**Constraints:**
- `1 <= m, n <= 200`
- `grid[i][j]` is `0` or `1`

---

## Examples

**Example 1:**
```
Input:  grid = [[1,1,1],
                [1,0,1],
                [0,0,1]]
Output: 3
Explanation: Boy 0→Girl 0, Boy 1→Girl 1... Wait, grid[1][1]=0.
Boy 0→Girl 1, Boy 1→Girl 0, Boy 2→Girl 2. All 3 matched.
```

**Example 2:**
```
Input:  grid = [[1,0,1,0],
                [1,0,0,0],
                [0,0,1,0],
                [1,1,1,0]]
Output: 3
```

---

## Key Insight

> This is a **maximum bipartite matching** problem. Boys form one set, girls the other, and edges are where `grid[i][j] = 1`. Use the **Hungarian algorithm** (augmenting paths) to find the maximum matching.

---

## Approach

```
FUNCTION maximumInvitations(grid)
    m ← rows, n ← cols
    matchGirl ← array of n, all -1   // matchGirl[j] = boy matched to girl j

    count ← 0
    FOR boy ← 0 TO m - 1 DO
        visited ← array of n booleans, all FALSE
        IF DFS(boy, grid, visited, matchGirl) THEN
            count ← count + 1

    RETURN count
END FUNCTION

FUNCTION DFS(boy, grid, visited, matchGirl)
    FOR girl ← 0 TO n - 1 DO
        IF grid[boy][girl] = 1 AND NOT visited[girl] THEN
            visited[girl] ← TRUE
            // If girl is free OR her current match can find another girl
            IF matchGirl[girl] = -1 OR DFS(matchGirl[girl], grid, visited, matchGirl) THEN
                matchGirl[girl] ← boy
                RETURN TRUE

    RETURN FALSE
END FUNCTION
```

---

## Walkthrough

```
grid = [[1,1,1],
        [1,0,1],
        [0,0,1]]
```

1. **Boy 0**: Try girl 0 → free → match. `matchGirl = [0, -1, -1]`
2. **Boy 1**: Try girl 0 → taken by boy 0. Can boy 0 find another? Boy 0 tries girl 1 → free. Rematched! `matchGirl = [1, 0, -1]`. Boy 1 gets girl 0. Wait — let me re-trace:
   - matchGirl[0]=0 (boy 0). DFS(0,...): boy 0 tries girl 1 → free. matchGirl[1]=0. Now matchGirl[0]=1. Done.
3. **Boy 2**: Try girl 2 → free → match. `matchGirl = [1, 0, 2]`

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(m × n × m)** — m boys, each DFS visits up to n girls, with up to m recursion depth |
| Space  | **O(n)** — match array + visited array |

---

## Follow-Up Questions

1. **What's the difference between this and Hopcroft-Karp?**
   Hopcroft-Karp uses BFS to find shortest augmenting paths in batches → O(E√V) instead of O(VE).

2. **Could we use a flow-based approach?**
   Yes — model as max-flow with source→boys, boys→girls (with edges), girls→sink.

3. **What if there are weights (maximize total weight)?**
   Use the weighted Hungarian algorithm (assignment problem) → O(n³).

---

## Key Takeaway

> **Maximum bipartite matching via augmenting paths** — for each unmatched node, try to find an augmenting path through DFS. When a girl is taken, recursively check if her current partner can switch.
