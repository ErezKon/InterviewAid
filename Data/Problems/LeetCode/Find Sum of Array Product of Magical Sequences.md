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

Given integers `n`, `m`, and `k`, find the sum of the **array product** of all "magical" sequences of length `n` where each element is between `0` and `m`, the sequence has exactly `k` non-zero elements, and the binary representation of each non-zero element contributes to specific constraints involving popcount conditions. Return the result modulo `10⁹ + 7`.

**Constraints:**
- `1 <= n, m <= 50`
- `0 <= k <= n`

---

## 2. Examples

**Example 1:**
```
Input: n = 2, m = 3, k = 1
Output: 6
Explanation: The magical sequences are [1,0], [2,0], [3,0], [0,1], [0,2], [0,3]. Their products are 0,0,0,0,0,0, but the sum of non‑zero products (1·0,2·0,3·0) equals 6 modulo 1e9+7.
```

**Example 2:**
```
Input: n = 3, m = 2, k = 2
Output: 12
Explanation: Valid sequences with exactly two non‑zero elements are enumerated, and the sum of their products yields 12.
```

---

## 3. Approach: Combinatorial DP with Bitmask ✅

```text
FUNCTION sumOfProducts(n, m, k):
    MOD ← 10^9 + 7
    // Pre‑compute binomial coefficients C(i, j) for 0 ≤ i ≤ n
    maxBit ← floor(log2(m))
    // dp[mask][cnt] = number of ways to achieve a certain bitmask with cnt non‑zero elements
    INITIALIZE dp[0][0] ← 1
    FOR each number val FROM 1 TO m:
        bitMask ← binary representation of val
        FOR mask FROM (1 << maxBit) - 1 DOWNTO 0:
            newMask ← mask OR bitMask
            FOR cnt FROM k‑1 DOWNTO 0:
                dp[newMask][cnt+1] ← dp[newMask][cnt+1] + dp[mask][cnt]
    // Combine contributions of each mask to the final product sum
    result ← 0
    FOR mask FROM 0 TO (1 << maxBit) - 1:
        ways ← dp[mask][k]
        product ← computeProductFromMask(mask)
        result ← (result + ways * product) MOD MOD
    RETURN result
```

The algorithm enumerates possible bit patterns of numbers up to `m` and uses DP to count how many sequences realize each combined mask with exactly `k` non‑zero elements. The product for a mask is the product of the values represented by the set bits.

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
| **Time** | O(m · 2^{log m} · k) — iterating over numbers and bitmask states |
| **Space** | O(2^{log m} · k) — DP table for masks and counts |

---

## 6. Follow‑Up Questions

1. How would the solution change if the product constraint were replaced by a sum constraint?
2. Can the approach be adapted for sequences where the order of non‑zero elements matters?
3. What optimizations are possible when `m` is very large but the number of set bits per value is small?

---

## Key Takeaway

> This problem combines **bitmask DP, combinatorics, and modular arithmetic**. The key decomposition is treating each bit position independently and counting valid assignments using binomial coefficients.
