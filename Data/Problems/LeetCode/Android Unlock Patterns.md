# 351. Android Unlock Patterns

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/android-unlock-patterns](https://leetcode.com/problems/android-unlock-patterns)
**Companies:** Google

---

## 1. Problem Description

Android devices have a special lock screen with a `3 x 3` grid of dots. Users can set an "unlock pattern" by connecting the dots in a specific sequence, forming a series of joined line segments where each segment's endpoints are two consecutive dots in the sequence. A sequence of `k` dots is a **valid** unlock pattern if both of the following are true:

- All the dots in the sequence are **distinct**.
- If the line segment connecting two consecutive dots in the sequence passes through the **center** of any other dot, the other dot **must have previously appeared** in the sequence. No jumps through the center non-selected dots are allowed.
  - For example, connecting dots `2` and `9` without dots `5` or `6` appearing beforehand is valid because the line from dot `2` to dot `9` does not pass through the center of either dot `5` or `6`.
  - However, connecting dots `1` and `3` without dot `2` appearing beforehand is invalid because the line from dot `1` to dot `3` passes through the center of dot `2`.

The grid is numbered:

```
1 2 3
4 5 6
7 8 9
```

Here are some example valid and invalid unlock patterns:

- The 1st pattern `[4,1,3,6]` is invalid because the line connecting dots `1` and `3` pass through dot `2`, but dot `2` did not previously appear in the sequence.
- The 2nd pattern `[4,1,9,2]` is invalid because the line connecting dots `1` and `9` pass through dot `5`, but dot `5` did not previously appear in the sequence.
- The 3rd pattern `[2,4,1,3,6]` is valid because it follows the conditions. The line connecting dots `1` and `3` meets the condition because dot `2` previously appeared in the sequence.
- The 4th pattern `[6,5,4,1,9,2]` is valid because it follows the conditions. The line connecting dots `1` and `9` meets the condition because dot `5` previously appeared in the sequence.

Given two integers `m` and `n`, return *the **number of unique and valid unlock patterns** of the Android grid lock screen that consist of **at least*** `m` *keys and **at most*** `n` *keys.*

Two unlock patterns are considered **unique** if there is a dot in one sequence that is not in the other, or the order of the dots is different.

**Constraints:**
- `1 <= m, n <= 9`

---

## 2. Key Insight

> Use backtracking with a precomputed "skip" table. `skip[i][j]` = the key between `i` and `j` (if any). A move from `i` to `j` is valid if `skip[i][j]` is 0 or already visited. Exploit symmetry: patterns starting from corners (1,3,7,9) are equivalent, as are those from edges (2,4,6,8).

---

## 3. Approach: DFS + Symmetry — O(1) ✅

```
FUNCTION numberOfPatterns(m, n):
    skip = 10×10 array, all 0
    skip[1][3] = skip[3][1] = 2
    skip[1][7] = skip[7][1] = 4
    skip[3][9] = skip[9][3] = 6
    skip[7][9] = skip[9][7] = 8
    skip[1][9] = skip[9][1] = skip[3][7] = skip[7][3] = 5
    skip[2][8] = skip[8][2] = skip[4][6] = skip[6][4] = 5
    
    visited = set()
    
    FUNCTION dfs(cur, remaining):
        IF remaining == 0: RETURN 1
        visited.ADD(cur)
        count = 0
        FOR next FROM 1 TO 9:
            IF next NOT IN visited:
                IF skip[cur][next] == 0 OR skip[cur][next] IN visited:
                    count += dfs(next, remaining - 1)
        visited.REMOVE(cur)
        RETURN count
    
    result = 0
    FOR length FROM m TO n:
        result += dfs(1, length-1) * 4  // corners
        result += dfs(2, length-1) * 4  // edges
        result += dfs(5, length-1) * 1  // center
    RETURN result
```

---

## Examples

```
Example 1:
  Input: m = 1, n = 1
  Output: 9

Example 2:
  Input: m = 1, n = 2
  Output: 65
```

*Explanation*: For length 1 there are 9 single‑key patterns. For length 2, patterns from corners, edges, and center are counted with symmetry.

---

## Walkthrough

**Example**: `m = 1, n = 2`

1. Length 1: each of the 9 keys is a valid pattern → 9.
2. Length 2:
   - Start from corner (1): possible next keys are 2,4,5,6,8 (skip 3,7,9 blocked). → 5 patterns. Multiply by 4 corners = 20.
   - Start from edge (2): possible next keys are 1,3,4,5,6,7,9 → 7 patterns. Multiply by 4 edges = 28.
   - Start from center (5): can go to any of the 8 others → 8 patterns.
   - Total length 2 = 20+28+8 = 56.
3. Sum = 9 + 56 = 65.

---

## Complexity Analysis

- **Time**: O(1) – bounded by the finite search space of 9! possible permutations.
- **Space**: O(9) for the `visited` set and recursion stack.

---

## Follow-Up Questions

- How would you modify the algorithm to return the actual patterns instead of just the count?
- Can the approach be extended to larger grids (e.g., 4×4) while keeping it efficient?
- How would you handle additional constraints such as mandatory inclusion of certain keys?

---

## Key Takeaway

> The skip table encodes which intermediate keys must be visited before a move is legal. Symmetry reduces 9 starting positions to 3 groups.
