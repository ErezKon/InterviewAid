# 961. N-Repeated Element in Size 2N Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/n-repeated-element-in-size-2n-array](https://leetcode.com/problems/n-repeated-element-in-size-2n-array)
**Companies:** Akamai, Amazon, Bloomberg, Google, Meta, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Set — O(n)](#4-approach)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` with the following properties:

- `nums.length == 2 * n`.
- `nums` contains `n + 1` **unique** values, `n` of which occur **exactly once** in the array.
- Exactly one element of `nums` is repeated `n` times.

Return *the element that is repeated* `n` *times*.

**Constraints:**

- `2 <= n <= 5000`
- `nums.length == 2 * n`
- `0 <= nums[i] <= 10^4`
- `nums` contains `n + 1` **unique** elements and one of them is repeated exactly `n` times.

---

## 2. Examples

```
Example 1:
  Input: nums = [1,2,3,3]
  Output: 3
```

```
Example 2:
  Input: nums = [2,1,2,5,3,2]
  Output: 2
```

```
Example 3:
  Input: nums = [5,1,5,2,5,3,5,4]
  Output: 5
```

---

## 3. Key Insight

> Since one element appears n times and the rest appear once, the first duplicate we encounter while scanning is the answer.

---

## 4. Approach: Hash Set — O(n) ✅

```text
FUNCTION repeatedNTimes(nums):
    SET seen ← set()
    FOR num IN nums:
        IF num IN seen:
            RETURN num
        ADD num TO seen
```

---

## 5. Walkthrough

Consider the array `[5,1,5,2,5,3,5,4]` (`n = 4`).

| Step | num | seen (before) | Action |
|------|-----|---------------|--------|
| 1 | 5 | {} | Add 5 to `seen` |
| 2 | 1 | {5} | Add 1 to `seen` |
| 3 | 5 | {5,1} | 5 already in `seen` → return 5 |

The algorithm stops as soon as the repeated element is found.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) |

---

## 7. Follow-Up Questions

1. How would you solve the problem using O(1) extra space?
2. What if more than one element could appear `n` times?
3. Can you adapt the solution for a stream of numbers where the size is unknown?

---

## 8. Key Takeaway

> **First duplicate = n-repeated element.** With `n+1` unique values in a `2n`-sized array, the repeated element must appear as a duplicate early, allowing a linear-time hash-set solution.
