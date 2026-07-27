# 1273. Delete Tree Nodes

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-tree-nodes](https://leetcode.com/problems/delete-tree-nodes)
**Companies:** Microsoft

---

## Problem Description

Given a tree with values, delete all subtrees whose node values sum to zero. Return the number of remaining nodes.

---

## Approach

```
FUNCTION deleteTreeNodes(nodes, parent, value):
    // Process children before parents (post-order via topological sort)
    // For each node, sum = value[node] + sum of children
    // If sum == 0, set count to 0 (delete entire subtree)
    // Otherwise, count = 1 + sum of children counts

    sum[i] = value[i]; cnt[i] = 1
    FOR node IN reverse topological order:
        sum[parent[node]] += sum[node]
        cnt[parent[node]] += cnt[node]
        IF sum[node] == 0: cnt[node] = 0

    RETURN cnt[root]
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Key Takeaway

> **Bottom-up aggregation: compute subtree sums post-order. If a subtree sums to zero, set its count to 0 (prune). Propagate sums and counts to parents.**
