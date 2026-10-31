# 1644. Lowest Common Ancestor of a Binary Tree II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii](https://leetcode.com/problems/lowest-common-ancestor-of-a-binary-tree-ii)
**Companies:** Atlassian, Linkedin, Meta, Microsoft

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given the `root` of a binary tree, return *the lowest common ancestor (LCA) of two given nodes, *`p`* and *`q`. If either node `p` or `q` **does not exist** in the tree, return `null`. All values of the nodes in the tree are **unique**.

According to the **definition of LCA on Wikipedia**: "The lowest common ancestor of two nodes `p` and `q` in a binary tree `T` is the lowest node that has both `p` and `q` as **descendants** (where we allow **a node to be a descendant of itself**)". A **descendant** of a node `x` is a node `y` that is on the path from node `x` to some leaf node.

**Follow up:** Can you find the LCA traversing the tree, without checking nodes existence?

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `-10^9 <= Node.val <= 10^9`
- All `Node.val` are **unique**.
- `p != q`

---

## Examples

**Example 1:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 1
Output: 3
Explanation: The LCA of nodes 5 and 1 is 3.
```

**Example 2:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 4
Output: 5
Explanation: The LCA of nodes 5 and 4 is 5. A node can be a descendant of itself according to the definition of LCA.
```

**Example 3:**
```
Input: root = [3,5,1,6,2,0,8,null,null,7,4], p = 5, q = 10
Output: null
Explanation: Node 10 does not exist in the tree, so return null.
```

---

## 2. Approach: DFS with Existence Check — O(n) ✅

```text
FUNCTION lowestCommonAncestor(root, p, q):
    SET foundP ← false
    SET foundQ ← false

    FUNCTION dfs(node):
        IF NOT node: RETURN null
        left ← dfs(node.left)
        right ← dfs(node.right)
        IF node == p:
            SET foundP ← true
            RETURN node
        IF node == q:
            SET foundQ ← true
            RETURN node
        IF left AND right:
            RETURN node
        RETURN left OR right

    SET result ← dfs(root)
    RETURN result IF foundP AND foundQ ELSE null
```

---

## Walkthrough

Consider Example 1. The DFS traverses the tree:
- Visits node 3, recurses left to 5 and right to 1.
- Sub-tree rooted at 5 finds `p` (5) → `foundP` true, returns 5.
- Sub-tree rooted at 1 finds `q` (1) → `foundQ` true, returns 1.
- At node 3 both left and right calls returned non-null, so node 3 is returned as LCA.
Since both flags are true, the final answer is node 3.

---

## Complexity Analysis

- **Time:** O(n) – each node visited once.
- **Space:** O(h) – recursion stack depth equals tree height.

---

## Follow-Up Questions

1. How would you adapt the solution to return the LCA even when the tree is a directed acyclic graph?
2. Can you implement an iterative version using a parent map?
3. What changes are needed if the tree is a binary search tree?

---

## Key Takeaway

> Same DFS as LCA I but must traverse the entire tree (don't short-circuit) to confirm both nodes exist. Return null if either is missing.
