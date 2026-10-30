# 2302. Count Subarrays With Score Less Than K

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-subarrays-with-score-less-than-k](https://leetcode.com/problems/count-subarrays-with-score-less-than-k)
**Companies:** Amazon, Google, Meta, Microsoft, Pinterest

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

The **score** of an array is defined as the **product** of its sum and its length.

- For example, the score of `[1, 2, 3, 4, 5]` is `(1 + 2 + 3 + 4 + 5) * 5 = 75`.

Given a positive integer array `nums` and an integer `k`, return *the **number of non-empty subarrays** of* `nums` *whose score is **strictly less** than* `k`.

A **subarray** is a contiguous sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= 10^15`

---

## Examples

**Example 1:**
```
Input: nums = [2,1,4,3,5], k = 10
Output: 6
Explanation: The 6 subarrays having scores less than 10 are:
- [2] with score 2 * 1 = 2.
- [1] with score 1 * 1 = 1.
- [4] with score 4 * 1 = 4.
- [3] with score 3 * 1 = 3.
- [5] with score 5 * 1 = 5.
- [2,1] with score (2 + 1) * 2 = 6.
Note that subarrays such as [1,4] and [4,3,5] are not considered because their scores are 10 and 36 respectively, while we need scores strictly less than 10.
```

**Example 2:**
```
Input: nums = [1,1,1], k = 5
Output: 5
Explanation: Every subarray except [1,1,1] has a score less than 5.
[1,1,1] has a score (1 + 1 + 1) * 3 = 9, which is greater than 5.
Thus, there are 5 subarrays having scores less than 5.
```

---

## Key Insight

Since all elements are positive, both sum and length increase as the window grows → the score is **monotonically increasing** with window size. This makes sliding window applicable: when score ≥ k, shrink from the left.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION countSubarrays(nums, k):
    count = 0; s = 0; left = 0
    FOR right ← 0 TO n - 1:
        s += nums[right]
        WHILE s * (right - left + 1) >= k:
            s -= nums[left]; left += 1
        count += right - left + 1
    RETURN count
```

For each `right`, `right - left + 1` gives the number of valid subarrays ending at `right`.

---

## Walkthrough

**Input:** `nums = [2,1,4,3,5], k = 10`

```
right=0: s=2, score=2×1=2<10 → count+=1 → 1
right=1: s=3, score=3×2=6<10 → count+=2 → 3
right=2: s=7, score=7×3=21≥10 → shrink: s=5, left=1, score=5×2=10≥10 → shrink: s=4, left=2, score=4×1=4<10 → count+=1 → 4
right=3: s=7, score=7×2=14≥10 → shrink: s=3, left=3, score=3×1=3<10 → count+=1 → 5
right=4: s=8, score=8×2=16≥10 → shrink: s=5, left=4, score=5×1=5<10 → count+=1 → 6

Result: 6 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — each element enters/leaves once |
| **Space** | O(1) |

---

## Key Takeaway

> **When the score function is monotonically increasing with window size (e.g., sum × length with positive elements), sliding window works perfectly. Shrink from the left when the score exceeds the threshold.**
