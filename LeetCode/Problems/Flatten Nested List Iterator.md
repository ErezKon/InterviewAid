# 341. Flatten Nested List Iterator

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/flatten-nested-list-iterator](https://leetcode.com/problems/flatten-nested-list-iterator)
**Companies:** Adobe, Amazon, Apple, Aurora, De Shaw, Google, Hbo, Linkedin, Meta, Microsoft, Mixpanel, Openai, Twitter, Walmart Labs, Warnermedia, Yahoo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Stack — O(1) amortized ✅](#3-approach-stack--o1-amortized-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Implement an iterator to flatten a nested list of integers. Each element is either an integer or a list of integers (arbitrarily nested).

---

## 2. Key Insight

> Use a stack and **lazy flattening**: `hasNext()` expands nested lists only until an integer is on top. This avoids flattening the entire structure upfront.

---

## 3. Approach: Stack — O(1) amortized ✅

```
CLASS NestedIterator:
    CONSTRUCTOR(nestedList):
        stack = REVERSE(nestedList)    // push in reverse order

    FUNCTION hasNext():
        WHILE stack IS NOT EMPTY AND stack.TOP() IS LIST:
            top = stack.POP()
            FOR item IN REVERSE(top.getList()):
                stack.PUSH(item)
        RETURN stack IS NOT EMPTY

    FUNCTION next():
        RETURN stack.POP().getInteger()
```

---

## 4. Examples

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Operations: next(), next(), next(), next(), hasNext()
Output: 1,1,2,1,false
```
Explanation: The iterator returns the integers in order, flattening each sub‑list lazily.

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Operations: next(), next(), next(), hasNext()
Output: 1,4,6,true
```
Explanation: Nested lists are expanded as needed; after the last element, `hasNext()` reports false.

---

## 5. Walkthrough

| Step | Stack (top→bottom) | Action |
|------|-------------------|--------|
| Init | 2, [1,1], [1,1] | Constructor pushes reversed list |
| hasNext | 2, [1,1], [1,1] | Top is integer → stop |
| next | 2, [1,1] | Pop 1 → return 1 |
| hasNext | 2, [1,1] | Top integer → stop |
| next | 2 | Pop 1 → return 1 |
| hasNext | 2, [1,1] | Top integer → stop |
| next | [1,1] | Pop 2 → return 2 |
| hasNext | [1,1] | Top is list → expand: push 1,1 |
| next | 1,1 | Pop 1 → return 1 |
| hasNext | 1 | Top integer → stop |
| next | (empty) | Pop 1 → return 1 |
| hasNext | (empty) | Stack empty → false |

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per call |
| **Space** | O(D) — stack depth proportional to nesting |

---

## Follow-Up Questions

- How would you modify the iterator to support a `remove()` operation?
- Can you implement the same functionality using recursion instead of an explicit stack?
- What changes are needed if the nested structure is streamed rather than fully materialized?

---

## 7. Key Takeaway

> **Lazy stack flattening** — `hasNext()` peels nested lists until an integer surfaces. Clean iterator pattern for nested structures.
