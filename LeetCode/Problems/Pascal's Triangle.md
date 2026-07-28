# 118. Pascal's Triangle

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/pascals-triangle](https://leetcode.com/problems/pascals-triangle)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Deutsche Bank, Goldman Sachs, Google, Htc, Infosys, Jpmorgan, Meta, Microsoft, Mitsogo, Tcs, Twitter, Virtusa, Wipro, Zoho

---

## 1. Problem Description

Given `numRows`, generate the first `numRows` rows of Pascal's triangle.

## 2. Examples

| Input | Output |
|-------|--------|
| `5` | `[[1],[1,1],[1,2,1],[1,3,3,1],[1,4,6,4,1]]` |
| `1` | `[[1]]` |
| `0` | `[]` |

## 3. Approach: Iterative — O(n²) ✅

```text
FUNCTION generate(numRows):
    // Initialize triangle with first row
    triangle ← [[1]]

    FOR i ← 1 TO numRows - 1:
        prev ← triangle[i - 1]
        row ← [1]
        FOR j ← 1 TO i - 1:
            SET value ← prev[j - 1] + prev[j]
            row.ADD(value)
        row.ADD(1)
        triangle.ADD(row)

    RETURN triangle
```

## 4. Walkthrough

Generate `numRows = 4`.

1. Start with `triangle = [[1]]`.
2. **i = 1**: `prev = [1]`, `row = [1]`, no inner loop, append `1` → `row = [1,1]`, triangle becomes `[[1],[1,1]]`.
3. **i = 2**: `prev = [1,1]`, `row = [1]`.
   - j = 1: `value = 1+1 = 2`, `row = [1,2]`.
   Append `1` → `row = [1,2,1]`, triangle `[[1],[1,1],[1,2,1]]`.
4. **i = 3**: `prev = [1,2,1]`, `row = [1]`.
   - j = 1: `value = 1+2 = 3`, `row = [1,3]`.
   - j = 2: `value = 2+1 = 3`, `row = [1,3,3]`.
   Append `1` → `row = [1,3,3,1]`, final triangle `[[1],[1,1],[1,2,1],[1,3,3,1]]`.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) where n = numRows | O(n²) to store the triangle |

## 6. Follow-Up Questions

* How would you generate a specific row of Pascal's triangle without building the entire triangle?
* Can you compute each element using combinatorial formula `C(n, k)`?
* How would you modify the algorithm to handle large numbers modulo a prime?

## Key Takeaway

> Build each row iteratively by adding the two numbers above it; the first and last elements of every row are always `1`.
