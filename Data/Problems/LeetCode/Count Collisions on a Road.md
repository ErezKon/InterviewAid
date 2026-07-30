# 2211. Count Collisions on a Road

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Arcesium, Google

---

## Problem Description
Given a string `directions` consisting of characters `'L'`, `'R'`, and `'S'` representing cars moving left, right, or staying still, count the total number of collisions that will occur after all cars move according to the following rules:
- Cars moving in opposite directions (`'L'` vs `'R'`) collide and become stationary (`'S'`).
- A moving car colliding with a stationary car also becomes stationary.
- Cars that move off the road (leading `'L'`s or trailing `'R'`s) never collide.
Return the total number of collisions.

## Examples
| directions | Output | Explanation |
|---|--------|-------------|
| "RLRSLL" | 5 | After removing leading `'L'` and trailing `'R'`, remaining "RSL" yields 2 moving cars (`'R'` and `'L'`) each causing a collision, plus the `'S'` already stationary, total 5. |
| "LLRR" | 0 | All cars move off the road without colliding. |

## Approach
The key insight is that only cars that are not at the extreme left moving left or extreme right moving right can ever collide. By stripping leading `'L'`s and trailing `'R'`s, the remaining string consists of cars that will eventually become stationary. Each `'L'` or `'R'` in this trimmed segment contributes one collision, while `'S'` contributes none because it is already stationary.

### Pseudocode
```text
FUNCTION countCollisions(directions):
    // Remove cars that escape the road
    trimmed ← directions.lstrip('L').rstrip('R')
    // Count moving cars in the remaining segment
    SET collisions ← LENGTH(trimmed) - trimmed.count('S')
    RETURN collisions
```

## Walkthrough
For `directions = "RLRSLL"`:
1. Strip leading `'L'` → none, strip trailing `'R'` → none, trimmed = "RLRSLL".
2. Length = 6, number of `'S'` = 1.
3. Collisions = 6 - 1 = 5.

## Complexity Analysis
- Time: O(n) – single pass to trim and count.
- Space: O(1) – only a few variables.

## Follow-Up Questions
- How would the solution change if cars could reverse direction after a collision?
- What if the road is circular, so cars exiting on one side re‑enter from the other?
- Can you compute the final positions of all cars after collisions?

## Key Takeaway
By removing cars that never collide (leading `'L'`s and trailing `'R'`s), the remaining moving cars each cause exactly one collision, giving a simple O(n) count.
