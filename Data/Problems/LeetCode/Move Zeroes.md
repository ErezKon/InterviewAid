# 283. Move Zeroes

**Difficulty:** 🟢 Easy
**Acceptance:** 63.0%
**LeetCode:** [https://leetcode.com/problems/move-zeroes](https://leetcode.com/problems/move-zeroes)
**Companies:** Accenture, Accolite, Adobe, Adp, Amazon, Amd, Anduril, Apple, Bloomberg, Capgemini, Chewy, Cisco, Cognizant, Coinswitch Kuber, Crowdstrike, Epam Systems, Goldman Sachs, Google, Ibm, Infosys, Intuit, Josh Technology, Jtg, Kpmg, Lti, Meta, Microsoft, Netapp, Nvidia, Oracle, Paypal, Qualcomm, Salesforce, Samsung, Sap, Servicenow, Sigmoid, Tcs, Tiktok, Uber, Verizon, Vk, Walmart Labs, Wix, Yandex, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Two-Pass — O(n)](#3-approach-1-two-pass--on)
4. [Approach 2: Optimal Swap — O(n) ✅](#4-approach-2-optimal-swap--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, move all `0`'s to the **end** of it while maintaining the **relative order** of the non-zero elements.

**Note:** You must do this **in-place** without making a copy of the array.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `-2³¹ <= nums[i] <= 2³¹ - 1`

---

## 2. Examples

```
Example 1:
  Input:  nums = [0,1,0,3,12]
  Output: [1,3,12,0,0]

Example 2:
  Input:  nums = [0]
  Output: [0]
```

---

## 3. Approach 1: Two-Pass — O(n)

First pass: copy all non-zero elements to the front. Second pass: fill remaining positions with zeros.

```
FUNCTION moveZeroes(nums):
    writePos = 0

    // First pass: move non-zeros forward
    FOR i ← 0 TO n - 1:
        IF nums[i] != 0:
            nums[writePos] = nums[i]
            writePos += 1

    // Second pass: fill rest with zeros
    FOR i ← writePos TO n - 1:
        nums[i] = 0
```

---

## 4. Approach 2: Optimal Swap — O(n) ✅

Use a `slow` pointer to track where the next non-zero should go. When we find a non-zero, swap it with `slow` position.

```
FUNCTION moveZeroes(nums):
    slow = 0

    FOR fast ← 0 TO n - 1:
        IF nums[fast] != 0:
            SWAP(nums[slow], nums[fast])
            slow += 1
```

### Why This Works

- `slow` always points to the first zero (or the next position to place a non-zero).
- `fast` scans for non-zeros.
- Swapping ensures zeros bubble to the right while non-zeros maintain their relative order.

---

## 5. Walkthrough

```
nums = [0, 1, 0, 3, 12]
slow = 0

fast=0: nums[0]=0 → skip
fast=1: nums[1]=1 → swap(nums[0], nums[1]) → [1,0,0,3,12], slow=1
fast=2: nums[2]=0 → skip
fast=3: nums[3]=3 → swap(nums[1], nums[3]) → [1,3,0,0,12], slow=2
fast=4: nums[4]=12→ swap(nums[2], nums[4]) → [1,3,12,0,0], slow=3

Result: [1, 3, 12, 0, 0] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Two-Pass | O(n) | O(1) |
| **Swap** | **O(n)** | **O(1)** |

Both are O(n), but the swap approach does it in a single pass with minimal writes.

---

## 7. Follow-Up Questions

### 7.1 Minimize the number of operations (writes)?

The swap approach already minimizes writes — each non-zero element is written at most once. If the array has many non-zeros at the front, you can add: `if (slow != fast) swap(...)` to avoid self-swaps.

### 7.2 Move all instances of a specific value to the end?

Replace the condition `nums[fast] != 0` with `nums[fast] != val`. Same algorithm.

### 7.3 Sort an array of 0s, 1s, and 2s (Dutch National Flag / LeetCode #75)?

Use three pointers: `low`, `mid`, `high`. This is a generalization — see Sort Colors.

### 7.4 Remove Element (LeetCode #27)?

Same pattern — use a write pointer, skip elements equal to `val`. Return the new length.

```
FUNCTION removeElement(nums, val):
    write = 0
    FOR i ← 0 TO n - 1:
        IF nums[i] != val:
            nums[write] = nums[i]
            write += 1
    RETURN write
```

---

## Key Takeaway

> **The reader-writer (fast-slow) pointer pattern** is fundamental for in-place array transformations. `fast` reads, `slow` writes. Use swap when you need to preserve all elements; use overwrite when you can discard some.
