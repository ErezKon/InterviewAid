# 142. Linked List Cycle II

**Difficulty:** 🟡 Medium
**Acceptance:** 52.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle-ii](https://leetcode.com/problems/linked-list-cycle-ii)
**Companies:** Amazon, American Express, Autodesk, Bloomberg, Bytedance, Google, Infosys, Meta, Microsoft, Oracle, Paytm, Tcs, Vmware

---

## 1. Problem Description

Given a linked list, return the node where the cycle begins. If no cycle, return null.

---

## 2. Approach: Floyd's Algorithm Phase 2 — O(n) ✅

```
FUNCTION detectCycle(head):
    slow = fast = head

    // Phase 1: Detect cycle
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next
        IF slow == fast:
            // Phase 2: Find entrance
            slow = head
            WHILE slow != fast:
                slow = slow.next
                fast = fast.next
            RETURN slow

    RETURN null
```

### Why Phase 2 Works

When slow and fast meet, slow has traveled `d + k` steps (d = distance to cycle start, k = distance into cycle). Resetting slow to head and advancing both one step at a time: they'll meet at the cycle entrance after `d` steps.

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Key Takeaway

> Floyd's Phase 2: after detection, reset one pointer to head and advance both at speed 1. They meet at the cycle entrance. The math: if the meeting point is k steps into the cycle, head is also k steps from the cycle entrance (through the non-cycle path).
