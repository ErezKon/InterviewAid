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

Given an array `grades` of `n` students, assign them into groups such that:
- Each student is in exactly one group.
- Groups are ordered: each group has **more students** and a **greater total grade sum** than the previous one.

Return the **maximum number of groups**.

**Constraints:**
- `1 <= grades.length <= 10^5`
- `1 <= grades[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input:  grades = [10, 6, 12, 7, 3, 5]
Output: 3
Explanation: Groups of sizes 1, 2, 3: {3}, {5,6}, {7,10,12}. Each group is larger and has higher sum.
```

**Example 2:**
```
Input:  grades = [8, 8]
Output: 1
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
