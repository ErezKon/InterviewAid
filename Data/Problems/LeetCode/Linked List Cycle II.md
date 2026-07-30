# 142. Linked List Cycle II

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle-ii](https://leetcode.com/problems/linked-list-cycle-ii)
**Companies:** Amazon, American Express, Autodesk, Bloomberg, Bytedance, Google, Infosys, Meta, Microsoft, Oracle, Paytm, Tcs, Vmware

---

## Problem Description

Given the head of a singly linked list, return the node where the cycle begins. If there is no cycle, return `null`. The list may contain a cycle that loops back to a previous node.

---

## Examples

| Input (list) | Output (node) | Explanation |
|--------------|---------------|-------------|
| `3→2→0→-4` (cycle back to node with value `2`) | Node `2` | The cycle starts at the node with value `2`. |
| `1→2` (no cycle) | `null` | No cycle exists, so return `null`. |
| `1` (cycle to itself) | Node `1` | Single node points to itself, forming a cycle at that node. |

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
2. Can you detect a cycle using only O(1) extra space without the two‑pointer technique?
3. What changes are needed if the list is a doubly linked list?

---

## Key Takeaway

> Floyd's algorithm detects a cycle and, after resetting one pointer to the head, the two pointers meet at the cycle's entry point.
