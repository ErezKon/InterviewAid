# 2579. Count Total Number of Colored Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-total-number-of-colored-cells](https://leetcode.com/problems/count-total-number-of-colored-cells)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

After `n` minutes of expanding a diamond pattern on an infinite grid (starting from 1 cell), return the total number of colored cells. Pattern: 1, 5, 13, 25, ...

---

## Examples

**Example 1:**
```
Input: n = 1
Output: 1
Explanation: Only the initial cell is colored.
```

**Example 2:**
```
Input: n = 2
Output: 5
Explanation: After the second minute, the diamond adds 4 new cells around the center.
```

**Example 3:**
```
Input: n = 3
Output: 13
Explanation: Cells added each minute follow 1, 4, 8, ... leading to total 13.
```

---

## Key Insight

The diamond pattern adds `4(n-1)` new cells at each step. Summing: `1 + 4(1 + 2 + ... + (n-1)) = 1 + 4·n(n-1)/2 = 2n² - 2n + 1`.

---

## Approach

```text
FUNCTION coloredCells(n):
    // Direct formula derived from arithmetic series
    RETURN 2 * n * n - 2 * n + 1
```

---

## Walkthrough

Take `n = 4`.
1. Minute 1: cells = 1 (center).
2. Minute 2: add `4·1 = 4` cells → total 5.
3. Minute 3: add `4·2 = 8` cells → total 13.
4. Minute 4: add `4·3 = 12` cells → total 25.
Using formula: `2*4^2 - 2*4 + 1 = 32 - 8 + 1 = 25` matches the step‑by‑step count.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) — constant time arithmetic |
| **Space** | O(1) |

---

## Follow-Up Questions

1. How would the count change if the expansion added `8(i-1)` cells each minute (a larger diamond)?
2. Can you generalize the formula for a 3‑dimensional expansion (octahedron) pattern?
3. What if the grid were finite with obstacles; how would you compute reachable cells?

---

## Key Takeaway

> **Diamond expansion on a grid yields a closed‑form `2n² - 2n + 1` by summing an arithmetic series of added cells per minute.**