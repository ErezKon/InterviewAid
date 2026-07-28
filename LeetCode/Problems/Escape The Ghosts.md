# 789. Escape The Ghosts

**Difficulty:** 🟡 Medium
**Companies:** Google, Wix

---

## Problem Description
You are located at the origin `(0,0)` on an infinite 2D grid. Several ghosts start at given integer coordinates `ghosts[i]`. You want to reach a target cell `target` before any ghost can reach it. Both you and the ghosts move one step per turn (Manhattan distance). Determine whether you can reach the target strictly earlier than every ghost.

## Examples
```text
Input: ghosts = [[1,0],[0,3]], target = [0,1]
Output: true
Explanation: You need 1 step to reach (0,1). Both ghosts need at least 2 steps.

Input: ghosts = [[2,0]], target = [1,0]
Output: false
Explanation: Ghost reaches the target in 1 step, same as you.
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
