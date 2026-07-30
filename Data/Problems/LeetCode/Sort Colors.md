# 75. Sort Colors

**Difficulty:** 🟡 Medium
**Acceptance:** 65.0%
**LeetCode:** [https://leetcode.com/problems/sort-colors](https://leetcode.com/problems/sort-colors)
**Companies:** Adobe, Agoda, Amazon, Apple, Autodesk, Bloomberg, Capgemini, Cisco, Ebay, Flipkart, Goldman Sachs, Google, Ibm, Info Edge, Infosys, Makemytrip, Meta, Microsoft, Morgan Stanley, Nagarro, Nvidia, Oracle, Paypal, Phonepe, Pocket Gems, Salesforce, Samsung, Servicenow, Slice, Swiggy, Target, Tcs, Tiktok, Visa, Walmart Labs, Workday, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Counting Sort — O(n)](#3-approach-1-counting-sort--on)
4. [Approach 2: Dutch National Flag — O(n) ✅](#4-approach-2-dutch-national-flag--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

Given an array `nums` with `n` objects colored red, white, or blue (represented by `0`, `1`, `2`), sort them **in-place** so that objects of the same color are adjacent, in the order red, white, blue.

You must solve this without using the library's sort function.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 300`
- `nums[i]` is `0`, `1`, or `2`.

---

## 2. Examples

```
Example 1:
  Input:  nums = [2,0,2,1,1,0]
  Output: [0,0,1,1,2,2]

Example 2:
  Input:  nums = [2,0,1]
  Output: [0,1,2]
```

---

## 3. Approach 1: Counting Sort — O(n)

Two passes: count occurrences, then overwrite.

```
FUNCTION sortColors(nums):
    count = [0, 0, 0]
    FOR num IN nums:
        count[num] += 1

    idx = 0
    FOR color ← 0 TO 2:
        FOR i ← 0 TO count[color] - 1:
            nums[idx] = color
            idx += 1
```

Two passes. The interviewer usually wants **one pass**.

---

## 4. Approach 2: Dutch National Flag — O(n) ✅

### Key Insight

Maintain three pointers: `low`, `mid`, `high`.
- `[0..low-1]` contains all 0s
- `[low..mid-1]` contains all 1s
- `[mid..high]` is unprocessed
- `[high+1..n-1]` contains all 2s

### Pseudocode

```
FUNCTION sortColors(nums):
    low  = 0
    mid  = 0
    high = len(nums) - 1

    WHILE mid <= high:
        IF nums[mid] == 0:
            SWAP(nums[low], nums[mid])
            low += 1
            mid += 1
        ELSE IF nums[mid] == 1:
            mid += 1
        ELSE:   // nums[mid] == 2
            SWAP(nums[mid], nums[high])
            high -= 1
            // Don't increment mid — the swapped element needs inspection
```

---

## 5. Walkthrough

```
nums = [2, 0, 2, 1, 1, 0]
low=0, mid=0, high=5

mid=0: nums[0]=2 → swap(0,5) → [0,0,2,1,1,2], high=4
mid=0: nums[0]=0 → swap(0,0) → [0,0,2,1,1,2], low=1, mid=1
mid=1: nums[1]=0 → swap(1,1) → [0,0,2,1,1,2], low=2, mid=2
mid=2: nums[2]=2 → swap(2,4) → [0,0,1,1,2,2], high=3
mid=2: nums[2]=1 → mid=3
mid=3: nums[3]=1 → mid=4
mid=4 > high=3 → done

Result: [0,0,1,1,2,2] ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space | Passes |
|----------|------|-------|--------|
| Counting Sort | O(n) | O(1) | 2 |
| **Dutch National Flag** | **O(n)** | **O(1)** | **1** |

---

## 7. Follow-Up Questions

### 7.1 What if there are k colors (k > 3)?

Generalize to **k-way partitioning**. Use counting sort (always O(n + k)) or recursive Dutch National Flag (partition on median color, recurse on halves).

### 7.2 Move Zeroes (LeetCode #283)?

A simpler version — partition into non-zeros and zeros. Use the same swap technique with two pointers.

### 7.3 Partition Array (LeetCode #86, Partition List)?

Partition around a pivot value. Elements ≤ pivot go left, > pivot go right. Same two-pointer swap approach.

### 7.4 Why not increment `mid` when swapping with `high`?

The element swapped from `high` hasn't been inspected yet — it could be 0, 1, or 2. We need to check it before moving on. When swapping with `low`, the element from `low` is always ≤ `mid` (it's either 0 or 1, already processed), so we can safely advance.

---

## Key Takeaway

> The **Dutch National Flag** algorithm is the one-pass, constant-space solution for 3-way partitioning. The key insight is maintaining three regions with invariants and being careful not to advance `mid` when swapping with `high` (the incoming element is unexamined).
