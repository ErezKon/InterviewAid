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

The **score** of a subarray is defined as `sum(subarray) × length(subarray)`. Given a positive integer array `nums` and an integer `k`, return the number of non-empty subarrays with score **strictly less than** `k`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^5`
- `1 <= k <= 10^15`

---

## Examples

**Example 1:**
- **Input:** `nums = [2,1,4,3,5], k = 10`
- **Output:** `6`
- **Explanation:** Subarrays with score < 10: [2](2), [1](1), [4](4), [3](3), [5](5), [2,1](6) → 6.

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
