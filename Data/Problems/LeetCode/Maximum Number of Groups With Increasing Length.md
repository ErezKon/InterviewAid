# 2790. Maximum Number of Groups With Increasing Length

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length](https://leetcode.com/problems/maximum-number-of-groups-with-increasing-length)
**Companies:** Amazon

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

You are given a **0-indexed** array `usageLimits` of length `n`.

Your task is to create **groups** using numbers from `0` to `n - 1`, ensuring that each number, `i`, is used no more than `usageLimits[i]` times in total **across all groups**. You must also satisfy the following conditions:

- Each group must consist of **distinct** numbers, meaning that no duplicate numbers are allowed within a single group.
- Each group (except the first one) must have a length **strictly greater** than the previous group.

Return *an integer denoting the **maximum** number of groups you can create while satisfying these conditions.*

**Constraints:**
- `1 <= usageLimits.length <= 10^5`
- `1 <= usageLimits[i] <= 10^9`

---

## Examples

```
Example 1:
  Input: usageLimits = [1,2,5]
  Output: 3
  Explanation: In this example, we can use 0 at most once, 1 at most twice, and 2 at most five times.
    One way of creating the maximum number of groups while satisfying the conditions is:
    Group 1 contains the number [2].
    Group 2 contains the numbers [1,2].
    Group 3 contains the numbers [0,1,2].
    It can be shown that the maximum number of groups is 3.
    So, the output is 3.
```

```
Example 2:
  Input: usageLimits = [2,1,2]
  Output: 2
  Explanation: In this example, we can use 0 at most twice, 1 at most once, and 2 at most twice.
    One way of creating the maximum number of groups while satisfying the conditions is:
    Group 1 contains the number [0].
    Group 2 contains the numbers [1,2].
    It can be shown that the maximum number of groups is 2.
    So, the output is 2.
```

```
Example 3:
  Input: usageLimits = [1,1]
  Output: 1
  Explanation: In this example, we can use both 0 and 1 at most once.
    One way of creating the maximum number of groups while satisfying the conditions is:
    Group 1 contains the number [0].
    It can be shown that the maximum number of groups is 1.
    So, the output is 1.
```

---

## Key Insight

> Sort `usageLimits`. Greedily build groups of size 1, 2, 3, ... — for group `k`, we need `k` distinct elements. Maintain a running "surplus" of available element uses from sorted limits, and check if each successive group can be satisfied.

---

## Approach

```
FUNCTION maxIncreasingGroups(usageLimits)
    SORT usageLimits
    groups ← 0
    surplus ← 0

    FOR each limit IN usageLimits DO
        surplus ← surplus + limit
        // Next group needs (groups + 1) elements
        IF surplus ≥ groups + 1 THEN
            groups ← groups + 1
            surplus ← surplus - groups

    RETURN groups
END FUNCTION
```

---

## Walkthrough

```
usageLimits = [2, 1, 2]  →  sorted: [1, 2, 2]
```

| Step | limit | surplus before | need (groups+1) | Can form? | groups | surplus after |
|------|-------|---------------|-----------------|-----------|--------|---------------|
| 1    | 1     | 0+1=1         | 1               | 1≥1 ✅   | 1      | 1-1=0         |
| 2    | 2     | 0+2=2         | 2               | 2≥2 ✅   | 2      | 2-2=0         |
| 3    | 2     | 0+2=2         | 3               | 2≥3 ❌   | 2      | 2              |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — constant extra |

---

## Follow-Up Questions

1. **Why sort?**
   Elements with small limits should go first — they constrain early, small groups, freeing high-limit elements for larger groups.

2. **Why does the surplus approach work?**
   It tracks cumulative available "slots" — if at any point we have enough surplus for the next group, we form it.

3. **What if groups didn't need to be strictly increasing?**
   Much easier — just divide total uses by the group size.

---

## Key Takeaway

> **Sort + greedy surplus tracking** — sort usage limits, accumulate surplus, and greedily form groups of increasing size. The surplus carries forward unspent capacity.
