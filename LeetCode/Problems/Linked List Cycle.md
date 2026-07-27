# 141. Linked List Cycle

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle](https://leetcode.com/problems/linked-list-cycle)
**Companies:** Accenture, Amazon, Autodesk, Bloomberg, Cisco, Cognizant, Goldman Sachs, Google, Huawei, Ibm, Infosys, Linkedin, Meta, Microsoft, Nagarro, Nvidia, Oracle, Palo Alto Networks, Qualcomm, Samsung, Sap, Tcs, Walmart Labs, Yahoo, Yandex

---

## 1. Problem Description

Given `head`, determine if the linked list has a **cycle**. Return `true` if there is a cycle, `false` otherwise.

---

## 2. Approach: Floyd's Cycle Detection — O(n) ✅

```
FUNCTION hasCycle(head):
    slow = head
    fast = head

    WHILE fast != null AND fast.next != null:
        slow = slow.next
        fast = fast.next.next
        IF slow == fast:
            RETURN true

    RETURN false
```

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## 3. Follow-Up: Find the cycle start (LeetCode #142)?

After slow and fast meet, reset one to head. Advance both one step at a time. They meet at the cycle start.

```
FUNCTION detectCycle(head):
    slow = fast = head
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next
        IF slow == fast:
            slow = head
            WHILE slow != fast:
                slow = slow.next
                fast = fast.next
            RETURN slow
    RETURN null
```

---

## Key Takeaway

> Floyd's tortoise and hare algorithm: if there's a cycle, the fast pointer (moving 2 steps) will eventually catch the slow pointer (moving 1 step). O(1) space.
