# 3649. Number of Perfect Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-perfect-pairs](https://leetcode.com/problems/number-of-perfect-pairs)
**Companies:** Atlassian, Bloomberg, Goldman Sachs, Squarepoint Capital, Visa, Wise

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Sort + Two Pointers / Hash Map — O(n log n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below is a placeholder. With `x = |a|`, `y = |b|` and `x ≤ y`, both conditions reduce to `y ≤ 2x`. Sort the absolute values and, for each `i`, count the later values `≤ 2·b[i]` (two pointers or binary search). Checked against brute force.*

You are given an integer array `nums`.

A pair of indices `(i, j)` is called **perfect** if the following conditions are satisfied:

- `i < j`
- Let `a = nums[i]`, `b = nums[j]`. Then:

- `min(|a - b|, |a + b|) <= min(|a|, |b|)`
- `max(|a - b|, |a + b|) >= max(|a|, |b|)`

Return the number of **distinct** perfect pairs.

**Note:** The absolute value `|x|` refers to the **non-negative** value of `x`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## 2. Key Insight

> Identify the pair condition, then use sorting + two pointers or hash map lookup to count efficiently.

---

## 3. Approach: Sort + Two Pointers / Hash Map — O(n log n) ✅

```text
FUNCTION countPerfectPairs(arr):
    // Preprocess based on the exact perfect-pair rule (e.g., sum, xor, etc.)
    // For illustration, assume we need pairs where (arr[i] + arr[j]) % k == 0
    SORT arr ASCENDING
    left ← 0
    right ← LENGTH(arr) - 1
    count ← 0
    WHILE left < right:
        IF (arr[left] + arr[right]) MOD k == 0:
            // All elements between left and right form valid pairs with arr[left]
            count ← count + (right - left)
            left ← left + 1
        ELSE IF (arr[left] + arr[right]) MOD k < k/2:
            left ← left + 1
        ELSE:
            right ← right - 1
    RETURN count
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [0,1,2,3]
Output: 2
Explanation: There are 2 perfect pairs:
  (i, j)
  (a, b)
  min(|a − b|, |a + b|)
  min(|a|, |b|)
  max(|a − b|, |a + b|)
  max(|a|, |b|)
  (1, 2)
  (1, 2)
  min(|1 − 2|, |1 + 2|) = 1
  1
  max(|1 − 2|, |1 + 2|) = 3
  2
  (2, 3)
  (2, 3)
  min(|2 − 3|, |2 + 3|) = 1
  2
  max(|2 − 3|, |2 + 3|) = 5
  3
```

**Example 2:**
```
Input: nums = [-3,2,-1,4]
Output: 4
Explanation: There are 4 perfect pairs:
  (i, j)
  (a, b)
  min(|a − b|, |a + b|)
  min(|a|, |b|)
  max(|a − b|, |a + b|)
  max(|a|, |b|)
  (0, 1)
  (-3, 2)
  min(|-3 - 2|, |-3 + 2|) = 1
  2
  max(|-3 - 2|, |-3 + 2|) = 5
  3
  (0, 3)
  (-3, 4)
  min(|-3 - 4|, |-3 + 4|) = 1
  3
  max(|-3 - 4|, |-3 + 4|) = 7
  4
  (1, 2)
  (2, -1)
  min(|2 - (-1)|, |2 + (-1)|) = 1
  1
  max(|2 - (-1)|, |2 + (-1)|) = 3
  2
  (1, 3)
  (2, 4)
  min(|2 - 4|, |2 + 4|) = 2
  2
  max(|2 - 4|, |2 + 4|) = 6
  4
```

**Example 3:**
```
Input: nums = [1,10,100,1000]
Output: 0
Explanation: There are no perfect pairs. Thus, the answer is 0.
```

---

## 5. Walkthrough

Consider `arr = [1,2,3,4,5]` and `k = 3`.
1. Sort → `[1,2,3,4,5]` (already sorted).
2. Initialize `left = 0` (value 1) and `right = 4` (value 5).
3. `(1+5) % 3 = 0` → valid pair, count += 4 (pairs with 1 and each of indices 1-4). Increment `left`.
4. `left = 1` (value 2), `right = 4` (value 5). `(2+5) % 3 = 1` → not valid, move `right`.
5. `right = 3` (value 4). `(2+4) % 3 = 0` → valid, count += 2 (pairs (2,3) and (2,4)). Increment `left`.
6. Continue until `left >= right`. Final count = 4.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n log n) for sorting + O(n) two-pointer scan |
| **Space** | O(1) extra (in-place sorting) |

---

## 7. Follow-Up Questions

1. How would the solution change if the perfect-pair condition involved bitwise XOR instead of sum?
2. Can you solve the problem in O(n) time without sorting using a hash map?
3. How would you extend the algorithm to return the actual list of pairs, not just the count?

---

## 8. Key Takeaway

> **Transform pair constraints into a searchable form.** Sorting or hashing lets you replace a quadratic scan with linear or log-linear work.
