# 272. Closest Binary Search Tree Value II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/closest-binary-search-tree-value-ii](https://leetcode.com/problems/closest-binary-search-tree-value-ii)
**Companies:** Amazon, Google, Linkedin
---

## Problem Description
Given the root of a Binary Search Tree (BST), a target value `target` (a floating point number), and an integer `k`, return the `k` values in the BST that are closest to `target`. The result can be in any order.

## Examples
- **Example 1:** `root = [4,2,5,1,3]`, `target = 3.714286`, `k = 2` → Output: `[4,3]`.
- **Example 2:** `root = [1]`, `target = 0.0`, `k = 1` → Output: `[1]`.

## Approach
1. Perform an inorder traversal of the BST to obtain a sorted list `values`.
2. Use binary search to locate the insertion point of `target` in `values`.
3. Expand a sliding window outward from that point, each time picking the closer side until `k` elements are collected.

### Pseudocode
```text
FUNCTION closestKValues(root, target, k):
    values ← inorder(root)               // sorted array
    lo ← bisect_left(values, target) - 1
    hi ← lo + 1
    result ← []
    WHILE LENGTH(result) < k:
        IF lo < 0:
            APPEND values[hi] TO result; hi ← hi + 1
        ELSE IF hi >= LENGTH(values):
            APPEND values[lo] TO result; lo ← lo - 1
        ELSE IF ABS(values[lo] - target) <= ABS(values[hi] - target):
            APPEND values[lo] TO result; lo ← lo - 1
        ELSE:
            APPEND values[hi] TO result; hi ← hi + 1
    RETURN result
```

## Walkthrough
For the tree `[4,2,5,1,3]` and `target = 3.714286`:
1. Inorder yields `values = [1,2,3,4,5]`.
2. Insertion point is index 3 (`4`). `lo = 2` (`3`), `hi = 3` (`4`).
3. Compare distances: `|3-3.714| = 0.714`, `|4-3.714| = 0.286` → pick `4`.
4. Move `hi` to 4 (`5`). Next compare `3` vs `5`; pick `3`.
5. Collected `[4,3]`.

## Complexity Analysis
Time: O(n) for inorder + O(log n) for binary search + O(k) for window → O(n). Space: O(n) for the sorted list.

## Follow-Up Questions
- How to solve the problem with O(k) extra space without storing all nodes?
- Can you adapt the algorithm for a stream of BST insertions?
- What changes if the BST is not balanced?

---

## Key Takeaway

> Transform the BST into a sorted array via inorder traversal, then use a sliding window around the target to extract the `k` closest values efficiently.
