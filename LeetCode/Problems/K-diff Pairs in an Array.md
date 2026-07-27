# 532. K-diff Pairs in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/k-diff-pairs-in-an-array](https://leetcode.com/problems/k-diff-pairs-in-an-array)
**Companies:** Amazon, Apple, Bloomberg, Expedia, Google, Infosys, Microsoft, Salesforce, Tcs

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Hash Map — O(n) ✅](#4-approach-hash-map--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and integer `k`, return the number of **unique** k-diff pairs. A k-diff pair is `(nums[i], nums[j])` where `|nums[i] - nums[j]| == k` and `i != j`.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `-10⁷ <= nums[i] <= 10⁷`
- `0 <= k <= 10⁷`

---

## 2. Examples

```
Input: nums = [3,1,4,1,5], k = 2 → Output: 2 (pairs: (1,3), (3,5))
Input: nums = [1,2,3,4,5], k = 1 → Output: 4
Input: nums = [1,3,1,5,4], k = 0 → Output: 1 (pair: (1,1))
```

---

## 3. Key Insight

Use a **frequency counter**. Two cases:
- **k = 0:** Count numbers appearing ≥ 2 times (pair with itself).
- **k > 0:** For each unique number, check if `num + k` exists. Only check one direction to avoid double-counting.

---

## 4. Approach: Hash Map — O(n) ✅

```
FUNCTION findPairs(nums, k):
    count = Counter(nums)
    pairs = 0

    FOR num IN count:
        IF k == 0:
            IF count[num] >= 2: pairs += 1
        ELSE:
            IF num + k IN count: pairs += 1

    RETURN pairs
```

---

## 5. Walkthrough

```
nums = [3,1,4,1,5], k = 2
count = {3:1, 1:2, 4:1, 5:1}
```

| num | num + k | In count? | Pair? |
|-----|---------|-----------|-------|
| 3 | 5 | ✅ | (3,5) |
| 1 | 3 | ✅ | (1,3) |
| 4 | 6 | No | — |
| 5 | 7 | No | — |

**Result:** 2 pairs ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Build counter + iterate unique elements |
| Space | O(n) | Counter |

---

## 7. Key Takeaway

> Frequency counter handles both k=0 (duplicates) and k>0 (complement lookup) cases elegantly. Only check `num + k` (not `num - k`) to avoid counting each pair twice.
