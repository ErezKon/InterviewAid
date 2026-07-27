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
        stack = REVERSE(nestedList)    // push in reverse

    FUNCTION hasNext():
        WHILE stack AND stack.TOP() is a list:
            top = stack.POP()
            FOR item IN REVERSE(top.getList()):
                stack.PUSH(item)
        RETURN stack is not empty

    FUNCTION next():
        RETURN stack.POP().getInteger()
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(1) amortized per call |
| **Space** | O(D) — stack depth proportional to nesting |

---

## 5. Key Takeaway

> **Lazy stack flattening** — `hasNext()` peels nested lists until an integer surfaces. Clean iterator pattern for nested structures.
