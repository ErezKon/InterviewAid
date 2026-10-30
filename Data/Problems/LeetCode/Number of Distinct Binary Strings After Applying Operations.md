# 2450. Number of Distinct Binary Strings After Applying Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations](https://leetcode.com/problems/number-of-distinct-binary-strings-after-applying-operations)
**Companies:** Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Math — O(1)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

You are given a **binary** string `s` and a positive integer `k`.

You can apply the following operation on the string **any** number of times:

- Choose any substring of size `k` from `s` and **flip** all its characters, that is, turn all `1`'s into `0`'s, and all `0`'s into `1`'s.

Return *the number of **distinct** strings you can obtain*. Since the answer may be too large, return it **modulo** `10^9 + 7`.

**Note** that:

- A binary string is a string that consists **only** of the characters `0` and `1`.
- A substring is a contiguous part of a string.

**Constraints:**

- `1 <= k <= s.length <= 10^5`
- `s[i]` is either `0` or `1`.

---

## 2. Examples

```
Example 1:
  Input: s = "1001", k = 3
  Output: 4
  Explanation: We can obtain the following strings:
  - Applying no operation on the string gives s = "1001".
  - Applying one operation on the substring starting at index 0 gives s = "0111".
  - Applying one operation on the substring starting at index 1 gives s = "1110".
  - Applying one operation on both the substrings starting at indices 0 and 1 gives s = "0000".
  It can be shown that we cannot obtain any other string, so the answer is 4.
```

```
Example 2:
  Input: s = "10110", k = 5
  Output: 2
  Explanation: We can obtain the following strings:
  - Applying no operation on the string gives s = "10110".
  - Applying one operation on the whole string gives s = "01001".
  It can be shown that we cannot obtain any other string, so the answer is 2.
```

---

## 3. Approach: Math — O(1) ✅

```text
FUNCTION countDistinctStrings(s, k):
    // Number of independent window positions
    SET positions ← LENGTH(s) - k + 1
    // Each position can be toggled independently → 2^positions possibilities
    RETURN 2 ^ positions MOD 1_000_000_007
```

---

## 4. Walkthrough

For `s = "1010"`, `k = 2`:
| Window start | Flip result |
|--------------|------------|
| 0 ("10")    | "0110" |
| 1 ("01")    | "1100" (but further flips can reach other strings) |
| 2 ("10")    | "1001" |
All combinations of toggling the three possible windows produce 2³ = 8 strings, but many coincide; the distinct count is 4.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(1) — direct formula |
| **Space** | O(1) |

---

## 6. Follow-Up Questions

1. How would the answer change if overlapping flips were not allowed?
2. Can we extend the solution to handle multiple values of `k` efficiently?
3. What if the operation flips bits according to a custom pattern rather than a contiguous window?

---

## 7. Key Takeaway

> **Each window position gives independent control.** The answer is simply `2^(n - k + 1)` — a pure math problem disguised as string manipulation.
