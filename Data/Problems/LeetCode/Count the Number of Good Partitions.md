# 2963. Count the Number of Good Partitions

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-the-number-of-good-partitions](https://leetcode.com/problems/count-the-number-of-good-partitions)
**Companies:** Google

---

## Problem Description

A **good partition** splits the array into contiguous groups where no value appears in more than one group. Return the number of good partitions modulo `10^9 + 7`.

---

## Examples

**Example 1:**
```
Input: nums = [1,2,1,2,3,3]
Output: 2
Explanation:
- Value 1 appears at indices 0 and 2, value 2 at 1 and 3, value 3 at 4 and 5.
- Intervals for 1 and 2 overlap (0‑3), forming one merged segment.
- Interval for 3 is separate (4‑5).
- We have 2 segments → 1 possible split point → 2^1 = 2 good partitions.
```

**Example 2:**
```
Input: nums = [1,2,3,4]
Output: 8
Explanation:
Each value appears once, so every index is its own segment.
Segments = 4 → 3 split points → 2^3 = 8 possible partitions.
```

---

## Key Insight

For each value, its first and last occurrence define an interval. Merge overlapping intervals — the result is `m` non-overlapping segments. A partition is valid only at boundaries between segments, so there are `m - 1` potential split points, each independently chosen → `2^(m-1)` good partitions.

---

## Approach

```text
FUNCTION numberOfGoodPartitions(nums):
    MOD ← 1_000_000_007
    // Record last occurrence of each value
    last ← MAP()
    FOR i ← 0 TO LEN(nums) - 1:
        last[nums[i]] ← i

    segments ← 0
    maxRight ← 0
    FOR i ← 0 TO LEN(nums) - 1:
        // When current index passes the rightmost bound of the previous segment,
        // a new segment starts.
        IF i > maxRight AND i > 0:
            segments ← segments + 1
        maxRight ← MAX(maxRight, last[nums[i]])

    // Number of split points = segments (because segments count = merged intervals - 1)
    RETURN pow(2, segments, MOD)
```

---

## Walkthrough

**Using Example 1 (`nums = [1,2,1,2,3,3]`):**
| Step | i (index) | nums[i] | maxRight before update | Action | maxRight after update | segments |
|------|-----------|---------|------------------------|--------|-----------------------|----------|
| 1 | 0 | 1 | 0 | set last[1]=2 later; maxRight = max(0,2)=2 | 2 | 0 |
| 2 | 1 | 2 | 2 | set last[2]=3; maxRight = max(2,3)=3 | 3 | 0 |
| 3 | 2 | 1 | 3 | maxRight stays 3 | 3 | 0 |
| 4 | 3 | 2 | 3 | maxRight stays 3 | 3 | 0 |
| 5 | 4 | 3 | 3 | set last[3]=5; maxRight = max(3,5)=5 | 5 | **i > previous maxRight (4 > 3) → segments++ → 1** |
| 6 | 5 | 3 | 5 | maxRight stays 5 | 5 | 1 |

After the loop, `segments = 1`. Number of good partitions = 2^1 = 2.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) — single pass to record last indices and another pass to count segments |
| **Space** | O(n) for the `last` map (at most one entry per distinct value) |

---

## Follow-Up Questions

- How would the solution change if the array were circular (partitions could wrap around)?
- Can we extend the approach to count partitions where each segment must satisfy an additional property, e.g., sum ≤ K?
- What if we need to output the actual partitions, not just the count?

---

## Key Takeaway

> **Good partition = no value spans multiple groups. Find each value's range, merge overlapping ranges into segments, then answer is 2^(segments‑1) since each boundary between segments is an independent binary choice.**