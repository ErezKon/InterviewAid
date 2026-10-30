# 237. Delete Node in a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/delete-node-in-a-linked-list](https://leetcode.com/problems/delete-node-in-a-linked-list)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle

---

## Problem Description

There is a singly-linked list `head` and we want to delete a node `node` in it.

You are given the node to be deleted `node`. You will **not be given access** to the first node of `head`.

All the values of the linked list are **unique**, and it is guaranteed that the given node `node` is not the last node in the linked list.

Delete the given node. Note that by deleting the node, we do not mean removing it from memory. We mean:

- The value of the given node should not exist in the linked list.
- The number of nodes in the linked list should decrease by one.
- All the values before `node` should be in the same order.
- All the values after `node` should be in the same order.

**Custom testing:**

- For the input, you should provide the entire linked list `head` and the node to be given `node`. `node` should not be the last node of the list and should be an actual node in the list.
- We will build the linked list and pass the node to your function.
- The output will be the entire list after calling your function.

**Constraints:**

- The number of the nodes in the given list is in the range `[2, 1000]`.
- `-1000 <= Node.val <= 1000`
- The value of each node in the list is **unique**.
- The `node` to be deleted is **in the list** and is **not a tail** node.

## Examples

```
Example 1:
  Input: head = [4,5,1,9], node = 5
  Output: [4,1,9]
  Explanation: You are given the second node with value 5, the linked list should become 4 -> 1 -> 9 after calling your function.
```

```
Example 2:
  Input: head = [4,5,1,9], node = 1
  Output: [4,5,9]
  Explanation: You are given the third node with value 1, the linked list should become 4 -> 5 -> 9 after calling your function.
```

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