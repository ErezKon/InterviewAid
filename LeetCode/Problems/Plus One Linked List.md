# 369. Plus One Linked List

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Google
---

```
FUNCTION plusOne(head):
    // Reverse, add 1, reverse back
    // Or find rightmost non-9 digit
    sentinel = ListNode(0, head)
    notNine = sentinel
    node = head
    WHILE node:
        IF node.val != 9: notNine = node
        node = node.next
    notNine.val += 1
    node = notNine.next
    WHILE node: node.val = 0; node = node.next
    RETURN sentinel IF sentinel.val == 1 ELSE head
```
