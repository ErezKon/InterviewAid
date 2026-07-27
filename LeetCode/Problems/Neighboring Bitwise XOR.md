# 2683. Neighboring Bitwise XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/neighboring-bitwise-xor](https://leetcode.com/problems/neighboring-bitwise-xor)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: XOR Parity — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `derived[i] = original[i] XOR original[(i+1) % n]`, determine if a valid `original` array exists.

**Constraints:**
- `1 <= n <= 10⁵`

---

## 2. Key Insight

> XOR all elements of `derived`: `derived[0] XOR derived[1] XOR ... XOR derived[n-1]` = 0 if and only if a valid `original` exists. Each `original[i]` appears in exactly two XOR terms, canceling out.

---

## 3. Approach: XOR Parity — O(n) ✅

```
FUNCTION doesValidArrayExist(derived):
    RETURN XOR(derived) == 0
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> **XOR parity check.** A circular XOR system has a solution iff the XOR of all derived values is 0.
