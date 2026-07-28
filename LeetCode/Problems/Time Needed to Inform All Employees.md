# 1376. Time Needed to Inform All Employees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-inform-all-employees](https://leetcode.com/problems/time-needed-to-inform-all-employees)
**Companies:** Amazon, Google, Infosys, Medianet, Microsoft

---

## Problem Description
A company has `n` employees with IDs `0` to `n-1`. `headID` is the ID of the head manager. `manager[i]` is the direct manager of employee `i` (`-1` for the head). `informTime[i]` is the time the manager `i` needs to inform all direct subordinates. When a manager informs their subordinates, they do so simultaneously after `informTime[i]` seconds. Return the total minutes needed for the head to inform all employees.

## Examples
| n | headID | manager | informTime | Output | Explanation |
|---|--------|----------|------------|--------|-------------|
| 1 | 0 | [-1] | [0] | 0 | Only the head exists. |
| 6 | 2 | [2,2,-1,2,2,2] | [0,0,1,0,0,0] | 1 | Head (2) informs all others in 1 minute. |

## Approach
Build an adjacency list of subordinates for each manager, then perform a DFS from `headID` computing the longest time to a leaf.

```text
FUNCTION numOfMinutes(n, headID, manager, informTime):
    CREATE children[n] as empty lists
    FOR i FROM 0 TO n-1:
        IF manager[i] ≠ -1:
            APPEND i TO children[manager[i]]
    RETURN dfs(headID)

FUNCTION dfs(node):
    IF children[node] IS EMPTY:
        RETURN 0
    SET maxChild ← 0
    FOR child IN children[node]:
        SET maxChild ← MAX(maxChild, dfs(child))
    RETURN informTime[node] + maxChild
```

## Walkthrough
For the second example:
| Node | Children | informTime | dfs result |
|------|----------|------------|------------|
| 2 (head) | [0,1,3,4,5] | 1 | 1 + MAX(0,0,0,0,0) = 1 |
| others | [] | 0 | 0 |
The maximum path length is 1 minute.

## Complexity Analysis
*Time*: `O(n)` – each employee visited once.
*Space*: `O(n)` – adjacency list and recursion stack.

## Follow‑Up Questions
1. How would you compute the order in which employees receive the news?
2. Can the solution be adapted for parallel processing where managers inform sub‑trees concurrently?
3. What if `informTime` varies per subordinate rather than per manager?

## Key Takeaway
A simple DFS on the manager‑subordinate tree, aggregating the maximum child time, yields the total inform time.
