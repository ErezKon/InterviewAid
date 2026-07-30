# 1614. Maximum Nesting Depth of the Parentheses

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses](https://leetcode.com/problems/maximum-nesting-depth-of-the-parentheses)
**Companies:** Amazon, Bloomberg, Google, Intel, Meta, Microsoft, Tcs

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a **valid parentheses string** (VPS) `s`, return the **nesting depth** of `s`. The nesting depth is the maximum number of nested open parentheses at any point. Non-parenthesis characters are ignored.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of digits `0-9`, `+`, `-`, `*`, `/`, `(`, and `)`.
- `s` is a valid parentheses string.

---

## Examples

**Example 1:**
```
Input:  s = "(1+(2*3)+((8)/4))+1"
Output: 3
Explanation: Deepest nesting: ((8)/4) inside (1+...+...) → depth 3.
```

**Example 2:**
```
Input:  s = "(1)+((2))+(((3)))"
Output: 3
```

---

## Key Insight

> Just track the **current depth** (open parentheses count). Increment on `(`, decrement on `)`, and record the maximum.

---

## Approach

```
FUNCTION maxDepth(s)
    depth ← 0
    maxD ← 0

    FOR each c IN s DO
        IF c = '(' THEN
            depth ← depth + 1
            maxD ← MAX(maxD, depth)
        ELSE IF c = ')' THEN
            depth ← depth - 1

    RETURN maxD
END FUNCTION
```

---

## Walkthrough

```
s = "(1+(2*3)+((8)/4))+1"
```

| Char | depth | maxD |
|------|-------|------|
| (    | 1     | 1    |
| 1    | 1     | 1    |
| +    | 1     | 1    |
| (    | 2     | 2    |
| 2    | 2     | 2    |
| *    | 2     | 2    |
| 3    | 2     | 2    |
| )    | 1     | 2    |
| +    | 1     | 2    |
| (    | 2     | 2    |
| (    | **3** | **3**|
| 8    | 3     | 3    |
| )    | 2     | 3    |
| /    | 2     | 3    |
| 4    | 2     | 3    |
| )    | 1     | 3    |
| )    | 0     | 3    |
| +    | 0     | 3    |
| 1    | 0     | 3    |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — two integer counters |

---

## Follow-Up Questions

1. **What if the string might be invalid?**
   Check if depth ever goes negative, or if it's not 0 at the end.

2. **How does this relate to using a stack?**
   A stack is equivalent but uses O(n) space. The counter approach is the space-optimized version.

3. **What about square brackets or curly braces?**
   Same principle — maintain separate counters or a single stack with type checking.

---

## Key Takeaway

> **Counter-based depth tracking** is all you need for nesting depth — no stack required. O(n) time, O(1) space, and trivially simple.
