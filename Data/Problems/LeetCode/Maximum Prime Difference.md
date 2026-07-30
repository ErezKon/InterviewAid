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

Given an array `nums`, return the **maximum distance** between indices `i` and `j` such that both `nums[i]` and `nums[j]` are **prime**.

**Constraints:**
- `1 <= nums.length <= 3 × 10^5`
- `1 <= nums[i] <= 100`

---

## Examples

**Example 1:**
```
Input:  nums = [4,2,9,5,3]
Output: 3
Explanation: nums[1]=2 (prime), nums[4]=3 (prime). Distance = 4-1 = 3.
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
