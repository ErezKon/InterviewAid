# 2897. Apply Operations on Array to Maximize Sum of Squares

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares](https://leetcode.com/problems/apply-operations-on-array-to-maximize-sum-of-squares)
**Companies:** Sprinklr

---

## 1. Problem Description

Given an array `nums`, you can repeatedly pick any two elements and apply: `nums[i] = nums[i] AND nums[j]`, `nums[j] = nums[i] OR nums[j]`. Choose exactly `k` elements and maximize the sum of their squares, modulo 10^9+7.

---

## 2. Key Insight

> The AND/OR operations redistribute bits but preserve bit counts per position. After unlimited operations, each bit position's 1s consolidate into the top elements. Count the number of 1s at each bit position across all elements, then greedily build the `k` largest values.

---

## 3. Approach: Bit Count Greedy — O(n × 30) ✅

```
FUNCTION maxSum(nums, k):
    MOD = 10^9 + 7
    bitCount = [0] * 30  // count of 1s at each bit position
    FOR num IN nums:
        FOR b FROM 0 TO 29:
            IF num & (1 << b):
                bitCount[b] += 1
    
    result = 0
    FOR i FROM 0 TO k-1:
        val = 0
        FOR b FROM 0 TO 29:
            IF bitCount[b] > 0:
                val |= (1 << b)
                bitCount[b] -= 1
        result = (result + val * val) % MOD
    
    RETURN result
```

| Time | Space |
|------|-------|
| O(n × 30) | O(30) = O(1) |

---

## Key Takeaway

> AND/OR operations on pairs can freely redistribute bits. The total count of 1s at each bit position is invariant. Greedily assign bits to maximize the sum of squares by concentrating bits into fewer elements.
