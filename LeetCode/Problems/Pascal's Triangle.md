# 118. Pascal's Triangle

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/pascals-triangle](https://leetcode.com/problems/pascals-triangle)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Deutsche Bank, Goldman Sachs, Google, Htc, Infosys, Jpmorgan, Meta, Microsoft, Mitsogo, Tcs, Twitter, Virtusa, Wipro, Zoho

---

## 1. Problem Description

Given `numRows`, generate the first `numRows` of Pascal's triangle.

---

## 2. Approach: Iterative — O(n²) ✅

```
FUNCTION generate(numRows):
    triangle = [[1]]

    FOR i ← 1 TO numRows - 1:
        prev = triangle[i - 1]
        row = [1]
        FOR j ← 1 TO i - 1:
            row.ADD(prev[j-1] + prev[j])
        row.ADD(1)
        triangle.ADD(row)

    RETURN triangle
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) |

---

## Key Takeaway

> Each element = sum of the two elements above it. First and last elements of each row are 1.
