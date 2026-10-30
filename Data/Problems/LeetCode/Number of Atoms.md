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

Given a string `formula` representing a chemical formula, return *the count of each atom*.

The atomic element always starts with an uppercase character, then zero or more lowercase letters, representing the name.

One or more digits representing that element's count may follow if the count is greater than `1`. If the count is `1`, no digits will follow.

- For example, `"H2O"` and `"H2O2"` are possible, but `"H1O2"` is impossible.

Two formulas are concatenated together to produce another formula.

- For example, `"H2O2He3Mg4"` is also a formula.

A formula placed in parentheses, and a count (optionally added) is also a formula.

- For example, `"(H2O2)"` and `"(H2O2)3"` are formulas.

Return the count of all elements as a string in the following form: the first name (in sorted order), followed by its count (if that count is more than `1`), followed by the second name (in sorted order), followed by its count (if that count is more than `1`), and so on.

The test cases are generated so that all the values in the output fit in a **32-bit** integer.

**Constraints:**

- `1 <= formula.length <= 1000`
- `formula` consists of English letters, digits, `'('`, and `')'`.
- `formula` is always valid.

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

```
Example 1:
  Input: formula = "H2O"
  Output: "H2O"
  Explanation: The count of elements are {'H': 2, 'O': 1}.
```

```
Example 2:
  Input: formula = "Mg(OH)2"
  Output: "H2MgO2"
  Explanation: The count of elements are {'H': 2, 'Mg': 1, 'O': 2}.
```

```
Example 3:
  Input: formula = "K4(ON(SO3)2)2"
  Output: "K4N2O14S4"
  Explanation: The count of elements are {'K': 4, 'N': 2, 'O': 14, 'S': 4}.
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
