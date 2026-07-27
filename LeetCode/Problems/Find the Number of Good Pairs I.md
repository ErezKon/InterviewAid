# 3162. Find the Number of Good Pairs I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-number-of-good-pairs-i](https://leetcode.com/problems/find-the-number-of-good-pairs-i)
**Companies:** Airbus, Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Brute Force — O(n·m) ✅](#2-approach-brute-force--onm-)
3. [Complexity Analysis](#3-complexity-analysis)
4. [Key Takeaway](#4-key-takeaway)

---

## 1. Problem Description

Given arrays `nums1`, `nums2`, and integer `k`, count pairs `(i, j)` where `nums1[i] % (nums2[j] * k) == 0`.

**Constraints:**
- `1 <= nums1.length, nums2.length <= 50`

---

## 2. Approach: Brute Force — O(n·m) ✅

```
FUNCTION numberOfPairs(nums1, nums2, k):
    count ← 0
    FOR a IN nums1 DO
        FOR b IN nums2 DO
            IF b * k != 0 AND a % (b * k) == 0 THEN
                count += 1
    RETURN count
```

---

## 3. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · m) |
| **Space** | O(1) |

---

## 4. Key Takeaway

> With small constraints (n, m ≤ 50), brute force checking all pairs is optimal and simple.
