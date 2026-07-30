# 2444. Count Subarrays With Fixed Bounds

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-subarrays-with-fixed-bounds](https://leetcode.com/problems/count-subarrays-with-fixed-bounds)
**Companies:** Amazon, Chubb, Google, Mathworks, Meesho, Meta, Microsoft, Morgan Stanley, Uber

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

Given an integer array `nums` and two integers `minK` and `maxK`, return the number of **fixed-bound subarrays**: subarrays where `min(subarray) == minK` and `max(subarray) == maxK`.

**Constraints:**
- `2 <= nums.length <= 10^5`
- `1 <= nums[i], minK, maxK <= 10^6`

---

## Examples

**Example 1:**
- **Input:** `nums = [1,3,5,2,7,5], minK = 1, maxK = 5`
- **Output:** `2`
- **Explanation:** [1,3,5] and [1,3,5,2] have min=1 and max=5.

---

## Key Insight

Track three positions as you scan:
- **lastBad:** last index of an element outside `[minK, maxK]` — subarrays can't cross this
- **lastMin:** last index where `nums[i] == minK`
- **lastMax:** last index where `nums[i] == maxK`

Valid subarrays ending at `i` can start anywhere from `lastBad + 1` to `min(lastMin, lastMax)`. The count is `max(0, min(lastMin, lastMax) - lastBad)`.

---

## Approach: Sliding Window — O(n) ✅

```
FUNCTION countSubarrays(nums, minK, maxK):
    count = 0
    lastBad = lastMin = lastMax = -1

    FOR i ← 0 TO n - 1:
        IF nums[i] < minK OR nums[i] > maxK:
            lastBad = i
        IF nums[i] == minK: lastMin = i
        IF nums[i] == maxK: lastMax = i

        count += MAX(0, MIN(lastMin, lastMax) - lastBad)

    RETURN count
```

---

## Walkthrough

**Input:** `nums = [1,3,5,2,7,5], minK = 1, maxK = 5`

```
i=0: nums[0]=1=minK → lastMin=0, lastMax=-1
     min(0,-1)=-1, -1-(-1)=0 → count=0
i=1: nums[1]=3 → nothing special
     min(0,-1)=-1 → count=0
i=2: nums[2]=5=maxK → lastMax=2
     min(0,2)=0, 0-(-1)=1 → count=1  (subarray [1,3,5])
i=3: nums[3]=2 → in range
     min(0,2)=0, 0-(-1)=1 → count=2  (subarray [1,3,5,2])
i=4: nums[4]=7 > maxK → lastBad=4
     min(0,2)=0, 0-4<0 → count=2
i=5: nums[5]=5=maxK → lastMax=5
     min(0,5)=0, 0-4<0 → count=2

Result: 2 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass |
| **Space** | O(1) |

---

## Follow-Up Questions

**Q1: Why track `lastBad` separately?**
Any element outside `[minK, maxK]` makes all subarrays crossing it invalid. `lastBad` acts as the left boundary — valid starts must be after it.

**Q2: Why `min(lastMin, lastMax)` as the upper bound for valid starts?**
Both minK and maxK must appear in the subarray. The subarray must start at or before both of their last positions, so the more restrictive (earlier) one determines the upper bound.

---

## Key Takeaway

> **Fixed-bound subarray counting tracks three landmarks: lastBad, lastMin, lastMax. The valid left-start range at each position is `(lastBad, min(lastMin, lastMax)]`, giving O(1) counting per element.**
