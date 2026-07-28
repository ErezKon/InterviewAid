# 925. Long Pressed Name

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/long-pressed-name](https://leetcode.com/problems/long-pressed-name)
**Companies:** Bloomberg, Google, Linkedin, Meta, Microsoft, Zoho

---

## 1. Problem Description

Check if `typed` could be the result of long-pressing characters in `name`.

---

## 2. Examples

**Example 1:**
```
Input: name = "alex", typed = "aaleex"
Output: true
Explanation: 'a' and 'e' in `name` were long‑pressed.
```

**Example 2:**
```
Input: name = "saeed", typed = "ssaaedd"
Output: false
Explanation: The extra 'd' cannot be produced by long‑pressing.
```

---

## 3. Approach: Two Pointers — O(n) ✅

```text
FUNCTION isLongPressedName(name, typed):
    i ← 0
    j ← 0
    WHILE j < LENGTH(typed):
        IF i < LENGTH(name) AND name[i] == typed[j]:
            i ← i + 1
            j ← j + 1
        ELSE IF j > 0 AND typed[j] == typed[j - 1]:
            // current char is a long‑press of previous char
            j ← j + 1
        ELSE:
            RETURN false
    RETURN i == LENGTH(name)
```

---

## 4. Walkthrough

Take `name = "alex"`, `typed = "aaleex"`.
| Step | i (name) | j (typed) | Action |
|------|----------|-----------|--------|
| 1 | 0 | 0 | chars match 'a' → i=1, j=1 |
| 2 | 1 | 1 | typed[1] = 'a' ≠ name[1] = 'l', but equals typed[0] → long‑press, j=2 |
| 3 | 1 | 2 | typed[2] = 'l' matches name[1] → i=2, j=3 |
| 4 | 2 | 3 | typed[3] = 'e' ≠ name[2] = 'e'? actually matches, i=3, j=4 |
| 5 | 3 | 4 | typed[4] = 'e' ≠ name[3] = 'x', but equals typed[3] → long‑press, j=5 |
| 6 | 3 | 5 | typed[5] = 'x' matches name[3] → i=4, j=6 |
End: i == LENGTH(name) → true.

---

## 5. Complexity Analysis

| Time | Space |
|------|-------|
| O(n + m) – single pass over both strings | O(1) |

---

## 6. Follow-Up Questions

* How would you handle Unicode characters that may consist of multiple code points?
* Can the algorithm be extended to report the minimal number of long‑presses needed?
* What changes are required if the input strings are streamed character by character?

---

## 7. Key Takeaway

> Two pointers: match characters when possible, skip repeated characters in `typed` (long presses). If neither applies, return false.
