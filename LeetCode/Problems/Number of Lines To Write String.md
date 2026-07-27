# 806. Number of Lines To Write String

**Difficulty:** 🟢 Easy

**Companies:** Google, Nvidia

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Simulation — O(n)](#2-approach)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Each character has a given width. Lines hold up to 100 units. Return `[lines, lastLineWidth]`.

---

## 2. Approach: Simulation — O(n) ✅

```
FUNCTION numberOfLines(widths, s):
    lines = 1; width = 0
    FOR c IN s:
        w = widths[ord(c) - ord('a')]
        IF width + w > 100: lines += 1; width = w
        ELSE: width += w
    RETURN [lines, width]
```

---

## 3. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> **Greedy line packing.** Add characters to the current line until overflow, then start a new line.
