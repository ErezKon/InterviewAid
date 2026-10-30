# 2579. Count Total Number of Colored Cells

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-total-number-of-colored-cells](https://leetcode.com/problems/count-total-number-of-colored-cells)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

There exists an infinitely large two-dimensional grid of uncolored unit cells. You are given a positive integer `n`, indicating that you must do the following routine for `n` minutes:

- At the first minute, color **any** arbitrary unit cell blue.
- Every minute thereafter, color blue **every** uncolored cell that touches a blue cell.

(After minutes 1, 2, and 3 the colored region is a diamond of 1, 5, and 13 cells.)

Return *the number of **colored cells** at the end of* `n` *minutes*.

**Constraints:**
- `1 <= n <= 10^5`

---

## Examples

```
Example 1:
  Input: n = 1
  Output: 1
  Explanation: After 1 minute, there is only 1 blue cell, so we return 1.
```

```
Example 2:
  Input: n = 2
  Output: 5
  Explanation: After 2 minutes, there are 4 colored cells on the boundary and 1 in the center, so we return 5.
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