
# 206. Reverse Linked List

**Difficulty:** 🟢 Easy
**Acceptance:** 78.2%
**LeetCode:** [https://leetcode.com/problems/reverse-linked-list](https://leetcode.com/problems/reverse-linked-list)
**Companies:** Accenture, Adobe, Amazon, Apple, Bloomberg, Bytedance, Cisco, Epam Systems, Goldman Sachs, Google, Ibm, Jio, Linkedin, Luxoft, Meta, Microsoft, Nvidia, Oracle, Paytm, Qualcomm, Sap, Servicenow, Siemens, Snapchat, Tcs, Tiktok, Twitter, Uber, Visa, Yahoo, Yandex, Yelp, Zenefits, Zynga

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Iterative — O(n) ✅](#3-approach-1-iterative--on-)
4. [Approach 2: Recursive — O(n)](#4-approach-2-recursive--on)
5. [Walkthrough (Iterative)](#5-walkthrough-iterative)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given the `head` of a singly linked list, reverse the list, and return the reversed list.

---

## 2. Examples

```
Example 1:
  Input:  1 → 2 → 3 → 4 → 5
  Output: 5 → 4 → 3 → 2 → 1

Example 2:
  Input:  1 → 2
  Output: 2 → 1

Example 3:
  Input:  []
  Output: []
```

---

## 3. Approach 1: Iterative — O(n) ✅

Use three pointers: `prev`, `current`, `next`. At each step, reverse the pointer direction.

```
FUNCTION reverseList(head):
    prev    = NULL
    current = head

    WHILE current IS NOT NULL:
        next         = current.next       // save next
        current.next = prev               // reverse pointer
        prev         = current            // advance prev
        current      = next               // advance current

    RETURN prev
```

### Visual

```
Step 0:  NULL ← ?   1 → 2 → 3 → NULL
         prev      curr

Step 1:  NULL ← 1   2 → 3 → NULL
                prev curr

Step 2:  NULL ← 1 ← 2   3 → NULL
                    prev curr

Step 3:  NULL ← 1 ← 2 ← 3   NULL
                        prev  curr

Return prev → 3 → 2 → 1 → NULL
```

---

## 4. Approach 2: Recursive — O(n)

```
FUNCTION reverseList(head):
    // Base case
    IF head IS NULL OR head.next IS NULL:
        RETURN head

    // Recurse to the end
    newHead = reverseList(head.next)

    // Reverse the pointer
    head.next.next = head
    head.next = NULL

    RETURN newHead
```

### How It Works

```
reverseList(1 → 2 → 3)
  reverseList(2 → 3)
    reverseList(3)
      return 3                          // base case

    // Back in reverseList(2 → 3):
    head = 2, head.next = 3
    3.next = 2                          // 3 → 2
    2.next = NULL                       // 2 → NULL
    return 3 → 2

  // Back in reverseList(1 → 2 → 3):
  head = 1, head.next = 2
  2.next = 1                            // 2 → 1
  1.next = NULL                         // 1 → NULL
  return 3 → 2 → 1
```

---

## 5. Walkthrough (Iterative)

```
Input: 1 → 2 → 3 → 4 → 5

prev=NULL, curr=1
  next=2, 1.next=NULL, prev=1, curr=2
  State: NULL ← 1    2 → 3 → 4 → 5

prev=1, curr=2
  next=3, 2.next=1, prev=2, curr=3
  State: NULL ← 1 ← 2    3 → 4 → 5

prev=2, curr=3
  next=4, 3.next=2, prev=3, curr=4
  State: NULL ← 1 ← 2 ← 3    4 → 5

prev=3, curr=4
  next=5, 4.next=3, prev=4, curr=5
  State: NULL ← 1 ← 2 ← 3 ← 4    5

prev=4, curr=5
  next=NULL, 5.next=4, prev=5, curr=NULL
  State: NULL ← 1 ← 2 ← 3 ← 4 ← 5

curr=NULL → DONE
Return prev = 5 → 4 → 3 → 2 → 1 ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Iterative** | **O(n)** | **O(1)** |
| Recursive | O(n) | O(n) call stack |

---

## 7. Follow-Up Questions

### 7.1 Reverse Linked List II (LeetCode #92) — Reverse a portion

Reverse only the nodes from position `left` to `right`:

```
FUNCTION reverseBetween(head, left, right):
    dummy = new ListNode(0, head)
    prev = dummy

    // Navigate to node before left
    FOR i ← 1 TO left - 1:
        prev = prev.next

    // Reverse the sublist
    current = prev.next
    FOR i ← 0 TO right - left - 1:
        next = current.next
        current.next = next.next
        next.next = prev.next
        prev.next = next

    RETURN dummy.next
```

### 7.2 Reverse Nodes in k-Group (LeetCode #25)

Reverse every group of k nodes. Count k nodes ahead; if available, reverse the group and connect.

```
FUNCTION reverseKGroup(head, k):
    // Check if k nodes exist
    node = head
    FOR i ← 0 TO k - 1:
        IF node IS NULL: RETURN head
        node = node.next

    // Reverse k nodes
    prev = NULL
    current = head
    FOR i ← 0 TO k - 1:
        next = current.next
        current.next = prev
        prev = current
        current = next

    // Recursively reverse remaining and connect
    head.next = reverseKGroup(current, k)

    RETURN prev
```

### 7.3 Palindrome Linked List (LeetCode #234)

1. Find the middle (slow/fast pointers).
2. Reverse the second half.
3. Compare both halves.
4. (Optionally) restore the list.

```
FUNCTION isPalindrome(head):
    // Find middle
    slow = head, fast = head
    WHILE fast AND fast.next:
        slow = slow.next
        fast = fast.next.next

    // Reverse second half
    rev = reverseList(slow)

    // Compare
    WHILE rev:
        IF head.val != rev.val: RETURN FALSE
        head = head.next
        rev = rev.next

    RETURN TRUE
```

### 7.4 Swap Nodes in Pairs (LeetCode #24)

Swap every two adjacent nodes (k=2 variant).

---

## Linked List Reversal Pattern Family

| Problem | Variant | Key Technique |
|---------|---------|---------------|
| **Reverse List** (#206) | Full reversal | 3-pointer iteration |
| **Reverse Between** (#92) | Partial reversal | Navigate + reverse sublist |
| **k-Group** (#25) | Group reversal | Count + reverse + recurse |
| **Palindrome** (#234) | Check symmetry | Find mid + reverse + compare |
| **Swap Pairs** (#24) | Adjacent swap | k=2 group reversal |

---

## Key Takeaway

> Linked list reversal is a **fundamental building block**. The iterative 3-pointer technique (`prev`, `current`, `next`) should be second nature. It's used as a subroutine in many harder problems — palindrome checking, k-group reversal, reorder list, and more. Master the basic reversal, and the variants become straightforward extensions.
