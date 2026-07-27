# 1019. Next Greater Node In Linked List

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-node-in-linked-list](https://leetcode.com/problems/next-greater-node-in-linked-list)
**Companies:** Amazon, Bloomberg, Google, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Monotonic Stack — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

For each node in a linked list, return the value of the **next greater** node. Return `0` if none exists.

---

## 2. Key Insight

> Convert linked list to array, then apply standard monotonic stack for next greater element.

---

## 3. Approach: Monotonic Stack — O(n) ✅

```
FUNCTION nextLargerNodes(head):
    vals = list from linked list
    result = [0] * len(vals)
    stack = []
    FOR i, val IN enumerate(vals):
        WHILE stack AND vals[stack[-1]] < val:
            result[stack.POP()] = val
        stack.PUSH(i)
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 5. Key Takeaway

> **Linked list → array → monotonic stack.** Same NGE pattern. Convert to array first for random access with indices.
