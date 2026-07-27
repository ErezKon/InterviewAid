# 82. Remove Duplicates from Sorted List II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii)
**Companies:** Amazon, Apple, Arista Networks, Blackbuck, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle, Tiktok

---

## Approach: Sentinel + Skip Duplicates — O(n) ✅

```
FUNCTION deleteDuplicates(head):
    dummy = new ListNode(0, head)
    prev = dummy

    WHILE head:
        IF head.next AND head.val == head.next.val:
            // Skip all nodes with this value
            WHILE head.next AND head.val == head.next.val:
                head = head.next
            prev.next = head.next
        ELSE:
            prev = prev.next
        head = head.next

    RETURN dummy.next
```

`prev` stays at the last known unique node. Skip entire duplicate groups.
