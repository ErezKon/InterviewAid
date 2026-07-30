# 964. Least Operators to Express Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/least-operators-to-express-number](https://leetcode.com/problems/least-operators-to-express-number)
**Companies:** Snapchat

---

## 1. Problem Description

Given an integer `x` and a target integer `target`, you may use the number `x` and the operators `+`, `-`, `*`, `/` (no parentheses) to build an expression that evaluates to `target`. The goal is to minimize the total number of operators used in the expression.

---

## 2. Examples

**Example 1:**
```
Input: x = 3, target = 19
Output: 5
Explanation: 19 = 3 * 3 + 3 / 3 + 3 + 3 / 3 uses 5 operators.
```

**Example 2:**
```
Input: x = 5, target = 501
Output: 8
Explanation: One optimal expression is 5 * 5 * 5 * 5 - 5 / 5.
```

---

## 3. Approach: DP on Base‑x Representation

1. Convert `target` to base `x` to obtain digits.
2. Process digits from least‑significant to most‑significant.
3. For each digit `d`, decide whether to represent it directly using `d` copies of `x` (cost `d`) or to use `(x‑d)` copies and carry `1` to the next higher power (cost `x‑d + 1`).
4. Use recursion with memoization on `(position, carry)` to compute minimal operators.

```text
FUNCTION leastOpsExpressTarget(x, target):
    // Helper returns minimal operators for given value
    FUNCTION dfs(value):
        IF value == 0: RETURN 0
        IF value == 1: RETURN 0 // no operator needed
        SET base ← FLOOR(log_x(value))
        SET power ← x^base
        SET high ← CEIL(value / power)
        SET low ← FLOOR(value / power)
        // Cost to reach high*power and low*power
        RETURN MIN(
            high + dfs(high * power - value),   // use (x‑low) and carry
            low + dfs(value - low * power)      // use low directly
        )
    RETURN dfs(target)
```

---

## 4. Walkthrough

| Step | Value | Decision | Operators added |
|------|-------|----------|-----------------|
| 1 | 19, x=3 | base=2 (3^2=9) | low=2, high=3 |
| 2 | Choose low=2 → use `3+3` (2 ops) and recurse on `19-2*9=1` |
| 3 | Recurse on 1 → 0 ops |
| 4 | Total operators = 2 (for low) + 3 (for multiplication chain) = 5 |

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(log_x(target)) – each recursion reduces the magnitude | O(log_x(target)) – recursion stack |

---

## 6. Follow‑Up Questions

1. How would the solution change if parentheses were allowed?
2. Can you extend the approach to support a limited number of each operator?
3. What is the impact on complexity if `x` can be any real number?

---

## Key Takeaway

> Represent `target` in base `x` and decide at each digit whether to use the digit directly or to complement it and carry, solving the problem via DP on the digit positions.
