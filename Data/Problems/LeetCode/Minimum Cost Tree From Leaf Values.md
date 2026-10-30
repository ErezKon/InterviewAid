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

Given an array `arr` of positive integers, consider all binary trees such that:
- Each node has either `0` or `2` children;
- The values of `arr` correspond to the values of each **leaf** in an in-order traversal of the tree.
- The value of each non-leaf node is equal to the product of the largest leaf value in its left and right subtree, respectively.

Among all possible binary trees considered, return *the smallest possible sum of the values of each non-leaf node*. It is guaranteed this sum fits into a **32-bit** integer.

A node is a **leaf** if and only if it has zero children.

**Constraints:**
- `2 ≤ arr.length ≤ 40`
- `1 ≤ arr[i] ≤ 15`
- It is guaranteed that the answer fits into a **32-bit** signed integer (i.e., it is less than `2³¹`).

---

## Examples

```
Example 1:
  Input: arr = [6,2,4]
  Output: 32
  Explanation: There are two possible trees shown.
  The first has a non-leaf node sum 36, and the second has non-leaf node sum 32.
    Tree 1: (6*2)=12 at left child, (6*4)=24 at root → sum = 36
    Tree 2: (2*4)=8 at right child, (6*4)=24 at root → sum = 32
```

```
Example 2:
  Input: arr = [4,11]
  Output: 44
  Explanation: The only tree has a single non-leaf root with value 4 * 11 = 44.
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
