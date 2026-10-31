# 1376. Time Needed to Inform All Employees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/time-needed-to-inform-all-employees](https://leetcode.com/problems/time-needed-to-inform-all-employees)
**Companies:** Amazon, Google, Infosys, Medianet, Microsoft

---

## Problem Description

A company has `n` employees with a unique ID for each employee from `0` to `n - 1`. The head of the company is the one with `headID`.

Each employee has one direct manager given in the `manager` array where `manager[i]` is the direct manager of the `i`-th employee, `manager[headID] = -1`. Also, it is guaranteed that the subordination relationships have a tree structure.

The head of the company wants to inform all the company employees of an urgent piece of news. He will inform his direct subordinates, and they will inform their subordinates, and so on until all employees know about the urgent news.

The `i`-th employee needs `informTime[i]` minutes to inform all of his direct subordinates (i.e., After `informTime[i]` minutes, all his direct subordinates can start spreading the news).

Return *the number of minutes* needed to inform all the employees about the urgent news.

**Constraints:**
- `1 <= n <= 10^5`
- `0 <= headID < n`
- `manager.length == n`
- `0 <= manager[i] < n`
- `manager[headID] == -1`
- `informTime.length == n`
- `0 <= informTime[i] <= 1000`
- `informTime[i] == 0` if employee `i` has no subordinates.
- It is **guaranteed** that all the employees can be informed.

## Examples

**Example 1:**
```
Input: n = 1, headID = 0, manager = [-1], informTime = [0]
Output: 0
Explanation: The head of the company is the only employee in the company.
```

**Example 2:**
```
Input: n = 6, headID = 2, manager = [2,2,-1,2,2,2], informTime = [0,0,1,0,0,0]
Output: 1
Explanation: The head of the company with id = 2 is the direct manager of all the employees in the company and needs 1 minute to inform them all.
```

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

## Follow-Up Questions
1. How would you compute the order in which employees receive the news?
2. Can the solution be adapted for parallel processing where managers inform sub-trees concurrently?
3. What if `informTime` varies per subordinate rather than per manager?

## Key Takeaway
A simple DFS on the manager-subordinate tree, aggregating the maximum child time, yields the total inform time.
