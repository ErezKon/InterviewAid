# 3680. Generate Schedule

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/generate-schedule](https://leetcode.com/problems/generate-schedule)
**Companies:** Oracle
---

## Problem Description

Generate a valid schedule satisfying given constraints. (Implementation problem)

## Approach

**Algorithm:** Constraint Simulation — use greedy or backtracking based on constraint complexity.

```text
FUNCTION generateSchedule(constraints):
    // Parse constraints into a suitable data structure
    // Attempt to assign time slots greedily
    // If conflict arises, backtrack or adjust assignments
    RETURN schedule
```

## Examples

| Constraints | Output Schedule | Explanation |
|-------------|----------------|-------------|
| `[["A","B"],["B","C"]]` | `A → 1, B → 2, C → 3` | Assign tasks sequentially respecting precedence. |
| `[["X","Y"],["Y","X"]]` | `Impossible` | Circular dependency makes scheduling impossible. |

## Walkthrough

1. Parse each constraint pair `(pre, post)` into a directed graph.
2. Perform a topological sort to detect ordering.
3. If a cycle is found, return `Impossible`.
4. Otherwise, assign incremental time slots following the topological order.

## Complexity Analysis

- **Time:** O(V + E) where V is the number of tasks and E the number of constraints (topological sort).
- **Space:** O(V + E) for the graph representation.

## Follow-Up Questions

- How would you handle weighted constraints where some tasks have higher priority?
- Can you extend the solution to schedule tasks on multiple machines in parallel?
- What changes are needed if tasks have specific time windows?

## Key Takeaway

> Model constraints as a graph and use topological sorting to produce a feasible schedule or detect impossibility.
