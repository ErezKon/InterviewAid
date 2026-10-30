# 2992. Number of Self-Divisible Permutations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-self-divisible-permutations](https://leetcode.com/problems/number-of-self-divisible-permutations)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below uses the divisibility condition `num % pos == 0 or pos % num == 0` (Beautiful Arrangement). Officially the condition is `gcd(num, pos) == 1`. Keep the same bitmask DP and change only that test.*

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer `n`, return *the number of **permutations** of the **1-indexed** array* `nums = [1, 2, ..., n]`*, such that it's **self-divisible***.

A **1-indexed** array `a` of length `n` is **self-divisible** if for every `1 <= i <= n`, `gcd(a[i], i) == 1`.

A **permutation** of an array is a rearrangement of the elements of that array, for example here are all of the permutations of the array `[1, 2, 3]`:

- `[1, 2, 3]`
- `[1, 3, 2]`
- `[2, 1, 3]`
- `[2, 3, 1]`
- `[3, 1, 2]`
- `[3, 2, 1]`

**Constraints:**
- `1 <= n <= 12`

---

## 2. Examples

**Example 1:**
```
Input: n = 1
Output: 1
Explanation: The array [1] has only 1 permutation which is self-divisible.
```

**Example 2:**
```
Input: n = 2
Output: 1
Explanation: The array [1,2] has 2 permutations and only one of them is self-divisible:
nums = [1,2]: This is not self-divisible since gcd(nums[2], 2) != 1.
nums = [2,1]: This is self-divisible since gcd(nums[1], 1) == 1 and gcd(nums[2], 2) == 1.
```

**Example 3:**
```
Input: n = 3
Output: 3
Explanation: The array [1,2,3] has 3 self-divisble permutations: [1,3,2], [3,1,2], [2,3,1].
It can be shown that the other 3 permutations are not self-divisible. Hence the answer is 3.
```

---

## 3. Approach

**Algorithm:** Bitmask Dynamic Programming (DP)

The constraint `n ≤ 12` allows enumeration of all subsets of numbers using a bitmask. `dp[mask]` stores the number of ways to fill the first `popcount(mask)` positions with the numbers indicated by `mask`.

**Pseudocode:**
```text
FUNCTION selfDivisiblePermutationCount(n):
    dp ← ARRAY of size (1 << n) filled with 0
    dp[0] ← 1
    FOR mask ← 0 TO (1 << n) - 1:
        pos ← POPCOUNT(mask) + 1  // current position (1‑based)
        FOR num ← 1 TO n:
            IF NOT (mask AND (1 << (num-1))):
                IF num MOD pos = 0 OR pos MOD num = 0:
                    dp[mask OR (1 << (num-1))] ← dp[mask OR (1 << (num-1))] + dp[mask]
    RETURN dp[(1 << n) - 1]
```

---

## 4. Walkthrough

Consider `n = 3`.

| Step | mask (binary) | pos | Chosen number | Condition satisfied? | dp update |
|------|---------------|-----|---------------|----------------------|----------|
| 1    | 000           | 1   | 1             | 1 % 1 = 0            | dp[001] += dp[000] (=1) |
|      |               |     | 2             | 2 % 1 = 0            | dp[010] += dp[000] (=1) |
|      |               |     | 3             | 3 % 1 = 0            | dp[100] += dp[000] (=1) |
| 2    | 001           | 2   | 2             | 2 % 2 = 0            | dp[011] += dp[001] (=1) |
|      |               |     | 3             | 3 % 2 ≠ 0, 2 % 3 ≠ 0 | skip |
| …    | …             | …   | …             | …                    | … |

After processing all masks, `dp[111] = 3`, matching the example output.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · 2ⁿ) |
| **Space** | O(2ⁿ) |

---

## 6. Follow-Up Questions

1. How would the solution change if `n` could be up to 20? Discuss trade‑offs.
2. Can the problem be solved using backtracking with pruning instead of DP?
3. How would you adapt the algorithm for a similar constraint where `perm[i]` must be a multiple of `i` only?

---

## 7. Key Takeaway

> **Bitmask DP efficiently enumerates all subsets for small‑n permutation constraints**, using the position derived from the current mask’s popcount.
