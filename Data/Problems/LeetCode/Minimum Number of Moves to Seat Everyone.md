# 2037. Minimum Number of Moves to Seat Everyone

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone](https://leetcode.com/problems/minimum-number-of-moves-to-seat-everyone)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description

There are `n` **availabe **seats and `n` students **standing** in a room. You are given an array `seats` of length `n`, where `seats[i]` is the position of the `i^th` seat. You are also given the array `students` of length `n`, where `students[j]` is the position of the `j^th` student.

You may perform the following move any number of times:

- Increase or decrease the position of the `i^th` student by `1` (i.e., moving the `i^th` student from position `x` to `x + 1` or `x - 1`)

Return *the **minimum number of moves** required to move each student to a seat** such that no two students are in the same seat.*

Note that there may be **multiple** seats or students in the **same **position at the beginning.

**Constraints:**
- `n == seats.length == students.length`
- `1 <= n <= 100`
- `1 <= seats[i], students[j] <= 100`

## Examples

**Example 1:**
```
Input: seats = [3,1,5], students = [2,7,4]
Output: 4
Explanation: The students are moved as follows:
- The first student is moved from position 2 to position 1 using 1 move.
- The second student is moved from position 7 to position 5 using 2 moves.
- The third student is moved from position 4 to position 3 using 1 move.
In total, 1 + 2 + 1 = 4 moves were used.
```

**Example 2:**
```
Input: seats = [4,1,5,9], students = [1,3,2,6]
Output: 7
Explanation: The students are moved as follows:
- The first student is not moved.
- The second student is moved from position 3 to position 4 using 1 move.
- The third student is moved from position 2 to position 5 using 3 moves.
- The fourth student is moved from position 6 to position 9 using 3 moves.
In total, 0 + 1 + 3 + 3 = 7 moves were used.
```

**Example 3:**
```
Input: seats = [2,2,6,6], students = [1,3,2,6]
Output: 4
Explanation: Note that there are two seats at position 2 and two seats at position 6.
The students are moved as follows:
- The first student is moved from position 1 to position 2 using 1 move.
- The second student is moved from position 3 to position 6 using 3 moves.
- The third student is not moved.
- The fourth student is not moved.
In total, 1 + 3 + 0 + 0 = 4 moves were used.
```

## Approach

**Algorithm:** Greedy matching after sorting.

1. Sort the `seats` array in non-decreasing order.
2. Sort the `students` array in non-decreasing order.
3. Pair the `i`-th seat with the `i`-th student for all `i` and sum the absolute differences.

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
- **Space:** `O(1)` additional space if sorting in-place; otherwise `O(n)` for the sorted copies.

## Follow-Up Questions

- How would the solution change if moving a student one unit costs a different weight (e.g., based on student speed)?
- What if seats and students are on a circular track instead of a line?
- Can we extend the approach to minimize the maximum individual distance rather than the sum?

## Key Takeaway

Sorting both lists and pairing them index-wise yields the minimal total movement due to the Rearrangement Inequality, providing a simple `O(n log n)` solution.
