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

## Examples

**Example 1:**
```
nums = [12, 15, 18]
```
Possible subarrays and their GCD scores:
- `[12]` → GCD=12, length=1, score=12
- `[12,15]` → GCD=3, length=2, score=6
- `[12,15,18]` → GCD=3, length=3, score=9
- `[15,18]` → GCD=3, length=2, score=6
- `[18]` → GCD=18, length=1, score=18
The maximum score is **18** from subarray `[18]`.

**Example 2:**
```
nums = [2,4,6,8]
```
All numbers share GCD=2. The longest subarray is the whole array, giving score `2 * 4 = 8`. No other subarray yields a higher product, so answer is **8**.

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

## Walkthrough

Consider `nums = [12, 15, 18]`.
1. **j = 0** (`12`): `active = [(12,0)]`; score = `12*1 = 12`.
2. **j = 1** (`15`):
   - Extend previous: GCD(12,15)=3 → `(3,0)`.
   - Add single element `(15,1)`.
   - `active = [(3,0),(15,1)]`; scores: `3*2=6`, `15*1=15`.
3. **j = 2** (`18`):
   - Extend `(3,0)`: GCD(3,18)=3 → `(3,0)`.
   - Extend `(15,1)`: GCD(15,18)=3 → `(3,1)` (merged with previous `(3,0)` keeping earliest start).
   - Add `(18,2)`.
   - `active = [(3,0),(18,2)]`; scores: `3*3=9`, `18*1=18`.
Maximum encountered score is **18**.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| GCD tracking | **O(n log² M)** | O(log M) |

At each position, there are at most O(log M) distinct GCD values since each new element can only divide existing GCDs.

---

## Key Takeaway

> **The number of distinct GCDs for subarrays ending at any position is O(log M).** This enables efficient enumeration of all subarray GCDs without brute-force O(n²) iteration.
