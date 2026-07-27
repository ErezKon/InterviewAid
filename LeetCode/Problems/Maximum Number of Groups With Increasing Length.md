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

Given an array `usageLimits` of length `n`, element `i` can be used at most `usageLimits[i]` times. Form groups of **strictly increasing** sizes (1, 2, 3, ...) where each element in a group is distinct within that group. Return the **maximum number of groups**.

**Constraints:**
- `1 <= usageLimits.length <= 10^5`
- `1 <= usageLimits[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  usageLimits = [1, 2, 5]
Output: 3
Explanation: Groups of size 1, 2, 3. Element 2 (limit 5) fills most spots.
```

**Example 2:**
```
Input:  usageLimits = [2, 1, 2]
Output: 2
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
