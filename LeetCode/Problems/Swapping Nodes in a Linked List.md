# 1721. Swapping Nodes in a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swapping-nodes-in-a-linked-list](https://leetcode.com/problems/swapping-nodes-in-a-linked-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

```
FUNCTION swapNodes(head, k):
    // Find kth from beginning
    first = head
    FOR _ ← 1 TO k - 1: first = first.next

    // Find kth from end using two pointers
    second = head; fast = first
    WHILE fast.next:
        fast = fast.next
        second = second.next

    SWAP(first.val, second.val)
    RETURN head
```
