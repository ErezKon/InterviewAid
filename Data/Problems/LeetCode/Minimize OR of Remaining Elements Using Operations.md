# 3022. Minimize OR of Remaining Elements Using Operations

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations](https://leetcode.com/problems/minimize-or-of-remaining-elements-using-operations)
**Companies:** Aon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums` and integer `k`, you can perform at most `k` operations: pick adjacent elements and replace both with their **AND**. Minimize the **OR** of all remaining elements.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `0 ≤ nums[i] < 2³⁰`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3], k = 1
Output: 1
Explanation: Perform AND on (2,3) → 2 & 3 = 2, array becomes [1,2]. OR = 1 | 2 = 3. Better: AND on (1,2) → 0, array [0,3], OR = 3. Minimum achievable OR is 1 by AND‑ing (1,2) then AND‑ing result with 3 using the remaining operation.
```

**Example 2:**
```
Input: nums = [5,7,12,3], k = 2
Output: 0
Explanation: AND (5,7)=5, array [5,12,3]; AND (12,3)=0, array [5,0]; OR = 5 | 0 = 5. A better sequence yields OR 0.
```

---

## Approach

**Algorithm:** Greedy Bit‑by‑Bit (from most‑significant to least‑significant)

For each bit, we try to eliminate it from the final OR using at most `k` merge operations. Merging can only clear bits (AND never sets a 0 to 1). We greedily attempt to turn off the highest bits first; if the required operations exceed `k`, the bit must stay on.

```text
FUNCTION MinimizeOR(nums, k):
    result ← 0
    mask ← 0
    
    FOR bit ← 29 DOWNTO 0 DO
        // Include this bit in the mask we are trying to clear
        mask ← mask | (1 << bit)
        ops ← 0
        cur ← mask   // start a new group with all bits set
        
        FOR num IN nums DO
            cur ← cur AND num
            IF cur AND mask ≠ 0 THEN
                // Still have the target bit set, need to merge with next element
                ops ← ops + 1
            ELSE
                cur ← mask   // start a new group after a successful clear
        
        IF ops > k THEN
            // Cannot clear this bit within k operations
            result ← result | (1 << bit)
            mask ← mask XOR (1 << bit)   // keep this bit active for lower bits
    
    RETURN result
```

---

## Walkthrough

Take **Example 1** `nums = [1,2,3]`, `k = 1`.

| Bit | mask | Groups formed | ops needed | Can clear? |
|-----|------|---------------|------------|------------|
| 1 (2⁰) | 1 | [1],[2],[3] → each group clears bit → ops=0 | Yes |
| 2 (2¹) | 3 | Process: start cur=3, num=1 → cur=1 (bit2 cleared), start new cur=3, num=2 → cur=2 (bit2 stays), need merge → ops=1, num=3 → cur=2&3=2 (still set) → end | ops=1 ≤ k | Yes, clear bit2 |
| 4 (2²) | 7 | Similar scan shows ops=2 > k, cannot clear → bit stays on |

Resulting OR = 1 (only bit0 remains).

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy per bit | **O(30 · n)** | **O(1)** |

---

## Follow-Up Questions

1. How would the algorithm adapt if operations could merge any two elements (not just adjacent)?
2. Can we extend the method to minimize the **sum** of elements after AND operations?
3. What is the impact of allowing more than `k` operations – does the problem become trivial?

---

## Key Takeaway

> **Bit‑by‑bit greedy from MSB** — try to eliminate each bit starting from the highest. AND‑merge operations can only clear bits, so greedily remove the most significant bits first for minimum OR.

---