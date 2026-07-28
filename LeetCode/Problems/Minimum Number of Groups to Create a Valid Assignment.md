# 2910. Minimum Number of Groups to Create a Valid Assignment

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-groups-to-create-a-valid-assignment](https://leetcode.com/problems/minimum-number-of-groups-to-create-a-valid-assignment)
**Companies:** Amazon

---

## Problem Description

You are given an array `tasks` where `tasks[i]` is the difficulty of the *i*‑th task. You need to assign each task to a group such that within each group the difficulties are strictly increasing. Return the minimum number of groups required to assign all tasks.

---

## Examples

**Example 1:**
```
Input: tasks = [1,3,2,4,5]
Output: 2
Explanation: One possible grouping is {1,2,4,5} and {3}. Both groups have strictly increasing difficulties.
```

**Example 2:**
```
Input: tasks = [5,4,3,2,1]
Output: 5
Explanation: No two tasks can be placed in the same group because the sequence is decreasing. Each task forms its own group.
```

---

## Approach

**Greedy – Longest Non‑Decreasing Subsequence Count**

The minimum number of groups equals the length of the longest non‑increasing subsequence of `tasks`. This follows from Dilworth’s theorem: the size of the smallest chain decomposition equals the size of the largest antichain. We can compute it by iterating through `tasks` and maintaining a list of group tops.

```text
FUNCTION minGroups(tasks):
    groups ← [] // stores the last difficulty of each group (sorted ascending)
    FOR difficulty IN tasks DO
        // find the first group whose last difficulty > difficulty
        idx ← LOWER_BOUND(groups, difficulty)
        IF idx = LENGTH(groups) THEN
            APPEND(groups, difficulty) // start a new group
        ELSE
            groups[idx] ← difficulty // replace top of that group
    RETURN LENGTH(groups)
```

`LOWER_BOUND` finds the first element greater than `difficulty` (binary search). The list `groups` stays sorted, giving O(n log n) time.

---

## Walkthrough

| Step | difficulty | groups before | idx (first > difficulty) | groups after |
|------|------------|---------------|--------------------------|--------------|
| 1    | 1          | []            | 0 (new)                  | [1] |
| 2    | 3          | [1]           | 1 (new)                  | [1,3] |
| 3    | 2          | [1,3]         | 1 (replace 3)           | [1,2] |
| 4    | 4          | [1,2]         | 2 (new)                  | [1,2,4] |
| 5    | 5          | [1,2,4]       | 3 (new)                  | [1,2,4,5] |
Result = 4 groups, which matches the optimal decomposition.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy with binary search | **O(n log n)** | **O(k)** (k = number of groups ≤ n) |

---

## Follow-Up Questions

1. How would the solution change if groups must have equal size?
2. Can you output the actual grouping of tasks, not just the count?
3. What if the difficulty values can be negative or non‑integer?

---

## Key Takeaway

By repeatedly placing each task into the earliest group whose last difficulty exceeds it, we obtain the minimal number of strictly increasing groups, leveraging Dilworth’s theorem.
