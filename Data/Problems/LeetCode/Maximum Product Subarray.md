# 152. Maximum Product Subarray

**Difficulty:** 🟡 Medium
**Acceptance:** 35.0%
**LeetCode:** [https://leetcode.com/problems/maximum-product-subarray](https://leetcode.com/problems/maximum-product-subarray)
**Companies:** Adobe, Amazon, Bloomberg, De Shaw, Delhivery, Goldman Sachs, Google, Hashedin, Ibm, Juspay, Linkedin, Meta, Microsoft, Morgan Stanley, Nvidia, Paypal, Qualcomm, Salesforce, Servicenow, Siemens, Swiggy, Tcs, Tiktok, Walmart Labs, Wayfair

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

Given an integer array `nums`, find a **contiguous subarray** with the **largest product** and return the product.

**Constraints:**
- `1 <= nums.length <= 2 × 10^4`
- `-10 <= nums[i] <= 10`

---

## Examples

**Example 1:**
```
Input:  nums = [2,3,-2,4]
Output: 6
Explanation: Subarray [2,3] has product 6.
```

**Example 2:**
```
Input:  nums = [-2,0,-1]
Output: 0
```

---

## Key Insight

> Unlike sum, a **negative × negative = positive**. Track both the current max AND min products. When we see a negative number, the max and min swap roles.

---

## Approach: Track Min and Max — O(n) ✅

```
FUNCTION maxProduct(nums)
    maxProd ← nums[0]
    curMax ← nums[0]
    curMin ← nums[0]

    FOR i ← 1 TO n - 1 DO
        IF nums[i] < 0 THEN
            SWAP(curMax, curMin)

        curMax ← MAX(nums[i], curMax × nums[i])
        curMin ← MIN(nums[i], curMin × nums[i])
        maxProd ← MAX(maxProd, curMax)

    RETURN maxProd
END FUNCTION
```

---

## Walkthrough

```
nums = [2, 3, -2, 4]
```

| i | nums[i] | curMax | curMin | maxProd |
|---|---------|--------|--------|---------|
| 0 | 2       | 2      | 2      | 2       |
| 1 | 3       | 6      | 3      | **6**   |
| 2 | -2      | -2→max(-2, -12)=-2 | -12→min(-2,-12)=-12 | 6 |
| 3 | 4       | max(4,-8)=4 | min(4,-48)=-48 | 6 |

**Result: 6** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — constant |

---

## Follow-Up Questions

1. **Why track curMin?**
   A very negative curMin × a negative nums[i] can become the largest positive product.

2. **Why swap on negative?**
   Multiplying by a negative flips the roles of max and min.

3. **What if there are zeros?**
   curMax and curMin reset — the subarray effectively restarts.

---

## Key Takeaway

> **Track both min and max products** — negatives flip signs, so the minimum can become the maximum. Swap curMax/curMin on negative numbers. Classic Kadane's variant for products.
