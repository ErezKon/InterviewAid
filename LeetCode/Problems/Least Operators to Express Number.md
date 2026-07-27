# 964. Least Operators to Express Number

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/least-operators-to-express-number](https://leetcode.com/problems/least-operators-to-express-number)
**Companies:** Snapchat

---

## 1. Problem Description

Express `target` using only the number `x` and operators `+, -, *, /` (no parentheses). Minimize the number of operators used.

---

## 2. Approach: Greedy / BFS on Base-x Representation ✅

Think of target in base `x`. Each "digit" can be expressed by adding or subtracting powers of `x`. At each power level, decide: use `d` copies or `(x - d)` copies and carry.

```
FUNCTION leastOpsExpressTarget(x, target):
    // Convert target to base x, process digit by digit
    // At each level, cost = min(use d copies, use (x-d) and carry)
    // DFS/memoization on (remaining target, power level)
```

| Time | Space |
|------|-------|
| O(log_x(target)) | O(log_x(target)) |

---

## 3. Key Takeaway

> Express target in base x. Each digit position gives a choice: represent directly or carry to the next power. This reduces to a shortest-path / DP problem on the base-x digits.
