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

Given an array `milestones` where `milestones[i]` is the number of milestones for project `i`, you work one milestone per week and **cannot work on the same project two consecutive weeks**. Return the **maximum number of weeks** you can work.

**Constraints:**
- `1 <= milestones.length <= 10^5`
- `1 <= milestones[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  milestones = [1, 2, 3]
Output: 6
Explanation: All milestones can be completed (interleave projects).
```

**Example 2:**
```
Input:  milestones = [5, 2, 1]
Output: 7
Explanation: Max project has 5 milestones but rest = 3. Can only do 2×3+1 = 7.
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
