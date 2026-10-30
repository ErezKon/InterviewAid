# 2864. Maximum Odd Binary Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-odd-binary-number](https://leetcode.com/problems/maximum-odd-binary-number)

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

You are given a **binary** string `s` that contains at least one `'1'`.

You have to **rearrange** the bits in such a way that the resulting binary number is the **maximum odd binary number** that can be created from this combination.

Return *a string representing the maximum odd binary number that can be created from the given combination.*

**Note** that the resulting string **can** have leading zeros.

**Constraints:**
- `1 <= s.length <= 100`
- `s` consists only of `'0'` and `'1'`.
- `s` contains at least one `'1'`.

---

## Examples

```
Example 1:
  Input: s = "010"
  Output: "001"
  Explanation: Because there is just one '1', it must be in the last position. So the answer is "001".
```

```
Example 2:
  Input: s = "0101"
  Output: "1001"
  Explanation: One of the '1's must be in the last position. The maximum number that can be made with the remaining digits is "100". So the answer is "1001".
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
