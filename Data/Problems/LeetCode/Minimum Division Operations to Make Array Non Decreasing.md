# 3326. Minimum Division Operations to Make Array Non Decreasing

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-division-operations-to-make-array-non-decreasing](https://leetcode.com/problems/minimum-division-operations-to-make-array-non-decreasing)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Right-to-Left + Smallest Prime Factor — O(n + M)](#approach-greedy-right-to-left--smallest-prime-factor--on--m)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

You are given an integer array `nums`.

Any **positive** divisor of a natural number `x` that is **strictly less** than `x` is called a **proper divisor** of `x`. For example, 2 is a *proper divisor* of 4, while 6 is not a *proper divisor* of 6.

You are allowed to perform an **operation** any number of times on `nums`, where in each **operation** you select any *one* element from `nums` and divide it by its **greatest** **proper divisor**.

Return the **minimum** number of **operations** required to make the array **non-decreasing**.

If it is **not** possible to make the array *non-decreasing* using any number of operations, return `-1`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^6`

---

## Examples

**Example 1:**
```
Input: nums = [25,7]
Output: 1
Explanation: Using a single operation, 25 gets divided by 5 and nums becomes [5, 7].
```

**Example 2:**
```
Input: nums = [7,7,6]
Output: -1
```

**Example 3:**
```
Input: nums = [1,1,1,1]
Output: 0
```

---

## Key Insight

> Dividing by the greatest proper divisor = replacing with the **smallest prime factor** (SPF). Precompute SPF with a sieve. Process right-to-left: greedily reduce each element to be ≤ the next element.

---

## Approach: Greedy Right-to-Left + Smallest Prime Factor — O(n + M) ✅

```
FUNCTION minOperations(nums):
    // Precompute smallest prime factor via sieve
    spf ← sieve of smallest prime factors up to max(nums)

    ops ← 0
    FOR i ← n-2 DOWNTO 0:
        WHILE nums[i] > nums[i+1]:
            IF nums[i] == spf[nums[i]]:   // already prime, can't reduce further
                RETURN -1
            nums[i] ← spf[nums[i]]
            ops ← ops + 1

    RETURN ops
```

---

## Walkthrough

```
nums = [25, 7]
spf[25] = 5
```

| i | nums[i] | nums[i+1] | Action | ops |
|---|---------|-----------|--------|-----|
| 0 | 25 | 7 | 25 > 7: replace 25 → spf[25] = 5 | 1 |
| 0 | 5 | 7 | 5 ≤ 7: done | 1 |

**Result:** **1** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n · log(max_val) + M) — sieve O(M), each element divided O(log) times |
| **Space** | O(M) — SPF sieve |

---

## Follow-Up Questions

1. **Why right-to-left?** We want each element to be ≤ the one to its right. Processing right-to-left ensures we fix violations greedily without undoing previous fixes.
2. **Why smallest prime factor?** Dividing by the greatest proper divisor is equivalent to keeping the smallest prime factor — this is the minimum possible value from one operation.
3. **When is it impossible?** When an element is prime (SPF = itself) and it's still greater than its right neighbor.

---

## Key Takeaway

> "Divide by greatest proper divisor" = "replace with smallest prime factor." Precompute SPF with a sieve, then greedily process right-to-left to make the array non-decreasing.
