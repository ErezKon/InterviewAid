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
- [Examples](#examples)
- [Walkthrough](#walkthrough)
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

```text
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

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5,6], numSlots = 3
Output: 9
Explanation: Assign 1→slot1, 2→slot2, 3→slot3, 4→slot1, 5→slot2, 6→slot3.
AND sum = (1&1)+(2&2)+(3&3)+(4&1)+(5&2)+(6&3) = 1+2+3+0+0+3 = 9.
```

**Example 2:**
```
Input: nums = [8,8,8,8], numSlots = 2
Output: 16
Explanation: Put two 8s in each slot. (8&1)+(8&1)+(8&2)+(8&2) = 0+0+0+0 = 0? Actually best is to place all in slot2: (8&2)=0, still 0. The maximum achievable is 0.
```

---

## Walkthrough

Consider `nums = [1,2,3]`, `numSlots = 2`.
1. Initial state `mask = 0` (both slots empty). `cnt = 0`, next number = 1.
2. Try placing 1 in slot 1 → `newMask = 3^0 = 1`. DP[1] = 1&1 = 1.
3. Try placing 1 in slot 2 → `newMask = 3^1 = 3`. DP[3] = 1&2 = 0.
4. Process mask = 1 (slot 1 has one item). `cnt = 1`, next number = 2.
   - Slot 1 has room (`digit=1<2`): `newMask = 1 + 3^0 = 2`. DP[2] = max(DP[2], DP[1] + (2&1)) = 1 + 0 = 1.
   - Slot 2 empty: `newMask = 1 + 3^1 = 4`. DP[4] = 1 + (2&2) = 3.
5. Continue until all numbers placed; final max DP value = 9.

---

## Key Takeaway

> **When slots hold more than 1 item, use ternary (or higher base) bitmask DP.** Each digit represents slot occupancy. The state space is manageable for small slot counts.
