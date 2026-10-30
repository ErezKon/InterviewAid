# 1019. Next Greater Node In Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-node-in-linked-list](https://leetcode.com/problems/next-greater-node-in-linked-list)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Monotonic Stack — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given the `head` of a linked list with `n` nodes.

For each node in the list, find the value of the **next greater node**. That is, for each node, find the value of the first node that is next to it and has a **strictly larger** value than it.

Return an integer array `answer` where `answer[i]` is the value of the next greater node of the `i^th` node (**1-indexed**). If the `i^th` node does not have a next greater node, set `answer[i] = 0`.

**Constraints:**

- The number of nodes in the list is `n`.
- `1 <= n <= 10^4`
- `1 <= Node.val <= 10^9`

---

## 2. Examples

```
Example 1:
  Input: head = [2,1,5]
  Output: [5,5,0]
```

```
Example 2:
  Input: head = [2,7,4,3,5]
  Output: [7,0,5,5,0]
```

---

## 3. Key Insight

> Convert linked list to array, then apply standard monotonic stack for next greater element.

---

## 4. Approach: Monotonic Stack — O(n) ✅

```text
FUNCTION nextLargerNodes(head):
    // Convert linked list to array for random access
    vals ← []
    WHILE head IS NOT NULL:
        APPEND head.val TO vals
        head ← head.next

    result ← ARRAY of size LENGTH(vals) filled with 0
    stack ← []    // stores indices with unresolved next greater

    FOR i ← 0 TO LENGTH(vals) - 1:
        WHILE stack NOT EMPTY AND vals[i] > vals[stack.TOP()]:
            idx ← stack.POP()
            result[idx] ← vals[i]
        stack.PUSH(i)

    RETURN result
```

---

## 5. Walkthrough

Input `[2,1,5]`:

| i | vals[i] | Stack (indices) | Result |
|---|---------|----------------|--------|
| 0 | 2 | push 0 | `[0,0,0]` |
| 1 | 1 | top 0 (2) > 1, push 1 | `[0,0,0]` |
| 2 | 5 | pop 1 → result[1]=5, pop 0 → result[0]=5, push 2 | `[5,5,0]` |

Final result `[5,5,0]`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you solve the problem in O(1) extra space without converting to an array?
- Can you adapt the algorithm to work on a doubly linked list directly?
- What changes are needed if the list contains negative values?

---

## 8. Key Takeaway

> **Linked list → array → monotonic stack.** Convert to an array for index‑based processing, then reuse the classic next‑greater‑element pattern.
