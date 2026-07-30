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

Given an integer array `nums`, in one operation you can pick any `nums[i]` and divide it by its **greatest proper divisor** (i.e., replace `nums[i]` with its smallest prime factor). Return the **minimum number of operations** to make `nums` non-decreasing, or `-1` if impossible.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `2 ≤ nums[i] ≤ 10⁶`

---

## Examples

**Example 1:**
```
Input: nums = [25, 7]
Output: 1
Explanation: Divide 25 by its greatest proper divisor (5) → 25/5 = 5. Array = [5, 7]. Non-decreasing.
```

**Example 2:**
```
Input: nums = [7, 7, 6]
Output: -1
Explanation: 7's smallest prime factor is 7 (it's prime), so dividing gives 1. 
  Can't make [7,7,6] non-decreasing since 6 < 7 and 6's smallest prime is 2.
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
