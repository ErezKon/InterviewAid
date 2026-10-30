# 789. Escape The Ghosts

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/escape-the-ghosts](https://leetcode.com/problems/escape-the-ghosts)
**Companies:** Google, Wix

---

## Problem Description
You are playing a simplified PAC-MAN game on an infinite 2-D grid. You start at the point `[0, 0]`, and you are given a destination point `target = [x_target, y_target]` that you are trying to get to. There are several ghosts on the map with their starting positions given as a 2D array `ghosts`, where `ghosts[i] = [x_i, y_i]` represents the starting position of the `i`-th ghost. All inputs are **integral coordinates**.

Each turn, you and all the ghosts may independently choose to either **move 1 unit** in any of the four cardinal directions: north, east, south, or west, or **stay still**. All actions happen **simultaneously**.

You escape if and only if you can reach the target **before** any ghost reaches you. If you reach any square (including the target) at the **same time** as a ghost, it **does not** count as an escape.

Return `true` *if it is possible to escape regardless of how the ghosts move, otherwise return* `false`*.*

**Constraints:**
- `1 <= ghosts.length <= 100`
- `ghosts[i].length == 2`
- `-10^4 <= x_i, y_i <= 10^4`
- There can be **multiple ghosts** in the same location.
- `target.length == 2`
- `-10^4 <= x_target, y_target <= 10^4`

## Examples
```
Example 1:
  Input: ghosts = [[1,0],[0,3]], target = [0,1]
  Output: true
  Explanation: You can reach the destination (0, 1) after 1 turn, while the ghosts located at (1, 0) and (0, 3) cannot catch up with you.
```

```
Example 2:
  Input: ghosts = [[1,0]], target = [2,0]
  Output: false
  Explanation: You need to reach the destination (2, 0), but the ghost at (1, 0) lies between you and the destination.
```

```
Example 3:
  Input: ghosts = [[2,0]], target = [1,0]
  Output: false
  Explanation: The ghost can reach the target at the same time as you.
```

## Approach
Compute your Manhattan distance to the target. For each ghost, compute its Manhattan distance to the target. If any ghost's distance is less than or equal to yours, you cannot escape.

## Pseudocode
```text
FUNCTION escapeGhosts(ghosts, target):
    SET myDist ← ABS(target[0]) + ABS(target[1])
    FOR each g IN ghosts:
        SET ghostDist ← ABS(g[0] - target[0]) + ABS(g[1] - target[1])
        IF ghostDist <= myDist:
            RETURN false
    RETURN true
```

## Walkthrough
| Ghost | Distance to target | Your distance | Outcome |
|-------|--------------------|---------------|---------|
| (1,0) | 2 | 1 | ghost slower → safe |
| (0,3) | 2 | 1 | ghost slower → safe |
Result: true.

## Complexity Analysis
- **Time:** O(g) where g is the number of ghosts.
- **Space:** O(1) extra space.

## Follow‑Up Questions
- How would the solution change if you could move diagonally?
- What if ghosts could also move optimally after each of your moves (turn‑based game)?
- Can you extend the problem to a grid with obstacles?

## Key Takeaway
Comparing Manhattan distances gives a constant‑time decision: you escape only if every ghost is farther from the target than you are.
