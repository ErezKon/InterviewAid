# 1390. Four Divisors

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/four-divisors](https://leetcode.com/problems/four-divisors)
**Companies:** Amazon, Bloomberg, Capital One, Google, Meta, Microsoft

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Trial Division — O(n · √max) ✅](#3-approach-trial-division--on--max-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given an array of integers, return the sum of divisors of numbers that have exactly 4 divisors.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `1 <= nums[i] <= 10⁵`

---

## 2. Key Insight

> A number has exactly 4 divisors if it's either `p³` (prime cubed) or `p · q` (product of two distinct primes). Enumerate divisors up to √n and count.

---

## 3. Approach: Trial Division — O(n · √max) ✅

```
FUNCTION sumFourDivisors(nums):
    total = 0
    FOR num IN nums:
        divisors = []
        FOR i ← 1 TO sqrt(num):
            IF num % i == 0:
                divisors.ADD(i)
                IF i != num / i: divisors.ADD(num / i)
            IF len(divisors) > 4: BREAK
        IF len(divisors) == 4:
            total += SUM(divisors)
    RETURN total
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · √max) |
| **Space** | O(1) |

---

## 5. Key Takeaway

> Enumerate divisors up to √n for each number. Early exit when count exceeds 4. Sum divisors only for numbers with exactly 4.
