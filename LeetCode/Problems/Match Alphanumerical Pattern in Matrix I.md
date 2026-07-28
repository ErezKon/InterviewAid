# 3078. Match Alphanumerical Pattern in Matrix I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i](https://leetcode.com/problems/match-alphanumerical-pattern-in-matrix-i)
**Companies:** Uber, Visa

---

## 1. Problem Description

Find the top-left position where a pattern (digits and letters) matches a submatrix. Digits match exactly, letters are wildcards with consistent mapping.

---

## 2. Examples

| Matrix | Pattern | Output |
|--------|---------|--------|
| `[["1","2","3"],["4","5","6"],["7","8","9"]]` | `[["a","b"],["c","a"]]` | `[0,0]` |
| `[["1","2"],["3","4"]]` | `[["x","y"],["y","x"]]` | `[-1,-1]` |

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

1. Iterate over every possible top‑left cell `(i, j)` in the matrix where the pattern could fit.
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