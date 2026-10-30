# 1980. Find Unique Binary String

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-unique-binary-string](https://leetcode.com/problems/find-unique-binary-string)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Cantor's Diagonalization — O(n) ✅](#3-approach-cantors-diagonalization--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Examples](#5-examples)
6. [Walkthrough](#6-walkthrough)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of strings `nums` containing `n` **unique** binary strings each of length `n`, return *a binary string of length *`n`* that **does not appear** in *`nums`*. If there are multiple answers, you may return **any** of them*.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 16`
- `nums[i].length == n`
- `nums[i] `is either `'0'` or `'1'`.
- All the strings of `nums` are **unique**.

---

## 2. Key Insight

> Cantor's diagonalization: flip the i-th bit of the i-th string. The result differs from string `i` at position `i`, so it can't equal any input string.

---

## 3. Approach: Cantor's Diagonalization — O(n) ✅

```text
FUNCTION findDifferentBinaryString(nums):
    // Cantor's diagonalization
    result ← ""
    FOR i ← 0 TO LENGTH(nums) - 1 DO
        IF nums[i][i] = '1' THEN
            result ← result + '0'
        ELSE
            result ← result + '1'
    RETURN result
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n) — single pass through the list |
| **Space** | O(n) — output string |

---

## 5. Examples

**Example 1:**
```
Input: nums = ["01","10"]
Output: "11"
Explanation: "11" does not appear in nums. "00" would also be correct.
```

**Example 2:**
```
Input: nums = ["00","01"]
Output: "11"
Explanation: "11" does not appear in nums. "10" would also be correct.
```

**Example 3:**
```
Input: nums = ["111","011","001"]
Output: "101"
Explanation: "101" does not appear in nums. "000", "010", "100", and "110" would also be correct.
```

---

## 6. Walkthrough

Consider `nums = ["01","10"]`.
| i | nums[i] | nums[i][i] | result after step |
|---|----------|------------|-------------------|
| 0 | "01"    | '0'        | result = '1'      |
| 1 | "10"    | '0'        | result = '11'     |
The final result "11" differs from both input strings at their respective diagonal positions, guaranteeing uniqueness.

---

## 7. Key Takeaway

> **Cantor's diagonalization** guarantees a unique result in O(n) — a beautiful application of set theory to coding problems.
