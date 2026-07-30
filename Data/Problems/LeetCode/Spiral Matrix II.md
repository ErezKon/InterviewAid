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

```text
FUNCTION generateMatrix(n):
    matrix = n×n zeros
    num = 1
    top, bottom, left, right = 0, n-1, 0, n-1
    WHILE top <= bottom AND left <= right:
        FOR c ← left TO right:
            matrix[top][c] = num; num ← num + 1
        top ← top + 1
        FOR r ← top TO bottom:
            matrix[r][right] = num; num ← num + 1
        right ← right - 1
        FOR c ← right DOWN TO left:
            matrix[bottom][c] = num; num ← num + 1
        bottom ← bottom - 1
        FOR r ← bottom DOWN TO top:
            matrix[r][left] = num; num ← num + 1
        left ← left + 1
    RETURN matrix
```

| Time | Space |
|------|-------|
| O(n²) | O(n²) output |

---

## Examples

| Input | Output |
|-------|--------|
| `3` | `[[1,2,3],[8,9,4],[7,6,5]]` |
| `4` | `[[1,2,3,4],[12,13,14,5],[11,16,15,6],[10,9,8,7]]` |

## Walkthrough

Consider `n = 3`:
1. Initialize boundaries: `top=0, bottom=2, left=0, right=2`, `num=1`.
2. Fill top row left→right: positions (0,0)…(0,2) become 1,2,3. Increment `top` to 1.
3. Fill right column top→bottom: positions (1,2)…(2,2) become 4,5. Decrement `right` to 1.
4. Fill bottom row right→left: positions (2,1)…(2,0) become 6,7. Decrement `bottom` to 1.
5. Fill left column bottom→top: position (1,0) becomes 8. Increment `left` to 1.
6. Next layer (`top=1, bottom=1, left=1, right=1`): fill the single cell (1,1) with 9.
Resulting matrix matches the expected output.

## Complexity Analysis

- **Time:** O(n²) – each cell is visited exactly once.
- **Space:** O(n²) for the output matrix; auxiliary space is O(1).

## Follow‑Up Questions

- How would you modify the algorithm to fill the matrix in a counter‑clockwise spiral?
- Can you generate the matrix in‑place for a pre‑allocated `n×n` array without using extra data structures?
- How would you adapt the solution to handle non‑square (m×n) matrices?

---

## Key Takeaway

> Same boundary‑shrinking technique as Spiral Matrix I (#54), but write values instead of reading them.