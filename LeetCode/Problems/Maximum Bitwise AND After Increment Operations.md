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

Given an integer array `nums` and an integer `budget` representing the total number of increment operations you may perform (each operation adds 1 to any element), maximize the **bitwise AND** of all array elements after at most `budget` increments.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] ≤ 10⁹`
- `0 ≤ budget ≤ 10⁹`

---

## Key Insight

> Process bits from most significant to least. For each bit, determine the minimum increments needed to make **every** element have that bit set while preserving already‑chosen higher bits. If the required cost fits within the remaining budget, commit to that bit.

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
Input: nums = [2,3,4], budget = 3
Output: 4
Explanation:
- Binary: 2(010), 3(011), 4(100)
- Set the 3rd bit (value 4) for all numbers: need increments 2→4 (+2), 3→4 (+1), 4 already has it.
- Total cost = 3 ≤ budget, result = 4.
```

**Example 2:**
```
Input: nums = [1,2,3], budget = 0
Output: 0
Explanation: No increments allowed; the AND of 1,2,3 is 0.
```

---

## Walkthrough

Take `nums = [5,6]` (`101`, `110`) with `budget = 2`.
1. Start with `result = 0`.
2. Bit 2 (value 4): both numbers already have this bit → cost 0, commit → `result = 4`.
3. Bit 1 (value 2): numbers are `101` and `110`. To have bit 1 set, `5` needs +1 → `110`. Cost = 1 ≤ remaining budget 2 → commit → `result = 6`, budget = 1.
4. Bit 0 (value 1): now numbers are `110` and `110`. `5` already upgraded to `6`; both lack bit 0. Increment one of them by 1 costs 1, fits budget → `result = 7`.
5. Final AND = `7`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy per bit | **O(n · B)** (B ≈ 31) | O(1) |

---

## Key Takeaway

> **Maximize bitwise AND by greedily fixing higher bits first.** For each bit, compute the minimal increments needed to give every element that bit; if affordable, lock it in.
