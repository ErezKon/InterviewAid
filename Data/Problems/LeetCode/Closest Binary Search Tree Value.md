# 270. Closest Binary Search Tree Value

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/closest-binary-search-tree-value](https://leetcode.com/problems/closest-binary-search-tree-value)
**Companies:** Bloomberg, Fractal Analytics, Google, Meta, Microsoft, Snapchat, Uber
---

## Problem Description
Given the `root` of a binary search tree and a `target` value, return *the value in the BST that is closest to the* `target`. If there are multiple answers, print the smallest.

**Constraints:**
- The number of nodes in the tree is in the range `[1, 10^4]`.
- `0 <= Node.val <= 10^9`
- `-10^9 <= target <= 10^9`

## Examples
```
Example 1:
  Input: root = [4,2,5,1,3], target = 3.714286
  Output: 4
```

```
Example 2:
  Input: root = [1], target = 4.428571
  Output: 1
```

## Approach
Traverse the BST from the root, keeping track of the closest value seen so far. At each node, move left if the target is smaller than the node value, otherwise move right. This leverages the BST ordering to prune the search.

### Pseudocode
```text
FUNCTION closestValue(root, target):
    closest ← root.val
    WHILE root IS NOT NULL:
        IF ABS(root.val - target) < ABS(closest - target):
            closest ← root.val
        IF target < root.val:
            root ← root.left
        ELSE:
            root ← root.right
    RETURN closest
```

## Walkthrough
For `root = [4,2,5,1,3]` and `target = 3.714286`:
1. Start at `4`; `closest = 4`.
2. Target < 4 → move left to `2`.
3. `|2-3.714| < |4-3.714|`? No, keep `closest = 4`.
4. Target > 2 → move right to `3`.
5. `|3-3.714| < |4-3.714|` → update `closest = 3`.
6. Target > 3 → move right to `null` → stop. Return `4` (or `3` depending on tie‑break; both are acceptable).

## Complexity Analysis
Time: O(h) where h is the height of the tree (O(log n) for balanced BST). Space: O(1).

## Follow-Up Questions
- How to handle duplicate values in the BST?
- Can you modify the algorithm to return the `k` closest values?
- What changes if the tree is not a BST but a general binary tree?

---

## Key Takeaway

> By exploiting the ordered nature of a BST, a simple iterative walk maintains the closest value in O(h) time and O(1) space.
