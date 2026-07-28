# 1496. Path Crossing

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/path-crossing](https://leetcode.com/problems/path-crossing)
**Companies:** Amazon, Google, Yandex

---

## Problem Description
Given a string `path` consisting of characters `'N'`, `'S'`, `'E'`, and `'W'` representing moves north, south, east, and west respectively, determine whether the path crosses itself (i.e., visits a location more than once). Return `true` if it does, otherwise `false`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"NES"` | `false` | Moves to (0,1) → (1,1) → (1,0); no revisit. |
| `"NESWW"` | `true` | After moves, the path returns to (0,0) which was visited initially. |
| `"N"` | `false` | Single step cannot cross.

## Approach
Track visited coordinates in a set. Start at the origin `(0,0)`. For each direction, update the current `(x,y)` position. If the new position already exists in the set, a crossing is detected.

```text
FUNCTION isPathCrossing(path):
    SET x ← 0
    SET y ← 0
    SET visited ← SET containing (0, 0)

    FOR ch IN path:
        IF ch = 'N':
            SET y ← y + 1
        ELSE IF ch = 'S':
            SET y ← y - 1
        ELSE IF ch = 'E':
            SET x ← x + 1
        ELSE IF ch = 'W':
            SET x ← x - 1
        ENDIF
        IF (x, y) IN visited:
            RETURN true
        ENDIF
        ADD (x, y) TO visited
    ENDFOR
    RETURN false
```

## Walkthrough
Path `"NESWW"`:

| Step | ch | (x,y) after move | visited set before | Action |
|------|----|------------------|--------------------|--------|
| 1 | N | (0,1) | {(0,0)} | add (0,1) |
| 2 | E | (1,1) | {(0,0),(0,1)} | add (1,1) |
| 3 | S | (1,0) | {(0,0),(0,1),(1,1)} | add (1,0) |
| 4 | W | (0,0) | {(0,0),(0,1),(1,1),(1,0)} | (0,0) already visited → return true |

## Complexity Analysis
- **Time:** O(L) where L is the length of `path`.
- **Space:** O(L) for the visited set in the worst case.

## Follow‑Up Questions
1. How would you modify the solution to return the first crossing point?
2. Can you solve it using a hash‑free approach, e.g., encoding positions into a single integer?
3. What changes are needed if diagonal moves are allowed?

## Key Takeaway
Recording each visited coordinate and checking for repeats yields a simple linear‑time solution for detecting path crossings.
