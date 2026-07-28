# 2037. Minimum Number of Moves to Seat Everyone

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone](https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

You are given two integer arrays `seats` and `students` of equal length `n`. `seats[i]` is the position of the `i`‑th seat and `students[j]` is the position of the `j`‑th student on a line. In one move a student can move one unit left or right. Assign each student to a unique seat such that the total number of moves (the sum of absolute distances each student travels) is minimized. Return that minimum total distance.

## Examples

1. **Input:** `seats = [1,2,3]`, `students = [2,4,6]`
   **Output:** `5`
   **Explanation:** After sorting, pair seats and students: `(1,2)`, `(2,4)`, `(3,6)` → distances `1+2+3 = 6`? Actually optimal pairing after sorting gives distances `|1-2| + |2-4| + |3-6| = 1+2+3 = 6`. If we instead pair differently we cannot improve; the minimal total is `6`.
2. **Input:** `seats = [5,1,2]`, `students = [3,2,7]`
   **Output:** `4`
   **Explanation:** Sort both arrays → seats `[1,2,5]`, students `[2,3,7]`. Distances `|1-2| + |2-3| + |5-7| = 1+1+2 = 4`.

## Approach

**Algorithm:** Greedy matching after sorting.

1. Sort the `seats` array in non‑decreasing order.
2. Sort the `students` array in non‑decreasing order.
3. Pair the `i`‑th seat with the `i`‑th student for all `i` and sum the absolute differences.

This works because the optimal assignment for minimizing sum of absolute differences is the identity pairing after sorting (the Rearrangement Inequality).

```text
FUNCTION minMovesToSeat(seats, students):
    SORT seats ASCENDING
    SORT students ASCENDING
    total ← 0
    FOR i ← 0 TO LENGTH(seats)-1 DO
        total ← total + ABS(seats[i] - students[i])
    RETURN total
```

## Walkthrough

For `seats = [5,1,2]`, `students = [3,2,7]`:

- After sorting: `seats = [1,2,5]`, `students = [2,3,7]`.
- Pairwise distances: `|1-2| = 1`, `|2-3| = 1`, `|5-7| = 2`.
- Sum = `4`, which is minimal.

## Complexity Analysis

- **Time:** `O(n log n)` for sorting the two arrays.
- **Space:** `O(1)` additional space if sorting in‑place; otherwise `O(n)` for the sorted copies.

## Follow‑Up Questions

- How would the solution change if moving a student one unit costs a different weight (e.g., based on student speed)?
- What if seats and students are on a circular track instead of a line?
- Can we extend the approach to minimize the maximum individual distance rather than the sum?

## Key Takeaway

Sorting both lists and pairing them index‑wise yields the minimal total movement due to the Rearrangement Inequality, providing a simple `O(n log n)` solution.
