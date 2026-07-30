# 2864. Maximum Odd Binary Number

**Difficulty:** 🟢 Easy

**Companies:** Amazon, Google, Meta
---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary string `s` with at least one `'1'`, rearrange it to form the **maximum odd binary number**. A binary number is odd if its last digit is `'1'`.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists of `'0'` and `'1'` with at least one `'1'`.

---

## Examples

**Example 1:**
```
Input:  s = "010"
Output: "001"
Explanation: Only one '1', must go last for odd. Result: "001" = 1.
```

**Example 2:**
```
Input:  s = "0101"
Output: "1001"
Explanation: Two 1s: one at front for max value, one at end for odd.
```

---

## Key Insight

> Place one `'1'` at the end (ensuring odd), all remaining `'1'`s at the front (maximizing value), and `'0'`s in between.

---

## Approach

```
FUNCTION maximumOddBinaryNumber(s)
    ones ← count of '1' in s
    RETURN '1' × (ones - 1) + '0' × (len(s) - ones) + '1'
END FUNCTION
```

---

## Walkthrough

```
s = "0101", ones = 2, zeros = 2
Result: "1" + "00" + "1" = "1001"
```

**Result: "1001"** ✅ (binary 9, odd, maximum possible)

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — count + string build |
| Space  | **O(n)** — output string |

---

## Key Takeaway

> **Greedy placement** — reserve one '1' for the last position (odd), put the rest at the front (maximize), fill middle with '0's.
