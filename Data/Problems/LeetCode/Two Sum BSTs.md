# 1214. Two Sum BSTs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/two-sum-bsts](https://leetcode.com/problems/two-sum-bsts)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

Given the roots of two binary search trees, `root1` and `root2`, return `true` if and only if there is a node in the first tree and a node in the second tree whose values sum up to a given integer `target`.

**Constraints:**
- The number of nodes in each tree is in the range `[1, 5000]`.
- `-10^9 <= Node.val, target <= 10^9`

## Examples

**Example 1:**
```
Input: root1 = [2,1,4], root2 = [1,0,3], target = 5
Output: true
Explanation: 2 and 3 sum up to 5.
```

**Example 2:**
```
Input: root1 = [0,-10,10], root2 = [5,1,7,0,2], target = 18
Output: false
```

## Approach
An in-order traversal of a BST yields its values in sorted order. Collect `a` = sorted values of tree 1 and `b` = sorted values of tree 2. Then run two pointers: `i` at the smallest value of `a`, `j` at the largest value of `b`.

- If `a[i] + b[j] == target` → found.
- If the sum is too small, the only way to increase it is `i++` (every `b[j'] > b[j]` was already ruled out).
- If the sum is too large, `j--`.

Each step discards one value that cannot be part of any valid pair, so the scan is linear.

```text
FUNCTION twoSumBSTs(root1, root2, target):
    a ← INORDER(root1)          // ascending
    b ← INORDER(root2)          // ascending
    i ← 0;  j ← len(b) - 1
    WHILE i < len(a) AND j ≥ 0:
        s ← a[i] + b[j]
        IF s = target: RETURN true
        IF s < target: i ← i + 1
        ELSE: j ← j - 1
    RETURN false

FUNCTION INORDER(node):
    IF node = null: RETURN []
    RETURN INORDER(node.left) + [node.val] + INORDER(node.right)
```

## Walkthrough
Example 1: `root1 = [2,1,4]`, `root2 = [1,0,3]`, `target = 5` → `a = [1,2,4]`, `b = [0,1,3]`.

| Step | i (a[i]) | j (b[j]) | Sum | Action |
|------|----------|----------|-----|--------|
| 1 | 0 (1) | 2 (3) | 4 | 4 < 5 → i++ |
| 2 | 1 (2) | 2 (3) | 5 | match → return true |

Output: `true`.

(Example 2: `a = [-10,0,10]`, `b = [0,1,2,5,7]`, sums `-3, 7, 17` are all `< 18`, `i` runs off the end → `false`.)

## Complexity Analysis
- **Time:** `O(m + n)` — two traversals plus a linear two-pointer scan.
- **Space:** `O(m + n)` for the value lists (plus `O(h)` recursion stack).

## Follow-Up Questions
1. How would you use only `O(h1 + h2)` extra space? (Use an ascending iterator on tree 1 and a descending iterator on tree 2, each backed by a stack, and run the same two-pointer logic.)
2. Alternative: store all values of tree 1 in a hash set and look up `target − v` for each `v` in tree 2 — `O(m + n)` time, `O(m)` space; or search each value in the other BST for `O(m · h2)` time and `O(h)` space.
3. How would you count all pairs (with duplicates) instead of just detecting one?

## Key Takeaway
In-order traversal turns each BST into a sorted array; the "sorted pair sum" two-pointer scan (smallest of one list, largest of the other) then answers the cross-tree two-sum in linear time.
