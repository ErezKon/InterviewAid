# 59. Spiral Matrix II

**Difficulty:** 🟡 Medium
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/spiral-matrix-ii](https://leetcode.com/problems/spiral-matrix-ii)
**Companies:** Adobe, Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft, Tiktok, Zoho

---

## 1. Problem Description

Given a positive integer `n`, generate an `n×n` matrix filled with elements from 1 to n² in spiral order.

---

## 2. Approach: Layer-by-Layer — O(n²) ✅

```
FUNCTION generateMatrix(n):
    matrix = n×n zeros
    num = 1
    top, bottom, left, right = 0, n-1, 0, n-1

    WHILE top <= bottom AND left <= right:
        FOR c ← left TO right:    matrix[top][c] = num++
        top += 1
        FOR r ← top TO bottom:    matrix[r][right] = num++
        right -= 1
        FOR c ← right DOWN TO left:  matrix[bottom][c] = num++
        bottom -= 1
        FOR r ← bottom DOWN TO top:  matrix[r][left] = num++
        left += 1

    RETURN matrix
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) output |

---

## Key Takeaway

> Same boundary-shrinking technique as Spiral Matrix I (#54), but write values instead of reading them.
