# 369. Plus One Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/plus-one-linked-list](https://leetcode.com/problems/plus-one-linked-list)
**Companies:** Amazon, Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given a non-negative integer represented as a linked list of digits, *plus one to the integer*.

The digits are stored such that the most significant digit is at the `head` of the list.

**Constraints:**
- The number of nodes in the linked list is in the range `[1, 100]`.
- `0 <= Node.val <= 9`
- The number represented by the linked list does not contain leading zeros except for the zero itself.

## Examples

**Example 1:**
```
Input: head = [1,2,3]
Output: [1,2,4]
```

**Example 2:**
```
Input: head = [0]
Output: [1]
```

## Approach
**Algorithm:** Single pass to locate rightmost non‑9 node, then increment and set trailing 9s to 0 (no reversal needed).
**Key Insight:** The first node from the right that is not a 9 can be safely incremented; all nodes after it become 0. Using a sentinel simplifies handling an overflow that creates a new most‑significant digit.

```text
FUNCTION plusOne(head):
    sentinel ← NEW ListNode(0)
    sentinel.next ← head
    notNine ← sentinel
    node ← head
    WHILE node IS NOT NULL:
        IF node.val != 9:
            notNine ← node
        node ← node.next
    // Increment the rightmost non‑9 digit
    notNine.val ← notNine.val + 1
    // Set all following digits to 0
    node ← notNine.next
    WHILE node IS NOT NULL:
        node.val ← 0
        node ← node.next
    RETURN sentinel IF sentinel.val == 1 ELSE head
```

## Walkthrough
For `head = [9,9,9]`:
| Step | node.val | notNine points to | Action |
|------|----------|-------------------|--------|
| Start | 9,9,9 | sentinel (0) | Traverse list, never updates notNine |
| After loop | notNine = sentinel | Increment sentinel to 1 |
| Reset tail | All three original nodes set to 0 |
Result list becomes `[1,0,0,0]`.

## Complexity Analysis
- **Time:** O(n) where n is the number of nodes.
- **Space:** O(1) extra space (ignoring output list).

## Follow‑Up Questions
1. How would you modify the algorithm to add an arbitrary integer k instead of 1?
2. Can you solve the problem without using a sentinel node?
3. How would you handle a doubly linked list representation?

## Key Takeaway
Finding the rightmost non‑9 node lets you increment the number in a single pass without reversing the list.
