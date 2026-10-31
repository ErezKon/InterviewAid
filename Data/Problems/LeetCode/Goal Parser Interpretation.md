# 1678. Goal Parser Interpretation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/goal-parser-interpretation](https://leetcode.com/problems/goal-parser-interpretation)
**Companies:** Google, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: String Replace — O(n) ✅](#2-approach-string-replace--on-)
3. [Examples](#3-examples)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You own a **Goal Parser** that can interpret a string `command`. The `command` consists of an alphabet of `"G"`, `"()"` and/or `"(al)"` in some order. The Goal Parser will interpret `"G"` as the string `"G"`, `"()"` as the string `"o"`, and `"(al)"` as the string `"al"`. The interpreted strings are then concatenated in the original order.

Given the string `command`, return *the **Goal Parser**'s interpretation of* `command`.

**Constraints:**
- `1 <= command.length <= 100`
- `command` consists of `"G"`, `"()"`, and/or `"(al)"` in some order.

---

## 2. Approach: String Replace — O(n) ✅

```text
FUNCTION interpret(command):
    // Replace all occurrences of "()" with "o" and "(al)" with "al"
    SET result ← command.replace("()", "o").replace("(al)", "al")
    RETURN result
```

---

## 3. Examples

```
Example 1:
  Input: command = "G()(al)"
  Output: "Goal"
  Explanation: The Goal Parser interprets the command as follows:
  G -> G
  () -> o
  (al) -> al
  The final concatenated result is "Goal".
```
```
Example 2:
  Input: command = "G()()()()(al)"
  Output: "Gooooal"
```
```
Example 3:
  Input: command = "(al)G(al)()()G"
  Output: "alGalooG"
```

---

## 4. Walkthrough

For `"G()(al)"`:
1. Replace `"()"` → `"G" + "o" + "(al)" = "Go(al)"`.
2. Replace `"(al)"` → `"Goal"`.
Return `"Goal"`.

---

## 5. Complexity Analysis

- **Time:** O(n) – each character is examined a constant number of times during replacements.
- **Space:** O(n) – new string created for the result.

---

## 6. Follow-Up Questions

- How would you implement the interpretation with a single linear scan without using built-in replace?
- Can the solution be adapted to handle nested patterns?
- What is the impact on performance for very long strings?

---

## 7. Key Takeaway

> Simple pattern replacement solves the problem efficiently; a linear scan can achieve the same with constant extra space.
