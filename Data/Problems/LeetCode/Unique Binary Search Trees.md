# 96. Unique Binary Search Trees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unique-binary-search-trees](https://leetcode.com/problems/unique-binary-search-trees)
**Companies:** Amazon, Bloomberg, Clari, Google, Meta, Microsoft, Oracle, Snapchat, Swiggy, Tiktok

---

## Problem Description
Given an integer `n`, determine how many structurally unique binary search trees (BSTs) can be formed that store values `1` to `n`. Each BST must satisfy the BST property: left subtree nodes are less than the root, and right subtree nodes are greater.

## Examples
**Example 1:**
```
Input: n = 3
Output: 5
Explanation: The 5 unique BSTs are:
1)   1          2)   1          3)   2          4)   3          5)   3
      \           \           / \        /           /
       3           2         1   3      2           1
      /           /                     \           \
     2           3                       1           2
```

**Example 2:**
```
Input: n = 1
Output: 1
```

## Approach
The number of unique BSTs for `n` nodes corresponds to the nth Catalan number. Use dynamic programming where `dp[i]` stores the count for `i` nodes.

```text
FUNCTION numTrees(n):
    SET dp ← ARRAY of size n+1 initialized to 0
    SET dp[0] ← 1
    SET dp[1] ← 1
    FOR i ← 2 TO n:
        FOR j ← 0 TO i-1:
            // j nodes on left, i-1-j nodes on right
            SET dp[i] ← dp[i] + dp[j] * dp[i-1-j]
    RETURN dp[n]
```

## Walkthrough
Consider `n = 3`:
| i (total nodes) | j (left nodes) | Contribution (dp[j] * dp[i-1-j]) |
|----------------|----------------|-----------------------------------|
| 3              | 0              | 1 * 2 = 2                         |
| 3              | 1              | 1 * 1 = 1                         |
| 3              | 2              | 2 * 1 = 2                         |
Summing contributions gives `dp[3] = 5` unique BSTs.

## Complexity Analysis
- **Time:** O(n²) – two nested loops over `i` and `j`.
- **Space:** O(n) – the `dp` array of size `n+1`.

## Follow-Up Questions
1. How would you compute the result for large `n` modulo `10⁹+7`?
2. Can you derive a closed‑form expression using binomial coefficients?
3. How would the problem change if the tree must be height‑balanced?

## Key Takeaway
The count of unique BSTs follows Catalan numbers and can be efficiently computed with a simple O(n²) DP recurrence.
