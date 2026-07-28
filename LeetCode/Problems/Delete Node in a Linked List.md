# 237. Delete Node in a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-linked-list](https://leetcode.com/problems/delete-node-in-a-linked-list)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle

---

## Problem Description

Delete a node from a singly linked list given only access to that node (not the head).

## Examples

| Input List | Node to Delete | Output List |
|------------|----------------|-------------|
| `4→5→1→9` | Node with value `5` | `4→1→9` |
| `4→5→1→9` | Node with value `1` | `4→5→9` |

*Explanation:* Copy the next node's value into the current node and bypass the next node, effectively removing the target.

## Approach

```
FUNCTION deleteNode(node):
    // Copy next node's data
    node.val = node.next.val
    // Bypass next node
    node.next = node.next.next
```

## Walkthrough

Consider list `4→5→1→9` and we need to delete node `5`.
1. `node` points to `5`. Its `next` is node `1`.
2. Copy `node.next.val` (`1`) into `node.val` → list becomes `4→1→1→9`.
3. Set `node.next` to `node.next.next` (skip the original `1`) → list becomes `4→1→9`.
4. The original node `5` now holds value `1` and points to `9`, achieving deletion in O(1).

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(1) |
| **Space** | O(1) |

## Follow-Up Questions

- How would you delete a node if you only had access to the head of the list?
- Can this technique be applied to a doubly linked list?
- What are the limitations of this approach regarding the tail node?

---

## Key Takeaway

> **Without access to the previous node, copy the next node's value into the current node and skip the next node. Effectively "becomes" the next node. O(1) trick.**