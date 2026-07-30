# 255. Verify Preorder Sequence in Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree](https://leetcode.com/problems/verify-preorder-sequence-in-binary-search-tree)
**Companies:** Expedia, Salesforce, Tiktok, Zenefits

---

## Problem Description
Given an array of distinct integers `preorder` representing the preorder traversal of a binary search tree (BST), determine whether it could be the preorder traversal of **some** BST. Return `true` if possible, otherwise `false`.

## Examples
**Example 1:**
```
Input: preorder = [5,2,1,3,6]
Output: true
Explanation: The sequence corresponds to the BST:
      5
    /   \
   2     6
  / \
 1   3
```
**Example 2:**
```
Input: preorder = [5,2,6,1,3]
Output: false
Explanation: 1 appears after 6, violating BST preorder constraints.
```

## Approach
Use a monotonic decreasing stack to track ancestors. Maintain a lower bound `minVal` that represents the smallest value a node can take (the last popped element). Iterate through `preorder`; if a value is less than `minVal`, the sequence is invalid. While the current value is greater than the stack top, pop and update `minVal`. Finally push the current value.

```text
FUNCTION isValidPreorder(preorder):
    stack ← []
    minVal ← -∞
    FOR val IN preorder:
        IF val < minVal:
            RETURN false
        WHILE stack NOT EMPTY AND val > stack.TOP():
            minVal ← stack.POP()
        stack.PUSH(val)
    RETURN true
```

## Walkthrough
| Step | val | Stack before | minVal | Action | Stack after |
|------|-----|--------------|--------|--------|-------------|
| 1 | 5 | [] | -∞ | push | [5]
| 2 | 2 | [5] | -∞ | 2 < 5, push | [5,2]
| 3 | 1 | [5,2] | -∞ | 1 < 2, push | [5,2,1]
| 4 | 3 | [5,2,1] | -∞ | 3 > 1 → pop → minVal=1; 3 > 2 → pop → minVal=2; push 3 | [5,3]
| 5 | 6 | [5,3] | 2 | 6 > 3 → pop → minVal=3; 6 > 5 → pop → minVal=5; push 6 | [6]
All values processed → valid.

## Complexity Analysis
- **Time:** O(n) – each element is pushed and popped at most once.
- **Space:** O(n) in the worst case for the stack (strictly decreasing sequence).

## Follow‑Up Questions
1. How would you verify a postorder traversal of a BST?
2. Can the algorithm be adapted to handle duplicate values?
3. What if the tree must be a balanced BST?

## Key Takeaway
A monotonic stack with a moving lower bound efficiently validates BST preorder sequences in linear time.
