# 1975. Maximum Matrix Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-matrix-sum](https://leetcode.com/problems/maximum-matrix-sum)
**Companies:** Amazon, Bloomberg, Google, Honeywell, Meta, Microsoft

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

You are given an `n × n` integer matrix. You can perform the following operation any number of times: choose two **adjacent** elements and **multiply both by -1**.

Return the **maximum sum** of the matrix's elements.

**Constraints:**
- `n == matrix.length == matrix[i].length`
- `2 <= n <= 250`
- `-10^5 <= matrix[i][j] <= 10^5`

---

## Examples

**Example 1:**
```
Input:  matrix = [[1,-1],[-1,1]]
Output: 4
Explanation: Flip (-1,1) in row 0 → [[1,1],[-1,1]], then flip (-1,1) in col 0 → [[1,1],[1,1]]. Sum = 4.
```

**Example 2:**
```
Input:  matrix = [[1,2,3],[-1,-2,-3],[1,2,3]]
Output: 16
```

---

## Key Insight

> Each operation flips two adjacent elements' signs. By chaining operations, you can **move a negative sign** to any cell. Therefore:
> - If there's an **even** number of negatives → make all positive.
> - If **odd** → one element must stay negative; choose the one with **smallest absolute value**.

---

## Approach

```
FUNCTION maxMatrixSum(matrix)
    totalAbs ← 0
    minAbs ← INFINITY
    negCount ← 0

    FOR each row IN matrix DO
        FOR each val IN row DO
            totalAbs ← totalAbs + ABS(val)
            minAbs ← MIN(minAbs, ABS(val))
            IF val < 0 THEN negCount ← negCount + 1

    IF negCount MOD 2 = 0 THEN
        RETURN totalAbs
    ELSE
        RETURN totalAbs - 2 * minAbs
END FUNCTION
```

**Why `- 2 * minAbs`?** We included `|minVal|` in `totalAbs`. Making it negative means subtracting it twice (once to remove the positive contribution, once for the negative).

---

## Walkthrough

```
matrix = [[1, -1],
          [-1, 1]]
```

| Cell   | val | |val| | neg? |
|--------|-----|------|------|
| (0,0)  | 1   | 1    | No   |
| (0,1)  | -1  | 1    | Yes  |
| (1,0)  | -1  | 1    | Yes  |
| (1,1)  | 1   | 1    | No   |

- `totalAbs = 4`, `minAbs = 1`, `negCount = 2` (even)
- Return `totalAbs = 4` ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n²)** — scan every element once |
| Space  | **O(1)** — three tracking variables |

---

## Follow-Up Questions

1. **Why can we move negatives freely?**
   Flipping two adjacent elements is like "pushing" the negative sign one step. By chaining, we can route it anywhere.

2. **What if the matrix contains zeros?**
   A zero absorbs a negative sign (0 × -1 = 0). If there's a zero, effectively all negatives can be eliminated → `negCount` becomes even.

3. **What if we could only flip along rows (not columns)?**
   Then we'd need to handle each row independently — different problem.

4. **How does this relate to "Maximum of Absolute Value Expression"?**
   Different problem family. This one is about sign manipulation, not distance optimization.

---

## Key Takeaway

> **Parity of negatives determines the answer**: adjacent flips let you move negatives anywhere, so the only question is whether you have an even or odd count — if odd, sacrifice the smallest absolute value.
