# 1901. Find a Peak Element II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-a-peak-element-ii](https://leetcode.com/problems/find-a-peak-element-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Uber, Xing

---

## Problem Description

A **peak** element in a 2D grid is an element that is **strictly greater** than all of its **adjacent **neighbors to the left, right, top, and bottom.

Given a **0-indexed** `m x n` matrix `mat` where **no two adjacent cells are equal**, find **any** peak element `mat[i][j]` and return *the length 2 array *`[i,j]`.

You may assume that the entire matrix is surrounded by an **outer perimeter** with the value `-1` in each cell.

You must write an algorithm that runs in `O(m log(n))` or `O(n log(m))` time.

**Constraints:**
- `m == mat.length`
- `n == mat[i].length`
- `1 <= m, n <= 500`
- `1 <= mat[i][j] <= 10^5`
- No two adjacent cells are equal.

## Examples

**Example 1:**
```
Input: mat = [[1,4],[3,2]]
Output: [0,1]
Explanation: Both 3 and 4 are peak elements so [1,0] and [0,1] are both acceptable answers.
```

**Example 2:**
```
![img](https://assets.leetcode.com/uploads/2021/06/07/3.png)
Input: mat = [[10,20,15],[21,30,14],[7,16,32]]
Output: [1,1]
Explanation: Both 30 and 32 are peak elements so [1,1] and [2,2] are both acceptable answers.
```

## Approach
Use binary search on rows (or columns). For the middle row, find the column index of the maximum element. Compare this element with the element directly above and below. If it is larger than both, it is a peak. Otherwise move the search interval towards the larger neighbor.

```text
FUNCTION FindPeak(mat):
    SET rows ← NUMBER_OF_ROWS(mat)
    SET cols ← NUMBER_OF_COLUMNS(mat)
    SET lo ← 0
    SET hi ← rows - 1
    WHILE lo ≤ hi:
        SET mid ← (lo + hi) / 2
        // Find column of max element in mid row
        SET maxCol ← 0
        FOR c FROM 1 TO cols-1:
            IF mat[mid][c] > mat[mid][maxCol]:
                SET maxCol ← c
        // Neighbors above and below (use -∞ if out of bounds)
        SET above ← IF mid > 0 THEN mat[mid-1][maxCol] ELSE -∞
        SET below ← IF mid < rows-1 THEN mat[mid+1][maxCol] ELSE -∞
        IF mat[mid][maxCol] > above AND mat[mid][maxCol] > below:
            RETURN [mid, maxCol]
        ELSE IF above > mat[mid][maxCol]:
            SET hi ← mid - 1
        ELSE:
            SET lo ← mid + 1
    END WHILE
    RETURN [] // should never reach
```

## Walkthrough
| Step | mid row | maxCol | above | below | Action |
|------|---------|--------|-------|-------|--------|
| 1 | 1 (rows 0-2) | 1 (value 30) | 20 | 16 | 30 > both → peak found |

## Complexity Analysis
- **Time:** O(m log n) if binary search on rows and linear scan for column max, or O(n log m) vice-versa. Here O(m log n).
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you adapt the algorithm to run in O(log m * log n) using a 2-D binary search?
- Can the method be extended to find **all** peaks?
- What changes are needed if the matrix is not sorted but only guarantees that a peak exists?

## Key Takeaway
Binary search on one dimension combined with a linear scan for the row’s maximum quickly narrows down to a peak, achieving logarithmic time in one dimension.
