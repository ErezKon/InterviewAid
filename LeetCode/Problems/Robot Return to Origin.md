# 657. Robot Return to Origin

**Difficulty:** 🟢 Easy
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/robot-return-to-origin](https://leetcode.com/problems/robot-return-to-origin)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Microsoft

---

## Problem Description
Given a string `moves` consisting of characters `'U'`, `'D'`, `'L'`, and `'R'` representing unit moves of a robot starting at the origin (0,0), determine whether the robot returns to the origin after performing all moves.

## Examples
- Input: `"UD"` → Output: `true` (up then down cancels out).
- Input: `"LL"` → Output: `false` (ends at (-2,0)).
- Input: `"ULDR"` → Output: `true` (net zero displacement).

## Approach
Count the net vertical and horizontal displacement. The robot returns to origin if the counts of `'U'` and `'D'` are equal **and** the counts of `'L'` and `'R'` are equal.

```text
FUNCTION JudgeCircle(moves):
    SET vertical ← 0
    SET horizontal ← 0
    FOR ch IN moves:
        IF ch = 'U':
            INCREMENT vertical
        ELSE IF ch = 'D':
            DECREMENT vertical
        ELSE IF ch = 'L':
            DECREMENT horizontal
        ELSE IF ch = 'R':
            INCREMENT horizontal
    RETURN vertical = 0 AND horizontal = 0
```

## Walkthrough
| Step | Move | vertical | horizontal |
|------|------|----------|------------|
| 1 | U | 1 | 0 |
| 2 | D | 0 | 0 |
| 3 | L | 0 | -1 |
| 4 | R | 0 | 0 |

Final displacement is (0,0) → `true`.

## Complexity Analysis
- Time: O(n) where n is the length of `moves`.
- Space: O(1) – only two counters.

## Follow‑Up Questions
1. How would you adapt the solution to handle a 2‑D grid with obstacles?
2. Can you extend it to return the shortest subsequence of moves that brings the robot back to origin?
3. What changes are needed if moves are given as a stream?

## Key Takeaway
Simple counting of opposite directions provides an O(n) time, O(1) space solution to determine if the robot returns to the origin.
