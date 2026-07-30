# 302. Smallest Rectangle Enclosing Black Pixels

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels](https://leetcode.com/problems/smallest-rectangle-enclosing-black-pixels)
**Companies:** Google

---

## Problem Description

You are given a 2D binary matrix `image` where `'1'` represents a black pixel and `'0'` represents a white pixel. All the black pixels are connected. You are also given the coordinates `(x, y)` of one of the black pixels. Find the area of the smallest axis-aligned rectangle that encloses all black pixels.

## Examples

- **Input:** `image = ["0010", "0110", "0100"]`, `x = 0`, `y = 2`
  - **Black pixels:** `(0,2), (1,1), (1,2)`.
  - **Bounding box:** `top=0, bottom=1, left=1, right=2`.
  - **Area:** `(bottom - top + 1) * (right - left + 1) = (1-0+1) * (2-1+1) = 2 * 2 = 4`.
  - **Output:** `4`.

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
