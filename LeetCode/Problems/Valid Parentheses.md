
# 20. Valid Parentheses

**Difficulty:** 🟢 Easy
**Acceptance:** 44.2%
**LeetCode:** [https://leetcode.com/problems/valid-parentheses](https://leetcode.com/problems/valid-parentheses)
**Companies:** Accenture, Adobe, Agoda, Airbnb, Altimetrik, Amazon, Andela, Anduril, Apple, Att, Autodesk, Bank Of America, Barclays, Blackrock, Bloomberg, Bytedance, C3 Ai, Capital One, Carwale, Cerner, Chewy, Cisco, Cognizant, Coindcx, Comcast, Criteo, Crowdstrike, Dataart, De Shaw, Dell, Deloitte, Ebay, Epam Systems, Epic Systems, Ericsson, Exl, Expedia, Flipkart, Freshworks, Globallogic, Godaddy, Goldman Sachs, Google, Grab, Hcl, Hp, Huawei, Ibm, Infosys, Intel, Intuit, Jane Street, Jpmorgan, Linkedin, Lucid, Mastercard, Mathworks, Meta, Micro1, Microsoft, Millennium, Mitsogo, Netflix, Nike, Nokia, Npci, Nvidia, Odoo, Opentext, Oracle, Ozon, Palo Alto Networks, Paypal, Paytm, Persistent Systems, Phonepe, Qualcomm, Roblox, Rokt, Salesforce, Samsung, Sap, Servicenow, Shift Technology, Siemens, Sigmoid, Sony, Splunk, Spotify, Swiggy, Tcs, Tencent, Tesla, Tiktok, Toast, Tomtom, Tripadvisor, Turing, Twitter, Two Sigma, Uber, Ubs, Udemy, Vimeo, Visa, Vk, Walmart Labs, Wells Fargo, Wipro, Wix, Yahoo, Yandex, Zenefits, Zoho, Zs Associates, Zulily

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Solution: Stack — O(n) ✅](#4-solution-stack--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is **valid**.

A string is valid if:
1. Open brackets are closed by the **same type** of brackets.
2. Open brackets are closed in the **correct order**.
3. Every close bracket has a corresponding open bracket.

---

## 2. Examples

```
Example 1:  s = "()"       → true
Example 2:  s = "()[]{}"   → true
Example 3:  s = "(]"       → false
Example 4:  s = "([])"     → true
Example 5:  s = "([)]"     → false
```

---

## 3. Key Insight

Brackets must be closed in **LIFO order** — the most recently opened bracket must be closed first. This is exactly what a **stack** does.

```
Input:  ( [ { } ] )

Stack:    (       push '('
          ( [     push '['
          ( [ {   push '{'
          ( [     pop — '}' matches '{'  ✓
          (       pop — ']' matches '['  ✓
          (empty) pop — ')' matches '('  ✓

Stack empty at end → VALID ✅
```

---

## 4. Solution: Stack — O(n) ✅

```
FUNCTION isValid(s):

    stack   = []
    mapping = { ')': '(', '}': '{', ']': '[' }

    FOR each char IN s:

        IF char IS a closing bracket:
            IF stack IS EMPTY:
                RETURN FALSE

            top = stack.POP()

            IF top != mapping[char]:
                RETURN FALSE

        ELSE:
            stack.PUSH(char)

    RETURN stack IS EMPTY
```

---

## 5. Walkthrough

```
s = "([{}])"

Step 1: char='(' → opening → push    stack: ['(']
Step 2: char='[' → opening → push    stack: ['(', '[']
Step 3: char='{' → opening → push    stack: ['(', '[', '{']
Step 4: char='}' → closing → pop '{' → matches mapping['}']='{'  ✓
                                       stack: ['(', '[']
Step 5: char=']' → closing → pop '[' → matches mapping[']']='['  ✓
                                       stack: ['(']
Step 6: char=')' → closing → pop '(' → matches mapping[')']='('  ✓
                                       stack: []

Stack empty → RETURN TRUE ✅
```

```
s = "([)]"

Step 1: char='(' → push    stack: ['(']
Step 2: char='[' → push    stack: ['(', '[']
Step 3: char=')' → closing → pop '[' → '[' != mapping[')']='('  ✗

RETURN FALSE ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass through the string |
| **Space** | O(n) — worst case all opening brackets |

---

## 7. Follow-Up Questions

### 7.1 Generate Parentheses (LeetCode #22)

Generate all valid combinations of `n` pairs of parentheses. Use **backtracking**:

```
FUNCTION generateParenthesis(n):
    result = []

    FUNCTION backtrack(current, open, close):
        IF LENGTH(current) == 2 * n:
            result.ADD(current)
            RETURN

        IF open < n:
            backtrack(current + '(', open + 1, close)

        IF close < open:
            backtrack(current + ')', open, close + 1)

    backtrack("", 0, 0)
    RETURN result
```

### 7.2 Longest Valid Parentheses (LeetCode #32)

Find the length of the longest valid parentheses substring.

**Stack approach:** Push indices onto the stack. When a match is found, the length is `i - stack.PEEK()`.

```
FUNCTION longestValidParentheses(s):
    stack  = [-1]          // sentinel
    maxLen = 0

    FOR i ← 0 TO n - 1:
        IF s[i] == '(':
            stack.PUSH(i)
        ELSE:
            stack.POP()
            IF stack IS EMPTY:
                stack.PUSH(i)       // new sentinel
            ELSE:
                maxLen = MAX(maxLen, i - stack.PEEK())

    RETURN maxLen
```

### 7.3 Minimum Add to Make Parentheses Valid (LeetCode #921)

Count the minimum number of parentheses to add.

```
FUNCTION minAddToMakeValid(s):
    openNeeded  = 0        // unmatched '('
    closeNeeded = 0        // unmatched ')'

    FOR each char IN s:
        IF char == '(':
            openNeeded += 1
        ELSE:
            IF openNeeded > 0:
                openNeeded -= 1
            ELSE:
                closeNeeded += 1

    RETURN openNeeded + closeNeeded
```

### 7.4 Minimum Remove to Make Valid Parentheses (LeetCode #1249)

Remove the minimum number of parentheses to make the string valid.

```
FUNCTION minRemoveToMakeValid(s):
    // Pass 1: Mark invalid ')' (no matching '(')
    stack = []
    toRemove = set()

    FOR i ← 0 TO n - 1:
        IF s[i] == '(':
            stack.PUSH(i)
        ELSE IF s[i] == ')':
            IF stack IS NOT EMPTY:
                stack.POP()
            ELSE:
                toRemove.ADD(i)

    // Remaining in stack are unmatched '('
    FOR idx IN stack:
        toRemove.ADD(idx)

    // Build result
    result = ""
    FOR i ← 0 TO n - 1:
        IF i NOT IN toRemove:
            result += s[i]

    RETURN result
```

---

## Parentheses Problem Family

| Problem | Technique | Complexity |
|---------|-----------|------------|
| **Valid Parentheses** | Stack matching | O(n) |
| **Generate Parentheses** | Backtracking | O(4^n / √n) |
| **Longest Valid Parentheses** | Stack with indices | O(n) |
| **Min Add** | Counter tracking | O(n) |
| **Min Remove** | Stack + set of invalid indices | O(n) |

---

## Key Takeaway

> Parentheses problems are **stack problems** at their core. The stack enforces LIFO matching, which is exactly how nested brackets work. When you see brackets, nesting, or matched pairs — think stack.
