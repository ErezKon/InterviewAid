# 1339. Maximum Product of Splitted Binary Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-product-of-splitted-binary-tree](https://leetcode.com/problems/maximum-product-of-splitted-binary-tree)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given the `root` of a binary tree, split the binary tree into two subtrees by removing one edge such that the product of the sums of the subtrees is maximized.

Return *the maximum product of the sums of the two subtrees*. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Note** that you need to maximize the answer before taking the mod and not after taking it.

**Constraints:**
- The number of nodes in the tree is in the range `[2, 5 × 10^4]`.
- `1 <= Node.val <= 10^4`

---

## Examples

```
Example 1:
  Input: root = [1,2,3,4,5,6]
  Output: 110
  Explanation: Remove the edge between 1 and 2 (the red edge in the official figure) and get 2 binary trees
    with sum 11 and 10. Their product is 110 (11*10)
```

```
Example 2:
  Input: root = [1,null,2,3,4,null,null,5,6]
  Output: 90
  Explanation: Remove the edge between 2 and 4 (the red edge in the official figure) and get 2 binary trees
    with sum 15 and 6. Their product is 90 (15*6)
```

---

## Key Insight

> First compute the total sum. For each edge removal, the two parts have sums `s` and `total - s`. Compute all subtree sums in one DFS, then find the split maximizing `s × (total - s)`.

---

## Approach

```
FUNCTION maxProduct(root)
    subtreeSums ← []

    FUNCTION totalSum(node)
        IF node = null THEN RETURN 0
        s ← node.val + totalSum(node.left) + totalSum(node.right)
        subtreeSums.ADD(s)
        RETURN s

    total ← totalSum(root)
    RETURN MAX(s × (total - s) FOR s IN subtreeSums) MOD (10^9 + 7)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single DFS |
| Space  | **O(n)** — subtree sums list |

---

## Follow-Up Questions

1. **Why is max product near total/2?**
   For fixed sum, `s × (total-s)` is maximized when `s ≈ total/2` (AM-GM).

2. **When to apply modulo?**
   Only at the final answer — compute max product with full precision first.

---

## Key Takeaway

> **DFS to collect all subtree sums, then optimize** — one DFS computes all possible split sums. The product `s × (total-s)` is maximized when `s` is closest to `total/2`.
