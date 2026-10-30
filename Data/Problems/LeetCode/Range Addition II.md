# 598. Range Addition II

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/range-addition-ii](https://leetcode.com/problems/range-addition-ii)

**Companies:** Amazon, Ixl
---

## Problem Description
You are given an `m x n` matrix `M` initialized with all `0`'s and an array of operations `ops`, where `ops[i] = [ai, bi]` means `M[x][y]` should be incremented by one for all `0 <= x < ai` and `0 <= y < bi`.

Count and return *the number of maximum integers in the matrix after performing all the operations*.

**Constraints:**

- `1 <= m, n <= 4 * 10⁴`
- `0 <= ops.length <= 10⁴`
- `ops[i].length == 2`
- `1 <= ai <= m`
- `1 <= bi <= n`

## Examples

```
Example 1:
  Input: m = 3, n = 3, ops = [[2,2],[3,3]]
  Output: 4
  Explanation: The maximum integer in M is 2, and there are four of it in M. So return 4.
```

```
Example 2:
  Input: m = 3, n = 3, ops = [[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3],[2,2],[3,3],[3,3],[3,3]]
  Output: 4
```

```
Example 3:
  Input: m = 3, n = 3, ops = []
  Output: 9
```

## Approach
The value of each cell equals the number of operations whose rectangle covers it. The maximum occurs in the intersection of all operation rectangles, i.e., the smallest `a` and smallest `b` across `ops`. Compute these minima and multiply.

```text
FUNCTION maxCount(m, n, ops):
    SET minA ← m
    SET minB ← n
    FOR each op IN ops:
        SET a ← op[0]
        SET b ← op[1]
        SET minA ← MIN(minA, a)
        SET minB ← MIN(minB, b)
    END FOR
    RETURN minA * minB
END FUNCTION
```

## Walkthrough
| Step | Operation | minA | minB |
|------|-----------|------|------|
|Init| – | 3 | 3 |
|[2,2]| minA = MIN(3,2)=2; minB = MIN(3,2)=2 |
|[3,3]| minA = MIN(2,3)=2; minB = MIN(2,3)=2 |
|Result| → 2 × 2 = 4 (maximum value in overlapping region) |

## Complexity Analysis
- Time: O(k) where k = number of operations.
- Space: O(1) additional space.

## Follow‑Up Questions
1. How would you modify the solution for decrement operations?
2. What if each operation adds a different value instead of `1`?
3. Can you extend this to three‑dimensional cuboids?

## Key Takeaway
The maximum value after all range additions is simply the area of the intersection of all operation rectangles, found by tracking the minimum row and column bounds.
