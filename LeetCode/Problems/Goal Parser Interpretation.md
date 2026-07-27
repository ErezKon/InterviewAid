# 1678. Goal Parser Interpretation

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/goal-parser-interpretation](https://leetcode.com/problems/goal-parser-interpretation)
**Companies:** Google, Zoho

---

## 1. Problem Description

Interpret a string: `"G"` → `"G"`, `"()"` → `"o"`, `"(al)"` → `"al"`.

## 2. Approach: String Replace — O(n) ✅

```
FUNCTION interpret(command):
    RETURN command.replace("()", "o").replace("(al)", "al")
```

## Key Takeaway

> Simple string replacement. Can also be done with a linear scan checking characters.
