# 1151. Minimum Swaps to Group All 1's Together

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together](https://leetcode.com/problems/minimum-swaps-to-group-all-1s-together)
**Companies:** Amazon, Expedia, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sliding Window — O(n)](#4-approach-sliding-window--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given a binary array, return the **minimum** swaps to group all `1`s together in a contiguous subarray.

**Constraints:**
- `1 <= data.length <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input: data = [1,0,1,0,1]
  Output: 1
  Explanation: Swap data[1] and data[4] → [1,1,1,0,0].
```

---

## 3. Key Insight

> The group of 1s will occupy a window of size `k = count(1s)`. The minimum swaps = minimum zeros in any window of size `k` = `k - max(1s in window)`.

---

## 4. Approach: Sliding Window — O(n) ✅

```
FUNCTION minSwaps(data):
    ones = SUM(data)
    IF ones <= 1: RETURN 0
    // Sliding window of size 'ones', find max 1s in any window
    windowOnes = SUM(data[:ones])
    maxOnes = windowOnes
    FOR i ← ones TO len(data) - 1:
        windowOnes += data[i] - data[i - ones]
        maxOnes = MAX(maxOnes, windowOnes)
    RETURN ones - maxOnes
```

---

## 5. Walkthrough

```
data = [1, 0, 1, 0, 1], ones = 3

Window size 3:
  [1,0,1] → ones=2
  [0,1,0] → ones=1
  [1,0,1] → ones=2

maxOnes = 2
Answer = 3 - 2 = 1 ✅
```

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — single sliding window pass |
| **Space** | O(1) |

---

## 7. Key Takeaway

> **Fixed-size sliding window** — window size = count of 1s. Minimum swaps = zeros in the best window. Same pattern as "Minimum Recolors" — count the "wrong" elements in a fixed window.
