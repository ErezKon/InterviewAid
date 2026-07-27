# 3574. Maximize Subarray GCD Score

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-subarray-gcd-score](https://leetcode.com/problems/maximize-subarray-gcd-score)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: Enumerate Subarrays with GCD Tracking — O(n² log M)](#approach-enumerate-subarrays-with-gcd-tracking--on²-log-m-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, find a contiguous subarray whose **GCD score** (GCD of all elements × length of subarray) is maximized. Return that maximum score.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁶`

---

## Key Insight

> For a fixed left endpoint, as we extend right, the GCD can only **decrease or stay the same** — and the number of distinct GCD values is O(log M). Track all active (gcd, start_index) pairs; when extending, merge duplicates. For each pair, score = gcd × length.

---

## Approach: Enumerate Subarrays with GCD Tracking — O(n² log M) ✅

```
FUNCTION maxGCDScore(nums):
    result = 0
    // active = set of (gcd_value, earliest_start) for subarrays ending here
    active = []

    FOR j ← 0 TO n - 1:
        newActive = []
        FOR (g, start) IN active:
            newG = GCD(g, nums[j])
            IF newActive is empty OR newActive[-1][0] != newG:
                newActive.APPEND((newG, start))
            ELSE:
                newActive[-1] = (newG, MIN(newActive[-1][1], start))
        // Add single-element subarray
        IF newActive is empty OR newActive[-1][0] != nums[j]:
            newActive.APPEND((nums[j], j))
        active = newActive

        FOR (g, start) IN active:
            result = MAX(result, g * (j - start + 1))

    RETURN result
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| GCD tracking | **O(n log² M)** | O(log M) |

At each position, there are at most O(log M) distinct GCD values since each new element can only divide existing GCDs.

---

## Key Takeaway

> **The number of distinct GCDs for subarrays ending at any position is O(log M).** This enables efficient enumeration of all subarray GCDs without brute-force O(n²) iteration.
