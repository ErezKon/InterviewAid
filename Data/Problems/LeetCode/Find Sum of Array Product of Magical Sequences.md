# 3539. Find Sum of Array Product of Magical Sequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences](https://leetcode.com/problems/find-sum-of-array-product-of-magical-sequences)
**Companies:** Infosys, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#3-key-insight)
3. [Approach: Combinatorial DP with Bitmask ✅](#4-approach-combinatorial-dp-with-bitmask-)
4. [Complexity Analysis](#6-complexity-analysis)
5. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

> *Note: the Approach below solves a different, invented problem. Correct idea: a magical sequence is determined by how many times `c_i` each index `i` is used (`Σ c_i = m`) — contributing `m! / Π c_i! · Π nums[i]^{c_i}` — and the popcount of `Σ c_i · 2^i`. Process indices from low to high with DP state `(i, used, carry, bits)`, adding `c_i` to the carry; at the end add `popcount(carry)` to the bit count and require it to equal `k`.*

You are given two integers, `m` and `k`, and an integer array `nums`.
A sequence of integers `seq` is called **magical** if:

- `seq` has a size of `m`.
- `0 <= seq[i] < nums.length`
- The **binary representation** of `2^seq[0] + 2^seq[1] + ... + 2^seq[m - 1]` has `k` **set bits**.

The **array product** of this sequence is defined as `prod(seq) = (nums[seq[0]] * nums[seq[1]] * ... * nums[seq[m - 1]])`.

Return the **sum** of the **array products** for all valid **magical** sequences.

Since the answer may be large, return it **modulo** `10^9 + 7`.

A **set bit** refers to a bit in the binary representation of a number that has a value of 1.

**Constraints:**
- `1 <= k <= m <= 30`
- `1 <= nums.length <= 50`
- `1 <= nums[i] <= 10^8`

---

## 2. Examples

**Example 1:**
```
Input: m = 5, k = 5, nums = [1,10,100,10000,1000000]
Output: 991600007
Explanation: All permutations of [0, 1, 2, 3, 4] are magical sequences, each with an array product of 10^13.
```

**Example 2:**
```
Input: m = 2, k = 2, nums = [5,4,3,2,1]
Output: 170
Explanation: The magical sequences are [0, 1], [0, 2], [0, 3], [0, 4], [1, 0], [1, 2], [1, 3], [1, 4], [2, 0], [2, 1], [2, 3], [2, 4], [3, 0], [3, 1], [3, 2], [3, 4], [4, 0], [4, 1], [4, 2], and [4, 3].
```

**Example 3:**
```
Input: m = 1, k = 1, nums = [28]
Output: 28
Explanation: The only magical sequence is [0].
```

---

## 3. Approach: Combinatorial DP with Bitmask ✅

```text
FUNCTION sumOfProducts(n, m, k):
    MOD ← 10^9 + 7
    // Pre-compute binomial coefficients C(i, j) for 0 ≤ i ≤ n
    maxBit ← floor(log2(m))
    // dp[mask][cnt] = number of ways to achieve a certain bitmask with cnt non-zero elements
    INITIALIZE dp[0][0] ← 1
    FOR each number val FROM 1 TO m:
        bitMask ← binary representation of val
        FOR mask FROM (1 << maxBit) - 1 DOWNTO 0:
            newMask ← mask OR bitMask
            FOR cnt FROM k-1 DOWNTO 0:
                dp[newMask][cnt+1] ← dp[newMask][cnt+1] + dp[mask][cnt]
    // Combine contributions of each mask to the final product sum
    result ← 0
    FOR mask FROM 0 TO (1 << maxBit) - 1:
        ways ← dp[mask][k]
        product ← computeProductFromMask(mask)
        result ← (result + ways * product) MOD MOD
    RETURN result
```

The algorithm enumerates possible bit patterns of numbers up to `m` and uses DP to count how many sequences realize each combined mask with exactly `k` non-zero elements. The product for a mask is the product of the values represented by the set bits.

---

## 4. Walkthrough

Consider `n = 2, m = 3, k = 1`.
| Step | Chosen value | Bit mask | DP state update |
|------|--------------|----------|-----------------|
| 1    | 1 (01)       | 01       | dp[01][1] += dp[00][0] = 1 |
| 2    | 2 (10)       | 10       | dp[10][1] += dp[00][0] = 1 |
| 3    | 3 (11)       | 11       | dp[11][1] += dp[00][0] = 1 |
After processing all numbers, dp[mask][1] = 1 for masks 01,10,11. The product for each mask equals the value itself, so the sum = 1+2+3 = 6.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(m · 2^{log m} · k) — iterating over numbers and bitmask states |
| **Space** | O(2^{log m} · k) — DP table for masks and counts |

---

## 6. Follow-Up Questions

1. How would the solution change if the product constraint were replaced by a sum constraint?
2. Can the approach be adapted for sequences where the order of non-zero elements matters?
3. What optimizations are possible when `m` is very large but the number of set bits per value is small?

---

## Key Takeaway

> This problem combines **bitmask DP, combinatorics, and modular arithmetic**. The key decomposition is treating each bit position independently and counting valid assignments using binomial coefficients.
