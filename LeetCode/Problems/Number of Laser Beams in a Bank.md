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
    prev = 0; total = 0
    FOR row IN bank:
        count = row.count('1')
        IF count > 0:
            total += prev * count
            prev = count
    RETURN total
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(m · n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Consecutive non-empty rows multiply.** Beams = product of device counts between consecutive non-empty rows. Skip empty rows.
