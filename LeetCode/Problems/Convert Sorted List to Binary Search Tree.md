# 109. Convert Sorted List to Binary Search Tree

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree](https://leetcode.com/problems/convert-sorted-list-to-binary-search-tree)
**Companies:** Amazon, Apple, Bloomberg, Google, Lyft, Meta, Microsoft, Tcs, Zenefits

---

## Approach: Fast/Slow Pointer — O(n log n) ✅

```
FUNCTION sortedListToBST(head):
    IF head == null: RETURN null
    IF head.next == null: RETURN TreeNode(head.val)

    // Find middle
    prev = null
    slow = fast = head
    WHILE fast AND fast.next:
        prev = slow
        slow = slow.next
        fast = fast.next.next

    prev.next = null    // split list

    root = TreeNode(slow.val)
    root.left = sortedListToBST(head)
    root.right = sortedListToBST(slow.next)
    RETURN root
```

O(n) alternative: inorder simulation with a global pointer.
