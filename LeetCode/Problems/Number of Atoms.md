# 726. Number of Atoms

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-atoms](https://leetcode.com/problems/number-of-atoms)
**Companies:** Agoda, Amazon, Docusign, Fastenal, Flipkart, Google, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Stack of Counters — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Parse a chemical formula string and return each element's count in sorted order. Handle nested parentheses with multipliers.

---

## 2. Key Insight

> Use a stack of counters. On `(`, push a new counter. On `)`, pop the top counter, multiply all counts by the following number, and merge into the counter below.

---

## 3. Approach: Stack of Counters — O(n) ✅

```
FUNCTION countOfAtoms(formula):
    stack = [Counter()]
    i = 0

    WHILE i < len(formula):
        IF formula[i] == '(':
            stack.PUSH(Counter())
            i += 1
        ELSE IF formula[i] == ')':
            i += 1
            // Parse multiplier
            num = parseNumber(formula, i)
            top = stack.POP()
            FOR element, count IN top:
                stack.TOP()[element] += count * num
        ELSE:
            // Parse element name
            element = parseElement(formula, i)
            num = parseNumber(formula, i)
            stack.TOP()[element] += num

    RETURN formatted sorted output of stack[0]
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass through formula |
| **Space** | O(n) — stack depth |

---

## 5. Key Takeaway

> **Stack of counters for nested parentheses.** Same pattern as calculator problems. Pop and multiply on `)`, merge upward. Sort the final counter for output.
