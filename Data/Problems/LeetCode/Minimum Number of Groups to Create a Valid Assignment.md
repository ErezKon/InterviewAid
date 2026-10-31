# 2910. Minimum Number of Groups to Create a Valid Assignment

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-groups-to-create-a-valid-assignment](https://leetcode.com/problems/minimum-number-of-groups-to-create-a-valid-assignment)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below (Dilworth / chains) solves an invented problem. Correct idea: count each value's frequency. Try box sizes `s` from `min(freq)` down to 1. A frequency `c` fits into boxes of size `s` or `s+1` iff `ceil(c/(s+1)) · s ≤ c`. The first `s` that works for every value gives `Σ ceil(c/(s+1))`.*

You are given a collection of numbered `balls` and instructed to sort them into boxes for a nearly balanced distribution. There are two rules you must follow:

- Balls with the same box must have the same value. But, if you have more than one ball with the same number, you can put them in different boxes.
- The biggest box can only have one more ball than the smallest box.

Return the *fewest number of boxes* to sort these balls following these rules.

**Example 1: **

**Input: **  balls = [3,2,3,2,3]

**Output: **  2

**Explanation:**

We can sort `balls` into boxes as follows:

- `[3,3,3]`
- `[2,2]`

The size difference between the two boxes doesn't exceed one.

**Example 2: **

**Input: **  balls = [10,10,10,3,1,1]

**Output: **  4

**Explanation:**

We can sort `balls` into boxes as follows:

- `[10]`
- `[10,10]`
- `[3]`
- `[1,1]`

You can't use fewer than four boxes while still following the rules. For example, putting all three balls numbered 10 in one box would break the rule about the maximum size difference between boxes.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## Examples



---

## Approach

**Greedy – Longest Non-Decreasing Subsequence Count**

The minimum number of groups equals the length of the longest non-increasing subsequence of `tasks`. This follows from Dilworth’s theorem: the size of the smallest chain decomposition equals the size of the largest antichain. We can compute it by iterating through `tasks` and maintaining a list of group tops.

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
3. What if the difficulty values can be negative or non-integer?

---

## Key Takeaway

By repeatedly placing each task into the earliest group whose last difficulty exceeds it, we obtain the minimal number of strictly increasing groups, leveraging Dilworth’s theorem.
