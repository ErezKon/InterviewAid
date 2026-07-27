# 2808. Minimum Seconds to Equalize a Circular Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-seconds-to-equalize-a-circular-array](https://leetcode.com/problems/minimum-seconds-to-equalize-a-circular-array)
**Companies:** Amazon

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Gap Analysis — O(n)](#4-approach-gap-analysis--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a circular array, each second every element can be replaced by its neighbor's value. Return the **minimum** seconds to make all elements equal.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁹`

---

## 2. Examples

```
Example 1:
  Input: nums = [1, 2, 1, 2]
  Output: 1
  Explanation: After 1 second, all can become 1 (spread from existing 1s).

Example 2:
  Input: nums = [2, 1, 3, 3, 2]
  Output: 2
```

---

## 3. Key Insight

> For each unique value `v`, the time to fill the entire array with `v` is determined by the **maximum gap** between consecutive occurrences of `v` (circularly). The value spreads from each occurrence, meeting in the middle of the largest gap. Time = `⌊maxGap/2⌋`. Pick the value with the smallest such time.

---

## 4. Approach: Gap Analysis — O(n) ✅

```
FUNCTION minimumSeconds(nums):
    n = len(nums)
    positions = defaultdict(list)
    FOR i, v IN enumerate(nums):
        positions[v].APPEND(i)

    minTime = infinity
    FOR v, idxs IN positions:
        maxGap = 0
        FOR j ← 0 TO len(idxs) - 1:
            gap = (idxs[(j+1) % len(idxs)] - idxs[j] + n) % n
            maxGap = MAX(maxGap, gap)
        minTime = MIN(minTime, maxGap // 2)

    RETURN minTime
```

---

## 5. Walkthrough

```
nums = [1, 2, 1, 2], n=4

Value 1: positions [0, 2]. Gaps: 2-0=2, (0+4)-2=2. maxGap=2. time=1
Value 2: positions [1, 3]. Gaps: 3-1=2, (1+4)-3=2. maxGap=2. time=1

Answer = min(1, 1) = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — one pass to collect positions, one pass per value |
| **Space** | O(n) — position lists |

---

## 7. Key Takeaway

> **Spreading = gap analysis.** Each value spreads bidirectionally from its positions. The bottleneck is the largest gap between consecutive occurrences. Time = half that gap.
