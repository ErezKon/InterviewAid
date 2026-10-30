# 2936. Number of Equal Numbers Blocks

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-equal-numbers-blocks](https://leetcode.com/problems/number-of-equal-numbers-blocks)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Binary Search for Block Boundaries — O(b log n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given a **0-indexed** array of integers, `nums`. The following property holds for `nums`:

- All occurrences of a value are adjacent. In other words, if there are two indices `i < j` such that `nums[i] == nums[j]`, then for every index `k` that `i < k < j`, `nums[k] == nums[i]`.

Since `nums` is a very large array, you are given an instance of the class `BigArray` which has the following functions:

- `int at(long long index)`: Returns the value of `nums[i]`.
- `void size()`: Returns `nums.length`.

Let's partition the array into **maximal** blocks such that each block contains **equal values**. Return *the number of these blocks.*

**Note** that if you want to test your solution using a custom test, behavior for tests with `nums.length > 10` is undefined.

**Constraints:**

- `1 <= nums.length <= 10^15`
- `1 <= nums[i] <= 10^9`
- The input is generated such that all equal values are adjacent.
- The sum of the elements of `nums` is at most `10^15`.

---

## 2. Examples

```
Example 1:
  Input: nums = [3,3,3,3,3]
  Output: 1
  Explanation: There is only one block here which is the whole array (because all numbers are equal) and that is: [3,3,3,3,3]. So the answer would be 1.
```

```
Example 2:
  Input: nums = [1,1,1,3,9,9,9,2,10,10]
  Output: 5
  Explanation: There are 5 blocks here:
  Block number 1: [1,1,1]
  Block number 2: [3]
  Block number 3: [9,9,9]
  Block number 4: [2]
  Block number 5: [10,10]
  So the answer would be 5.
```

```
Example 3:
  Input: nums = [1,2,3,4,5,6,7]
  Output: 7
  Explanation: Since all numbers are distinct, there are 7 blocks here and each element representing one block. So the answer would be 7.
```

---

## 3. Key Insight

> Binary search for the end of each block. Starting from the first element of a block, binary search for the last position with the same value. Then the next block starts right after.

---

## 4. Approach: Binary Search for Block Boundaries — O(b log n) ✅

```text
FUNCTION countBlocks(arr):
    n ← arr.length()
    blocks ← 0
    i ← 0
    WHILE i < n:
        val ← arr[i]
        // binary search for last index with same value
        lo ← i
        hi ← n - 1
        WHILE lo < hi:
            mid ← (lo + hi + 1) / 2
            IF arr[mid] == val:
                lo ← mid
            ELSE:
                hi ← mid - 1
        // lo is last index of current block
        blocks ← blocks + 1
        i ← lo + 1
    RETURN blocks
```

---

## 5. Walkthrough

For `arr = [1,1,2,2,2,3]`:

| Iteration | i (start) | val | lo/hi search result | Block end index | Next i |
|-----------|-----------|-----|---------------------|-----------------|--------|
| 1 | 0 | 1 | lo ends at 1 | 1 | 2 |
| 2 | 2 | 2 | lo ends at 4 | 4 | 5 |
| 3 | 5 | 3 | lo ends at 5 | 5 | 6 (end) |

Three blocks are counted.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(b · log n) where b = number of blocks |
| **Space** | O(1) |

---

## 7. Follow-Up Questions

1. How would you adapt the algorithm if the API also supports a `rangeSum(i, j)` operation?
2. Can you achieve O(b) queries using exponential search instead of binary search?
3. What changes are needed if the array may contain `null` values that should be ignored?

---

## 8. Key Takeaway

> **Binary search to skip blocks.** When only API access is available, binary search for block boundaries to minimize queries. Each block costs O(log n) queries.
