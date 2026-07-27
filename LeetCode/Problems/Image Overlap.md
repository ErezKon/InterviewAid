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

```
FUNCTION largestOverlap(img1, img2):
    ones1 ← [(r, c) for r, c where img1[r][c] == 1]
    ones2 ← [(r, c) for r, c where img2[r][c] == 1]
    count ← Counter()
    FOR (r1, c1) IN ones1 DO
        FOR (r2, c2) IN ones2 DO
            count[(r1-r2, c1-c2)] += 1
    RETURN MAX(count.values()) or 0
```

---

## 4. Key Takeaway

> Instead of trying all translations, count translation vectors between pairs of 1-cells. Most frequent vector = max overlap. O(A² + B²) where A,B = number of 1s.
