# 3585. Find Weighted Median Node in Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-weighted-median-node-in-tree](https://leetcode.com/problems/find-weighted-median-node-in-tree)
**Companies:** Google

---

## Problem Description
Given a rooted binary tree where each node has an integer `weight`, find a node (the weighted median) such that the sum of weights in its left subtree, the sum of weights in its right subtree, and the node's own weight are each at most half of the total weight of the entire tree.

## Examples
| Tree (pre‑order) | Weighted Median |
|------------------|-----------------|
| `[5, left=3, right=2]` | Node with weight `5` |
| `[1, left=10, right=1]` | Node with weight `10` (left subtree) |

## Approach
Perform a post‑order traversal to compute the total weight of each subtree. Then, in a second pass, locate the first node where both left and right subtree weights are ≤ totalWeight/2.

```text
FUNCTION FindWeightedMedian(root):
    // First pass: compute subtree weights
    FUNCTION ComputeWeight(node):
        IF node IS NULL: RETURN 0
        SET leftWeight ← ComputeWeight(node.left)
        SET rightWeight ← ComputeWeight(node.right)
        SET node.subWeight ← leftWeight + rightWeight + node.weight
        RETURN node.subWeight
    END FUNCTION

    SET total ← ComputeWeight(root)
    SET half ← total / 2

    // Second pass: find median
    FUNCTION Locate(node):
        IF node IS NULL: RETURN NULL
        SET leftW ← IF node.left IS NOT NULL THEN node.left.subWeight ELSE 0
        SET rightW ← IF node.right IS NOT NULL THEN node.right.subWeight ELSE 0
        IF leftW ≤ half AND rightW ≤ half:
            RETURN node
        // Prefer left side if it exceeds half
        IF leftW > half:
            RETURN Locate(node.left)
        RETURN Locate(node.right)
    END FUNCTION

    RETURN Locate(root)
```

## Walkthrough
| Step | Action |
|------|--------|
| 1 | Compute subtree weights for every node (post‑order). |
| 2 | Total weight = 23 (example). half = 11.5 |
| 3 | Starting at root, check left/right weights against half. |
| 4 | Move to child whose subtree exceeds half until condition satisfied. |
| 5 | Return the node meeting the median condition. |

## Complexity Analysis
- **Time:** O(N) – each node visited twice (once for weight computation, once for locating). 
- **Space:** O(H) recursion stack, where H is tree height (O(log N) for balanced, O(N) worst case).

## Follow-Up Questions
- How would you adapt the algorithm for a tree with parent pointers only? 
- Can the solution be extended to support dynamic updates of node weights?
- What changes are needed for an n‑ary tree instead of binary?

## Key Takeaway
By separating weight aggregation and median location into two traversals, we can efficiently identify the weighted median node in linear time.
