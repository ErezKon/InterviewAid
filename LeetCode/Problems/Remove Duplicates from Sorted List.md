# 83. Remove Duplicates from Sorted List

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-list](https://leetcode.com/problems/remove-duplicates-from-sorted-list)
**Companies:** Adobe, Amazon, Bloomberg, Google, Mcdonalds, Meta, Microsoft, Nvidia, Oracle, Tcs

---

```
FUNCTION deleteDuplicates(head):
    curr = head
    WHILE curr AND curr.next:
        IF curr.val == curr.next.val:
            curr.next = curr.next.next
        ELSE:
            curr = curr.next
    RETURN head
```
