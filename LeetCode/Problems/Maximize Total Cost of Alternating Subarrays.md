# 3196. Maximize Total Cost of Alternating Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays](https://leetcode.com/problems/maximize-total-cost-of-alternating-subarrays)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Partition array `nums` into contiguous subarrays. The cost of a subarray is its **alternating sum**: `a[0] - a[1] + a[2] - a[3] + ...`. Maximize the **total cost** across all subarrays.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `-10⁹ ≤ nums[i] ≤ 10⁹`

---

## Key Insight

> Each element is either added (+) or subtracted (-) based on its position within its subarray. Starting a new subarray resets the sign to +. So the choice at each element: continue the current subarray (alternating sign) or start a new one (force +). Use DP tracking the current sign state.

---

## Approach: DP — O(n) ✅

```
FUNCTION maximizeTotalCost(nums):
    // dp_plus = max cost if current element has + sign
    // dp_minus = max cost if current element has - sign
    dp_plus = nums[0]
    dp_minus = -infinity

    FOR i ← 1 TO n - 1:
        new_plus = MAX(dp_plus, dp_minus) + nums[i]    // start new subarray
        new_minus = dp_plus - nums[i]                   // continue, sign flips to -
        dp_plus = new_plus
        dp_minus = new_minus

    RETURN MAX(dp_plus, dp_minus)
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Key Takeaway

> **Track two states: current element is + (start of new subarray or even position) or - (odd position in current subarray).** Starting a new subarray resets to +; continuing alternates the sign.
