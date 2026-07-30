# 369. Plus One Linked List

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google

---

## Problem Description
Given the head of a non‑empty singly linked list where each node contains a single digit of a non‑negative integer (most significant digit at the head), add one to the integer and return the head of the resulting linked list. The list may contain leading zeros.

## Examples
**Example 1:**
```
Input: head = [1,2,3]
Output: [1,2,4]
Explanation: 123 + 1 = 124.
```
**Example 2:**
```
Input: head = [9,9,9]
Output: [1,0,0,0]
Explanation: 999 + 1 = 1000.
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
