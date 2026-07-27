# 1424. Diagonal Traverse II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/diagonal-traverse-ii](https://leetcode.com/problems/diagonal-traverse-ii)
**Companies:** Amazon, Bp, Google, Liftoff, Meta

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Group by Diagonal Index](#approach-group-by-diagonal-index)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 2D integer array `nums` (a list of lists, possibly **jagged** — rows may have different lengths), return all elements in **diagonal order**.

Diagonals go from bottom-left to top-right. The traversal visits diagonals in order of increasing `r + c` sum. Within each diagonal, elements are listed from bottom-left to top-right (i.e., higher row first).

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i].length <= 10^5`
- Total elements ≤ 10^5
- `1 <= nums[i][j] <= 10^9`

---

## Examples

**Example 1:**
```
nums = [[1,2,3],
        [4,5,6],
        [7,8,9]]

Output: [1, 4, 2, 7, 5, 3, 8, 6, 9]

Diagonals (r+c):
  0: [1]         → [1]
  1: [2, 4]      → [4, 2]     (reversed)
  2: [3, 5, 7]   → [7, 5, 3]  (reversed)
  3: [6, 8]      → [8, 6]
  4: [9]         → [9]
```

**Example 2 (jagged):**
```
nums = [[1,2,3,4,5],
        [6,7],
        [8],
        [9,10,11],
        [12,13,14,15,16]]

Output: [1, 6, 2, 8, 7, 3, 9, 4, 12, 10, 5, 13, 11, 14, 15, 16]
```

---

## Key Insight

> All cells on the same diagonal satisfy `r + c = constant`. Group elements by `r + c`, then within each group, reverse the order (because we added top-to-bottom but need bottom-to-top). Since rows can have different lengths, this handles jagged arrays naturally.

---

## Approach: Group by Diagonal Index ✅

Group by r+c (diagonal index). Within each diagonal, bottom-left comes first (reverse row order).

```
FUNCTION findDiagonalOrder(nums):
    diags = defaultdict(list)
    FOR r ← 0 TO len(nums) - 1:
        FOR c ← 0 TO len(nums[r]) - 1:
            diags[r + c].ADD(nums[r][c])

    result = []
    FOR key IN sorted(diags.keys()):
        result.extend(reversed(diags[key]))
    RETURN result
```

---

## Walkthrough

```
nums = [[1,2,3],[4,5,6],[7,8,9]]
```

| Cell (r,c) | r+c | Value |
|------------|-----|-------|
| (0,0) | 0 | 1 |
| (0,1) | 1 | 2 |
| (0,2) | 2 | 3 |
| (1,0) | 1 | 4 |
| (1,1) | 2 | 5 |
| (1,2) | 3 | 6 |
| (2,0) | 2 | 7 |
| (2,1) | 3 | 8 |
| (2,2) | 4 | 9 |

Groups (before reverse): `{0:[1], 1:[2,4], 2:[3,5,7], 3:[6,8], 4:[9]}`

After reversing each: `{0:[1], 1:[4,2], 2:[7,5,3], 3:[8,6], 4:[9]}`

Result: `[1, 4, 2, 7, 5, 3, 8, 6, 9]` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(N) | N = total elements; iterate all + sort diag keys (at most O(N) keys) |
| **Space** | O(N) | Store all elements in diagonal groups |

---

## Follow-Up Questions

**Q1: How is this different from LeetCode 498 (Diagonal Traverse)?**
> LC 498 alternates direction (up-right then down-left) on a rectangular matrix. LC 1424 always goes bottom-left → top-right on a possibly jagged array.

**Q2: Can you avoid sorting the diagonal keys?**
> Yes — since `r` is iterated 0..m-1, the maximum key is `r + len(nums[r]) - 1`. You can iterate keys 0 to max in order. Or use the fact that keys are naturally bounded.

**Q3: What if you need top-right → bottom-left order?**
> Don't reverse the groups — use them as-is.

---

## Key Takeaway

> **Cells sharing the same `r + c` value lie on the same anti-diagonal — group by this sum to solve any diagonal traversal problem on rectangular or jagged grids.**
