# 86. Partition List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partition-list](https://leetcode.com/problems/partition-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION partition(head, x):
    before = beforeHead = ListNode(0)
    after = afterHead = ListNode(0)

    WHILE head:
        IF head.val < x:
            before.next = head
            before = before.next
        ELSE:
            after.next = head
            after = after.next
        head = head.next

    after.next = null
    before.next = afterHead.next
    RETURN beforeHead.next
```

Two dummy lists: one for < x, one for >= x. Concatenate.
