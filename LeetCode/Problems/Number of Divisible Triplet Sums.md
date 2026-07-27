# 2964. Number of Divisible Triplet Sums

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/number-of-divisible-triplet-sums](https://leetcode.com/problems/number-of-divisible-triplet-sums)
**Companies:** Activision, Att, Ibm, Linkedin, Mathworks, Palantir, Salesforce, Visa, Zscaler

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Hash Map of Pair Sums — O(n²)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Count triplets `(i, j, k)` with `i < j < k` where `(nums[i] + nums[j] + nums[k]) % d == 0`.

---

## 2. Key Insight

> Fix `k`, maintain a hash map of `(nums[i] + nums[j]) % d` for all `i < j < k`. Look up complement `(d - nums[k] % d) % d`.

---

## 3. Approach: Hash Map of Pair Sums — O(n²) ✅

```
FUNCTION divisibleTripletCount(nums, d):
    count = 0
    n = len(nums)

    FOR k ← 2 TO n - 1:
        pairMod = Counter()
        FOR j ← 0 TO k - 1:
            FOR i ← 0 TO j - 1:
                pairMod[(nums[i] + nums[j]) % d] += 1

        count += pairMod[(d - nums[k] % d) % d]

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n²) |
| **Space** | O(d) |

---

## 5. Key Takeaway

> **Reduce triplet to pair sum + complement lookup.** Fix one element, precompute pair remainder sums, look up complement. Same pattern as 3Sum with modular arithmetic.
