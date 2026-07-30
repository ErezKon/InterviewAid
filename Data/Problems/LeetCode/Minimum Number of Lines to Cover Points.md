# 2152. Minimum Number of Lines to Cover Points

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-lines-to-cover-points](https://leetcode.com/problems/minimum-number-of-lines-to-cover-points)
**Companies:** Morgan Stanley

---

## Problem Description

Given an array `points` where each element is a pair `[x, y]` representing a point in the 2‑D plane, determine the minimum number of straight lines required to cover all points. A line covers any number of points that lie on the same straight line.

## Examples

1. **Input:** `points = [[1,1],[2,2],[3,3]]`
   **Output:** `1`
   **Explanation:** All three points are collinear, so a single line suffices.
2. **Input:** `points = [[1,1],[2,2],[3,4]]`
   **Output:** `2`
   **Explanation:** Points `(1,1)` and `(2,2)` share a line; point `(3,4)` requires a second line.

## Approach

**Algorithm:** Greedy removal using a hash set of uncovered points.

1. Insert all points into a set `uncovered`.
2. While `uncovered` is not empty:
   - Remove an arbitrary point `p` from the set.
   - If the set is now empty, increment line count and break.
   - Choose another point `q` from `uncovered` (if any) to define a line.
   - Compute the slope `(dy, dx)` between `p` and `q` in reduced form (divide by `gcd`).
   - Remove from `uncovered` every point that shares this slope with `p` (i.e., lies on the same line).
   - Increment the line counter.
3. Return the total number of lines used.

The greedy choice works because any line covering `p` must include at least one other point; picking any such point yields a maximal line through `p`.

```text
FUNCTION minLines(points):
    uncovered ← SET of all points
    lines ← 0
    WHILE uncovered NOT EMPTY DO
        p ← POP any element FROM uncovered
        IF uncovered IS EMPTY THEN
            lines ← lines + 1
            BREAK
        q ← POP any element FROM uncovered
        // Compute reduced slope
        dy ← q.y - p.y
        dx ← q.x - p.x
        g ← GCD(ABS(dy), ABS(dx))
        dy ← dy / g
        dx ← dx / g
        // Remove all points collinear with p using this slope
        FOR r IN COPY OF uncovered DO
            IF (r.y - p.y) * dx = (r.x - p.x) * dy THEN
                uncovered.REMOVE(r)
        lines ← lines + 1
    RETURN lines
```

## Walkthrough

For `points = [[1,1],[2,2],[3,4]]`:

- Start with `p = (1,1)`, pick `q = (2,2)`, slope = `1/1`.
- Points collinear with this slope: `(1,1)` and `(2,2)` are removed.
- Remaining set `{(3,4)}` → next iteration adds another line.
- Total lines = `2`.

## Complexity Analysis

- **Time:** In the worst case `O(n^2)` because each iteration may scan remaining points to test collinearity.
- **Space:** `O(n)` for the set of points.

## Follow‑Up Questions

- How would you modify the algorithm to return the actual lines (their equations) used?
- Can the problem be solved in `O(n log n)` using hashing of slopes for each pivot point?
- What if points are in 3‑D space and lines become planes?

## Key Takeaway

Repeatedly pick a point, form a line with any other point, and remove all collinear points; the number of such iterations equals the minimal lines needed.
