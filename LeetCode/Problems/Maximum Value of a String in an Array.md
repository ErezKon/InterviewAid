# 2496. Maximum Value of a String in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-value-of-a-string-in-an-array](https://leetcode.com/problems/maximum-value-of-a-string-in-an-array)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

The **value** of a string is:
- Its **numeric value** if it consists only of digits
- Its **length** otherwise

Given an array of strings `strs`, return the **maximum value** among all strings.

**Constraints:**
- `1 ≤ strs.length ≤ 100`
- `1 ≤ strs[i].length ≤ 9`
- `strs[i]` consists of lowercase letters and/or digits

---

## Examples

**Example 1:**
```
Input:  strs = ["alic3", "bob", "3", "4", "00300"]
Output: 300
Explanation: "alic3"→5 (length), "bob"→3, "3"→3, "4"→4, "00300"→300. Max = 300.
```

**Example 2:**
```
Input:  strs = ["1", "01", "001", "0001"]
Output: 4
Explanation: All are numeric: 1, 1, 1, 1. But wait — "0001"=1. Max by length: 4. 
Actually all are purely digits, so values are 1,1,1,1. Max = 1.
```

---

## Key Insight

> Simply check if a string is all digits. If yes, parse it as an integer. If not, use its length. Track the maximum across all strings.

---

## Approach

```
FUNCTION maximumValue(strs):
    result ← 0
    FOR s IN strs DO
        IF s consists only of digits THEN
            val ← INT(s)
        ELSE
            val ← LEN(s)
        result ← MAX(result, val)
    RETURN result
```

---

## Walkthrough

```
strs = ["alic3", "bob", "3", "4", "00300"]

"alic3" → has letters → value = len("alic3") = 5
"bob"   → has letters → value = len("bob") = 3
"3"     → all digits  → value = 3
"4"     → all digits  → value = 4
"00300" → all digits  → value = 300

Max = 300 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single pass | **O(n · m)** | **O(1)** |

Where `n` = number of strings, `m` = max string length.

---

## Follow-Up Questions

1. **How to check if a string is all digits efficiently?** Use `str.isdigit()` in Python or check each character against `'0'-'9'`.
2. **Can the numeric value overflow?** With max length 9, the max value is 999,999,999 which fits in a 32-bit integer.
3. **What about leading zeros?** "00300" parses to 300 — standard integer parsing handles this.

---

## Key Takeaway

> A straightforward conditional evaluation problem — classify each string and compute its value accordingly. No tricks needed, just careful implementation.

---
