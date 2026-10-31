# 2566. Maximum Difference by Remapping a Digit

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-difference-by-remapping-a-digit](https://leetcode.com/problems/maximum-difference-by-remapping-a-digit)
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

You are given an integer `num`. You know that Bob will sneakily **remap** one of the `10` possible digits (`0` to `9`) to another digit.

Return *the difference between the maximum and minimum values Bob can make by remapping **exactly** **one** digit in *`num`.

**Notes:**

- When Bob remaps a digit d1 to another digit d2, Bob replaces all occurrences of `d1` in `num` with `d2`.
- Bob can remap a digit to itself, in which case `num` does not change.
- Bob can remap different digits for obtaining minimum and maximum values respectively.
- The resulting number after remapping can contain leading zeroes.

**Constraints:**
- `1 <= num <= 10^8`

---

## Examples

**Example 1:**
```
Input: num = 11891
Output: 99009
Explanation: To achieve the maximum value, Bob can remap the digit 1 to the digit 9 to yield 99899.
To achieve the minimum value, Bob can remap the digit 1 to the digit 0, yielding 890.
The difference between these two numbers is 99009.
```

**Example 2:**
```
Input: num = 90
Output: 99
Explanation: The maximum value that can be returned by the function is 99 (if 0 is replaced by 9) and the minimum value that can be returned by the function is 0 (if 9 is replaced by 0).
Thus, we return 99.
```

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
2. **Maximum:** First non-`9` digit is `1`. Replace all `1` with `9` → `923`.
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

> **Maximize by mapping the first non-9 digit to 9, minimize by mapping the leading digit to 0.** Two independent greedy choices give the optimal difference.
