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

Laser beams go between every pair of security devices on two consecutive rows that contain devices (skipping empty rows). Return total beam count.

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
bank = ["011001","000000","010100","001000"]
Output: 8
Explanation: Non‑empty rows have 3, 2, and 1 devices. Beams = 3*2 + 2*1 = 8.
```

**Example 2:**
```
bank = ["000","111","000"]
Output: 0
Explanation: Only one non‑empty row, so no beams.
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

- How would you modify the solution if beams could also be formed between non‑consecutive rows?
- What if the bank is extremely large and stored in a streaming fashion?

---

## Key Takeaway

> **Consecutive non‑empty rows multiply.** Beams = product of device counts between consecutive non‑empty rows. Skip empty rows.
