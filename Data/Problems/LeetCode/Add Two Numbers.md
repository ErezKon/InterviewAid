
# 2. Add Two Numbers

**Difficulty:** 🟡 Medium
**Acceptance:** 48.5%
**LeetCode:** [https://leetcode.com/problems/add-two-numbers](https://leetcode.com/problems/add-two-numbers)
**Companies:** Accenture, Accolite, Adobe, Airbnb, Amazon, Apple, Aqr Capital Management, Avito, Bloomberg, Bytedance, Capgemini, Capital One, Cisco, Cognizant, Doordash, Earnin, Epam Systems, Goldman Sachs, Google, Ibm, Infosys, Jane Street, Meta, Microsoft, Nvidia, Oracle, Palo Alto Networks, Sap, Snowflake, Tcs, Tiktok, Uber, Wix, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Iterative — O(max(m, n))](#4-solution-iterative--omaxm-n)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

You are given two **non-empty** linked lists representing two non-negative integers. The digits are stored in **reverse order**, and each node contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

---

## 2. Examples

```
Example 1:
  Input:  l1 = [2, 4, 3],  l2 = [5, 6, 4]
  Output: [7, 0, 8]
  Reason: 342 + 465 = 807

Example 2:
  Input:  l1 = [0],  l2 = [0]
  Output: [0]

Example 3:
  Input:  l1 = [9, 9, 9, 9, 9, 9, 9],  l2 = [9, 9, 9, 9]
  Output: [8, 9, 9, 9, 0, 0, 0, 1]
  Reason: 9999999 + 9999 = 10009998
```

---

## 3. Key Insight

Since the digits are stored in **reverse order**, the head of each list is the **least significant digit** — exactly the order we process when doing manual addition from right to left. We just walk both lists simultaneously, adding digits and carrying over.

```
  3 ← 4 ← 2       (represents 342)
+ 4 ← 6 ← 5       (represents 465)
──────────────
  8 ← 0 ← 7       (represents 807)
        ↑ carry=1
```

---

## 4. Solution: Iterative — O(max(m, n))

```
FUNCTION addTwoNumbers(l1, l2):

    dummy = new ListNode(0)
    current = dummy
    carry = 0

    WHILE l1 IS NOT NULL OR l2 IS NOT NULL OR carry > 0:

        val1 = l1.val IF l1 IS NOT NULL ELSE 0
        val2 = l2.val IF l2 IS NOT NULL ELSE 0

        sum   = val1 + val2 + carry
        carry = sum / 10                    // integer division
        digit = sum % 10

        current.next = new ListNode(digit)
        current = current.next

        IF l1 IS NOT NULL: l1 = l1.next
        IF l2 IS NOT NULL: l2 = l2.next

    RETURN dummy.next
```

### Why a Dummy Node?

The dummy node eliminates the special case of initializing the head of the result list. Without it, you'd need separate logic for the first node vs. subsequent nodes.

---

## 5. Walkthrough

```
l1: 2 → 4 → 3
l2: 5 → 6 → 4

Step 1:  val1=2, val2=5, carry=0
         sum = 7, carry = 0, digit = 7
         result: 7

Step 2:  val1=4, val2=6, carry=0
         sum = 10, carry = 1, digit = 0
         result: 7 → 0

Step 3:  val1=3, val2=4, carry=1
         sum = 8, carry = 0, digit = 8
         result: 7 → 0 → 8

Both lists exhausted, carry = 0 → DONE

Output: 7 → 0 → 8  (represents 807) ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(max(m, n)) — one pass through the longer list |
| **Space** | O(max(m, n)) — the result list has at most max(m,n) + 1 nodes |

---

## 7. Follow-Up Questions

### 7.1 What if digits are stored in non-reversed (most significant digit first) order?

This is **LeetCode #445 — Add Two Numbers II**.

**Approach 1: Reverse both lists**, add as above, reverse the result.

**Approach 2: Use stacks** to simulate reverse-order access without modifying the input:

```
FUNCTION addTwoNumbersII(l1, l2):

    stack1 = []
    stack2 = []

    WHILE l1 IS NOT NULL:
        stack1.PUSH(l1.val)
        l1 = l1.next

    WHILE l2 IS NOT NULL:
        stack2.PUSH(l2.val)
        l2 = l2.next

    carry = 0
    result = NULL

    WHILE stack1 IS NOT EMPTY OR stack2 IS NOT EMPTY OR carry > 0:
        val1 = stack1.POP() IF stack1 NOT EMPTY ELSE 0
        val2 = stack2.POP() IF stack2 NOT EMPTY ELSE 0

        sum   = val1 + val2 + carry
        carry = sum / 10
        digit = sum % 10

        node = new ListNode(digit)
        node.next = result              // prepend to build in correct order
        result = node

    RETURN result
```

### 7.2 What if one list is much longer than the other?

The algorithm handles this naturally — when the shorter list is exhausted, we treat its missing digits as 0. No special handling needed.

### 7.3 Can you do it recursively?

```
FUNCTION addTwoNumbersRecursive(l1, l2, carry = 0):

    IF l1 IS NULL AND l2 IS NULL AND carry == 0:
        RETURN NULL

    val1 = l1.val IF l1 IS NOT NULL ELSE 0
    val2 = l2.val IF l2 IS NOT NULL ELSE 0

    sum   = val1 + val2 + carry
    node  = new ListNode(sum % 10)

    next1 = l1.next IF l1 IS NOT NULL ELSE NULL
    next2 = l2.next IF l2 IS NOT NULL ELSE NULL

    node.next = addTwoNumbersRecursive(next1, next2, sum / 10)

    RETURN node
```

**Time:** O(max(m, n)), **Space:** O(max(m, n)) for the call stack.

### 7.4 What if the numbers are extremely large?

Linked lists naturally handle arbitrary-precision arithmetic — no integer overflow issues. This is actually one of the advantages of this representation over using built-in integer types.

---

## Key Takeaway

> This problem tests your ability to **traverse two linked lists simultaneously** while managing a carry. The pattern — walking multiple structures in lockstep with null-checking — appears in many linked list problems (merge lists, compare lists, etc.).
