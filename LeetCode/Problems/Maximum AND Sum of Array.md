# 2172. Maximum AND Sum of Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-and-sum-of-array](https://leetcode.com/problems/maximum-and-sum-of-array)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Bitmask DP (Ternary) — O(3ⁿ · n)](#approach-bitmask-dp-ternary--o3ⁿ--n-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` of length `n` and `numSlots` slots (numbered 1 to numSlots), assign each number to a slot (each slot holds at most 2 numbers). The **AND sum** = sum of `(nums[i] AND slot_number)` for all assignments. Maximize this sum.

**Constraints:**
- `n ≤ 2 · numSlots`
- `1 ≤ numSlots ≤ 9`

---

## Key Insight

> Each slot can hold 0, 1, or 2 numbers → use a **ternary bitmask** to represent slot states. Each digit in base 3 represents how many items are in that slot. Iterate through numbers and try placing each in any slot that has room.

---

## Approach: Bitmask DP (Ternary) — O(3ⁿ · n) ✅

```
FUNCTION maximumANDSum(nums, numSlots):
    // Ternary mask: each slot has state 0, 1, or 2
    totalStates = 3^numSlots
    dp = [0] * totalStates

    FOR mask ← 0 TO totalStates - 1:
        // Count how many numbers are placed = sum of ternary digits
        cnt = sum of ternary digits of mask
        IF cnt >= len(nums): CONTINUE
        numIdx = cnt    // index of next number to place

        FOR slot ← 0 TO numSlots - 1:
            // Check if slot has room (digit < 2)
            IF ternaryDigit(mask, slot) < 2:
                newMask = mask + 3^slot
                dp[newMask] = MAX(dp[newMask],
                    dp[mask] + (nums[numIdx] AND (slot + 1)))

    RETURN MAX(dp)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Ternary Bitmask DP | **O(3ⁿˢ · nˢ)** | O(3ⁿˢ) |

With numSlots ≤ 9: 3⁹ = 19683 states.

---

## Key Takeaway

> **When slots hold more than 1 item, use ternary (or higher base) bitmask DP.** Each digit represents slot occupancy. The state space is manageable for small slot counts.
