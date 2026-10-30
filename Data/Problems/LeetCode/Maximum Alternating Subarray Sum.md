# 2036. Maximum Alternating Subarray Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-alternating-subarray-sum](https://leetcode.com/problems/maximum-alternating-subarray-sum)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n)](#approach-dp--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

A **subarray** of a **0-indexed** integer array is a contiguous **non-empty** sequence of elements within an array.

The **alternating subarray sum** of a subarray that ranges from index `i` to `j` (**inclusive**, `0 <= i <= j < nums.length`) is `nums[i] - nums[i+1] + nums[i+2] - ... +/- nums[j]`.

Given a **0-indexed** integer array `nums`, return *the **maximum alternating subarray sum** of any subarray of *`nums`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `-10^5 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [3,-1,1,2]
Output: 5
Explanation: The subarray [3,-1,1] has the largest alternating subarray sum.
The alternating subarray sum is 3 - (-1) + 1 = 5.
```

**Example 2:**
```
Input: nums = [2,2,2,2,2]
Output: 2
Explanation: The subarrays [2], [2,2,2], and [2,2,2,2,2] have the largest alternating subarray sum.
The alternating subarray sum of [2] is 2.
The alternating subarray sum of [2,2,2] is 2 - 2 + 2 = 2.
The alternating subarray sum of [2,2,2,2,2] is 2 - 2 + 2 - 2 + 2 = 2.
```

**Example 3:**
```
Input: nums = [1]
Output: 1
Explanation: There is only one non-empty subarray, which is [1].
The alternating subarray sum is 1.
```

---

## Key Insight

> Like Kadane's but with alternating signs. Track two states: `pos` (next element gets +) and `neg` (next element gets -). At each element, decide to continue or start fresh.

---

## Approach: DP — O(n) ✅

```text
FUNCTION maxAlternatingSubarraySum(nums):
    pos ← -infinity   // max sum ending with a '+' on current element
    neg ← -infinity   // max sum ending with a '-' on current element
    result ← -infinity
    FOR num IN nums:
        newPos ← MAX(num, neg + num)   // either start new subarray or extend from a '-' state
        newNeg ← pos - num              // must extend from a '+' state
        pos ← newPos
        neg ← newNeg
        result ← MAX(result, pos, neg)
    RETURN result
```

---

## Walkthrough

Consider the input `[1, 2, 3, 4]`:

| Index | num | pos (max ending with '+') | neg (max ending with '-') | result |
|-------|-----|---------------------------|---------------------------|--------|
| 0 | 1 | MAX(1, -∞+1)=1 | -∞ - 1 = -∞ | 1 |
| 1 | 2 | MAX(2, -∞+2)=2 | 1 - 2 = -1 | 2 |
| 2 | 3 | MAX(3, -1+3)=3 | 2 - 3 = -1 | 3 |
| 3 | 4 | MAX(4, -1+4)=4 | 3 - 4 = -1 | 4 |

The highest `result` observed is `4`, which corresponds to the subarray `[4]`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n)** | O(1) |

---

## Follow-Up Questions

- How would the solution change if the sign pattern could start with either `+` or `-`?
- Can you extend this to find the maximum alternating **product** subarray?
- What modifications are needed for a circular array where subarrays may wrap around?

---

## Key Takeaway

> **Alternating subarray sum = Kadane's with two sign states.** Track the max sum ending with a `+` sign and a `-` sign separately.
