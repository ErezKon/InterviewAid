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

You are given an array `nums` and an integer `k`. You need to find a subarray of `nums` such that the **absolute difference** between `k` and the bitwise `OR` of the subarray elements is as** small** as possible. In other words, select a subarray `nums[l..r]` such that `|k - (nums[l] OR nums[l + 1] ... OR nums[r])|` is minimum.

Return the **minimum** possible value of the absolute difference.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^9`

---

## 2. Examples

**Example 1:**
```
Input: nums = [1,2,4,5], k = 3
Output: 0
Explanation: The subarray nums[0..1] has OR value 3, which gives the minimum absolute difference |3 - 3| = 0.
```

**Example 2:**
```
Input: nums = [1,3,1,3], k = 2
Output: 1
Explanation: The subarray nums[1..1] has OR value 3, which gives the minimum absolute difference |3 - 2| = 1.
```

**Example 3:**
```
Input: nums = [1], k = 10
Output: 9
Explanation: There is a single subarray with OR value 1, which gives the minimum absolute difference |10 - 1| = 9.
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
