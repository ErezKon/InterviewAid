# 113. Path Sum II

**Difficulty:** 🟡 Medium
**Acceptance:** 60.0%
**LeetCode:** [https://leetcode.com/problems/path-sum-ii](https://leetcode.com/problems/path-sum-ii)
**Companies:** Amazon, Arista Networks, Bloomberg, Flipkart, Google, Meta, Microsoft, Oracle, Palo Alto Networks, Tiktok

---

## 1. Problem Description

Given a binary tree and `targetSum`, find all root‑to‑leaf paths where the sum of node values equals `targetSum`.

## 2. Examples

| Input Tree | `targetSum` | Output Paths |
|------------|------------|--------------|
| `[[5,4,8,11,null,13,4,7,2,null,null,5,1]]` | `22` | `[[5,4,11,2],[5,8,4,5]]` |
| `[[1,2,3]]` | `5` | `[]` |
| `[]` | `0` | `[]` |

## 3. Approach: DFS Backtracking — O(n²) ✅

```text
FUNCTION pathSum(root, targetSum):
    result ← []
    dfs(root, targetSum, [], result)
    RETURN result

FUNCTION dfs(node, remaining, path, result):
    IF node == null: RETURN
    path.ADD(node.val)
    IF node.left == null AND node.right == null AND remaining == node.val:
        result.ADD(COPY(path))
    ELSE:
        dfs(node.left, remaining - node.val, path, result)
        dfs(node.right, remaining - node.val, path, result)
    path.REMOVE_LAST()   // backtrack
```

## 4. Walkthrough

Consider the tree `[5,4,8,11,null,13,4,7,2,null,null,5,1]` with `targetSum = 22`.

1. Start at root `5`, path = `[5]`, remaining = `17`.
2. Go left to `4`, path = `[5,4]`, remaining = `13`.
3. Go left to `11`, path = `[5,4,11]`, remaining = `2`.
4. Left child `7` → remaining `-5` (dead end), backtrack.
5. Right child `2` → remaining `0`, leaf reached → add `[5,4,11,2]` to result.
6. Backtrack to `5`, explore right subtree `8` … similarly find `[5,8,4,5]`.

The algorithm explores all root‑to‑leaf paths, records those matching the sum, and backtracks to explore alternatives.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n²) worst case (copying each valid path) | O(n) recursion stack |

## 6. Follow-Up Questions

* How would you modify the solution to return paths in any order without copying the path list each time?
* Can you solve the problem using an iterative stack‑based DFS?
* What changes are needed if the tree can contain negative values?

## Key Takeaway

> Standard tree DFS with path tracking and backtracking. Check the sum condition only at leaf nodes.
