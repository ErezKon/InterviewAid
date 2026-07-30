# 806. Number of Lines To Write String

**Difficulty:** 🟢 Easy
**Companies:** Google, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Simulation — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Each character has a given width. Lines hold up to 100 units. Return `[lines, lastLineWidth]`.

---

## 2. Examples

**Example 1:**
```
widths = [10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10,10]
s = "abcdefghijklmnopqrstuvwxyz"
Output: [3, 60]
Explanation: Each line can hold 10 characters (10*10=100). 26 letters need 3 lines: 10+10+6 characters.
```

**Example 2:**
```
widths = [4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2,2,4,2]
s = "abcdefghijklmnopqrstuvwxyz"
Output: [2, 50]
Explanation: With smaller widths, 26 letters fit into 2 lines.
```

---

## 3. Approach: Simulation — O(n) ✅

```
FUNCTION numberOfLines(widths, s):
    lines ← 1
    curWidth ← 0
    FOR ch IN s:
        w ← widths[ORD(ch) - ORD('a')]
        IF curWidth + w > 100:
            lines ← lines + 1
            curWidth ← w
        ELSE:
            curWidth ← curWidth + w
    RETURN [lines, curWidth]
```

---

## 4. Walkthrough

Take the first example where each character width is 10.
| Step | Character | curWidth before | w | Action | lines | curWidth after |
|------|-----------|----------------|---|--------|-------|----------------|
| 1 | a | 0 | 10 | add | 1 | 10 |
| … | … | … | … | … | … | … |
| 10 | j | 90 | 10 | add → 100 | 1 | 100 |
| 11 | k | 100 | 10 | overflow → new line | 2 | 10 |
| … | … | … | … | … | … | … |
After processing all 26 letters, we end with 3 lines and the last line width 60.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would the solution change if the maximum line width were not fixed but given as an input?
- Can you extend the algorithm to also return the actual text layout per line?

---

## 7. Key Takeaway

> **Greedy line packing.** Add characters to the current line until overflow, then start a new line.
