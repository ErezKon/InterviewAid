# 1130. Minimum Cost Tree From Leaf Values

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-cost-tree-from-leaf-values](https://leetcode.com/problems/minimum-cost-tree-from-leaf-values)
**Companies:** Bloomberg, Google, Mathworks, Phonepe

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Monotonic Stack — O(n)](#approach-monotonic-stack--on)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `arr` of positive integers, build a binary tree where:
- The leaves (in-order) are exactly `arr`.
- Each non-leaf node's value = product of the maximum leaf in its left subtree × maximum leaf in its right subtree.

Return the **minimum possible sum** of all non-leaf node values.

**Constraints:**
- `2 ≤ arr.length ≤ 40`
- `1 ≤ arr[i] ≤ 15`

---

## Examples

**Example 1:**
```
Input: arr = [6, 2, 4]
Output: 32
Explanation: Two possible trees:
  Tree 1: (6)*(4) at root=24, (2)*(4) at right child=8 → sum=32
  Tree 2: (6)*(2) at left child=12, (6)*(4) at root=24 → sum=36
  Minimum = 32.
```

---

## Key Insight

> Greedily remove the **smallest leaf** first, pairing it with its **smaller neighbor**. This minimizes the product at each step. A monotonic decreasing stack naturally finds the optimal pairing order.

Think of it as: the smallest value should be multiplied with the smallest possible partner to minimize its contribution.

---

## Approach: Monotonic Stack — O(n) ✅

```
FUNCTION mctFromLeafValues(arr):
    stack = [infinity]
    cost = 0
    FOR val IN arr:
        WHILE stack[-1] <= val:
            mid = stack.POP()
            cost += mid * MIN(stack[-1], val)
        stack.PUSH(val)
    WHILE len(stack) > 2:
        cost += stack.POP() * stack[-1]
    RETURN cost
```

---

## Walkthrough

```
arr = [6, 2, 4]
stack starts as [∞]
```

| Step | val | Stack (before) | Action | Cost Added | Stack (after) |
|------|-----|---------------|--------|------------|---------------|
| 1 | 6 | [∞] | 6 > nothing to pop, push 6 | 0 | [∞, 6] |
| 2 | 2 | [∞, 6] | 2 < 6, just push | 0 | [∞, 6, 2] |
| 3 | 4 | [∞, 6, 2] | 2 ≤ 4: pop 2, cost += 2 × min(6,4) = 2×4 = 8 | 8 | [∞, 6, 4] |
| 3 | 4 | [∞, 6] | 4 < 6, push 4 | 0 | [∞, 6, 4] |
| Cleanup | | [∞, 6, 4] | Pop 4: cost += 4 × 6 = 24 | 24 | [∞, 6] |

**Total cost:** 8 + 24 = **32** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element pushed/popped at most once |
| **Space** | O(n) — stack |

---

## Follow-Up Questions

1. **Why does greedy work here?** The smallest leaf contributes the least when multiplied. Removing it early (with its smaller neighbor) minimizes total cost — this can be formally proven via exchange argument.
2. **What about the DP approach?** Interval DP with `dp[i][j]` = min cost for subarray `arr[i..j]` works in O(n³) but the stack solution is optimal.
3. **How does this relate to Huffman coding?** Similar greedy principle — combine the two smallest elements first to minimize total cost.

---

## Key Takeaway

> When building an optimal binary tree from leaf values, a **monotonic stack** greedily pairs the smallest elements with their smallest neighbors — achieving O(n) by mimicking the optimal removal order.
