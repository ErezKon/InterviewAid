# 938. Range Sum of BST

**Difficulty:** 🟢 Easy
**Acceptance:** 86.0%
**LeetCode:** [https://leetcode.com/problems/range-sum-of-bst](https://leetcode.com/problems/range-sum-of-bst)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Yandex
---

## Problem Description
Given the root of a binary search tree (BST) and two integers `low` and `high`, return the sum of values of all nodes with `low <= node.val <= high`. The BST property (left < node < right) can be used to prune sub‑trees that cannot contain values in the range.

## Examples
- Input: `root = [10,5,15,3,7,null,18], low = 7, high = 15` → Output: `32` (nodes 7,10,15).
- Input: `root = [10,5,15,3,7,13,18,1,null,6], low = 6, high = 10` → Output: `23` (nodes 6,7,10).

## Approach
Perform a depth‑first search. At each node, if its value is greater than `low` explore the left child; if less than `high` explore the right child. Accumulate the node value when it lies within the range.

```text
FUNCTION rangeSumBST(root, low, high):
    IF root == null:
        RETURN 0
    SET sum ← 0
    IF low ≤ root.val AND root.val ≤ high:
        SET sum ← sum + root.val
    END IF
    IF root.val > low:
        SET sum ← sum + rangeSumBST(root.left, low, high)
    END IF
    IF root.val < high:
        SET sum ← sum + rangeSumBST(root.right, low, high)
    END IF
    RETURN sum
END FUNCTION
```

## Walkthrough
| Step | Node.val | Action | Sum |
|------|----------|--------|-----|
|1|10|within range → add 10|10|
|2|10 > low → recurse left (5)| – |
|3|5|< low → skip left, recurse right (7)|add 7 → 17|
|4|10 < high → recurse right (15)|add 15 → 32|
|5|15 > high → stop right subtree| – |

## Complexity Analysis
- Time: O(n) in worst case, but average O(k) where k is number of visited nodes due to pruning.
- Space: O(h) recursion stack, h = tree height.

## Follow‑Up Questions
1. How would you implement the same logic iteratively using a stack?
2. Can you extend the solution to handle a stream of queries efficiently?
3. What changes are needed if the tree is not a BST?

## Key Takeaway
Leveraging the BST ordering allows pruning of irrelevant sub‑trees, turning a naïve O(n) traversal into a more efficient search that only visits nodes potentially within the target range.
