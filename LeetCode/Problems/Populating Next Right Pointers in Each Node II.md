# 117. Populating Next Right Pointers in Each Node II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii](https://leetcode.com/problems/populating-next-right-pointers-in-each-node-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Snowflake, Uber

---

## Approach: Level Traversal Using Next Pointers — O(n), O(1) ✅

Unlike #116 (perfect tree), this works for any binary tree. Use a dummy node at each level.

```
FUNCTION connect(root):
    curr = root

    WHILE curr:
        dummy = ListNode(0)
        tail = dummy

        WHILE curr:
            IF curr.left:
                tail.next = curr.left
                tail = tail.next
            IF curr.right:
                tail.next = curr.right
                tail = tail.next
            curr = curr.next

        curr = dummy.next    // move to next level

    RETURN root
```

Thread children of the current level using a dummy node. O(1) space (no queue).
