# 203. Remove Linked List Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-linked-list-elements](https://leetcode.com/problems/remove-linked-list-elements)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Google, Meta, Microsoft, Oracle

---

```
FUNCTION removeElements(head, val):
    dummy = ListNode(0, head)
    curr = dummy
    WHILE curr.next:
        IF curr.next.val == val:
            curr.next = curr.next.next
        ELSE:
            curr = curr.next
    RETURN dummy.next
```
