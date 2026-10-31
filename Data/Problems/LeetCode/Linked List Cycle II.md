# 142. Linked List Cycle II

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle-ii](https://leetcode.com/problems/linked-list-cycle-ii)
**Companies:** Amazon, American Express, Autodesk, Bloomberg, Bytedance, Google, Infosys, Meta, Microsoft, Oracle, Paytm, Tcs, Vmware

---

## Problem Description

Given the `head` of a linked list, return *the node where the cycle begins. If there is no cycle, return *`null`.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to (**0-indexed**). It is `-1` if there is no cycle. **Note that** `pos` **is not passed as a parameter**.

**Do not modify** the linked list.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

**Constraints:**
- The number of the nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a **valid index** in the linked-list.

---

## Examples

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: tail connects to node index 1
Explanation: There is a cycle in the linked list, where tail connects to the second node.
```

**Example 2:**
```
Input: head = [1,2], pos = 0
Output: tail connects to node index 0
Explanation: There is a cycle in the linked list, where tail connects to the first node.
```

**Example 3:**
```
Input: head = [1], pos = -1
Output: no cycle
Explanation: There is no cycle in the linked list.
```

---

## Approach: Floyd's Tortoise and Hare — Phase 2 ✅

First detect a meeting point using two pointers moving at different speeds. Then reset one pointer to the head and move both one step at a time; they meet at the cycle entrance.

```text
FUNCTION detectCycle(head):
    // Phase 1: Find meeting point
    slow ← head
    fast ← head
    WHILE fast IS NOT NULL AND fast.next IS NOT NULL:
        slow ← slow.next
        fast ← fast.next.next
        IF slow == fast:
            // Phase 2: Locate start of cycle
            slow ← head
            WHILE slow != fast:
                slow ← slow.next
                fast ← fast.next
            RETURN slow
    RETURN null
```

---

## Walkthrough

Consider the list `3→2→0→-4` with a cycle back to `2`.

1. **Phase 1** – pointers move:
   - Step1: `slow=2`, `fast=0`
   - Step2: `slow=0`, `fast=2`
   - Step3: `slow=-4`, `fast=-4` → meeting point.
2. **Phase 2** – reset `slow` to head (`3`).
   - Move both one step:
     - `slow=2`, `fast=2` → they meet at node `2`, the cycle start.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

The algorithm traverses the list at most twice and uses constant extra space.

---

## Follow-Up Questions

1. How would you modify the algorithm to return the length of the cycle?
2. Can you detect a cycle using only O(1) extra space without the two-pointer technique?
3. What changes are needed if the list is a doubly linked list?

---

## Key Takeaway

> Floyd's algorithm detects a cycle and, after resetting one pointer to the head, the two pointers meet at the cycle's entry point.
