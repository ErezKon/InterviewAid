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

Given a list of employees (each with `id`, `importance`, and list of `subordinates`), return the **total importance** of a given employee and all their direct/indirect subordinates.

**Constraints:**
- `1 <= employees.length <= 2000`

---

## Examples

```
Input: employees = [[1,5,[2,3]],[2,3,[]],[3,3,[]]], id = 1
Output: 11
Explanation: Employee 1 (5) + Employee 2 (3) + Employee 3 (3) = 11
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
