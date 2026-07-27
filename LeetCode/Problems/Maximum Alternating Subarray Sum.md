# 2036. Maximum Alternating Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-alternating-subarray-sum](https://leetcode.com/problems/maximum-alternating-subarray-sum)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Find a contiguous subarray with maximum **alternating sum**: `a[0] - a[1] + a[2] - a[3] + ...`. The first element always has a `+` sign.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`

---

## Key Insight

> Like Kadane's but with alternating signs. Track two states: `pos` (next element gets +) and `neg` (next element gets -). At each element, decide to continue or start fresh.

---

## Approach: DP — O(n) ✅

```
FUNCTION maxAlternatingSubarraySum(nums):
    pos = -infinity; neg = -infinity
    result = -infinity
    FOR num IN nums:
        newPos = MAX(num, neg + num)      // start new or continue from neg
        newNeg = pos - num                 // must continue from pos
        pos = newPos; neg = newNeg
        result = MAX(result, pos, neg)
    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Key Takeaway

> **Alternating subarray sum = Kadane's with two sign states.** Track the max sum ending with a + sign and a - sign separately.
