# 832. Flipping an Image

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/flipping-an-image](https://leetcode.com/problems/flipping-an-image)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Reverse + Invert — O(m·n) ✅](#2-approach-reverse--invert--omn-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Key Takeaway](#6-key-takeaway)

---

## 1. Problem Description

Flip each row horizontally, then invert each value (0→1, 1→0).

**Constraints:**
- `1 <= n <= 20`

---

## 2. Approach: Reverse + Invert — O(m·n) ✅

```text
FUNCTION flipAndInvertImage(image):
    FOR row IN image:
        // reverse the row in‑place
        row.REVERSE()
        // invert each bit
        FOR i ← 0 TO len(row) - 1:
            row[i] ← 1 - row[i]
    RETURN image
```

---

## 3. Examples

**Example 1:**
```
Input: image = [[1,1,0],[1,0,1],[0,0,0]]
Output: [[1,0,0],[0,1,0],[1,1,1]]
Explanation:
- Row 1 reversed → [0,1,1], inverted → [1,0,0]
- Row 2 reversed → [1,0,1], inverted → [0,1,0]
- Row 3 reversed → [0,0,0], inverted → [1,1,1]
```

**Example 2:**
```
Input: image = [[0,1],[1,0]]
Output: [[1,0],[0,1]]
```

---

## 4. Walkthrough

| Step | Row before | Action | Row after |
|------|------------|--------|-----------|
| 1 | [1,1,0] | reverse → [0,1,1]; invert → [1,0,0] | [1,0,0] |
| 2 | [1,0,1] | reverse → [1,0,1]; invert → [0,1,0] | [0,1,0] |
| 3 | [0,0,0] | reverse → [0,0,0]; invert → [1,1,1] | [1,1,1] |

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m·n) – each element is visited once |
| **Space** | O(1) extra – modifications are in‑place |

---

## 6. Key Takeaway

> Reverse each row then invert bits. In‑place operations give O(m·n) time and O(1) extra space.
