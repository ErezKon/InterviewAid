# 3078. Match Alphanumerical Pattern in Matrix I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i](https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i)
**Companies:** Uber, Visa

---

## 1. Problem Description

You are given a 2D integer matrix `board` and a 2D character matrix `pattern`. Where `0 <= board[r][c] <= 9` and each element of `pattern` is either a digit or a lowercase English letter.

Your task is to find a submatrix of `board` that **matches** `pattern`.

An integer matrix `part` matches `pattern` if we can replace cells containing letters in `pattern` with some digits (each **distinct** letter with a **unique** digit) in such a way that the resulting matrix becomes identical to the integer matrix `part`. In other words,

- The matrices have identical dimensions.
- If `pattern[r][c]` is a digit, then `part[r][c]` must be the **same** digit.
- If `pattern[r][c]` is a letter `x`:
  - For every `pattern[i][j] == x`, `part[i][j]` must be the **same** as `part[r][c]`.
  - For every `pattern[i][j] != x`, `part[i][j]` must be **different** than `part[r][c]`.

Return *an array of length* `2` *containing the row number and column number of the upper-left corner of a submatrix of* `board` *which matches* `pattern`*. If there is more than one such submatrix, return the coordinates of the submatrix with the lowest row index, and in case there is still a tie, return the coordinates of the submatrix with the lowest column index. If there are no suitable answers, return* `[-1, -1]`.

**Constraints:**

- `1 <= board.length <= 50`
- `1 <= board[i].length <= 50`
- `0 <= board[i][j] <= 9`
- `1 <= pattern.length <= 50`
- `1 <= pattern[i].length <= 50`
- `pattern[i][j]` is either a digit represented as a string or a lowercase English letter.

---

## 2. Examples

```
Example 1:
  Input: board = [[1,2,2],[2,2,3],[2,3,3]], pattern = ["ab","bb"]
  Output: [0,0]
  Explanation: If we consider this mapping: "a" -> 1 and "b" -> 2; the submatrix with the upper-left corner (0,0) is a match.
  Note that the submatrix with the upper-left corner (1,1) is also a match but since it comes after the other one, we return [0,0].
```

```
Example 2:
  Input: board = [[1,1,2],[3,3,4],[6,6,6]], pattern = ["ab","66"]
  Output: [1,1]
  Explanation: If we consider this mapping: "a" -> 3 and "b" -> 4; the submatrix with the upper-left corner (1,1) is a match.
  Note that since the corresponding values of "a" and "b" must differ, the submatrix with the upper-left corner (1,0) is not a match. Hence, we return [1,1].
```

```
Example 3:
  Input: board = [[1,2],[2,1]], pattern = ["xx"]
  Output: [-1,-1]
  Explanation: Since the values of the matched submatrix must be the same, there is no match. Hence, we return [-1,-1].
```

---

## 3. Approach: Brute Force with Mapping — O(m·n·p·q) ✅

```
// For each possible top-left position:
//   Try to match pattern to submatrix
//   Digits: exact match
//   Letters: track mapping (letter → digit), ensure consistency
```

---

## 4. Walkthrough

1. Iterate over every possible top-left cell `(i, j)` in the matrix where the pattern could fit.
2. For each cell, initialise an empty map `letterToDigit` and `digitToLetter`.
3. Scan the pattern cells:
   - If the pattern character is a digit, require matrix cell to equal that digit.
   - If it is a letter, check the maps:
     * If the letter is unseen, store the current matrix digit.
     * If seen, ensure the stored digit matches the current matrix digit.
4. If all cells satisfy the rules, return `[i, j]`.
5. If no position works, return `[-1, -1]`.

---

## 5. Complexity Analysis

- **Time:** O(m·n·p·q) – try every placement (m·n) and compare p·q cells.
- **Space:** O(26) – at most one mapping per alphabet letter.

---

## 6. Follow-Up Questions

- How would you optimise the search using rolling hash techniques?
- Can the algorithm be extended to support patterns with wildcard `?` that matches any digit?
- What changes are needed if the pattern may be rotated?

---

## Key Takeaway

> Brute force all positions. For letter wildcards, maintain a bidirectional mapping (letter↔digit) to ensure consistency within each match attempt.