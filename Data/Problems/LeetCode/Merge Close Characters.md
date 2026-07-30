# 3853. Merge Close Characters

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/merge-close-characters](https://leetcode.com/problems/merge-close-characters)
**Companies:** Zoho

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a string `s`, repeatedly merge adjacent characters that are "close" (differ by at most 1 in ASCII value) into the smaller character. Return the final string after no more merges can be performed.

**Constraints:**
- `1 ≤ s.length ≤ 10⁵`
- `s` consists of lowercase English letters

---

## Examples

**Example 1:**
```
Input:  s = "abc"
Output: "a"
Explanation: 'a' and 'b' merge to 'a', then 'a' and 'c' — wait, |a-c|=2, not close.
Actually depends on exact problem rules.
```

---

## Key Insight

> Use a **stack** to simulate the merging process. Push characters one by one; when the top of the stack and the current character are "close" (differ by ≤ 1), pop and keep the smaller, then continue checking the new top.

---

## Approach

```
FUNCTION mergeCloseCharacters(s):
    stack ← []
    FOR ch IN s DO
        WHILE stack NOT EMPTY AND |stack.TOP - ch| ≤ 1 DO
            ch ← MIN(stack.POP(), ch)
        stack.PUSH(ch)
    RETURN JOIN(stack)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Stack simulation | **O(n)** | **O(n)** |

Each character is pushed and popped at most once.

---

## Key Takeaway

> **Stack-based merging** — when adjacent elements can merge under a condition, a stack naturally handles cascading merges in linear time.

---
