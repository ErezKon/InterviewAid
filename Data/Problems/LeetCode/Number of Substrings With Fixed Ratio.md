# 2489. Number of Substrings With Fixed Ratio

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-with-fixed-ratio](https://leetcode.com/problems/number-of-substrings-with-fixed-ratio)
**Companies:** Intuit

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix Transform + Hash Map — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given a binary string `s`, and two integers `num1` and `num2`. `num1` and `num2` are coprime numbers.

A **ratio substring** is a substring of s where the ratio between the number of `0`'s and the number of `1`'s in the substring is exactly `num1 : num2`.

- For example, if `num1 = 2` and `num2 = 3`, then `"01011"` and `"1110000111"` are ratio substrings, while `"11000"` is not.

Return *the number of **non-empty** ratio substrings of *`s`.

**Note** that:

- A **substring** is a contiguous sequence of characters within a string.
- Two values `x` and `y` are **coprime** if `gcd(x, y) == 1` where `gcd(x, y)` is the greatest common divisor of `x` and `y`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `1 <= num1, num2 <= s.length`
- `num1` and `num2` are coprime integers.

---

## 2. Key Insight

> Transform: count0 · num2 == count1 · num1. Define `f(i) = count0(i) · num2 - count1(i) · num1`. Substrings where f(r) - f(l) == 0 have the target ratio. Count prefix value matches.

---

## 3. Approach: Prefix Transform + Hash Map — O(n) ✅

```text
FUNCTION fixedRatio(s, num1, num2):
    // prefix map stores frequency of transformed values
    SET prefix ← MAP with default 0
    SET prefix[0] ← 1
    SET val ← 0
    SET result ← 0
    FOR c IN s:
        IF c == '0':
            SET val ← val + num2
        ELSE:
            SET val ← val - num1
        SET result ← result + prefix[val]
        SET prefix[val] ← prefix[val] + 1
    RETURN result
```

---

## 4. Examples

**Example 1:**
```
Input: s = "0110011", num1 = 1, num2 = 2
Output: 4
Explanation: There exist 4 non-empty ratio substrings.
- The substring s[0..2]: "0110011". It contains one 0 and two 1's. The ratio is 1 : 2.
- The substring s[1..4]: "0110011". It contains one 0 and two 1's. The ratio is 1 : 2.
- The substring s[4..6]: "0110011". It contains one 0 and two 1's. The ratio is 1 : 2.
- The substring s[1..6]: "0110011". It contains two 0's and four 1's. The ratio is 2 : 4 == 1 : 2.
It can be shown that there are no more ratio substrings.
```

**Example 2:**
```
Input: s = "10101", num1 = 3, num2 = 1
Output: 0
Explanation: There is no ratio substrings of s. We return 0.
```

---

## 5. Walkthrough

Consider the second example `s = "000111"`, `num1 = 1`, `num2 = 2`.

| Index | Char | val (after update) | prefix[val] before | result increment | result total |
|-------|------|--------------------|--------------------|------------------|--------------|
| 0     | -    | 0                  | 1 (initial)        | 0                | 0            |
| 1     | 0    | 0 + 2 = 2          | 0                  | 0                | 0            |
| 2     | 0    | 2 + 2 = 4          | 0                  | 0                | 0            |
| 3     | 0    | 4 + 2 = 6          | 0                  | 0                | 0            |
| 4     | 1    | 6 - 1 = 5          | 0                  | 0                | 0            |
| 5     | 1    | 5 - 1 = 4          | 1 (from index 2)   | +1               | 1            |
| 6     | 1    | 4 - 1 = 3          | 0                  | 0                | 1            |

The increments correspond to substrings ending at each position that satisfy the ratio. Summing gives the final answer 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

- How would you modify the solution for a sliding window where the substring length is bounded?
- Can the approach be extended to alphabets larger than binary with a target ratio vector?
- What if the ratio is given as a fraction that needs to be reduced first?

---

## 5. Key Takeaway

> **Transform ratio constraint into prefix sum equality.** `count0·num2 - count1·num1` constant across a substring means the ratio is fixed. Standard prefix + hash map pattern.
