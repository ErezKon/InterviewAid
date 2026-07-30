# 1567. Maximum Length of Subarray With Positive Product

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product](https://leetcode.com/problems/maximum-length-of-subarray-with-positive-product)
**Companies:** Amazon, Arcesium

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array of integers `nums`, find the **maximum length of a subarray** where the product of all its elements is **positive**.

A product is positive when there is an **even number of negative numbers** (or zero negatives) and **no zeros** in the subarray.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^9 <= nums[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  nums = [1, -2, -3, 4]
Output: 4
Explanation: Product of entire array = 1×(-2)×(-3)×4 = 24 > 0.
```

**Example 2:**
```
Input:  nums = [0, 1, -2, -3, -4]
Output: 3
Explanation: Subarray [1,-2,-3] has product 6 > 0. Length = 3.
```

**Example 3:**
```
Input:  nums = [-1, -2, -3, 0, 1]
Output: 2
Explanation: Subarray [-1,-2] has product 2 > 0. Length = 2.
```

---

## Key Insight

> Track two running lengths: `pos` (length of longest subarray ending here with positive product) and `neg` (length of longest subarray ending here with negative product). A zero resets both. A negative number **swaps** them.

---

## Approach

For each element:
- **Positive number**: extends both `pos` and `neg` by 1.
- **Negative number**: the old positive subarray becomes negative (swap), and the old negative becomes positive.
- **Zero**: resets both counters to 0.

```
FUNCTION getMaxLen(nums)
    pos ← 0    // length of subarray ending here with positive product
    neg ← 0    // length of subarray ending here with negative product
    result ← 0

    FOR each num IN nums DO
        IF num > 0 THEN
            pos ← pos + 1
            neg ← IF neg > 0 THEN neg + 1 ELSE 0
        ELSE IF num < 0 THEN
            newPos ← IF neg > 0 THEN neg + 1 ELSE 0
            newNeg ← pos + 1
            pos ← newPos
            neg ← newNeg
        ELSE  // num == 0
            pos ← 0
            neg ← 0

        result ← MAX(result, pos)

    RETURN result
END FUNCTION
```

---

## Walkthrough

```
nums = [1, -2, -3, 4]
```

| Index | num | pos | neg | result |
|-------|-----|-----|-----|--------|
| 0     | 1   | 1   | 0   | 1      |
| 1     | -2  | 0   | 2   | 1      |
| 2     | -3  | 3   | 1   | 3      |
| 3     | 4   | 4   | 2   | **4**  |

- At index 1: num=-2 → newPos = neg+1=0 (neg was 0), newNeg = pos+1=2
- At index 2: num=-3 → newPos = neg+1=3, newNeg = pos+1=1
- At index 3: num=4 → pos=4, neg=2

**Result: 4** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — only tracking two counters |

---

## Follow-Up Questions

1. **How would you handle very large products (overflow)?**
   We never compute the actual product — we only track the sign via even/odd negative count. No overflow risk.

2. **What if we need the actual subarray, not just the length?**
   Track the starting index of the current `pos` and `neg` subarrays.

3. **How does this relate to Maximum Product Subarray?**
   Maximum Product Subarray tracks actual max/min products; this problem only cares about the sign, making the length-tracking approach simpler and more efficient.

4. **Could we use prefix products?**
   Yes — compute prefix sign (+1/-1) and for each index find the farthest index with the same sign. But the DP approach above is simpler.

---

## Key Takeaway

> **Tracking sign parity with two counters (positive-length and negative-length)** avoids computing actual products and solves the problem in O(n) time with O(1) space — a classic DP state compression technique.
