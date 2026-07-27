# 1655. Distribute Repeating Integers

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/distribute-repeating-integers](https://leetcode.com/problems/distribute-repeating-integers)
**Companies:** Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP](#approach-bitmask-dp)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an array `quantity` of length `m` (m ≤ 10), determine if it's possible to distribute `nums` such that the `i-th` customer gets exactly `quantity[i]` copies of **one** value (all same number).

**Constraints:**
- `n <= 10^5`, `m <= 10`
- `1 <= quantity[i] <= 10^5`
- At most 50 unique values in `nums`

---

## Examples

```
Input: nums = [1,1,2,2], quantity = [2,2]
Output: true
Explanation: Customer 1 gets two 1's, customer 2 gets two 2's.
```

```
Input: nums = [1,1,2,3], quantity = [2,2]
Output: false
```

---

## Key Insight

> With m ≤ 10 customers, use **bitmask DP** over subsets of customers. For each unique value (with its count), try assigning subsets of customers whose total quantity ≤ count. Precompute subset sums of quantities.

---

## Approach: Bitmask DP ✅

```
FUNCTION canDistribute(nums, quantity):
    counts ← sorted(Counter(nums).values(), descending)
    m ← length(quantity)
    totalMask ← (1 << m) - 1

    // Precompute sum of quantity for each subset
    subsetSum ← array of size (totalMask + 1)
    FOR mask ← 0 TO totalMask DO
        FOR j ← 0 TO m-1 DO
            IF mask has bit j THEN
                subsetSum[mask] += quantity[j]

    // dp[mask] = minimum number of unique values needed to satisfy customers in mask
    // Alternative: dp[i][mask] = can first i values satisfy customer subset mask
    dp ← array of size (totalMask + 1), initialized to false
    dp[0] ← true

    FOR count IN counts DO
        // Iterate masks in decreasing order to avoid reuse
        FOR mask ← totalMask DOWNTO 0 DO
            IF dp[mask] THEN CONTINUE (already satisfied)
            // Try all subsets of remaining unsatisfied customers
            sub ← mask
            WHILE sub > 0 DO
                IF subsetSum[sub] <= count AND dp[mask XOR sub] THEN
                    dp[mask] ← true
                    BREAK
                sub ← (sub - 1) AND mask

    RETURN dp[totalMask]
END FUNCTION
```

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(V × 3^m) | V unique values (≤50), 3^m subset enumeration (m≤10 → 59049) |
| **Space** | O(2^m) | DP array over customer subsets |

---

## Follow-Up Questions

**Q1: Why 3^m and not 4^m?**
> For each of the m customers, there are 3 states relative to a given mask: not in mask, in mask but not in sub, in sub. Iterating submasks of a mask sums to 3^m total.

**Q2: Why sort counts descending?**
> Larger counts can satisfy more subsets. Processing them first prunes the search faster.

---

## Key Takeaway

> **When m is small (≤ 10-15), bitmask DP over subsets of "customers/tasks" is the go-to approach. Precompute subset sums and enumerate submasks for assignment.**
