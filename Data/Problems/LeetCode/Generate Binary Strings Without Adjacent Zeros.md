# 3211. Generate Binary Strings Without Adjacent Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros](https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Backtracking — O(2ⁿ) ✅](#3-approach-backtracking--o2n-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Generate all binary strings of length `n` such that no two adjacent characters are `'0'`.

---

## 2. Examples

| n | valid strings |
|---|----------------|
| 1 | `["0", "1"]` |
| 2 | `["01", "10", "11"]` |
| 3 | `["010", "011", "101", "110", "111"]` |

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```text
FUNCTION generateValidStrings(n):
    result ← []
    FUNCTION backtrack(current):
        IF LENGTH(current) == n THEN
            result.ADD(current)
            RETURN
        // Always can add '1'
        backtrack(current + '1')
        // Add '0' only if last char is not '0'
        IF current IS EMPTY OR current[-1] == '1' THEN
            backtrack(current + '0')
    backtrack("")
    RETURN result
```

---

## 4. Walkthrough

**Example n = 3:**
1. Start with empty string `""`.
2. Add `'1'` → `"1"`; recurse.
3. From `"1"`, add `'1'` → `"11"`; recurse.
4. From `"11"`, add `'1'` → `"111"` (output).
5. Backtrack, from `"11"` add `'0'` (allowed) → `"110"` (output).
6. Backtrack to `"1"`, add `'0'` → `"10"`; recurse.
7. From `"10"`, add `'1'` → `"101"` (output). `'0'` not allowed after `'0'`.
8. Backtrack to root, start with `'0'` → `"0"`; recurse.
9. From `"0"`, only `'1'` allowed → `"01"`; recurse.
10. From `"01"`, add `'1'` → `"011"` (output) and `'0'` → `"010"` (output).

All five valid strings are generated.

---

## 5. Complexity Analysis

- **Time:** O(2ⁿ) in the worst case, as each position branches into at most two choices.
- **Space:** O(n) for the recursion stack and current string builder.

---

## 6. Follow-Up Questions

- How would you count the number of valid strings without enumerating them?
- Can you adapt the algorithm to generate strings with a different adjacency constraint, e.g., no two consecutive `'1'`s?

---

## 7. Key Takeaway

> Constrained backtracking allows `'0'` only after `'1'`, producing all valid strings efficiently.
