# 3171. Find Subarray With Bitwise OR Closest to K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-subarray-with-bitwise-or-closest-to-k](https://leetcode.com/problems/find-subarray-with-bitwise-or-closest-to-k)
**Companies:** Salesforce

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding OR Set — O(n · log(max)) ✅](#4-approach-sliding-or-set--on--logmax-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums` and an integer `k`, find a subarray such that the **bitwise OR** of its elements is as close as possible to `k`. Return the **minimum** value of `|OR(subarray) - k|`.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`
- `1 <= k <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input:  nums = [1, 2, 4, 5], k = 3
  Output: 0
  Reason: Subarray [1, 2] has OR = 3, |3 - 3| = 0.

Example 2:
  Input:  nums = [1, 3, 1, 3], k = 2
  Output: 1
  Reason: Subarray [1] has OR = 1, |1 - 2| = 1. All larger subarrays have OR ≥ 3.
```

---

## 3. Key Insight

> OR is monotonically non-decreasing as we extend a subarray. For each ending index `i`, the set of all possible OR values of subarrays ending at `i` has at most **30 distinct values** (one per bit). Maintain this set and update it greedily.

---

## 4. Approach: Sliding OR Set — O(n · log(max)) ✅

```
FUNCTION closestToK(nums, k):
    result ← ∞
    currentORs ← EMPTY SET

    FOR num IN nums DO
        // Update: OR each previous subarray-OR with current num
        newORs ← {num}
        FOR orVal IN currentORs DO
            newORs.ADD(orVal | num)
        currentORs ← newORs

        // Check all current OR values against k
        FOR orVal IN currentORs DO
            result ← MIN(result, ABS(orVal - k))

    RETURN result
```

---

## 5. Walkthrough

```
nums = [1, 2, 4, 5], k = 3

i=0 (num=1): currentORs = {1}
  |1 - 3| = 2 → result = 2

i=1 (num=2): currentORs = {2, 1|2=3}
  |2 - 3| = 1, |3 - 3| = 0 → result = 0 ✅

Already found 0, but algorithm continues:
i=2 (num=4): currentORs = {4, 2|4=6, 3|4=7}
i=3 (num=5): currentORs = {5, 4|5=5, 6|5=7, 7|5=7} = {5, 7}

Result: 0 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n · 30) = O(n) — at most 30 distinct OR values per position |
| **Space** | O(30) = O(1) — the OR set is bounded by bit width |

---

## 7. Follow-Up Questions

### 7.1 Why at most 30 distinct OR values?

Each OR operation can only set bits (never clear them). With 30-bit numbers, there are at most 30 distinct OR values as we extend subarrays ending at the same index.

### 7.2 Can this approach work for AND instead of OR?

Yes — AND is also monotonic (non-increasing). The same "shrinking set" technique applies.

### 7.3 What about XOR?

XOR is not monotonic — bits can toggle. This technique doesn't directly apply; XOR problems typically need different approaches (tries, prefix XOR).

---

## 8. Key Takeaway

> The **OR-set compression** technique exploits the fact that OR only sets bits, limiting distinct values per endpoint to O(log(max)). This turns a seemingly O(n²) problem into O(n · 30).
