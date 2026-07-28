# 148. Sort List

**Difficulty:** 🟡 Medium
**Acceptance:** 58.0%
**LeetCode:** [https://leetcode.com/problems/sort-list](https://leetcode.com/problems/sort-list)
**Companies:** Amazon, Bloomberg, Bytedance, Google, Lyft, Meta, Microsoft, Oracle, Tiktok

---

## 1. Problem Description

Given the head of a linked list, sort it in **ascending order** in O(n log n) time and O(1) space.

---

## 2. Approach: Merge Sort — O(n log n) ✅

```text
FUNCTION sortList(head):
    IF head == null OR head.next == null:
        RETURN head
    // Split into two halves
    mid = getMid(head)
    right = mid.next
    mid.next = null
    left = sortList(head)
    right = sortList(right)
    RETURN merge(left, right)

FUNCTION getMid(head):
    slow = head
    fast = head.next
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next
    RETURN slow

FUNCTION merge(l1, l2):
    dummy = new ListNode(0)
    curr = dummy
    WHILE l1 AND l2:
        IF l1.val <= l2.val:
            curr.next = l1; l1 = l1.next
        ELSE:
            curr.next = l2; l2 = l2.next
        curr = curr.next
    curr.next = l1 IF l1 ELSE l2
    RETURN dummy.next
```

| Time | Space |
|------|-------|
| O(n log n) | O(log n) stack |

For O(1) space: bottom‑up merge sort (iterative, merge sublists of size 1, 2, 4, ...).

---

## Examples

| Input (list) | Output (sorted list) |
|--------------|----------------------|
| 4 → 2 → 1 → 3 | 1 → 2 → 3 → 4 |
| -1 → 5 → 3 → 4 → 0 | -1 → 0 → 3 → 4 → 5 |

## Walkthrough

1. **Find middle** – Using slow/fast pointers, the list `4→2→1→3` is split into `4→2` and `1→3`.
2. **Recursively sort halves** – Each half is sorted recursively until single‑node lists are reached.
3. **Merge** – Merge `2→4` with `1→3` by repeatedly choosing the smaller head node, resulting in `1→2→3→4`.
4. **Bottom‑up (optional)** – An iterative version merges sublists of increasing size, achieving O(1) extra space.

## Complexity Analysis

- **Time:** O(n log n) – each level of recursion merges all nodes, and there are log n levels.
- **Space:** O(log n) recursion stack for the top‑down approach; O(1) for the bottom‑up iterative version.

## Follow‑Up Questions

- How would you modify the algorithm to sort a doubly linked list?
- Can you sort the list in-place without recursion (iterative bottom‑up merge sort)?
- How would you handle sorting when the list contains cycles?

---

## Key Takeaway

> Merge sort is the natural choice for linked lists — no random access needed, and splitting at the middle is O(n) with slow/fast pointers. The merge step reuses existing nodes (no allocation).