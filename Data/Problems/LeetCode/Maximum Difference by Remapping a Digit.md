# 2566. Maximum Difference by Remapping a Digit

**Difficulty:** 🟢 Easy
**Companies:** Amazon, Google, Meta

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Remap one digit to another (all occurrences change). Find the maximum difference between the largest and smallest possible numbers after one remap each.

---

## Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `123` | `800` | Replace `1` with `9` to get `923` (max) and replace `1` with `0` to get `023` → `23` (min). Difference = `923 - 23 = 900` |
| `909` | `909` | No beneficial remap; max and min are the same.

---

## Approach

**Greedy** – Perform two independent greedy transformations:
1. **Maximum:** Replace the first digit that is not `9` with `9`.
2. **Minimum:** Replace the first digit (most significant) with `0` (unless it is already `0`).
The difference between the two resulting numbers is the answer.

```text
FUNCTION maxMinDifference(num):
    s ← STRING(num)
    // Max transformation
    IF any digit d in s where d ≠ '9':
        firstNon9 ← first digit in s where digit ≠ '9'
        maxS ← REPLACE_ALL(s, firstNon9, '9')
    ELSE:
        maxS ← s
    // Min transformation
    firstDigit ← s[0]
    minS ← REPLACE_ALL(s, firstDigit, '0')
    RETURN INTEGER(maxS) - INTEGER(minS)
```

---

## Walkthrough

**Example:** `123`
1. Original string `s = "123"`.
2. **Maximum:** First non‑`9` digit is `1`. Replace all `1` with `9` → `923`.
3. **Minimum:** First digit is `1`. Replace all `1` with `0` → `023` → `23`.
4. Compute `923 - 23 = 900`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(d)** where *d* is number of digits | O(d) for string manipulation |

---

## Follow-Up Questions

- How would the solution change if you could perform **multiple** digit remappings?
- What if the number is given in a different base (e.g., hexadecimal)?
- Can you extend the approach to handle very large numbers that do not fit in standard integer types?

---

## Key Takeaway

> **Maximize by mapping the first non‑9 digit to 9, minimize by mapping the leading digit to 0.** Two independent greedy choices give the optimal difference.
