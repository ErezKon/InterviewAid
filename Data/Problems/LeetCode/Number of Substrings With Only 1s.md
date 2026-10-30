# 1513. Number of Substrings With Only 1s

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-substrings-with-only-1s](https://leetcode.com/problems/number-of-substrings-with-only-1s)
**Companies:** Amazon, Google, Ibm

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Running Count — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary string `s`, return *the number of substrings with all characters* `1`*'s*. Since the answer may be too large, return it modulo `10^9 + 7`.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

---

## 2. Examples

**Example 1:**
```
Input: s = "0110111"
Output: 9
Explanation: There are 9 substring in total with only 1's characters.
"1" -> 5 times.
"11" -> 3 times.
"111" -> 1 time.
```

**Example 2:**
```
Input: s = "101"
Output: 2
Explanation: Substring "1" is shown 2 times in s.
```

**Example 3:**
```
Input: s = "111111"
Output: 21
Explanation: Each substring contains only 1's characters.
```

---

## 3. Approach: Running Count — O(n) ✅

```text
FUNCTION countOnlyOnes(s):
    // MOD for large answers
    SET MOD ← 1_000_000_007
    SET total ← 0
    SET consecutive ← 0
    FOR ch IN s:
        IF ch == '1':
            SET consecutive ← consecutive + 1
        ELSE:
            SET consecutive ← 0
        SET total ← (total + consecutive) MOD MOD
    RETURN total
```

---

## 4. Walkthrough

Consider `s = "0110111"`.

| Index | Char | consecutive | total (mod) |
|-------|------|--------------|-------------|
| 0     | 0    | 0            | 0           |
| 1     | 1    | 1            | 1           |
| 2     | 1    | 2            | 3 (1+2)     |
| 3     | 0    | 0            | 3           |
| 4     | 1    | 1            | 4           |
| 5     | 1    | 2            | 6 (4+2)     |
| 6     | 1    | 3            | 9 (6+3)     |

The `consecutive` counter adds the number of new substrings ending at each position.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

- How would you adapt the solution to count substrings with exactly *k* consecutive '1's?
- Can the method be extended to count substrings consisting of a single repeated character for any alphabet?
- What if the input string is streamed and you must output the count after each character?

---

## 7. Key Takeaway

> **A run of k consecutive 1s contributes k·(k+1)/2 substrings.** By maintaining a running count of consecutive 1s, we can accumulate the answer in linear time.
