# 652. Find Duplicate Subtrees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-duplicate-subtrees](https://leetcode.com/problems/find-duplicate-subtrees)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Phonepe, Salesforce, Yandex

---

## Problem Description

Return the root of all duplicate subtrees in a binary tree. Two subtrees are duplicates if they have the same structure and node values.

## Examples

**Example 1:**
```
Input: root = [1,2,3,4,null,2,4,null,null,4]
Output: [[2,4],[4]]
Explanation: The duplicate subtrees are:
- Subtree rooted at node with value 2 having left child 4.
- Subtree consisting of a single node with value 4.
```

**Example 2:**
```
Input: root = [2,1,1]
Output: [[1]]
Explanation: Two leaf nodes with value 1 are duplicate subtrees.
```

## Approach: Serialize + Hash Map — O(n) ✅

```text
FUNCTION findDuplicateSubtrees(root):
    // Map serialized subtree string to occurrence count
    SET count ← defaultdict(int)
    SET result ← []

    FUNCTION serialize(node):
        IF node == NULL:
            RETURN "#"
        SET left ← serialize(node.left)
        SET right ← serialize(node.right)
        SET key ← CONCAT(node.val, ',', left, ',', right)
        SET count[key] ← count[key] + 1
        IF count[key] == 2:
            APPEND node TO result
        RETURN key

    CALL serialize(root)
    RETURN result
```

## Walkthrough

Consider the tree from Example 1.
| Step | Node | Serialized Form | count map update |
|------|------|----------------|-----------------|
| 1 | leaf 4 (left) | "4,#,#" | {"4,#,#":1}
| 2 | leaf 4 (right) | "4,#,#" | {"4,#,#":2} → add node to result |
| 3 | node 2 (left) | "2,4,#,#" | {"2,4,#,#":1}
| 4 | node 2 (right) | "2,4,#,#" | {"2,4,#,#":2} → add node to result |
| ... | continue up to root |
The algorithm records each subtree serialization; when a serialization appears the second time, the node is added to the result list.

## Complexity Analysis

- **Time:** O(N), each node visited once for serialization.
- **Space:** O(N) for the hashmap storing serializations and recursion stack.

## Follow-Up Questions

1. How would you modify the solution to return only the values of duplicate subtrees instead of the root nodes?
2. Can you design an iterative version without recursion?
3. How would you handle very large trees that cannot fit entirely in memory?

---

## Key Takeaway

> **Serialize subtrees bottom-up, use a hashmap to detect duplicates. Add to result on count == 2 to avoid duplicates in output.**