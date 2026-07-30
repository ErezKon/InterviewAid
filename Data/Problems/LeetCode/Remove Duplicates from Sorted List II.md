# 82. Remove Duplicates from Sorted List II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii](https://leetcode.com/problems/remove-duplicates-from-sorted-list-ii)
**Companies:** Amazon, Apple, Arista Networks, Blackbuck, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle, Tiktok

---

## Problem Description
Given the head of a sorted singly‑linked list, delete all nodes that have duplicate numbers, leaving only distinct numbers from the original list. Return the linked list sorted as well.

## Examples
**Example 1**
```
Input: head = [1,2,3,3,4,4,5]
Output: [1,2,5]
Explanation: Nodes with values 3 and 4 appear more than once and are removed.
```
**Example 2**
```
Input: head = [1,1,1,2,3]
Output: [2,3]
```

## Approach
Use a dummy sentinel node before the head. Iterate with two pointers `prev` (last node known to be unique) and `curr`. When `curr` has a next node with the same value, skip the entire block of duplicates by advancing `curr` until the value changes, then link `prev.next` to the node after the duplicate block. Otherwise, move `prev` forward.

```text
FUNCTION deleteDuplicates(head):
    dummy ← NEW ListNode(0)
    dummy.next ← head
    prev ← dummy
    curr ← head
    WHILE curr ≠ NULL:
        IF curr.next ≠ NULL AND curr.val = curr.next.val:
            dupVal ← curr.val
            WHILE curr ≠ NULL AND curr.val = dupVal:
                curr ← curr.next
            prev.next ← curr
        ELSE:
            prev ← prev.next
            curr ← curr.next
    RETURN dummy.next
```

## Walkthrough
For `[1,2,3,3,4,4,5]`:
| Step | curr.val | Action | List after action |
|------|----------|--------|-------------------|
| 1 | 1 | unique → move prev | prev at 1 |
| 2 | 2 | unique → move prev | prev at 2 |
| 3 | 3 | duplicate block (3,3) → skip | prev.next points to 4 |
| 4 | 4 | duplicate block (4,4) → skip | prev.next points to 5 |
| 5 | 5 | unique → keep |
Result `[1,2,5]`.

## Complexity Analysis
Time: `O(n)` where `n` is the number of nodes.
Space: `O(1)` extra.

## Follow-Up Questions
1. How would you modify the algorithm to keep one copy of each duplicated value instead of removing all?
2. Can the solution be adapted for a doubly‑linked list without changing complexity?
3. What changes are needed if the list is not sorted?

## Key Takeaway
A sentinel node and careful pointer manipulation let you remove entire duplicate groups in a single pass.
