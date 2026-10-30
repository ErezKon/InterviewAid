# 445. Add Two Numbers II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/add-two-numbers-ii](https://leetcode.com/problems/add-two-numbers-ii)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Nvidia, Oracle, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Stack — O(n) ✅](#4-approach-stack--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given two **non-empty** linked lists representing two non-negative integers. The most significant digit comes first and each of their nodes contains a single digit. Add the two numbers and return the sum as a linked list.

You may assume the two numbers do not contain any leading zero, except the number 0 itself.

**Constraints:**
- The number of nodes in each linked list is in the range `[1, 100]`.
- `0 ≤ Node.val ≤ 9`
- It is guaranteed that the list represents a number that does not have leading zeros.

**Follow up:** Could you solve it without reversing the input lists?

---

## 2. Examples

```
Example 1:
  Input: l1 = [7,2,4,3], l2 = [5,6,4]
  Output: [7,8,0,7]
  Explanation: 7243 + 564 = 7807

Example 2:
  Input: l1 = [2,4,3], l2 = [5,6,4]
  Output: [8,0,7]
  Explanation: 243 + 564 = 807

Example 3:
  Input: l1 = [0], l2 = [0]
  Output: [0]
```

Visual:
```
  7 → 2 → 4 → 3
       5 → 6 → 4
  ─────────────────
  7 → 8 → 0 → 7    (carry propagation: 3+4=7, 4+6=10, 2+5+1=8)
```

---

## 3. Key Insight

> Unlike Add Two Numbers (#2) where digits are in reverse order, here digits are in forward (most-significant-first) order. Use **stacks** to access digits from least significant to most significant without reversing the lists.

---

## 4. Approach: Stack — O(n) ✅

```
FUNCTION addTwoNumbers(l1, l2):
    stack1 = []; stack2 = []
    WHILE l1: stack1.PUSH(l1.val); l1 = l1.next
    WHILE l2: stack2.PUSH(l2.val); l2 = l2.next

    carry = 0
    head = null
    WHILE stack1 OR stack2 OR carry:
        sum = carry
        IF stack1: sum += stack1.POP()
        IF stack2: sum += stack2.POP()
        carry = sum / 10
        node = ListNode(sum % 10)
        node.next = head
        head = node

    RETURN head
```

**Trick:** Build the result by **prepending** nodes (`node.next = head; head = node`), so the result is naturally in forward order.

---

## 5. Walkthrough

```
l1 = [7,2,4,3], l2 = [5,6,4]
stack1 = [7,2,4,3], stack2 = [5,6,4]

Pop 3,4: sum=7, carry=0 → node(7), head=7
Pop 4,6: sum=10, carry=1 → node(0)→7, head=0→7
Pop 2,5: sum=8, carry=0 → node(8)→0→7, head=8→0→7
Pop 7,—: sum=7, carry=0 → node(7)→8→0→7, head=7→8→0→7

Result: 7→8→0→7 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n + m) — traverse both lists once |
| **Space** | O(n + m) — for the two stacks |

---

## 7. Follow-Up Questions

### 7.1 Can we do it without stacks (O(1) extra space)?

Yes — reverse both lists, add like Add Two Numbers (#2), then reverse the result. But the problem says "do not reverse the input lists" — you could reverse, add, then reverse back to restore originals.

### 7.2 How does this compare to Add Two Numbers (#2)?

| Feature | #2 (Reverse order) | #445 (Forward order) |
|---------|--------------------|--------------------|
| Digit order | Least significant first | Most significant first |
| Approach | Direct traversal | Stacks to reverse access |
| Result build | Append | Prepend |

---

## 8. Key Takeaway

> Use stacks to process most-significant-first linked lists from the least significant end. Build the result by prepending nodes to naturally produce forward order. Same carry-propagation pattern as all addition problems.
