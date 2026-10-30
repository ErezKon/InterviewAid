# 1702. Maximum Binary String After Change

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-binary-string-after-change](https://leetcode.com/problems/maximum-binary-string-after-change)
**Companies:** Huawei

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy — O(n)](#approach-greedy--on-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given a binary string `binary` consisting of only `0`'s or `1`'s. You can apply each of the following operations any number of times:

- Operation 1: If the number contains the substring `"00"`, you can replace it with `"10"`.

- For example, `"00010" -> "10010`"

- Operation 2: If the number contains the substring `"10"`, you can replace it with `"01"`.

- For example, `"00010" -> "00001"`

*Return the **maximum binary string** you can obtain after any number of operations. Binary string `x` is greater than binary string `y` if `x`'s decimal representation is greater than `y`'s decimal representation.*

**Constraints:**
- `1 <= binary.length <= 10^5`
- `binary` consist of `'0'` and `'1'`.

---

## Key Insight

> All leading 1s stay. All remaining 0s can be gathered together using `"10" → "01"`, then converted using `"00" → "10"` repeatedly. The result has all 1s except for a single 0 whose position = (index of first 0) + (count of 0s after it) - 1.

---

## Approach: Greedy — O(n) ✅

```text
FUNCTION maximumBinaryString(binary):
    firstZero ← INDEX_OF('0' IN binary)
    IF firstZero = -1:
        RETURN binary    // all 1s
    zeroCount ← COUNT('0' FROM firstZero TO END OF binary)
    // Build result: all '1's with a single '0' at calculated position
    resultLength ← LENGTH(binary)
    result ← ARRAY_OF('1', resultLength)
    zeroPos ← firstZero + zeroCount - 1
    SET result[zeroPos] ← '0'
    RETURN JOIN(result)
```

---

## Examples

**Example 1:**
```
Input: binary = "000110"
Output: "111011"
Explanation: A valid transformation sequence can be:
"000110" -> "000101"
"000101" -> "100101"
"100101" -> "110101"
"110101" -> "110011"
"110011" -> "111011"
```

**Example 2:**
```
Input: binary = "01"
Output: "01"
Explanation: "01" cannot be transformed any further.
```

---

## Walkthrough

Consider the input `"010100"`.
| Step | Operation | String |
|------|-----------|--------|
| 0    | Initial   | 010100 |
| 1    | Gather zeros using `10 → 01` | 001110 |
| 2    | Convert leading `00 → 10` repeatedly | 111011 |

The first zero appears at index 0, total zeros after it = 4, so final zero position = 3, yielding `"111011"`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy | **O(n)** | O(n) |

---

## Key Takeaway

> **All 0s after the first can be collapsed into a single 0.** The single remaining 0 sits at position `firstZero + zeroCount - 1`. Everything else becomes 1.
