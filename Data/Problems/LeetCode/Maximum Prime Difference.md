# 3115. Maximum Prime Difference

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-prime-difference](https://leetcode.com/problems/maximum-prime-difference)
**Companies:** Unstop

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

Return an integer that is the **maximum** distance between the **indices** of two (not necessarily different) prime numbers in `nums`.

**Constraints:**
- `1 <= nums.length <= 3 × 10^5`
- `1 <= nums[i] <= 100`
- The input is generated such that the number of prime numbers in the `nums` is at least one.

---

## Examples

```
Example 1:
  Input: nums = [4,2,9,5,3]
  Output: 3
  Explanation: nums[1], nums[3], and nums[4] are prime. So the answer is |4 - 1| = 3.
```

```
Example 2:
  Input: nums = [4,8,2,8]
  Output: 0
  Explanation: nums[2] is prime. Because there is just one prime number, the answer is |2 - 2| = 0.
```

---

## Key Insight

> Find the **first** and **last** index where the value is prime. The answer is `last - first`.

---

## Approach

```
FUNCTION maximumPrimeDifference(nums)
    first ← first index i where nums[i] is prime
    last ← last index i where nums[i] is prime
    RETURN last - first
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — two scans |
| Space  | **O(1)** — precomputed primes up to 100 |

---

## Key Takeaway

> **Two-pointer scan** — find first prime from the left and last prime from the right. The difference is the answer.
