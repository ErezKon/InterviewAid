# 2487. Remove Nodes From Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-nodes-from-linked-list](https://leetcode.com/problems/remove-nodes-from-linked-list)
**Companies:** Amazon, Google, Meta, Microsoft

---

```
FUNCTION removeNodes(head):
    // Monotonic stack: keep only nodes where no greater node exists to the right
    stack = []
    curr = head
    WHILE curr:
        WHILE stack AND stack[-1].val < curr.val: stack.POP()
        stack.PUSH(curr)
        curr = curr.next

    FOR i ← 0 TO len(stack) - 2: stack[i].next = stack[i+1]
    stack[-1].next = null
    RETURN stack[0]
```
