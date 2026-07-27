# 3498. Reverse Degree of a String

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/reverse-degree-of-a-string](https://leetcode.com/problems/reverse-degree-of-a-string)
**Companies:** Capgemini, Google

---

## Problem Description

Given a string `s`, the **reverse degree** is defined as the sum of `(26 - (ch - 'a')) * (i + 1)` for each character `ch` at 1-indexed position `i+1`. In other words, 'a' maps to 26, 'b' to 25, ..., 'z' to 1, then multiply by the 1-based index and sum all products.

**Constraints:**
- `1 <= s.length <= 1000`
- `s` consists of lowercase English letters

---

## Examples

**Example 1:**
- **Input:** `s = "abc"`
- **Output:** `(26·1) + (25·2) + (24·3) = 26 + 50 + 72 = 148`

**Example 2:**
- **Input:** `s = "a"`
- **Output:** `26`

---

## Approach

```
FUNCTION reverseDegree(s)
    total ← 0
    FOR i ← 0 TO LENGTH(s) - 1 DO
        reverseVal ← 26 - (ORD(s[i]) - ORD('a'))
        total ← total + reverseVal * (i + 1)
    END FOR
    RETURN total
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | O(n) — single pass |
| Space  | O(1) |

---

## Key Takeaway

> Simple mapping + weighted sum: reverse the alphabet mapping (`'a'→26, 'z'→1`) and multiply by the 1-indexed position.
