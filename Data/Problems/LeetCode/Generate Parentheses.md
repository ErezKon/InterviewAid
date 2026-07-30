# 22. Generate Parentheses

**Difficulty:** 🟡 Medium
**Acceptance:** 76.0%
**LeetCode:** [https://leetcode.com/problems/generate-parentheses](https://leetcode.com/problems/generate-parentheses)
**Companies:** Accenture, Adobe, Amazon, Apple, Avito, Blackbuck, Bloomberg, C3 Ai, Disney, Ebay, Epam Systems, Expedia, Flipkart, Goldman Sachs, Google, Grammarly, Huawei, Ibm, Infosys, Intuit, Makemytrip, Meta, Microsoft, Morgan Stanley, Myntra, Nvidia, Oracle, Qualcomm, Salesforce, Samsung, Servicenow, Shift Technology, Tcs, Texas Instruments, Tiktok, Uber, Walmart Labs, Yandex, Zenefits, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Backtracking — O(4ⁿ/√n) ✅](#3-approach-backtracking--o4ⁿn-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given `n` pairs of parentheses, write a function to generate all combinations of **well-formed parentheses**.

**Constraints:**
- `1 <= n <= 8`

---

## 2. Examples

```
Example 1:
  Input:  n = 3
  Output: ["((()))","(()())","(())()","()(())","()()()"]

Example 2:
  Input:  n = 1
  Output: ["()"]
```

---

## 3. Approach: Backtracking — O(4ⁿ/√n) ✅

### Key Insight

At each step we can add `(` if we haven't used all n opening parens, and `)` if the count of `)` is less than the count of `(` (to keep the string valid).

### Pseudocode

```
FUNCTION generateParenthesis(n):
    result = []
    backtrack("", 0, 0, n, result)
    RETURN result

FUNCTION backtrack(current, openCount, closeCount, n, result):
    IF len(current) == 2 * n:
        result.ADD(current)
        RETURN

    IF openCount < n:
        backtrack(current + "(", openCount + 1, closeCount, n, result)

    IF closeCount < openCount:
        backtrack(current + ")", openCount, closeCount + 1, n, result)
```

### Why This Works

- We never place more `(` than `n`.
- We never place `)` unless there's an unmatched `(` to close.
- When the string reaches length `2n`, it's guaranteed to be valid.

---

## 4. Walkthrough

```
n = 2

backtrack("", 0, 0)
├── backtrack("(", 1, 0)
│   ├── backtrack("((", 2, 0)
│   │   └── backtrack("(()", 2, 1)
│   │       └── backtrack("(())", 2, 2) → ADD "(())"
│   └── backtrack("()", 1, 1)
│       └── backtrack("()(", 2, 1)
│           └── backtrack("()()", 2, 2) → ADD "()()"

Result: ["(())", "()()"] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(4ⁿ/√n) — the n-th Catalan number |
| **Space** | O(n) recursion depth |

The number of valid combinations is the **n-th Catalan number**: C(n) = (2n)! / ((n+1)! · n!)

---

## 6. Follow-Up Questions

### 6.1 What if we also need to generate combinations with other bracket types?

For multiple bracket types `()`, `[]`, `{}`, track open/close counts for each type. Ensure that closing a bracket matches the most recent unmatched opening bracket (use a stack-like constraint).

### 6.2 How to check if a given string of parentheses is valid?

Use a counter (or stack). Increment on `(`, decrement on `)`. If counter ever goes negative → invalid. If counter is 0 at end → valid. This is LeetCode #20 (Valid Parentheses) for single type.

### 6.3 Can we generate them iteratively?

Yes — use a queue/stack-based BFS approach. Start with `""`, and at each level, try adding `(` or `)` if valid. Collect strings of length `2n`.

### 6.4 Minimum Add to Make Parentheses Valid (LeetCode #921)?

Track unmatched `(` and `)` counts. The answer is their sum.

```
FUNCTION minAddToMakeValid(s):
    unmatchedOpen = 0
    unmatchedClose = 0
    FOR char IN s:
        IF char == '(':
            unmatchedOpen += 1
        ELSE:
            IF unmatchedOpen > 0:
                unmatchedOpen -= 1
            ELSE:
                unmatchedClose += 1
    RETURN unmatchedOpen + unmatchedClose
```

---

## Key Takeaway

> Generate Parentheses is the canonical **constrained backtracking** problem. The two constraints (`openCount < n` and `closeCount < openCount`) prune the search space from 2²ⁿ to the n-th Catalan number. This pattern applies whenever you need to enumerate all valid sequences under pairing constraints.
