# 2683. Neighboring Bitwise XOR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/neighboring-bitwise-xor](https://leetcode.com/problems/neighboring-bitwise-xor)
**Companies:** Amazon, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: XOR Parity — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

A **0-indexed** array `derived` with length `n` is derived by computing the **bitwise XOR** (⊕) of adjacent values in a **binary array** `original` of length `n`.

Specifically, for each index `i` in the range `[0, n - 1]`:

- If `i = n - 1`, then `derived[i] = original[i] ⊕ original[0]`.
- Otherwise, `derived[i] = original[i] ⊕ original[i + 1]`.

Given an array `derived`, your task is to determine whether there exists a **valid binary array** `original` that could have formed `derived`.

Return ***true** if such an array exists or **false** otherwise.*

- A binary array is an array containing only **0's** and **1's**

**Constraints:**

- `n == derived.length`
- `1 <= n <= 10⁵`
- The values in `derived` are either **0's** or **1's**

---

## 2. Key Insight

> XOR all elements of `derived`: `derived[0] XOR derived[1] XOR ... XOR derived[n-1]` = 0 if and only if a valid `original` exists. Each `original[i]` appears in exactly two XOR terms, canceling out.

---

## 3. Approach: XOR Parity — O(n) ✅

```text
FUNCTION doesValidArrayExist(derived):
    // Compute XOR of all derived values
    SET xorAll ← 0
    FOR value IN derived:
        SET xorAll ← xorAll XOR value
    RETURN xorAll == 0
```

---

## 4. Examples

```
Example 1:
  Input: derived = [1,1,0]
  Output: true
  Explanation: A valid original array that gives derived is [0,1,0].
  derived[0] = original[0] ⊕ original[1] = 0 ⊕ 1 = 1
  derived[1] = original[1] ⊕ original[2] = 1 ⊕ 0 = 1
  derived[2] = original[2] ⊕ original[0] = 0 ⊕ 0 = 0
```

```
Example 2:
  Input: derived = [1,1]
  Output: true
  Explanation: A valid original array that gives derived is [0,1].
  derived[0] = original[0] ⊕ original[1] = 1
  derived[1] = original[1] ⊕ original[0] = 1
```

```
Example 3:
  Input: derived = [1,0]
  Output: false
  Explanation: There is no valid original array that gives derived.
```

---

## 5. Walkthrough

Consider `derived = [1,2,3]`.
1. Initialize `xorAll = 0`.
2. XOR with 1 → `xorAll = 1`.
3. XOR with 2 → `xorAll = 1 XOR 2 = 3`.
4. XOR with 3 → `xorAll = 3 XOR 3 = 0`.
5. Since final `xorAll` is 0, return `true`.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

- How would you reconstruct one possible `original` array when it exists?
- What changes are needed if the XOR operation is replaced by addition modulo a prime?
- Can this approach be extended to handle missing elements in `derived`?

---

## 8. Key Takeaway

> **XOR parity check.** A circular XOR system has a solution iff the XOR of all derived values is 0.
