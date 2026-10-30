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

You are given a string `road`, consisting only of characters `"x"` and `"."`, where each `"x"` denotes a *pothole* and each `"."` denotes a smooth road, and an integer `budget`.

In one repair operation, you can repair `n` **consecutive** potholes for a price of `n + 1`.

Return the **maximum** number of potholes that can be fixed such that the sum of the prices of all of the fixes **doesn't go over** the given budget.

**Constraints:**
- `1 <= road.length <= 10^5`
- `1 <= budget <= 10^5 + 1`
- `road` consists only of characters `'.'` and `'x'`.

---

## Examples

```
Example 1:
  Input: road = "..", budget = 5
  Output: 0
  Explanation: There are no potholes to be fixed.
```

```
Example 2:
  Input: road = "..xxxxx", budget = 4
  Output: 3
  Explanation: We fix the first three potholes (they are consecutive). The budget needed for this task is 3 + 1 = 4.
```

```
Example 3:
  Input: road = "x.x.xxx...x", budget = 14
  Output: 6
  Explanation: We can fix all the potholes. The total cost would be (1 + 1) + (1 + 1) + (3 + 1) + (1 + 1) = 10 which is within our budget of 14.
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
