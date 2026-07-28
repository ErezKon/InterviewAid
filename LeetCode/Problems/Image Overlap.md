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

Given two `n × n` binary images, find the maximum overlap after sliding one image over the other (translation only).

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
Explanation: Shifting img1 right by 1 and down by 1 yields three overlapping 1‑cells.
```

**Example 2:**
```
Input: img1 = [[1]], img2 = [[0]]
Output: 0
Explanation: No overlap possible.
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
