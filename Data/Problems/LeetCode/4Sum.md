# 18. 4Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 40.6%
**LeetCode:** [https://leetcode.com/problems/4sum](https://leetcode.com/problems/4sum)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Cloudflare, De Shaw, Doordash, Google, Infosys, Linkedin, Meta, Microsoft, Nvidia, Rubrik, Servicenow, Singlestore, Tcs, Yandex, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort + kSum Reduction — O(n³) ✅](#4-approach-sort--ksum-reduction--on³-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums` of `n` integers and an integer `target`, return all unique quadruplets `[nums[a], nums[b], nums[c], nums[d]]` such that `a, b, c, d` are distinct indices and `nums[a] + nums[b] + nums[c] + nums[d] == target`.

**Constraints:**
- `1 ≤ nums.length ≤ 200`
- `-10⁹ ≤ nums[i] ≤ 10⁹`
- `-10⁹ ≤ target ≤ 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1, 0, -1, 0, -2, 2], target = 0
  Output: [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]]

Example 2:
  Input:  nums = [2, 2, 2, 2, 2], target = 8
  Output: [[2,2,2,2]]
```

---

## 3. Key Insight

> **kSum reduction pattern**: fix one element, reduce to (k-1)Sum, until you reach 2Sum which is solved with two pointers. Skip duplicates at every level to avoid duplicate quadruplets.

```
4Sum → fix nums[i] → 3Sum on remainder
     → fix nums[j] → 2Sum with two pointers
```

---

## 4. Approach: Sort + kSum Reduction — O(n³) ✅

```
FUNCTION fourSum(nums, target):
    SORT nums
    RETURN kSum(nums, target, 4, 0)

FUNCTION kSum(nums, target, k, start):
    result = []
    IF k == 2:
        RETURN twoSum(nums, target, start)

    FOR i ← start TO n - k:
        IF i > start AND nums[i] == nums[i-1]: CONTINUE
        FOR subset IN kSum(nums, target - nums[i], k-1, i+1):
            result.ADD([nums[i]] + subset)
    RETURN result
```

---

## 5. Walkthrough

```
nums = [1, 0, -1, 0, -2, 2], target = 0
sorted = [-2, -1, 0, 0, 1, 2]

i=0: fix -2, 3Sum(target=2) on [-1, 0, 0, 1, 2]
  j=1: fix -1, 2Sum(target=3) on [0, 0, 1, 2]
    lo=2, hi=5: 0+2=2 < 3 → lo++
    lo=3, hi=5: 0+2=2 < 3 → lo++
    lo=4, hi=5: 1+2=3 == 3 → add [-2,-1,1,2] ✓
  j=2: fix 0, 2Sum(target=2) on [0, 1, 2]
    lo=3, hi=5: 0+2=2 == 2 → add [-2,0,0,2] ✓
  j=3: skip (dup of 0)

i=1: fix -1, 3Sum(target=1) on [0, 0, 1, 2]
  j=2: fix 0, 2Sum(target=1) on [0, 1, 2]
    lo=3, hi=5: 0+2=2 > 1 → hi--
    lo=3, hi=4: 0+1=1 == 1 → add [-1,0,0,1] ✓

Result: [[-2,-1,1,2], [-2,0,0,2], [-1,0,0,1]] ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n^(k-1)) = O(n³) for k=4 |
| **Space** | O(n) for recursion + O(n) for sorting |

---

## 7. Follow-Up Questions

### 7.1 How to add pruning for early termination?

After sorting, if `nums[i] × k > target` (all remaining elements too large) or `nums[i] + sum of k-1 largest < target` (even largest can't reach target), skip.

### 7.2 What about overflow?

With `nums[i]` up to 10⁹ and summing 4 numbers, the sum can exceed 32-bit range. Use `long` / 64-bit integers.

### 7.3 The kSum family

| k | Problem | Time |
|---|---------|------|
| 2 | Two Sum / Two Sum II | O(n) / O(n) |
| 3 | 3Sum (#15) | O(n²) |
| 4 | **4Sum** (#18) | O(n³) |
| k | General kSum | O(n^(k-1)) |

---

## 8. Key Takeaway

> kSum generalizes: fix one element, recurse to (k-1)Sum, base case is 2Sum with two pointers. Skip duplicates at each level. The pattern `O(n^(k-1))` is optimal for the general case.
