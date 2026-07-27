# 832. Flipping an Image

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/flipping-an-image](https://leetcode.com/problems/flipping-an-image)
**Companies:** Amazon, Bloomberg, Google, Ibm, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Reverse + Invert — O(m·n) ✅](#2-approach-reverse--invert--omn-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Flip each row horizontally, then invert each value (0→1, 1→0).

**Constraints:**
- `1 <= n <= 20`

---

## 2. Approach: Reverse + Invert — O(m·n) ✅

```
FUNCTION flipAndInvertImage(image):
    FOR row IN image:
        row.REVERSE()
        FOR i ← 0 TO len(row) - 1:
            row[i] ^= 1
    RETURN image
```

---

## 3. Key Takeaway

> Reverse each row then XOR with 1 to invert. Can be combined: compare symmetric positions and only change when they're equal.
