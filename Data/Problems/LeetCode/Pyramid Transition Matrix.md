# 756. Pyramid Transition Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pyramid-transition-matrix](https://leetcode.com/problems/pyramid-transition-matrix)
**Companies:** Airbnb, Amazon, Google

---

## Problem Description

You are stacking blocks to form a pyramid. Each block has a color, which is represented by a single letter. Each row of blocks contains **one less block** than the row beneath it and is centered on top.

To make the pyramid aesthetically pleasing, there are only specific **triangular patterns** that are allowed. A triangular pattern consists of a **single block** stacked on top of **two blocks**. The patterns are given as a list of three-letter strings `allowed`, where the first two characters of a pattern represent the left and right bottom blocks respectively, and the third character is the top block.

- For example, `"ABC"` represents a triangular pattern with a `'C'` block stacked on top of an `'A'` (left) and `'B'` (right) block. Note that this is different from `"BAC"` where `'B'` is on the left bottom and `'A'` is on the right bottom.

You start with a bottom row of blocks `bottom`, given as a single string, that you **must** use as the base of the pyramid.

Given `bottom` and `allowed`, return `true` *if you can build the pyramid all the way to the top such that **every triangular pattern** in the pyramid is in* `allowed`*, or* `false` *otherwise*.

**Constraints:**
- `2 <= bottom.length <= 6`
- `0 <= allowed.length <= 216`
- `allowed[i].length == 3`
- The letters in all input strings are from the set `{'A', 'B', 'C', 'D', 'E', 'F'}`.
- All the values of `allowed` are **unique**.

## Examples

**Example 1:**
```
Input: bottom = "BCD", allowed = ["BCC","CDE","CEA","FFF"]
Output: true
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 3), we can build "CE" on level 2 and then build "A" on level 1.
There are three triangular patterns in the pyramid, which are "BCC", "CDE", and "CEA". All are allowed.
```

**Example 2:**
```
Input: bottom = "AAAA", allowed = ["AAB","AAC","BCD","BBE","DEF"]
Output: false
Explanation: The allowed triangular patterns are shown on the right.
Starting from the bottom (level 4), there are multiple ways to build level 3, but trying all the possibilites, you will get always stuck before building level 1.
```

## Approach
**Backtracking with Pre-computed Mapping**
1. Build a map from each pair of characters to the list of possible characters that can sit above them.
2. Perform a depth-first search row by row. For the current row, generate all possible strings for the next row by choosing a valid character for each adjacent pair.
3. Recurse until a row of length 1 is formed.

```text
FUNCTION pyramidTransition(bottom, allowed):
    // Build mapping from pair -> list of possible tops
    SET mapping ← DICTIONARY where key ← pair string, value ← LIST of chars
    FOR triple IN allowed:
        SET pair ← triple[0:2]
        SET top  ← triple[2]
        APPEND top TO mapping[pair]

    // Depth-first search
    FUNCTION dfs(currentRow):
        IF LENGTH(currentRow) == 1:
            RETURN true
        SET nextRowCandidates ← []
        // Generate all possible characters for each adjacent pair
        FOR i ← 0 TO LENGTH(currentRow) - 2:
            SET pair ← currentRow[i] + currentRow[i+1]
            IF pair NOT IN mapping:
                RETURN false
            SET nextRowCandidates[i] ← mapping[pair]
        // Backtrack over all combinations
        RETURN backtrack(0, "")

    FUNCTION backtrack(idx, built):
        IF idx == LENGTH(nextRowCandidates):
            RETURN dfs(built)
        FOR ch IN nextRowCandidates[idx]:
            IF backtrack(idx + 1, built + ch):
                RETURN true
        RETURN false

    RETURN dfs(bottom)
```

## Walkthrough
For `bottom = "BCD"` and the mapping built from the allowed list:
- Pair `BC` → {`G`}
- Pair `CD` → {`E`}
The only possible next row is `GE`. Repeating the process, `GE` yields pair `GE` → {`A`}, reaching a single character `A`. Hence the answer is true.

## Complexity Analysis
Time: In the worst case, we explore all possible combinations of characters for each level, which is O(3^{n}) where n is the length of the bottom row, but the mapping drastically prunes invalid branches.
Space: O(n) for the recursion stack plus O(|allowed|) for the mapping.

## Follow-Up Questions
1. How would you modify the algorithm to also return one valid pyramid configuration?
2. Can the solution be optimized using memoization of sub-rows?
3. What if the allowed triples are given as a large dataset—how would you handle memory constraints?

## Key Takeaway
By pre-computing a pair-to-top mapping and using backtracking, the problem reduces to exploring a constrained search tree, enabling an efficient check for a possible pyramid.
