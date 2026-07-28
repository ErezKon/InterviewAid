# 203. Remove Linked List Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/remove-linked-list-elements](https://leetcode.com/problems/remove-linked-list-elements)
**Companies:** Amazon, Apple, Arista Networks, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description
Given the head of a singly‑linked list and an integer `val`, delete all nodes whose `val` equals the given value. Return the head of the modified list.

## Examples
**Example 1**
```
Input: head = [1,2,6,3,4,5,6], val = 6
Output: [1,2,3,4,5]
Explanation: Nodes with value 6 are removed.
```
**Example 2**
```
Input: head = [], val = 1
Output: []
```

## Approach
Use a dummy sentinel node before the head. Iterate with a pointer `curr`. If `curr.next.val` equals `val`, bypass that node by linking `curr.next` to `curr.next.next`. Otherwise, move `curr` forward.

```text
FUNCTION removeElements(head, val):
    dummy ← NEW ListNode(0)
    dummy.next ← head
    curr ← dummy
    WHILE curr.next ≠ NULL:
        IF curr.next.val = val:
            curr.next ← curr.next.next
        ELSE:
            curr ← curr.next
    RETURN dummy.next
```

## Walkthrough
For `[1,2,6,3,4,5,6]` with `val=6`:
| Step | curr.val | Action | List state |
|------|----------|--------|------------|
| 1 | dummy | next.val=1 ≠6 → move | — |
| 2 | 1 | next.val=2 ≠6 → move |
| 3 | 2 | next.val=6 =6 → skip node 6 |
| 4 | 2 | next.val=3 ≠6 → move |
| 5 | 3 | next.val=4 ≠6 → move |
| 6 | 4 | next.val=5 ≠6 → move |
| 7 | 5 | next.val=6 =6 → skip last 6 |
Result `[1,2,3,4,5]`.

## Complexity Analysis
Time: `O(n)` where `n` is the number of nodes.
Space: `O(1)` extra.

## Follow-Up Questions
1. How would you solve the problem recursively?
2. Can you perform the removal in place without a dummy node?
3. What changes are needed if the list is doubly linked?

## Key Takeaway
A dummy node simplifies edge‑case handling, allowing uniform removal of target‑valued nodes in a single pass.
