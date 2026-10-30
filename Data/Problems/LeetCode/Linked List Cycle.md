# 141. Linked List Cycle

**Difficulty:** 🟢 Easy
**Acceptance:** 50.0%
**LeetCode:** [https://leetcode.com/problems/linked-list-cycle](https://leetcode.com/problems/linked-list-cycle)
**Companies:** Accenture, Amazon, Autodesk, Bloomberg, Cisco, Cognizant, Goldman Sachs, Google, Huawei, Ibm, Infosys, Linkedin, Meta, Microsoft, Nagarro, Nvidia, Oracle, Palo Alto Networks, Qualcomm, Samsung, Sap, Tcs, Walmart Labs, Yahoo, Yandex

---

## 1. Problem Description

Given `head`, the head of a linked list, determine if the linked list has a cycle in it.

There is a cycle in a linked list if there is some node in the list that can be reached again by continuously following the `next` pointer. Internally, `pos` is used to denote the index of the node that tail's `next` pointer is connected to. **Note that `pos` is not passed as a parameter**.

Return `true`* if there is a cycle in the linked list*. Otherwise, return `false`.

**Follow up:** Can you solve it using `O(1)` (i.e. constant) memory?

**Constraints:**
- The number of the nodes in the list is in the range `[0, 10^4]`.
- `-10^5 <= Node.val <= 10^5`
- `pos` is `-1` or a **valid index** in the linked-list.

---

## 2. Examples

**Example 1:**
```
Input: head = [3,2,0,-4], pos = 1
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 1st node (0-indexed).
```

**Example 2:**
```
Input: head = [1,2], pos = 0
Output: true
Explanation: There is a cycle in the linked list, where the tail connects to the 0th node.
```

**Example 3:**
```
Input: head = [1], pos = -1
Output: false
Explanation: There is no cycle in the linked list.
```

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
