# 1064. Fixed Point

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/fixed-point](https://leetcode.com/problems/fixed-point)
**Companies:** Uber

---

## Problem Description
Given a sorted array of distinct integers `arr`, a *fixed point* is an index `i` such that `arr[i] == i`. Return any fixed point if it exists, otherwise return `-1`.

## Examples
**Example 1:**
```
Input: arr = [-10, -5, 0, 3, 7]
Output: 3
Explanation: arr[3] == 3, which is a fixed point.
```
**Example 2:**
```
Input: arr = [0, 2, 5, 8, 17]
Output: 0
Explanation: arr[0] == 0.
```
**Example 3:**
```
Input: arr = [-10, -5, 3, 4, 7, 9]
Output: -1
Explanation: No index satisfies arr[i] == i.
```

## Approach
Because the array is sorted and contains distinct values, we can binary search for the fixed point. At each mid, compare `arr[mid]` with `mid`:
- If equal, return `mid`.
- If `arr[mid] < mid`, the fixed point (if any) must be to the right.
- If `arr[mid] > mid`, search left.

```text
FUNCTION findFixedPoint(arr):
    left ← 0
    right ← LENGTH(arr) - 1
    WHILE left ≤ right:
        mid ← (left + right) // 2
        IF arr[mid] == mid:
            RETURN mid
        ELSE IF arr[mid] < mid:
            left ← mid + 1
        ELSE:
            right ← mid - 1
    RETURN -1
```
The algorithm runs in logarithmic time.

## Walkthrough
| left | right | mid | arr[mid] | Comparison | Action |
|------|-------|-----|----------|------------|--------|
| 0    | 5     | 2   | 3        | 3 > 2      | right ← 1 |
| 0    | 1     | 0   | -10      | -10 < 0    | left ← 1 |
| 1    | 1     | 1   | -5       | -5 < 1     | left ← 2 |
| left > right → exit → return -1 |

## Complexity Analysis
- **Time:** `O(log n)` due to binary search.
- **Space:** `O(1)` auxiliary space.

## Follow‑Up Questions
1. How would the solution change if duplicates were allowed?
2. Can you find all fixed points in `O(n)` without extra space?
3. What if the array is not sorted?

## Key Takeaway
Binary search leverages the monotonic relationship between indices and values in a sorted distinct array to locate a fixed point efficiently.
