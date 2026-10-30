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

You are given an integer array `nums` of length `n` and an integer `numSlots` such that `2 * numSlots >= n`. There are `numSlots` slots numbered from `1` to `numSlots`.

You have to place all `n` integers into the slots such that each slot contains at **most** two numbers. The **AND sum** of a given placement is the sum of the **bitwise** `AND` of every number with its respective slot number.

- For example, the **AND sum** of placing the numbers `[1, 3]` into slot `1` and `[4, 6]` into slot `2` is equal to `(1 AND 1) + (3 AND 1) + (4 AND 2) + (6 AND 2) = 1 + 1 + 0 + 2 = 4`.

Return *the maximum possible **AND sum** of *`nums`* given *`numSlots`* slots.*

**Constraints:**
- `n == nums.length`
- `1 <= numSlots <= 9`
- `1 <= n <= 2 * numSlots`
- `1 <= nums[i] <= 15`

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
Explanation: One possible placement is [1, 4] into slot 1, [2, 6] into slot 2, and [3, 5] into slot 3.
This gives the maximum AND sum of (1 AND 1) + (4 AND 1) + (2 AND 2) + (6 AND 2) + (3 AND 3) + (5 AND 3) = 1 + 0 + 2 + 2 + 3 + 1 = 9.
```

**Example 2:**
```
Input: nums = [1,3,10,4,7,1], numSlots = 9
Output: 24
Explanation: One possible placement is [1, 1] into slot 1, [3] into slot 3, [4] into slot 4, [7] into slot 7, and [10] into slot 9.
This gives the maximum AND sum of (1 AND 1) + (1 AND 1) + (3 AND 3) + (4 AND 4) + (7 AND 7) + (10 AND 9) = 1 + 1 + 3 + 4 + 7 + 8 = 24.
Note that slots 2, 5, 6, and 8 are empty which is permitted.
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
