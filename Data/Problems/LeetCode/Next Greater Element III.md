# 556. Next Greater Element III

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/next-greater-element-iii](https://leetcode.com/problems/next-greater-element-iii)
**Companies:** Adobe, Amazon, Bloomberg, Doordash, Google, Infosys, Meta, Microsoft, Mitsogo, Morgan Stanley, Oracle, Tiktok, Walmart Labs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Next Permutation — O(d)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given a positive integer `n`, find the **smallest** integer with the **same digits** that is greater than `n`. Return `-1` if no such number exists or it exceeds 32-bit integer range.

---

## 2. Examples

| Input | Output | Explanation |
|-------|--------|-------------|
| `12` | `21` | Swapping the digits yields the next greater number. |
| `21` | `-1` | No larger permutation exists. |
| `1234` | `1243` | Swap `3` with `4` and reverse the suffix. |

---

## 3. Key Insight

> This is exactly the **Next Permutation** algorithm applied to the digits of `n`. Find the pivot where digits increase, swap with the smallest larger digit to the right, then reverse the suffix.

---

## 4. Approach: Next Permutation — O(d) ✅

```text
FUNCTION nextGreaterElement(n):
    digits ← LIST of characters of STRING(n)
    // 1. Find rightmost index i where digits[i] < digits[i+1]
    i ← LENGTH(digits) - 2
    WHILE i ≥ 0 AND digits[i] ≥ digits[i+1]:
        i ← i - 1
    IF i < 0:
        RETURN -1

    // 2. Find rightmost index j where digits[j] > digits[i]
    j ← LENGTH(digits) - 1
    WHILE digits[j] ≤ digits[i]:
        j ← j - 1

    // 3. Swap and reverse suffix
    SWAP(digits[i], digits[j])
    REVERSE(digits[i+1:])

    result ← INTEGER formed by JOIN(digits)
    RETURN result IF result ≤ 2^31 - 1 ELSE -1
```

---

## 5. Walkthrough

Take `n = 1243`:

1. Digits = `[1,2,4,3]`.
2. Scan from right: `4 < 3`? No. `2 < 4`? Yes → pivot index `i = 1` (digit `2`).
3. Find smallest digit > `2` to the right: `3` at index `3`.
4. Swap: `[1,3,4,2]`.
5. Reverse suffix after index `1`: suffix `[4,2]` → `[2,4]`.
6. Final digits `[1,3,2,4]` → number `1324` which is the next greater permutation.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(d) — d = number of digits |
| **Space** | O(d) — to store digit list |

---

## 7. Follow-Up Questions

- How would you adapt the algorithm to find the *previous* permutation?
- Can you solve the problem without converting the integer to a string?
- What changes are needed to handle very large numbers beyond 32‑bit range?

---

## 8. Key Takeaway

> **Next Permutation on digits.** Find the pivot, swap with the next larger digit, and reverse the suffix to obtain the smallest greater number.
