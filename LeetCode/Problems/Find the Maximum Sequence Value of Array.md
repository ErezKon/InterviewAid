# 3287. Find the Maximum Sequence Value of Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-sequence-value-of-array](https://leetcode.com/problems/find-the-maximum-sequence-value-of-array)
**Companies:** Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Prefix/Suffix OR DP — O(n · 2^B · k) ✅](#3-approach-prefixsuffix-or-dp--on--2b--k-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `nums` and integer `k`, split the array into a prefix of size `k` and a suffix of size `k`. Maximize `(OR of prefix) XOR (OR of suffix)`.

**Constraints:**
- `2 <= n <= 400`
- `1 <= nums[i] < 2⁷`
- `1 <= k <= n / 2`

---

## 2. Key Insight

> Precompute for each position: what OR values are achievable by selecting `k` elements from the prefix [0..i], and from the suffix [i+1..n-1]. Then maximize XOR of (prefix OR, suffix OR).

---

## 3. Approach: Prefix/Suffix OR DP — O(n · 2^B · k) ✅

```
FUNCTION maxValue(nums, k):
    n ← LENGTH(nums)
    // prefixOR[i] = set of achievable OR values using k elements from nums[0..i]
    // suffixOR[i] = set of achievable OR values using k elements from nums[i..n-1]
    // Use DP: dp[j][v] = can we select j elements with OR value v?

    // Build prefix and suffix DP
    // For each valid split point, maximize XOR

    maxXOR ← 0
    FOR split ← k - 1 TO n - k - 1 DO
        FOR pOR IN prefixOR[split] DO
            FOR sOR IN suffixOR[split + 1] DO
                maxXOR ← MAX(maxXOR, pOR XOR sOR)

    RETURN maxXOR
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · k · 2^B) where B=7 (since nums[i] < 128) |
| **Space** | O(n · k · 2^B) |

---

## 5. Key Takeaway

> **Prefix/suffix DP on OR values** works because the value domain is small (< 128 = 2⁷). Enumerate all achievable OR values for k-element selections from both sides.
