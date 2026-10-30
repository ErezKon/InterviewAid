# 2358. Maximum Number of Groups Entering a Competition

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition](https://leetcode.com/problems/maximum-number-of-groups-entering-a-competition)
**Companies:** Google

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

You are given a positive integer array `grades` which represents the grades of students in a university. You would like to enter **all** these students into a competition in **ordered** non-empty groups, such that the ordering meets the following conditions:

- The sum of the grades of students in the `i`th group is **less than** the sum of the grades of students in the `(i + 1)`th group, for all groups (except the last).
- The total number of students in the `i`th group is **less than** the total number of students in the `(i + 1)`th group, for all groups (except the last).

Return *the **maximum** number of groups that can be formed*.

**Constraints:**
- `1 <= grades.length <= 10^5`
- `1 <= grades[i] <= 10^5`

---

## Examples

```
Example 1:
  Input: grades = [10,6,12,7,3,5]
  Output: 3
  Explanation: The following is a possible way to form 3 groups of students:
    - 1st group has the students with grades = [12]. Sum of grades: 12. Student count: 1
    - 2nd group has the students with grades = [6,7]. Sum of grades: 6 + 7 = 13. Student count: 2
    - 3rd group has the students with grades = [10,3,5]. Sum of grades: 10 + 3 + 5 = 18. Student count: 3
    It can be shown that it is not possible to form more than 3 groups.
```

```
Example 2:
  Input: grades = [8,8]
  Output: 1
  Explanation: We can only form 1 group, since forming 2 groups would lead to an equal number of students in both groups.
```

---

## Key Insight

> If we sort grades and greedily assign groups of sizes 1, 2, 3, ..., k, the "strictly more students" condition is automatically met, and since we assign increasing-valued grades to larger groups, the sum condition is also met. We need `1 + 2 + ... + k ≤ n`, i.e., `k(k+1)/2 ≤ n`.

---

## Approach

```
FUNCTION maximumGroups(grades)
    n ← len(grades)
    k ← 0, used ← 0

    WHILE used + (k + 1) ≤ n DO
        k ← k + 1
        used ← used + k

    RETURN k
END FUNCTION
```

Or directly: return `⌊(-1 + √(1 + 8n)) / 2⌋`.

---

## Walkthrough

```
n = 6
```

| k | used (1+2+...+k) | used ≤ 6? |
|---|------------------|-----------|
| 1 | 1                | ✅        |
| 2 | 3                | ✅        |
| 3 | 6                | ✅        |
| 4 | 10               | ❌        |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(√n)** — or O(1) with the formula |
| Space  | **O(1)** |

---

## Follow-Up Questions

1. **Why does sorting guarantee the sum condition?**
   Larger groups get more (and larger) elements, so their sums are strictly greater.

2. **Could we get more groups by uneven splitting?**
   No — the 1,2,3,...,k pattern is optimal because it uses the minimum students per group.

3. **What if we only needed increasing sums (not sizes)?**
   Then we could potentially form more groups — different problem.

---

## Key Takeaway

> **Triangular number bound**: the maximum groups with strictly increasing sizes from n items is the largest k where `k(k+1)/2 ≤ n` — a simple math problem.
