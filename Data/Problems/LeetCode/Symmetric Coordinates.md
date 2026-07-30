# 2978. Symmetric Coordinates

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/symmetric-coordinates](https://leetcode.com/problems/symmetric-coordinates)
**Companies:** Mitsogo

---

## Problem Description
Given an array of integer coordinate pairs `points`, a line `x = k` is called a line of symmetry if for every point `(x, y)` in the set there exists another point `(2*k - x, y)` also in the set. Determine whether such a line of symmetry exists for the given points.

## Examples
**Example 1**
```
Input: points = [[1,1],[-1,1]]
Output: true
Explanation: The line x = 0 is a symmetry line.
```
**Example 2**
```
Input: points = [[1,2],[2,2],[3,2]]
Output: false
Explanation: No vertical line can reflect all points.
```

## Approach
Compute the candidate symmetry line as the average of the minimum and maximum x‑coordinates. Then verify that for each point its mirrored counterpart exists using a hash set of encoded points.

```text
FUNCTION hasSymmetry(points):
    SET minX ← +∞, maxX ← -∞
    FOR each (x, y) IN points:
        SET minX ← MIN(minX, x)
        SET maxX ← MAX(maxX, x)
    SET line ← (minX + maxX) / 2   // candidate k
    CREATE set ← empty hash set
    FOR each (x, y) IN points:
        ADD (x, y) TO set   // encode as string "x#y"
    FOR each (x, y) IN points:
        SET mirrorX ← 2*line - x
        IF (mirrorX, y) NOT IN set:
            RETURN false
    RETURN true
```

## Walkthrough
For `points = [[1,1],[-1,1]]`:
- `minX = -1`, `maxX = 1` → `line = 0`.
- Set contains `{(1,1), (-1,1)}`.
- Mirror of `(1,1)` is `(-1,1)` → present.
- Mirror of `(-1,1)` is `(1,1)` → present.
- All checks pass → return `true`.

## Complexity Analysis
- **Time:** O(n) – one pass to find min/max and another to verify.
- **Space:** O(n) – hash set storing all points.

## Follow‑Up Questions
1. How would you handle symmetry about a horizontal line `y = k`?
2. Can the algorithm be extended to check for diagonal symmetry?
3. What changes if the input size is huge and cannot fit into memory?

## Key Takeaway
The symmetry line is uniquely determined by the extreme x‑coordinates; verifying mirrored points with a hash set yields an O(n) solution.
