# 2680. Maximum OR

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-or](https://leetcode.com/problems/maximum-or)
**Companies:** De Shaw, Microsoft, Point72, Visa

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and an integer `k`, you can multiply any element by 2 at most `k` times total. Return the **maximum possible OR** of all elements.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 15`

---

## Examples

**Example 1:**
```
Input:  nums = [12,9], k = 1
Output: 30
Explanation: Shift 12 left by 1: 24. 24 | 9 = 25? Actually 24=11000, 9=01001, OR=11001=25. Or shift 9: 18|12=30. 
```

---

## Key Insight

> **All k shifts should go to ONE element** — distributing shifts across elements wastes potential. Shifting one element left by k maximizes its high bits, which maximizes the OR. Try each element with prefix/suffix OR.

---

## Approach

```
FUNCTION maximumOr(nums, k)
    n ← len(nums)
    suffix ← array of (n+1) zeros
    FOR i ← n-1 DOWN TO 0 DO
        suffix[i] ← suffix[i+1] | nums[i]

    prefix ← 0
    maxOR ← 0
    FOR i ← 0 TO n-1 DO
        maxOR ← MAX(maxOR, prefix | (nums[i] << k) | suffix[i+1])
        prefix ← prefix | nums[i]

    RETURN maxOR
END FUNCTION
```

---

## Walkthrough

```
nums = [12, 9], k = 1
suffix = [13, 9, 0]
```

| i | prefix | nums[i]<<1 | suffix[i+1] | OR    | maxOR |
|---|--------|-----------|-------------|-------|-------|
| 0 | 0      | 24        | 9           | 24\|9=25 | 25  |
| 1 | 12     | 18        | 0           | 12\|18=**30** | **30** |

**Result: 30** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass with prefix/suffix |
| Space  | **O(n)** — suffix array |

---

## Follow-Up Questions

1. **Why concentrate all shifts on one element?**
   OR only sets bits to 1. Shifting one element high creates new high bits. Spreading shifts wastes — two small shifts add less than one big shift.

2. **Why prefix/suffix OR?**
   We need the OR of all other elements combined with the shifted element.

---

## Key Takeaway

> **Concentrate all shifts on one element + prefix/suffix OR** — try each element as the shifted one, use precomputed prefix/suffix OR for the rest. O(n) time.
