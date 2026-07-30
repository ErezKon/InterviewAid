# 756. Pyramid Transition Matrix

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/pyramid-transition-matrix](https://leetcode.com/problems/pyramid-transition-matrix)
**Companies:** Airbnb, Amazon, Google

---

## Problem Description
Given a string `bottom` representing the bottom row of a pyramid and an array `allowed` of three‑character strings, each allowed triple `abc` means that characters `a` and `b` can sit directly below character `c` in the next row. Determine whether it is possible to build the pyramid all the way to a single character at the top using only the allowed triples.

## Examples
**Example 1:**
```
bottom = "BCD"
allowed = ["BCG","CDE","GEA","FFF"]
Output: true
Explanation: One possible pyramid is:
    A
   / \
  G   E
 / \ / \
B   C   D
```
**Example 2:**
```
bottom = "AABA"
allowed = ["AAA","AAB","ABA","ABB","BAC"]
Output: false
Explanation: No sequence of allowed triples can reduce the bottom row to a single character.
```

## Approach
**Backtracking with Pre‑computed Mapping**
1. Build a map from each pair of characters to the list of possible characters that can sit above them.
2. Perform a depth‑first search row by row. For the current row, generate all possible strings for the next row by choosing a valid character for each adjacent pair.
3. Recurse until a row of length 1 is formed.

```text
FUNCTION pyramidTransition(bottom, allowed):
    // Build mapping from pair -> list of possible tops
    SET mapping ← DICTIONARY where key ← pair string, value ← LIST of chars
    FOR triple IN allowed:
        SET pair ← triple[0:2]
        SET top  ← triple[2]
        APPEND top TO mapping[pair]

    // Depth‑first search
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

## Follow‑Up Questions
1. How would you modify the algorithm to also return one valid pyramid configuration?
2. Can the solution be optimized using memoization of sub‑rows?
3. What if the allowed triples are given as a large dataset—how would you handle memory constraints?

## Key Takeaway
By pre‑computing a pair‑to‑top mapping and using backtracking, the problem reduces to exploring a constrained search tree, enabling an efficient check for a possible pyramid.
