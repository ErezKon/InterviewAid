# 2125. Number of Laser Beams in a Bank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-laser-beams-in-a-bank](https://leetcode.com/problems/number-of-laser-beams-in-a-bank)
**Companies:** Amazon, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Count Per Row — O(m·n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Anti-theft security devices are activated inside a bank. You are given a **0-indexed** binary string array `bank` representing the floor plan of the bank, which is an `m x n` 2D matrix. `bank[i]` represents the `i^th` row, consisting of `'0'`s and `'1'`s. `'0'` means the cell is empty, while`'1'` means the cell has a security device.

There is **one** laser beam between any **two** security devices **if both** conditions are met:

- The two devices are located on two **different rows**: `r_1` and `r_2`, where `r_1 < r_2`.
- For **each** row `i` where `r_1 < i < r_2`, there are **no security devices** in the `i^th` row.

Laser beams are independent, i.e., one beam does not interfere nor join with another.

Return *the total number of laser beams in the bank*.

**Constraints:**
- `m == bank.length`
- `n == bank[i].length`
- `1 <= m, n <= 500`
- `bank[i][j]` is either `'0'` or `'1'`.

---

## 2. Approach: Count Per Row — O(m·n) ✅

```
FUNCTION numberOfBeams(bank):
    prev ← 0
    total ← 0
    FOR row IN bank:
        count ← COUNT('1' IN row)
        IF count > 0:
            total ← total + (prev * count)
            prev ← count
    RETURN total
```

---

## Examples

**Example 1:**
```
Input: bank = ["011001","000000","010100","001000"]
Output: 8
Explanation: Between each of the following device pairs, there is one beam. In total, there are 8 beams:
 * bank[0][1] -- bank[2][1]
 * bank[0][1] -- bank[2][3]
 * bank[0][2] -- bank[2][1]
 * bank[0][2] -- bank[2][3]
 * bank[0][5] -- bank[2][1]
 * bank[0][5] -- bank[2][3]
 * bank[2][1] -- bank[3][2]
 * bank[2][3] -- bank[3][2]
Note that there is no beam between any device on the 0^th row with any on the 3^rd row.
This is because the 2^nd row contains security devices, which breaks the second condition.
```

**Example 2:**
```
Input: bank = ["000","111","000"]
Output: 0
Explanation: There does not exist two devices located on two different rows.
```

---

## Walkthrough

1. Row 1: "011001" → 3 devices. `prev = 0`, `total = 0`. Set `prev = 3`.
2. Row 2: "000000" → 0 devices. Skip.
3. Row 3: "010100" → 2 devices. Add `prev * count = 3*2 = 6` → `total = 6`. Set `prev = 2`.
4. Row 4: "001000" → 1 device. Add `prev * count = 2*1 = 2` → `total = 8`. Set `prev = 1`.
Result = 8.

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m·n) |
| **Space** | O(1) |

---

## Follow-Up Questions

- How would you modify the solution if beams could also be formed between non-consecutive rows?
- What if the bank is extremely large and stored in a streaming fashion?

---

## Key Takeaway

> **Consecutive non-empty rows multiply.** Beams = product of device counts between consecutive non-empty rows. Skip empty rows.
