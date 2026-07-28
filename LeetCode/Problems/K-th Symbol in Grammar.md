# 779. K-th Symbol in Grammar

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-th-symbol-in-grammar](https://leetcode.com/problems/k-th-symbol-in-grammar)
**Companies:** Amazon, Bloomberg, De Shaw, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Recursion — O(n) ✅](#4-approach-recursion---on---✅)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Row 1: "0". Each subsequent row replaces 0→"01" and 1→"10". Return the k-th symbol in row n.

---

## 2. Examples

| n | k | Output |
|---|---|--------|
| 1 | 1 | 0 |
| 2 | 1 | 0 |
| 2 | 2 | 1 |
| 4 | 5 | 1 |

*Explanation:* Row 4 is `01101001`. The 5th symbol is `1`.

---

## 3. Key Insight

The k-th symbol in row n depends on the `⌈k/2⌉`-th symbol in row n‑1. If k is odd, it matches the parent; if k is even, it is the flipped value of the parent. This leads to a simple recursion or a bit‑count observation.

---

## 4. Approach: Recursion — O(n) ✅

```text
FUNCTION kthGrammar(n, k):
    IF n == 1:
        RETURN 0
    SET parent ← kthGrammar(n - 1, (k + 1) / 2)
    IF k % 2 == 1:
        RETURN parent          // left child, same as parent
    ELSE:
        RETURN 1 - parent      // right child, flipped
```

---

## 5. Walkthrough

**Example:** `n = 4, k = 5`

| Level (n) | k | Parent k | Parent value | Action | Result |
|-----------|---|----------|--------------|--------|--------|
| 4 | 5 | 3 | ? | k is odd → same as parent | value = kthGrammar(3,3) |
| 3 | 3 | 2 | ? | k is odd → same as parent | value = kthGrammar(2,2) |
| 2 | 2 | 1 | 0 | k is even → flip parent | value = 1 - 0 = 1 |
| 1 | 1 | — | 0 | base case | return 0 |

Back‑propagating: `kthGrammar(2,2) = 1`, `kthGrammar(3,3) = 1`, `kthGrammar(4,5) = 1`.

---

## 6. Complexity Analysis

| Metric | Value |
|--------|-------|
| Time | O(n) – recursion depth equals the row number |
| Space | O(n) – call stack depth |

---

## 7. Follow-Up Questions

1. How can the solution be turned into an O(1) algorithm using the parity of set bits in `k‑1`?
2. What would change if the replacement rules were different, e.g., 0→"00", 1→"11"?
3. Can this be extended to generate the entire row efficiently for large `n`?

---

## 8. Key Takeaway

> Each position's value is determined by its parent in the previous row and whether it's a left (odd) or right (even) child. Alternatively, counting set bits in `k‑1` yields the answer directly.
