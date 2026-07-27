# 1536. Minimum Swaps to Arrange a Binary Grid

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid](https://leetcode.com/problems/minimum-swaps-to-arrange-a-binary-grid)
**Companies:** Amazon, Bloomberg

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Greedy Row Swaps — O(n²)](#3-approach-greedy-row-swaps--on²)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an `n × n` binary grid, rearrange rows using adjacent row swaps so all cells **above the main diagonal** are 0. Return minimum swaps, or `-1`.

**Constraints:**
- `1 <= n <= 200`

---

## 2. Key Insight

> For row `i`, we need at least `n - 1 - i` trailing zeros. Compute trailing zeros per row. Then greedily: for each position `i`, find the nearest row below that has enough trailing zeros and bubble it up (counting swaps).

---

## 3. Approach: Greedy Row Swaps — O(n²) ✅

```
FUNCTION minSwaps(grid):
    n = len(grid)
    trailing = [count trailing zeros in row for each row]

    swaps = 0
    FOR i ← 0 TO n - 1:
        need = n - 1 - i
        // Find first row at or below i with trailing[j] >= need
        j = i
        WHILE j < n AND trailing[j] < need: j += 1
        IF j == n: RETURN -1
        // Bubble row j up to position i
        WHILE j > i:
            SWAP trailing[j], trailing[j-1]
            j -= 1
            swaps += 1

    RETURN swaps
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) — bubble sort style |
| **Space** | O(n) — trailing zeros array |

---

## 5. Key Takeaway

> **Reduce to trailing-zero requirements** — each row needs a minimum number of trailing zeros. Greedily find the nearest qualifying row and bubble it up. Selection sort pattern on row properties.
