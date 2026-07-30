# 437. Path Sum III

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/path-sum-iii](https://leetcode.com/problems/path-sum-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Millennium, Netapp, Salesforce, Tiktok, Zepto

---

## 1. Problem Description

Given a binary tree and `targetSum`, return the number of paths where the sum of node values equals `targetSum`. A path must go downward (parent to child) but can start and end at any nodes.

## 2. Examples

| Input Tree | `targetSum` | Output |
|------------|------------|--------|
| `[[10,5,-3,3,2,null,11,3,-2,null,1]]` | `8` | `3` |
| `[[5,4,8,11,null,13,4,7,2,null,null,5,1]]` | `22` | `3` |
| `[]` | `0` | `0` |

## 3. Approach: Prefix Sum + Hash Map — O(n) ✅

```text
FUNCTION pathSum(root, targetSum):
    // Map stores prefix sum → frequency along current path
    prefixMap ← {0: 1}
    RETURN dfs(root, 0, targetSum, prefixMap)

FUNCTION dfs(node, currSum, target, prefixMap):
    IF node == null: RETURN 0
    SET currSum ← currSum + node.val
    SET count ← prefixMap.get(currSum - target, 0)
    // Record current prefix sum
    prefixMap[currSum] ← prefixMap.get(currSum, 0) + 1
    // Explore children
    SET count ← count + dfs(node.left, currSum, target, prefixMap)
    SET count ← count + dfs(node.right, currSum, target, prefixMap)
    // Backtrack: remove current prefix sum
    prefixMap[currSum] ← prefixMap[currSum] - 1
    RETURN count
```

## 4. Walkthrough

Consider the tree `[[10,5,-3,3,2,null,11,3,-2,null,1]]` with `targetSum = 8`.

1. Start at root `10`, `currSum = 10`. `prefixMap = {0:1,10:1}`. `currSum - target = 2` not in map → count = 0.
2. Move to left child `5`, `currSum = 15`. `prefixMap = {0:1,10:1,15:1}`. `15-8=7` not in map.
3. Left child `3`, `currSum = 18`. `prefixMap = {0:1,10:1,15:1,18:1}`. `18-8=10` exists (1) → count = 1 (path 5→3).
4. Left child `3` (leaf), `currSum = 21`. `21-8=13` not in map. Backtrack, remove 21.
5. Right child `-2`, `currSum = 16`. `16-8=8` not in map. Backtrack, remove 16.
6. Backtrack to node `5`, remove 15.
7. Right child `2`, `currSum = 12`. `12-8=4` not in map. Its right child `1`, `currSum = 13`. `13-8=5` not in map. Backtrack all.
8. Back to root, explore right subtree `-3`, `currSum = 7`. `7-8=-1` not in map. Its right child `11`, `currSum = 18`. `18-8=10` exists → count = 2 (path -3→11).
9. Continue, left child `3` of `11` gives `currSum = 21` → `21-8=13` not in map.
10. Finally, the path consisting of single node `8` (right child of root) yields `currSum = 2` after backtracking root, `2-8=-6` not in map, but when visiting node `8` directly from root, `currSum = 2`? Actually root backtrack resets to 0, then node `-3` etc. The third valid path is the single node `8` (right child of root) when `currSum = 8` → `8-8=0` found in map → count = 3.

Total count = 3.

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n) where n is number of nodes | O(n) for the hash map and recursion stack |

## 6. Follow-Up Questions

* How would the solution change if paths could go upward as well as downward?
* Can you adapt the algorithm to return the actual paths instead of just the count?
* What is the impact on space complexity if the tree is extremely deep (e.g., a linked list)?

## Key Takeaway

> Use a prefix‑sum hash map while performing a DFS. The map records sums along the current root‑to‑node path, and a lookup of `currSum‑target` tells how many earlier prefixes form a valid downward path.
