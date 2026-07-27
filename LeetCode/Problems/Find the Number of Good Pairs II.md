# 3164. Find the Number of Good Pairs II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-good-pairs-ii](https://leetcode.com/problems/find-the-number-of-good-pairs-ii)
**Companies:** Airbus, Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Divisor Enumeration — O(n·√M + m) ✅](#3-approach-divisor-enumeration)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Same as Part I but with larger constraints. Count pairs `(i, j)` where `nums1[i] % (nums2[j] * k) == 0`.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 10⁵`
- `1 <= nums1[i], nums2[j] <= 10⁶`

---

## 2. Key Insight

> For each element in `nums1`, enumerate its divisors. If a divisor `d` is divisible by `k`, then `d/k` is a valid `nums2[j]` value. Count matches using a frequency map of `nums2`.

---

## 3. Approach: Divisor Enumeration — O(n·√M + m) ✅

```
FUNCTION numberOfPairs(nums1, nums2, k):
    freq2 ← Counter(nums2)
    count ← 0

    FOR a IN nums1 DO
        IF a % k != 0 THEN CONTINUE
        target ← a / k
        FOR d ← 1 TO √target DO
            IF target % d == 0 THEN
                IF d IN freq2 THEN count += freq2[d]
                IF d != target/d AND target/d IN freq2 THEN
                    count += freq2[target/d]

    RETURN count
```

---

## 4. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · √(M/k) + m) |
| **Space** | O(m) — frequency map |

---

## 5. Key Takeaway

> **Enumerate divisors** of `nums1[i]/k` and look up each in the `nums2` frequency map. This avoids the O(n·m) brute force.
