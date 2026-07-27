# 1171. Remove Zero Sum Consecutive Nodes from Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list](https://leetcode.com/problems/remove-zero-sum-consecutive-nodes-from-linked-list)
**Companies:** Amazon, Bloomberg, Bytedance, Google, Josh Technology, Uber

---

```
FUNCTION removeZeroSumSublists(head):
    dummy = ListNode(0, head)
    prefixSum = 0
    prefixMap = {0: dummy}
    node = head

    // First pass: record last node for each prefix sum
    WHILE node:
        prefixSum += node.val
        prefixMap[prefixSum] = node
        node = node.next

    // Second pass: skip to last node with same prefix sum
    prefixSum = 0
    node = dummy
    WHILE node:
        prefixSum += node.val
        node.next = prefixMap[prefixSum].next
        node = node.next

    RETURN dummy.next
```
