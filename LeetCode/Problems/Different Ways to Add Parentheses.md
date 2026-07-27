# 241. Different Ways to Add Parentheses

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/different-ways-to-add-parentheses](https://leetcode.com/problems/different-ways-to-add-parentheses)
**Companies:** Amazon, Bloomberg, Deltax, Deutsche Bank, Google, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Divide and Conquer — O(Catalan(n))](#approach-divide-and-conquer--ocatalann)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `expression` containing digits and operators `+`, `-`, `*`, return all possible results from computing all different ways to group the operations using parentheses. The result can be in any order.

**Constraints:**
- `1 <= expression.length <= 20`
- `expression` consists of digits and `+`, `-`, `*`.

---

## Examples

**Example 1:**
```
Input: "2-1-1"
Output: [0, 2]
Explanation:
  ((2-1)-1) = 0
  (2-(1-1)) = 2
```

**Example 2:**
```
Input: "2*3-4*5"
Output: [-34, -14, -10, -10, 10]
Explanation: 5 different groupings produce these results.
```

---

## Key Insight

> Every valid parenthesization corresponds to choosing one operator as the **"last"** operation (the root of the expression tree). Split the expression at each operator, recursively compute all results for the left and right halves, then combine all pairs.

```
       "2*3-4*5"
      /    |     \
  split at *   split at -   split at *
  "2" * "3-4*5"   "2*3" - "4*5"   "2*3-4" * "5"
```

---

## Approach: Divide and Conquer — O(Catalan(n)) ✅

Split at each operator. Recursively compute all results for left and right, combine.

```
FUNCTION diffWaysToCompute(expression):
    results = []
    FOR i, char IN enumerate(expression):
        IF char IN "+-*":
            left = diffWaysToCompute(expression[:i])
            right = diffWaysToCompute(expression[i+1:])
            FOR l IN left:
                FOR r IN right:
                    results.ADD(apply(char, l, r))

    IF results is empty:
        results.ADD(int(expression))    // base case: single number

    RETURN results
```

**With memoization** (add a cache keyed by `expression` string):
```
memo = {}
FUNCTION diffWaysToCompute(expression):
    IF expression IN memo: RETURN memo[expression]
    // ... same logic ...
    memo[expression] = results
    RETURN results
```

---

## Walkthrough

```
expression = "2-1-1"
```

**Split at first '-' (index 1):**
- Left: `"2"` → `[2]`
- Right: `"1-1"` → split at '-': left=`[1]`, right=`[1]` → `[1-1]` = `[0]`
- Results: `[2-0]` = `[2]`

**Split at second '-' (index 3):**
- Left: `"2-1"` → split at '-': `[2-1]` = `[1]`
- Right: `"1"` → `[1]`
- Results: `[1-1]` = `[0]`

Combined: `[2, 0]` ✅

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(C(n) × n) | C(n) = nth Catalan number, n = number of operators |
| **Space** | O(C(n)) | Storing all possible results |

The Catalan number grows as O(4^n / n^(3/2)), but with memoization overlapping subproblems are avoided.

---

## Follow-Up Questions

**Q1: Why does this produce all possible groupings?**
> Each operator can be the "root" of the expression tree. By trying each as the split point, we enumerate all possible tree structures (which correspond to all parenthesizations).

**Q2: How does memoization help?**
> Subexpressions like `"3-4"` may appear in multiple splits. Caching avoids recomputation.

**Q3: What's the connection to Catalan numbers?**
> The number of ways to fully parenthesize `n` operators is the nth Catalan number C(n). This is the same as the number of binary trees with n internal nodes.

**Q4: Could you solve this iteratively with DP?**
> Yes — interval DP where `dp[i][j]` stores all possible values for the subexpression from operand `i` to operand `j`.

---

## Key Takeaway

> **"All ways to parenthesize an expression" is a classic divide-and-conquer problem — split at each operator, recurse on both halves, and combine all pairs of results. Add memoization for efficiency.**
