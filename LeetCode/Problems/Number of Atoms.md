# 726. Number of Atoms

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/number-of-atoms](https://leetcode.com/problems/number-of-atoms)
**Companies:** Agoda, Amazon, Docusign, Fastenal, Flipkart, Google, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Stack of Counters — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Parse a chemical formula string and return each element's count in sorted order. Handle nested parentheses with multipliers.

---

## 2. Key Insight

> Use a stack of counters. On `(`, push a new counter. On `)`, pop the top counter, multiply all counts by the following number, and merge into the counter below.

---

## 3. Approach: Stack of Counters — O(n) ✅

```text
FUNCTION countOfAtoms(formula):
    stack ← [Counter()]
    i ← 0
    WHILE i < LENGTH(formula):
        IF formula[i] == '(':
            stack.PUSH(Counter())
            i ← i + 1
        ELSE IF formula[i] == ')':
            i ← i + 1
            num ← parseNumber(formula, i)
            top ← stack.POP()
            FOR element, cnt IN top:
                stack.TOP()[element] ← stack.TOP()[element] + cnt * num
        ELSE:
            element ← parseElement(formula, i)
            num ← parseNumber(formula, i)
            stack.TOP()[element] ← stack.TOP()[element] + num
    RETURN formatSorted(stack[0])
```

---

## 4. Examples

**Example 1:**
```
Input: "H2O"
Output: "H2O"
Explanation: Two hydrogen atoms and one oxygen atom.
```

**Example 2:**
```
Input: "Mg(OH)2"
Output: "H2MgO2"
Explanation: The group (OH) appears twice, giving one Mg, two O, and two H.
```

---

## 5. Walkthrough

**Example 2 (`"Mg(OH)2"`):**
| Step | Action | Stack State |
|------|--------|-------------|
| 1 | Read `M` → parse element `Mg`, count 1 | [{Mg:1}] |
| 2 | Read `(` → push new counter | [{Mg:1}, {}] |
| 3 | Read `O` → element `O`, count 1 | [{Mg:1}, {O:1}] |
| 4 | Read `H` → element `H`, count 1 | [{Mg:1}, {O:1, H:1}] |
| 5 | Read `)` → parse multiplier `2`, pop top counter and multiply | [{Mg:1}] |
| 6 | Merge multiplied counts into previous counter: O←1*2, H←1*2 | [{Mg:1, O:2, H:2}] |
| 7 | End of string → format sorted output → `H2MgO2` |

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single pass through formula |
| **Space** | O(n) — stack depth |

---

## 7. Follow-Up Questions

1. How would you modify the algorithm to support brackets `[]` and `{}` as additional grouping symbols?
2. Can you output the result as a dictionary/map instead of a formatted string?
3. How would you handle invalid formulas with mismatched parentheses?

---

## 8. Key Takeaway

> **Stack of counters for nested parentheses.** Pop, multiply, and merge on `)`, then sort the final counter for output.
