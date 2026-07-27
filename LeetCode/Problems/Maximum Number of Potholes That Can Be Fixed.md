# 3119. Maximum Number of Potholes That Can Be Fixed

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-potholes-that-can-be-fixed](https://leetcode.com/problems/maximum-number-of-potholes-that-can-be-fixed)
**Companies:** Geico, Microsoft

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

Given a road string where `'x'` is a pothole and `'.'` is smooth, and a `budget`, fixing a contiguous group of `k` potholes costs `k + 1` (includes setup cost of 1). Return the **maximum number of potholes** that can be fixed within the budget.

**Constraints:**
- `1 <= road.length <= 10^5`
- `1 <= budget <= road.length + 1`

---

## Examples

**Example 1:**
```
Input:  road = "..xxxxx", budget = 4
Output: 3
Explanation: Fix 3 potholes from the group of 5 (cost = 3+1=4).
```

---

## Key Insight

> Extract contiguous groups of potholes. Fixing a group of size `k` costs `k+1`. To maximize potholes fixed, prioritize **larger groups** (better ratio of potholes per budget unit). Sort groups descending and greedily fix as many as the budget allows.

---

## Approach

```
FUNCTION maxPotholes(road, budget)
    // Extract group sizes
    groups ← sizes of consecutive 'x' runs
    SORT groups DESCENDING

    fixed ← 0
    FOR each size IN groups DO
        cost ← size + 1
        IF budget ≥ cost THEN
            fixed ← fixed + size
            budget ← budget - cost
        ELSE
            // Partial fix: use remaining budget - 1 for setup
            canFix ← MAX(0, budget - 1)
            fixed ← fixed + canFix
            BREAK

    RETURN fixed
END FUNCTION
```

---

## Walkthrough

```
road = "..xxxxx", budget = 4
groups = [5]  (one group of 5 potholes)
```

- Group of 5: cost = 6 > 4. Partial: canFix = 4-1 = 3.
- **Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — extract groups + sort |
| Space  | **O(n)** — groups array |

---

## Follow-Up Questions

1. **Why prioritize larger groups?**
   Each group has a fixed setup cost of 1. Larger groups amortize this cost better (more potholes per unit).

2. **What if setup cost were 0?**
   Then order doesn't matter — just fix potholes until budget runs out.

---

## Key Takeaway

> **Greedy with amortized setup costs** — sort pothole groups by size descending, fix largest groups first to minimize per-pothole overhead from the fixed setup cost.
