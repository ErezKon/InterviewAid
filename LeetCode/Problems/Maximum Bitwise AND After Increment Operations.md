# 3806. Maximum Bitwise AND After Increment Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-bitwise-and-after-increment-operations](https://leetcode.com/problems/maximum-bitwise-and-after-increment-operations)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Greedy Bit-by-Bit — O(n · B)](#approach-greedy-bit-by-bit--on--b-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array and allowed increment operations, maximize the **bitwise AND** of all elements. Each element can be incremented (but not decremented).

---

## Key Insight

> Process bits from the most significant to least. For each bit position, check if all elements can be incremented to have that bit set (without unsetting already-committed higher bits). Greedily set the highest bits first.

---

## Approach: Greedy Bit-by-Bit — O(n · B) ✅

```
FUNCTION maxBitwiseAND(nums, budget):
    result = 0
    FOR bit ← 30 DOWNTO 0:
        target = result | (1 << bit)
        cost = 0
        FOR num IN nums:
            IF num < target:
                // Need to increment num to at least have target bits set
                // Find minimum increment to set this bit pattern
                cost += (target - (num & target mask adjustments))
        IF cost <= budget:
            result = target
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy per bit | **O(n · 31)** = O(n) | O(1) |

---

## Key Takeaway

> **Maximize bitwise AND by greedily committing to higher bits first.** For each bit, check if all elements can be aligned to have it set within the increment budget.
