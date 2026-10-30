# 835. Image Overlap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/image-overlap](https://leetcode.com/problems/image-overlap)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Count Translation Vectors — O(n⁴) ✅](#3-approach-count-translation-vectors)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

You are given two images, `img1` and `img2`, represented as binary, square matrices of size `n x n`. A binary matrix has only `0`s and `1`s as values.

We **translate** one image however we choose by sliding all the `1` bits left, right, up, and/or down any number of units. We then place it on top of the other image. We can then calculate the **overlap** by counting the number of positions that have a `1` in **both** images.

Note also that a translation does **not** include any kind of rotation. Any `1` bits that are translated outside of the matrix borders are erased.

Return *the largest possible overlap*.

**Constraints:**
- `n == img1.length == img1[i].length`
- `n == img2.length == img2[i].length`
- `1 <= n <= 30`
- `img1[i][j]` is either `0` or `1`.
- `img2[i][j]` is either `0` or `1`.

---

## 2. Key Insight

> For each pair of 1-cells (one from each image), compute the translation vector `(dx, dy)`. The most frequent vector gives the maximum overlap.

---

## 3. Approach: Count Translation Vectors — O(n⁴) ✅

```text
FUNCTION largestOverlap(img1, img2):
    // Collect coordinates of 1‑cells in both images
    ones1 ← []
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            IF img1[r][c] = 1:
                APPEND (r, c) TO ones1
    ones2 ← []
    FOR r ← 0 TO n-1:
        FOR c ← 0 TO n-1:
            IF img2[r][c] = 1:
                APPEND (r, c) TO ones2
    // Count translation vectors between every pair of 1‑cells
    vectorCount ← {}
    FOR (r1, c1) IN ones1:
        FOR (r2, c2) IN ones2:
            dx ← r1 - r2
            dy ← c1 - c2
            IF (dx, dy) NOT IN vectorCount:
                SET vectorCount[(dx, dy)] ← 0
            SET vectorCount[(dx, dy)] ← vectorCount[(dx, dy)] + 1
    // The most common vector yields the max overlap
    maxOverlap ← 0
    FOR count IN vectorCount VALUES:
        IF count > maxOverlap:
            SET maxOverlap ← count
    RETURN maxOverlap
```

---

## 5. Examples

**Example 1:**
```
Input: img1 = [[1,1,0],[0,1,0],[0,1,0]], img2 = [[0,0,0],[0,1,1],[0,0,1]]
Output: 3
Explanation: We translate img1 to right by 1 unit and down by 1 unit.
The number of positions that have a 1 in both images is 3 (shown in red).
```

**Example 2:**
```
Input: img1 = [[1]], img2 = [[1]]
Output: 1
```

**Example 3:**
```
Input: img1 = [[0]], img2 = [[0]]
Output: 0
```

---

## 6. Walkthrough

Consider Example 1.

1. `ones1` = {(0,0),(0,1),(1,1),(2,1)}
2. `ones2` = {(1,1),(1,2),(2,2)}
3. Compute translation vectors for each pair; the vector (‑1,‑1) appears three times, which is the highest frequency.
4. Hence the maximum overlap is 3.

---

## 7. Complexity Analysis

- **Time:** Collecting 1‑cells is O(n²). Counting vectors iterates over |ones1|·|ones2| pairs, worst‑case O(n⁴) when the matrix is all 1s.
- **Space:** Storing the vectors map uses O(k) where k is the number of distinct vectors, at most O(n²).

---

## 8. Follow‑Up Questions

- How can you improve the runtime using convolution (FFT) for large dense images?
- What changes if rotations are allowed in addition to translations?
- Can you adapt the algorithm to work with non‑square matrices?

---

## Key Takeaway

> Counting translation vectors between pairs of 1‑cells and selecting the most frequent vector yields the maximum possible overlap.
