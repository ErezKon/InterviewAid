# 652. Find Duplicate Subtrees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-duplicate-subtrees](https://leetcode.com/problems/find-duplicate-subtrees)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Phonepe, Salesforce, Yandex

---

## Problem Description

Return the root of all duplicate subtrees in a binary tree. Two subtrees are duplicates if they have the same structure and node values.

---

## Approach: Serialize + Hash Map — O(n) ✅

```
FUNCTION findDuplicateSubtrees(root):
    count = {}
    result = []

    FUNCTION serialize(node):
        IF node == null: RETURN "#"
        key = f"{node.val},{serialize(node.left)},{serialize(node.right)}"
        count[key] = count.get(key, 0) + 1
        IF count[key] == 2:
            result.ADD(node)
        RETURN key

    serialize(root)
    RETURN result
```

Serialize each subtree into a string. Duplicate serializations = duplicate subtrees. Optimize to O(n) by mapping serializations to integer IDs.

---

## Key Takeaway

> **Serialize subtrees bottom-up, use a hashmap to detect duplicates. Add to result on count == 2 to avoid duplicates in output.**
