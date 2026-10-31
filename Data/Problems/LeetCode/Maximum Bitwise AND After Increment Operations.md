# 3806. Maximum Bitwise AND After Increment Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-bitwise-and-after-increment-operations](https://leetcode.com/problems/maximum-bitwise-and-after-increment-operations)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy Bit-by-Bit — O(n·B)](#approach-greedy-bit-by-bit--onb-)
- [Examples](#examples)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below raises **all** elements and spends the budget cumulatively across bits. Officially you need the best AND of a subset of size `m` using at most `k` increments in total. Correct idea: build the answer greedily from the high bit. For a candidate `target = res | (1 << b)`, compute for each `num` the minimal increment that reaches the smallest value `≥ num` containing all bits of `target`. Sum the `m` smallest costs and keep the bit if the total is `≤ k`. Recompute the costs from scratch for each candidate.*

You are given an integer array `nums` and two integers `k` and `m`.

You may perform **at most** `k` operations. In one operation, you may choose any index `i` and **increase** `nums[i]` by 1.

Return an integer denoting the **maximum** possible **bitwise AND** of any **subset** of size `m` after performing up to `k` operations optimally.

**Constraints:**
- `1 <= n == nums.length <= 5 * 10^4`
- `1 <= nums[i] <= 10^9`
- `1 <= k <= 10^9`
- `1 <= m <= n`

---

## Key Insight

> Process bits from most significant to least. For each bit, determine the minimum increments needed to make **every** element have that bit set while preserving already-chosen higher bits. If the required cost fits within the remaining budget, commit to that bit.

---

## Approach: Greedy Bit-by-Bit — O(n·B) ✅

```text
FUNCTION maxBitwiseAND(nums, budget):
    result ← 0
    FOR bit ← 30 DOWNTO 0:
        target ← result OR (1 << bit)
        cost ← 0
        FOR num IN nums:
            // Determine the smallest value ≥ num that has all bits of target set
            IF (num AND target) ≠ target:
                // Need to raise num to the next multiple that includes target bits
                increment ← target - (num AND target)
                cost ← cost + increment
        IF cost ≤ budget:
            result ← target
            budget ← budget - cost
    RETURN result
```

---

## Examples

**Example 1:**
```
Input: nums = [3,1,2], k = 8, m = 2
Output: 6
Explanation: - We need a subset of size m = 2. Choose indices [0, 2].
- Increase nums[0] = 3 to 6 using 3 operations, and increase nums[2] = 2 to 6 using 4 operations.
- The total number of operations used is 7, which is not greater than k = 8.
- The two chosen values become [6, 6], and their bitwise AND is 6, which is the maximum possible.
```

**Example 2:**
```
Input: nums = [1,2,8,4], k = 7, m = 3
Output: 4
Explanation: - We need a subset of size m = 3. Choose indices [0, 1, 3].
- Increase nums[0] = 1 to 4 using 3 operations, increase nums[1] = 2 to 4 using 2 operations, and keep nums[3] = 4.
- The total number of operations used is 5, which is not greater than k = 7.
- The three chosen values become [4, 4, 4], and their bitwise AND is 4, which is the maximum possible.
```

**Example 3:**
```
Input: nums = [1,1], k = 3, m = 2
Output: 2
Explanation: - We need a subset of size m = 2. Choose indices [0, 1].
- Increase both values from 1 to 2 using 1 operation each.
- The total number of operations used is 2, which is not greater than k = 3.
- The two chosen values become [2, 2], and their bitwise AND is 2, which is the maximum possible.
```

---

## Walkthrough

Take `nums = [5,6]` (`101`, `110`) with `budget = 2`.
1. Start with `result = 0`.
2. Bit 2 (value 4): both numbers already have this bit → cost 0, commit → `result = 4`.
3. Bit 1 (value 2): numbers are `101` and `110`. To have bit 1 set, `5` needs +1 → `110`. Cost = 1 ≤ remaining budget 2 → commit → `result = 6`, budget = 1.
4. Bit 0 (value 1): now numbers are `110` and `110`. `5` already upgraded to `6`; both lack bit 0. Increment one of them by 1 costs 1, fits budget → `result = 7`.
5. Final AND = `7`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy per bit | **O(n · B)** (B ≈ 31) | O(1) |

---

## Key Takeaway

> **Maximize bitwise AND by greedily fixing higher bits first.** For each bit, compute the minimal increments needed to give every element that bit; if affordable, lock it in.
