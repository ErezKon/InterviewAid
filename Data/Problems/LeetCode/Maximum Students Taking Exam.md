# 1349. Maximum Students Taking Exam

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-students-taking-exam](https://leetcode.com/problems/maximum-students-taking-exam)
**Companies:** Google, Microsoft, Sap

---

## Problem Description

Given a `m * n` matrix `seats`  that represent seats distributions in a classroom. If a seat is broken, it is denoted by `'#'` character otherwise it is denoted by a `'.'` character.

Students can see the answers of those sitting next to the left, right, upper left and upper right, but he cannot see the answers of the student sitting directly in front or behind him. Return the **maximum **number of students that can take the exam together without any cheating being possible.

Students must be placed in seats in good condition.

**Constraints:**
- `seats` contains only characters `'.' and``'#'.`
- `m == seats.length`
- `n == seats[i].length`
- `1 <= m <= 8`
- `1 <= n <= 8`

## Examples

**Example 1:**
```
Input: seats = [["#",".","#","#",".","#"],
                [".","#","#","#","#","."],
                ["#",".","#","#",".","#"]]
Output: 4
Explanation: Teacher can place 4 students in available seats so they don't cheat on the exam.
```

**Example 2:**
```
Input: seats = [[".","#"],
                ["#","#"],
                ["#","."],
                ["#","#"],
                [".","#"]]
Output: 3
Explanation: Place all students in available seats.
```

**Example 3:**
```
Input: seats = [["#",".",".",".","#"],
                [".","#",".","#","."],
                [".",".","#",".","."],
                [".","#",".","#","."],
                ["#",".",".",".","#"]]
Output: 10
Explanation: Place students in available seats in column 1, 3 and 5.
```

## Approach
The problem is a classic **bitmask DP** over rows.
1. For each row, generate all valid seat masks: bits set only on functional seats (`1` in `seats`) and with no adjacent `1`s (students cannot sit side-by-side).
2. Use DP where `dp[row][mask]` stores the maximum students up to `row` with current row configuration `mask`.
3. Transition: for each `prevMask` from the previous row, ensure no cheating diagonally: `(mask << 1) & prevMask == 0` and `(mask >> 1) & prevMask == 0`.
4. Update `dp[row][mask] = max(dp[row][mask], dp[row-1][prevMask] + popcount(mask))`.
The answer is the maximum value in the last row's DP.

```text
FUNCTION maxStudents(seats):
    m ← ROW_COUNT(seats)
    n ← COL_COUNT(seats)
    validMasks ← LIST_OF_LISTS(m)
    FOR r ← 0 TO m-1:
        FOR mask ← 0 TO (1 << n) - 1:
            IF isValidMask(mask, seats[r]):
                APPEND(validMasks[r], mask)
    dpPrev ← MAP_DEFAULT(0)
    FOR mask IN validMasks[0]:
        dpPrev[mask] ← POPCOUNT(mask)
    FOR r ← 1 TO m-1:
        dpCurr ← MAP_DEFAULT(0)
        FOR mask IN validMasks[r]:
            FOR prevMask IN validMasks[r-1]:
                IF (mask << 1) & prevMask = 0 AND (mask >> 1) & prevMask = 0:
                    dpCurr[mask] ← MAX(dpCurr[mask], dpPrev[prevMask] + POPCOUNT(mask))
        dpPrev ← dpCurr
    RETURN MAX_VALUE(dpPrev)

FUNCTION isValidMask(mask, rowSeats):
    // No adjacent students and only on functional seats
    IF (mask & (mask << 1)) != 0: RETURN FALSE
    FOR c ← 0 TO COL_COUNT(rowSeats)-1:
        IF ((mask >> c) & 1) = 1 AND rowSeats[c] = 0: RETURN FALSE
    RETURN TRUE
```

## Walkthrough
Consider `seats = [[1,0,1],[1,1,1],[1,0,1]]` (3×3).
| Row | Valid masks (binary) | Chosen mask | Students placed |
|-----|----------------------|-------------|-----------------|
| 0   | 101, 001, 100        | 101         | 2 |
| 1   | 010, 101, 001, 100   | 010 (compatible with 101 above) | +1 |
| 2   | 101, 001, 100        | 101 (compatible with 010) | +2 |
Total = 4 students.

## Complexity Analysis
*Time*: Generating masks `O(m·2ⁿ)`. DP transitions `O(m·k²)` where `k` is the number of valid masks per row (≤ 2ⁿ). Overall `O(m·2ⁿ·2ⁿ)` in worst case.
*Space*: DP stores two rows of masks `O(2ⁿ)`.

## Follow-Up Questions
1. How would you adapt the solution for a rectangular grid with `n` up to 10 (still using bitmask DP) versus larger `n`?
2. Can the problem be solved with a maximum bipartite matching formulation?
3. How would you modify the DP if students could also cheat horizontally (left/right) in addition to diagonally?

## Key Takeaway
Bitmask DP efficiently captures row-wise seating constraints and diagonal cheating checks, enabling optimal placement of students in exponential-time but feasible for small column counts.
