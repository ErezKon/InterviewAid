# 1183. Maximum Number of Ones

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-ones](https://leetcode.com/problems/maximum-number-of-ones)
**Companies:** Qualcomm

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Consider a matrix `M` with dimensions `width * height`, such that every cell has value `0` or `1`, and any **square** sub-matrix of `M` of size `sideLength * sideLength` has at most `maxOnes` ones.

Return the maximum possible number of ones that the matrix `M` can have.

**Constraints:**
- `1 <= width, height <= 100`
- `1 <= sideLength <= width, height`
- `0 <= maxOnes <= sideLength * sideLength`

---

## Examples

```
Example 1:
  Input: width = 3, height = 3, sideLength = 2, maxOnes = 1
  Output: 4
  Explanation:
    In a 3*3 matrix, no 2*2 sub-matrix can have more than 1 one.
    The best solution that has 4 ones is:
    [1,0,1]
    [0,0,0]
    [1,0,1]
```

```
Example 2:
  Input: width = 3, height = 3, sideLength = 2, maxOnes = 2
  Output: 6
  Explanation:
    [1,0,1]
    [1,0,1]
    [1,0,1]
```

---

## Key Insight

> The matrix is tiled by repeating a `sideLength × sideLength` pattern. Each position `(r % sideLength, c % sideLength)` in the tile contributes to multiple cells. Count how many cells each tile position covers. Place 1s at the `maxOnes` positions with the highest coverage.

---

## Approach

```
FUNCTION maximumNumberOfOnes(width, height, sideLength, maxOnes)
    // For each position in the tile, count how many matrix cells it covers
    counts ← []
    FOR r ← 0 TO sideLength - 1 DO
        FOR c ← 0 TO sideLength - 1 DO
            rowCopies ← CEIL((height - r) / sideLength)
            colCopies ← CEIL((width - c) / sideLength)
            counts.ADD(rowCopies × colCopies)

    SORT counts DESCENDING
    RETURN SUM of first maxOnes elements of counts
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(s² log s²)** — s = sideLength; sort tile positions |
| Space  | **O(s²)** — counts array |

---

## Follow-Up Questions

1. **Why do corner tile positions have more copies?**
   Because the tile pattern repeats, and positions near (0,0) get more full repetitions within the matrix boundaries.

2. **What if maxOnes = sideLength²?**
   Then all positions are 1 → answer = width × height.

---

## Key Takeaway

> **Tiling coverage counting** — compute how many matrix cells each tile position covers, then greedily place 1s at the highest-coverage positions.
