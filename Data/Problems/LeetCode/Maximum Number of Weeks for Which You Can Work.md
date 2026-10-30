# 1953. Maximum Number of Weeks for Which You Can Work

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work](https://leetcode.com/problems/maximum-number-of-weeks-for-which-you-can-work)
**Companies:** Amazon, Natwest, Wells Fargo

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

There are `n` projects numbered from `0` to `n - 1`. You are given an integer array `milestones` where each `milestones[i]` denotes the number of milestones the `i`th project has.

You can work on the projects following these two rules:

- Every week, you will finish **exactly one** milestone of **one** project. You **must** work every week.
- You **cannot** work on two milestones from the same project for two **consecutive** weeks.

Once all the milestones of all the projects are finished, or if the only milestones that you can work on will cause you to violate the above rules, you will **stop working**. Note that you may not be able to finish every project's milestones due to these constraints.

Return *the **maximum** number of weeks you would be able to work on the projects without violating the rules mentioned above*.

**Constraints:**
- `n == milestones.length`
- `1 <= n <= 10^5`
- `1 <= milestones[i] <= 10^9`

---

## Examples

```
Example 1:
  Input: milestones = [1,2,3]
  Output: 6
  Explanation: One possible scenario is:
    - During the 1st week, you will work on a milestone of project 0.
    - During the 2nd week, you will work on a milestone of project 2.
    - During the 3rd week, you will work on a milestone of project 1.
    - During the 4th week, you will work on a milestone of project 2.
    - During the 5th week, you will work on a milestone of project 1.
    - During the 6th week, you will work on a milestone of project 2.
    The total number of weeks is 6.
```

```
Example 2:
  Input: milestones = [5,2,1]
  Output: 7
  Explanation: One possible scenario is:
    - During the 1st week, you will work on a milestone of project 0.
    - During the 2nd week, you will work on a milestone of project 1.
    - During the 3rd week, you will work on a milestone of project 0.
    - During the 4th week, you will work on a milestone of project 1.
    - During the 5th week, you will work on a milestone of project 0.
    - During the 6th week, you will work on a milestone of project 2.
    - During the 7th week, you will work on a milestone of project 0.
    The total number of weeks is 7.
    Note that you cannot work on the last milestone of project 0 on 8th week because it would violate the rules.
    Thus, one milestone in project 0 will remain unfinished.
```

---

## Key Insight

> If the largest project doesn't dominate, we can complete everything (`total`). If it does dominate (more than all others + 1), we're limited to `2 × rest + 1` — interleave the max project with all others.

---

## Approach

```
FUNCTION numberOfWeeks(milestones)
    total ← SUM(milestones)
    maxM ← MAX(milestones)
    rest ← total - maxM

    IF maxM > rest + 1 THEN
        RETURN 2 × rest + 1
    RETURN total
END FUNCTION
```

---

## Walkthrough

```
milestones = [5, 2, 1]
total = 8, maxM = 5, rest = 3
maxM (5) > rest + 1 (4) → RETURN 2 × 3 + 1 = 7
```

Schedule: P0, P1, P0, P2, P0, P1, P0 = 7 weeks ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — sum and max |
| Space  | **O(1)** — constant |

---

## Follow-Up Questions

1. **Why is the threshold `rest + 1`?**
   If maxM ≤ rest + 1, we can always interleave. If maxM exceeds that, the max project has leftover milestones that can't be scheduled.

2. **How does this relate to task scheduling?**
   Same "dominant task" pattern — if one task dominates, idle slots appear.

---

## Key Takeaway

> **Dominant task check** — if the largest project exceeds all others combined + 1, the answer is `2 × rest + 1`. Otherwise, complete everything. O(n) and O(1) solution.
