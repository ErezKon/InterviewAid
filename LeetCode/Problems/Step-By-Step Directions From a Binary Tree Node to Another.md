# 2096. Step-By-Step Directions From a Binary Tree Node to Another

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another](https://leetcode.com/problems/step-by-step-directions-from-a-binary-tree-node-to-another)
**Companies:** Amazon, Databricks, Google, Meta, Oracle, Snowflake, Tiktok

---

## Approach: Find LCA + Build Path — O(n) ✅

```
FUNCTION getDirections(root, startValue, destValue):
    // Find paths from root to start and dest
    pathToStart = findPath(root, startValue)
    pathToDest = findPath(root, destValue)

    // Remove common prefix (LCA)
    i = 0
    WHILE i < len(pathToStart) AND i < len(pathToDest) AND pathToStart[i] == pathToDest[i]:
        i += 1

    // Go up from start to LCA, then down to dest
    RETURN "U" * (len(pathToStart) - i) + pathToDest[i:]
```
