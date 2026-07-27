# 437. Path Sum III

**Difficulty:** 🟡 Medium
**Acceptance:** 49.0%
**LeetCode:** [https://leetcode.com/problems/path-sum-iii](https://leetcode.com/problems/path-sum-iii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Millennium, Netapp, Salesforce, Tiktok, Zepto

---

## 1. Problem Description

Given a binary tree and `targetSum`, return the number of paths where the values sum to `targetSum`. A path goes downward (parent to child) but doesn't need to start at root or end at a leaf.

---

## 2. Approach: Prefix Sum + Hash Map — O(n) ✅

```
FUNCTION pathSum(root, targetSum):
    prefixMap = {0: 1}
    RETURN dfs(root, 0, targetSum, prefixMap)

FUNCTION dfs(node, currSum, target, prefixMap):
    IF node == null: RETURN 0

    currSum += node.val
    count = prefixMap.get(currSum - target, 0)

    prefixMap[currSum] = prefixMap.get(currSum, 0) + 1

    count += dfs(node.left, currSum, target, prefixMap)
    count += dfs(node.right, currSum, target, prefixMap)

    prefixMap[currSum] -= 1    // backtrack
    RETURN count
```

### Key Insight

Same as "subarray sum equals k" (#560) but on a tree path. `currSum - target` in the prefix map means there's a sub-path summing to target.

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Key Takeaway

> Prefix sum technique on tree paths. The hash map stores prefix sums along the current root-to-node path. Backtrack by decrementing when leaving a subtree.
