# 3896. Minimum Operations to Transform Array into Alternating Prime

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-transform-array-into-alternating-prime](https://leetcode.com/problems/minimum-operations-to-transform-array-into-alternating-prime)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy per Position — O(n · √max)](#4-approach-greedy-per-position)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array of positive integers, transform it so that elements at **even indices are prime** and elements at **odd indices are not prime** (or vice versa — alternating pattern). Each operation increments or decrements an element by 1. Return the **minimum** total operations.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input: nums = [4, 7, 3, 5]
  Output: 3
  Explanation: Pattern "prime, non-prime, prime, non-prime":
    4→3 (1 op, prime), 7→8 (1 op, non-prime), 3 stays (prime), 5→4 (1 op, non-prime)
    Total = 3

Example 2:
  Input: nums = [2, 3]
  Output: 1
  Explanation: Either 3→4 (non-prime at odd) or swap pattern. Min = 1.
```

---

## 3. Key Insight

> There are only **two valid patterns**: (prime at even, non-prime at odd) or (non-prime at even, prime at odd). For each element, compute the cost to make it prime (nearest prime distance) and cost to make it non-prime (0 if already non-prime, else ±1). Try both patterns and take the minimum.

---

## 4. Approach: Greedy per Position — O(n · √max) ✅

```
FUNCTION minOperations(nums):
    // Precompute: for each value, distance to nearest prime and nearest non-prime
    
    costPattern1 = 0  // even=prime, odd=non-prime
    costPattern2 = 0  // even=non-prime, odd=prime
    
    FOR i ← 0 TO n - 1:
        primeCost = distToNearestPrime(nums[i])
        nonPrimeCost = distToNearestNonPrime(nums[i])
        
        IF i % 2 == 0:
            costPattern1 += primeCost
            costPattern2 += nonPrimeCost
        ELSE:
            costPattern1 += nonPrimeCost
            costPattern2 += primeCost
    
    RETURN MIN(costPattern1, costPattern2)


FUNCTION distToNearestPrime(x):
    IF isPrime(x): RETURN 0
    d = 1
    WHILE TRUE:
        IF isPrime(x - d): RETURN d
        IF isPrime(x + d): RETURN d
        d += 1


FUNCTION distToNearestNonPrime(x):
    IF NOT isPrime(x): RETURN 0
    RETURN 1  // x±1 is always non-prime for prime x > 2 (one of them is even)
```

---

## 5. Walkthrough

```
nums = [4, 7, 3, 5]

Pattern 1 (even=prime, odd=non-prime):
  i=0: 4 → nearest prime = 3 (cost 1)
  i=1: 7 → non-prime cost: 7 is prime → cost 1 (→6 or →8)
  i=2: 3 → prime, cost 0
  i=3: 5 → non-prime cost: 5 is prime → cost 1 (→4 or →6)
  Total = 1+1+0+1 = 3

Pattern 2 (even=non-prime, odd=prime):
  i=0: 4 → non-prime, cost 0
  i=1: 7 → prime, cost 0
  i=2: 3 → non-prime cost: 3 is prime → cost 1
  i=3: 5 → prime, cost 0
  Total = 0+0+1+0 = 1

Answer = MIN(3, 1) = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · √max) — primality check per element, nearest prime search |
| **Space** | O(1) or O(max) if using sieve |

With a sieve of Eratosthenes precomputed up to `max + gap`, this becomes O(max + n).

---

## 7. Key Takeaway

> **Two-pattern enumeration with greedy per-element costs** — when there are only a small number of valid configurations (here 2), compute the cost of each and pick the cheapest.
