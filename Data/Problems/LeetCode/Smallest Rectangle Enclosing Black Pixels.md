# 302. Smallest Rectangle Enclosing Black Pixels

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels)
**Companies:** Google

---

## Problem Description

You are given an `m x n` binary matrix `image` where `0` represents a white pixel and `1` represents a black pixel.

The black pixels are connected (i.e., there is only one black region). Pixels are connected horizontally and vertically.

Given two integers `x` and `y` that represents the location of one of the black pixels, return *the area of the smallest (axis-aligned) rectangle that encloses all black pixels*.

You must write an algorithm with less than `O(mn)` runtime complexity.

**Constraints:**
- `m == image.length`
- `n == image[i].length`
- `1 <= m, n <= 100`
- `image[i][j]` is either `'0'` or `'1'`.
- `0 <= x < m`
- `0 <= y < n`
- `image[x][y] == '1'.`
- The black pixels in the `image` only form **one component**.

## Examples

```
Example 1:
  Input: image = [["0","0","1","0"],["0","1","1","0"],["0","1","0","0"]], x = 0, y = 2
  Output: 6
  Explanation (grid):
    0 0 1 0
    0 1 1 0
    0 1 0 0
    Black pixels span rows 0..2 and columns 1..2 -> area = 3 * 2 = 6.
```

```
Example 2:
  Input: image = [["1"]], x = 0, y = 0
  Output: 1
```

## Approach: Binary Search (or DFS/BFS) [Time: O(M log N + N log M), Space: O(1)]

Since all black pixels are connected, we can find the boundaries of the black pixel region. A simple approach is to use DFS or BFS starting from `(x, y)` to find all black pixels and track the min/max row and column indices. However, this can be slow if the number of black pixels is large.

A more optimal approach uses binary search to find the four boundaries: `top`, `bottom`, `left`, and `right`.

- **To find `left`:** Binary search for the first column (from `0` to `y`) that contains at least one black pixel.
- **To find `right`:** Binary search for the last column (from `y` to `N-1`) that contains at least one black pixel.
- **To find `top`:** Binary search for the first row (from `0` to `x`) that contains at least one black pixel.
- **To find `bottom`:** Binary search for the last row (from `x` to `M-1`) that contains at least one black pixel.

```
FUNCTION smallestRectangleArea(image, x, y):
    M = len(image)
    N = len(image[0])

    // Binary search for the left boundary
    left = search_left(image, 0, y)
    // Binary search for the right boundary
    right = search_right(image, y, N - 1)
    // Binary search for the top boundary
    top = search_top(image, 0, x)
    // Binary search for the bottom boundary
    bottom = search_bottom(image, x, M - 1)

    RETURN (right - left + 1) * (bottom - top + 1)

// Helper for finding the left boundary
FUNCTION search_left(image, low, high):
    boundary = high
    WHILE low <= high:
        mid = low + (high - low) / 2
        IF any_black_in_col(image, mid):
            boundary = mid
            high = mid - 1
        ELSE:
            low = mid + 1
    RETURN boundary

// Similar helpers for right, top, bottom...
```

## Complexity

| | Time | Space |
| :-- | :--- | :--- |
| **DFS/BFS** | O(M * N) | O(M * N) |
| **Binary Search** | O(M log N + N log M) | O(1) |

- The binary search for `left`/`right` boundaries takes `O(log N)` iterations, and in each, we might scan `O(M)` rows. Total: `O(M log N)`.
- Similarly, finding `top`/`bottom` takes `O(N log M)`.

## Follow-up

- What if the black pixels were not guaranteed to be connected? The binary search approach would still work because it only relies on finding the first/last row/column with a black pixel, not on connectivity.
