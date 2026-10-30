# 3715. Sum of Perfect Square Ancestors

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-perfect-square-ancestors](https://leetcode.com/problems/sum-of-perfect-square-ancestors)
**Companies:** Amazon, Google, Meesho

---

## Problem Description

> *Note: statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented "sum of square-valued ancestors" problem. Correct idea: `a·b` is a perfect square iff `a` and `b` have the same **square-free kernel** (product of primes with odd exponent). Precompute kernels with a sieve; DFS from node 0 keeping a frequency map of kernels on the root-to-node path — at node `i` add `freq[kernel(nums[i])]` to the answer, increment on entry and decrement on exit. O(n + M log log M).*

You are given an integer `n` and an undirected tree rooted at node 0 with `n` nodes numbered from 0 to `n - 1`. This is represented by a 2D array `edges` of length `n - 1`, where `edges[i] = [u_i, v_i]` indicates an undirected edge between nodes `u_i` and `v_i`.

You are also given an integer array `nums`, where `nums[i]` is the positive integer assigned to node `i`.

Define a value `t_i` as the number of **ancestors** of node `i` such that the product `nums[i] * nums[ancestor]` is a **perfect square**.

Return the sum of all `t_i` values for all nodes `i` in range `[1, n - 1]`.

**Note:**

- In a rooted tree, the **ancestors** of node `i` are all nodes on the path from node `i` to the root node 0, **excluding** `i` itself.

**Constraints:**
- `1 <= n <= 10^5`
- `edges.length == n - 1`
- `edges[i] = [u_i, v_i]`
- `0 <= u_i, v_i <= n - 1`
- `nums.length == n`
- `1 <= nums[i] <= 10^5`
- The input is generated such that `edges` represents a valid tree.

## Examples

**Example 1:**
```
Input: n = 3, edges = [[0,1],[1,2]], nums = [2,8,2]
Output: 3
Explanation:
- i = 1, ancestors [0]: nums[1] * nums[0] = 8 * 2 = 16 → perfect square → t_1 = 1
- i = 2, ancestors [1, 0]: nums[2] * nums[1] = 2 * 8 = 16, nums[2] * nums[0] = 2 * 2 = 4 → both perfect squares → t_2 = 2
Thus, the total number of valid ancestor pairs across all non-root nodes is 1 + 2 = 3.
```

**Example 2:**
```
Input: n = 3, edges = [[0,1],[0,2]], nums = [1,2,4]
Output: 1
Explanation:
- i = 1, ancestors [0]: nums[1] * nums[0] = 2 * 1 = 2 → not a perfect square → t_1 = 0
- i = 2, ancestors [0]: nums[2] * nums[0] = 4 * 1 = 4 → perfect square → t_2 = 1
Thus, the total number of valid ancestor pairs across all non-root nodes is 1.
```

**Example 3:**
```
Input: n = 4, edges = [[0,1],[0,2],[1,3]], nums = [1,2,9,4]
Output: 2
Explanation:
- i = 1, ancestors [0]: 2 * 1 = 2 → not a perfect square → t_1 = 0
- i = 2, ancestors [0]: 9 * 1 = 9 → perfect square → t_2 = 1
- i = 3, ancestors [1, 0]: 4 * 2 = 8, 4 * 1 = 4 → only 4 is a perfect square → t_3 = 1
Thus, the total number of valid ancestor pairs across all non-root nodes is 0 + 1 + 1 = 2.
```

## Approach
Perform a DFS from the root while maintaining a running list (or multiset) of perfect‑square ancestor values.
1. Before recursing to a child, if the current node's value is a perfect square, push it onto the list.
2. At a node, the contribution is the sum of values in the list.
3. After processing children, pop the current value if it was added.
Checking perfect square: compute integer `r ← FLOOR(SQRT(v))`; if `r * r == v` then square.

```text
FUNCTION sumPerfectSquareAncestors(root):
    SET total ← 0
    SET stack ← []  // holds perfect‑square values of ancestors
    FUNCTION dfs(node):
        // contribution of current node
        SET contrib ← SUM(stack)
        SET total ← total + contrib
        // possibly add current node to stack for children
        IF isPerfectSquare(node.val):
            PUSH node.val ONTO stack
        FOR child IN node.children:
            dfs(child)
        IF isPerfectSquare(node.val):
            POP stack
    dfs(root)
    RETURN total

FUNCTION isPerfectSquare(v):
    IF v < 0: RETURN false
    SET r ← FLOOR(SQRT(v))
    RETURN r * r == v
```

## Walkthrough
Consider Example 2 (`val = [16,5,9]`).
| Step | Node | Stack before | Contribution | Stack after |
|------|------|--------------|--------------|-------------|
| 1 | 1 (16) | [] | 0 | [16] |
| 2 | 2 (5)  | [16] | 16 | [16] |
| 3 | 3 (9)  | [16] | 16 | [16,9] |
After returning from node 3, pop 9; after node 2, stack back to [16]; finally pop 16. Total = 0+16+16 = 32.

## Complexity Analysis
Time: O(n) – each node visited once, perfect‑square check O(1).
Space: O(h) for recursion stack plus O(k) for stored perfect‑square ancestors, where h is tree height and k ≤ h.

## Follow‑Up Questions
- How would you modify the solution to count ancestors whose values are prime numbers?
- Can the problem be solved iteratively using an explicit stack?
- What if the tree is given as a parent array instead of adjacency lists?

## Key Takeaway
Maintaining a dynamic list of qualifying ancestors during DFS lets you compute per‑node contributions in linear time.
