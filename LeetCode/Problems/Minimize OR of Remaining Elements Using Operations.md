# 3022. Minimize OR of Remaining Elements Using Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations](https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations)
**Companies:** Aon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, you can perform at most `k` operations: pick adjacent elements and replace both with their **AND**. Minimize the **OR** of all remaining elements.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] < 2³⁰`

---

## Key Insight

> Process **bit by bit from highest to lowest**. For each bit, check if we can eliminate it from the final OR using at most `k` AND-merge operations. Greedily try to turn off the highest bits first — AND-merging can only turn off bits, never on.

---

## Approach: Greedy Bit-by-Bit — O(n · 30) ✅

```
FUNCTION minOrAfterOperations(nums, k):
    result ← 0
    mask ← 0
    
    FOR bit ← 29 DOWNTO 0 DO
        // Try to eliminate this bit
        mask ← mask | (1 << bit)
        // Count operations needed: merge consecutive elements until AND = 0 for target bits
        ops ← 0
        current ← mask   // all 1s for target bits
        FOR num IN nums DO
            current ← current AND num
            IF current AND mask ≠ 0 THEN
                ops ← ops + 1   // merge with next element
            ELSE
                current ← mask  // reset for next group
        
        IF ops > k THEN
            // Cannot eliminate this bit
            result ← result | (1 << bit)
            mask ← mask XOR (1 << bit)   // keep this bit on
    
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy per bit | **O(30 · n)** | **O(1)** |

---

## Key Takeaway

> **Bit-by-bit greedy from MSB** — try to eliminate each bit starting from the highest. AND-merge operations can only clear bits, so greedily remove the most significant bits first for minimum OR.

---
