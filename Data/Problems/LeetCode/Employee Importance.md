# 690. Employee Importance

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/employee-importance](https://leetcode.com/problems/employee-importance)
**Companies:** Amazon, Google, Microsoft, Robinhood, Uber

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DFS with HashMap](#approach-dfs-with-hashmap--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You have a data structure of employee information, including the employee's unique ID, importance value, and direct subordinates' IDs.

You are given an array of employees `employees` where:

- `employees[i].id` is the ID of the `i^th` employee.
- `employees[i].importance` is the importance value of the `i^th` employee.
- `employees[i].subordinates` is a list of the IDs of the direct subordinates of the `i^th` employee.

Given an integer `id` that represents an employee's ID, return *the **total** importance value of this employee and all their direct and indirect subordinates*.

**Constraints:**
- `1 <= employees.length <= 2000`
- `1 <= employees[i].id <= 2000`
- All `employees[i].id` are **unique**.
- `-100 <= employees[i].importance <= 100`
- One employee has at most one direct leader and may have several subordinates.
- The IDs in `employees[i].subordinates` are valid IDs.

---

## Examples

**Example 1:**
```
Input: employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
Output: 11
Explanation: Employee 1 has an importance value of 5 and has two direct subordinates: employee 2 and employee 3.
They both have an importance value of 3.
Thus, the total importance value of employee 1 is 5 + 3 + 3 = 11.
```

**Example 2:**
```
Input: employees = [[1,2,[5]],[5,-3,[]]], id = 5
Output: -3
Explanation: Employee 5 has an importance value of -3 and has no direct subordinates.
Thus, the total importance value of employee 5 is -3.
```

---

## Key Insight

> Build a hashmap for O(1) employee lookup, then DFS/BFS from the target employee summing importance values through the subordinate tree.

---

## Approach: DFS with HashMap — O(n) ✅

```
FUNCTION getImportance(employees, id):
    empMap = {e.id: e for e in employees}

    FUNCTION dfs(eid):
        emp = empMap[eid]
        RETURN emp.importance + SUM(dfs(sub) for sub in emp.subordinates)

    RETURN dfs(id)
```

---

## Walkthrough

```
employees = [[1,5,[2,3]], [2,3,[]], [3,3,[]]], id = 1

empMap = {1: [1,5,[2,3]], 2: [2,3,[]], 3: [3,3,[]]}

dfs(1): importance=5 + dfs(2) + dfs(3)
  dfs(2): importance=3 + (no subs) = 3
  dfs(3): importance=3 + (no subs) = 3
= 5 + 3 + 3 = 11 ✅
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| **Time** | O(n) — visit each employee at most once |
| **Space** | O(n) — hashmap + recursion stack |

---

## Key Takeaway

> **HashMap for O(1) lookup + DFS/BFS traversal of the hierarchy tree. Standard pattern for tree-sum problems on graph-like structures.**
