# 1721. Swapping Nodes in a Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/swapping-nodes-in-a-linked-list](https://leetcode.com/problems/swapping-nodes-in-a-linked-list)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description
Given the head of a singly‑linked list and an integer `k`, swap the values of the `k`‑th node from the beginning with the `k`‑th node from the end (the list is 1‑indexed). Return the head of the modified list.

## Examples
**Example 1:**
```
Input: head = [1,2,3,4,5], k = 2
Output: [1,4,3,2,5]
Explanation: The 2nd node from the start is 2, the 2nd node from the end is 4. Their values are swapped.
```

**Example 2:**
```
Input: head = [7,9,6,6,7,8,3,0,9,5], k = 5
Output: [7,9,6,6,8,7,3,0,9,5]
```

## Approach
1. Traverse the list to locate the `k`‑th node from the start (`first`).
2. Use a two‑pointer technique: start a `fast` pointer at `first` and a `second` pointer at the head. Advance both until `fast` reaches the last node; `second` will then point to the `k`‑th node from the end.
3. Swap the `val` fields of `first` and `second`.

```text
FUNCTION swapNodes(head, k):
    // Find kth from beginning
    SET first ← head
    FOR i ← 1 TO k-1:
        SET first ← first.next
    // Find kth from end using two pointers
    SET second ← head
    SET fast ← first
    WHILE fast.next IS NOT NULL:
        SET fast ← fast.next
        SET second ← second.next
    // Swap values
    SET temp ← first.val
    SET first.val ← second.val
    SET second.val ← temp
    RETURN head
```

## Walkthrough
For `head = [1,2,3,4,5]`, `k = 2`:
- After first loop, `first` points to node with value 2.
- `fast` starts at node 2; moving `fast` and `second` together reaches end with `second` at node 4.
- Swapping values yields list `[1,4,3,2,5]`.

## Complexity Analysis
- **Time:** O(n) – one pass to locate both nodes.
- **Space:** O(1) – only a few pointers.

## Follow‑Up Questions
1. How would you modify the algorithm to swap the actual nodes instead of just their values?
2. Can the solution be adapted for a doubly‑linked list with O(1) node swaps?
3. What changes are needed if `k` could be larger than the list length?

## Key Takeaway
A single traversal with a fast‑slow pointer pair locates the symmetric node from the end, enabling an in‑place value swap in constant extra space.
