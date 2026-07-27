# 189. Rotate Array

**Difficulty:** 🟡 Medium
**Acceptance:** 41.0%
**LeetCode:** [https://leetcode.com/problems/rotate-array](https://leetcode.com/problems/rotate-array)
**Companies:** Accenture, Amazon, American Express, Apple, Bloomberg, Box, Capgemini, Cognizant, Deloitte, Epam Systems, Fiverr, Google, Ibm, Infosys, Meta, Microsoft, Nutanix, Oracle, Razorpay, Samsung, Siemens, Tcs, Tiktok, Virtusa, Visa, Walmart Labs, Wipro, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Extra Array — O(n)](#3-approach-1-extra-array--on)
4. [Approach 2: Reverse — O(n) ✅](#4-approach-2-reverse--on-)
5. [Approach 3: Cyclic Replacements — O(n)](#5-approach-3-cyclic-replacements--on)
6. [Walkthrough](#6-walkthrough)
7. [Complexity Analysis](#7-complexity-analysis)
8. [Follow-Up Questions](#8-follow-up-questions)

---

## 1. Problem Description

Given an integer array `nums`, rotate the array to the right by `k` steps.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `-2³¹ <= nums[i] <= 2³¹ - 1`
- `0 <= k <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1,2,3,4,5,6,7], k = 3
  Output: [5,6,7,1,2,3,4]

Example 2:
  Input:  nums = [-1,-100,3,99], k = 2
  Output: [3,99,-1,-100]
```

---

## 3. Approach 1: Extra Array — O(n)

```
FUNCTION rotate(nums, k):
    n = len(nums)
    k = k % n
    result = new array of size n
    FOR i ← 0 TO n - 1:
        result[(i + k) % n] = nums[i]
    COPY result into nums
```

---

## 4. Approach 2: Reverse — O(n) ✅

Three reverses:
1. Reverse the entire array.
2. Reverse the first `k` elements.
3. Reverse the remaining `n - k` elements.

```
FUNCTION rotate(nums, k):
    n = len(nums)
    k = k % n
    REVERSE(nums, 0, n - 1)
    REVERSE(nums, 0, k - 1)
    REVERSE(nums, k, n - 1)
```

### Why This Works

```
Original:     [1, 2, 3, 4, 5, 6, 7],  k = 3
Reverse all:  [7, 6, 5, 4, 3, 2, 1]
Reverse 0..2: [5, 6, 7, 4, 3, 2, 1]
Reverse 3..6: [5, 6, 7, 1, 2, 3, 4]  ✅
```

---

## 5. Approach 3: Cyclic Replacements — O(n)

Place each element at its final position, following the cycle.

```
FUNCTION rotate(nums, k):
    n = len(nums)
    k = k % n
    count = 0
    start = 0

    WHILE count < n:
        current = start
        prev = nums[start]

        DO:
            next = (current + k) % n
            temp = nums[next]
            nums[next] = prev
            prev = temp
            current = next
            count += 1
        WHILE current != start

        start += 1
```

---

## 6. Walkthrough

```
nums = [1,2,3,4,5,6,7], k = 3

Reverse approach:
  Step 1: Reverse all     → [7,6,5,4,3,2,1]
  Step 2: Reverse [0..2]  → [5,6,7,4,3,2,1]
  Step 3: Reverse [3..6]  → [5,6,7,1,2,3,4] ✅
```

---

## 7. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Extra Array | O(n) | O(n) |
| **Reverse** | **O(n)** | **O(1)** |
| Cyclic | O(n) | O(1) |

---

## 8. Follow-Up Questions

### 8.1 Rotate left instead of right?

Rotate left by k = rotate right by n - k. Or reverse in different order: reverse first k, reverse last n-k, reverse all.

### 8.2 Rotate a linked list (LeetCode #61)?

Find length, connect tail to head (make circular), then break at position n - k.

### 8.3 Rotate a 2D matrix (LeetCode #48)?

Transpose + reverse each row (for 90° clockwise). Different problem — rotates the matrix, not the elements.

---

## Key Takeaway

> The **triple reverse** technique is elegant: O(n) time, O(1) space, and easy to implement. Don't forget `k = k % n` to handle k > n.
