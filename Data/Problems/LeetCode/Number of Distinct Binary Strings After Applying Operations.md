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

Given a binary string `s` of length `n` and an integer `k`, you may flip any substring of length `k` (changing `0` to `1` and vice‑versa). Determine how many **distinct** binary strings can be obtained.

---

## 2. Examples

**Example 1:**
```
Input: s = "1010", k = 2
Output: 4
Explanation: Possible strings are "1010", "0110", "1001", "0101".
```

**Example 2:**
```
Input: s = "000", k = 1
Output: 2
Explanation: Flipping any single bit yields either "100", "010", or "001"; all are reachable, plus the original string.
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
