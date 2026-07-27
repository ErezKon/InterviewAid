# 3569. Maximize Count of Distinct Primes After Split

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split](https://leetcode.com/problems/maximize-count-of-distinct-primes-after-split)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Sieve + Prefix Counts — O(n√M + n)](#approach-sieve--prefix-counts--onm--n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, split it into two non-empty contiguous parts. For each part, count the number of **distinct prime** values. Maximize the **sum** of distinct prime counts across both parts.

**Constraints:**
- `2 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁵`

---

## Key Insight

> Precompute which values are prime using a **sieve**. Then use prefix/suffix sets of distinct primes: for each split point, the answer is `|prefix_primes[0..i]| + |suffix_primes[i+1..n-1]|`. A prime appearing in both halves counts twice (once per part), which is fine — we want distinct primes per part.

---

## Approach: Sieve + Prefix Counts — O(n√M + n) ✅

```
FUNCTION maxDistinctPrimes(nums):
    primes = SIEVE(max(nums))

    // Build prefix distinct prime counts and suffix distinct prime counts
    prefixSet = SET(); prefixCount = [0] * n
    FOR i ← 0 TO n - 1:
        IF nums[i] IN primes: prefixSet.ADD(nums[i])
        prefixCount[i] = len(prefixSet)

    suffixSet = SET(); suffixCount = [0] * n
    FOR i ← n - 1 DOWNTO 0:
        IF nums[i] IN primes: suffixSet.ADD(nums[i])
        suffixCount[i] = len(suffixSet)

    result = 0
    FOR i ← 0 TO n - 2:
        result = MAX(result, prefixCount[i] + suffixCount[i + 1])

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sieve + prefix/suffix | **O(M log log M + n)** | O(M + n) |

Where M = max value in nums.

---

## Key Takeaway

> **Prefix/suffix set counting with a prime sieve efficiently handles "maximize distinct elements across a partition" problems.** The key insight is that the same prime in both halves counts toward both, so prefix and suffix sets are independent.
