# 141. Linked List Cycle

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle](https://leetcode.com/problems/linked-list-cycle)
**Companies:** Accenture, Amazon, Autodesk, Bloomberg, Cisco, Cognizant, Goldman Sachs, Google, Huawei, Ibm, Infosys, Linkedin, Meta, Microsoft, Nagarro, Nvidia, Oracle, Palo Alto Networks, Qualcomm, Samsung, Sap, Tcs, Walmart Labs, Yahoo, Yandex

---

## 1. Problem Description

Given `head`, determine if the linked list has a **cycle**. Return `true` if there is a cycle, `false` otherwise.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,2,0,-4]`, pos = 1 | `true` | The tail connects to the node at index 1, forming a cycle. |
| `[1,2]`, pos = -1 | `false` | No cycle exists in the list. |

---

## 3. Approach

**Floyd's Cycle Detection (Tortoise and Hare)** – Use two pointers moving at different speeds. If they ever meet, a cycle exists; otherwise, the fast pointer reaches the end.

```text
FUNCTION hasCycle(head):
    SET slow ← head
    SET fast ← head
    WHILE fast != null AND fast.next != null:
        SET slow ← slow.next
        SET fast ← fast.next.next
        IF slow == fast:
            RETURN true
    RETURN false
```

---

## 4. Walkthrough

Consider the list `[3,2,0,-4]` with a cycle starting at index 1.

| Step | slow pointer | fast pointer | Observation |
|------|--------------|--------------|-------------|
| 0 | node 3 (head) | node 3 (head) | start |
| 1 | node 2 | node 0 | fast moves two steps |
| 2 | node 0 | node 2 | fast moves two steps |
| 3 | node -4 | node -4 | pointers meet → cycle detected |

---

## 5. Complexity Analysis

| Metric | Complexity |
|--------|------------|
| Time | O(n) – each node visited at most twice |
| Space | O(1) – only two pointers used |

---

## 6. Follow-Up Questions

1. How to return the node where the cycle begins? (LeetCode #142)
2. Can you detect a cycle in a directed graph?
3. What modifications are needed for a singly linked list with random pointers?

---

## Key Takeaway

> Floyd's tortoise and hare algorithm detects a cycle using two pointers with O(1) extra space.
