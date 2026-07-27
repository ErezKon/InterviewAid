# 3211. Generate Binary Strings Without Adjacent Zeros

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros](https://leetcode.com/problems/generate-binary-strings-without-adjacent-zeros)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Backtracking — O(2ⁿ) ✅](#3-approach-backtracking--o2n-)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Generate all binary strings of length `n` with no two adjacent '0's.

---

## 2. Key Insight

> Always branch on '1'. Only branch on '0' if the last character was '1' (or string is empty). This prevents adjacent zeros.

---

## 3. Approach: Backtracking — O(2ⁿ) ✅

```
FUNCTION validStrings(n):
    result = []
    FUNCTION backtrack(s):
        IF len(s) == n: result.ADD(s); RETURN
        backtrack(s + '1')
        IF NOT s OR s[-1] == '1': backtrack(s + '0')
    backtrack("")
    RETURN result
```

---

## 4. Key Takeaway

> Constrained backtracking: allow '0' only after '1'. The output count follows the Fibonacci sequence.
