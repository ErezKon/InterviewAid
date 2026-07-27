# 2770. Maximum Number of Jumps to Reach the Last Index

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index](https://leetcode.com/problems/maximum-number-of-jumps-to-reach-the-last-index)
**Companies:** Amazon, Meta

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

Given an array `nums` and an integer `target`, you start at index 0 and want to reach index `n-1`. You can jump from index `i` to index `j` (j > i) if `-target ≤ nums[j] - nums[i] ≤ target`. Return the **maximum number of jumps** to reach `n-1`, or `-1` if impossible.

**Constraints:**
- `2 <= nums.length <= 1000`
- `-10^9 <= nums[i] <= 10^9`
- `0 <= target <= 2 × 10^9`

---

## Examples

**Example 1:**
```
Input:  nums = [1,3,6,4,1,2], target = 2
Output: 3
Explanation: 0→1→3→5 (values: 1→3→4→2). Each jump diff ≤ 2.
```

**Example 2:**
```
Input:  nums = [1,3,6,4,1,2], target = 0
Output: -1
```

---

## Key Insight

> **DP**: `dp[i]` = maximum jumps to reach index `i`. For each `i`, check all previous `j < i` where the jump condition holds, and take `dp[j] + 1` if reachable.

---

## Approach

```
FUNCTION maximumJumps(nums, target)
    n ← len(nums)
    dp ← array of n, all -1
    dp[0] ← 0

    FOR i ← 1 TO n - 1 DO
        FOR j ← 0 TO i - 1 DO
            IF dp[j] ≠ -1 AND ABS(nums[i] - nums[j]) ≤ target THEN
                dp[i] ← MAX(dp[i], dp[j] + 1)

    RETURN dp[n - 1]
END FUNCTION
```

---

## Walkthrough

```
nums = [1, 3, 6, 4, 1, 2], target = 2
```

| i | Check j's | dp[i] |
|---|----------|-------|
| 0 | —        | 0     |
| 1 | j=0: |3-1|=2≤2 ✅ | 1 |
| 2 | j=0: |6-1|=5>2, j=1: |6-3|=3>2 | -1 |
| 3 | j=0: |4-1|=3>2, j=1: |4-3|=1≤2 ✅ | 2 |
| 4 | j=0: |1-1|=0≤2 ✅ → 1, j=1: |1-3|=2≤2 ✅ → 2 | 2 |
| 5 | j=0: |2-1|=1≤2 → 1, j=1: |2-3|=1≤2 → 2, j=3: |2-4|=2≤2 → **3**, j=4: |2-1|=1≤2 → 3 | **3** |

**Result: 3** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n²)** — nested loops |
| Space  | **O(n)** — dp array |

---

## Follow-Up Questions

1. **Can we do better than O(n²)?**
   With sorted values and segment trees, potentially O(n log n), but O(n²) is fine for n ≤ 1000.

2. **What if we wanted minimum jumps instead?**
   Use BFS from index 0, or modify dp to track minimum.

3. **What if target varied per index?**
   Same DP structure, just use `target[i]` or `target[j]` in the condition.

---

## Key Takeaway

> **O(n²) DP** where each state considers all valid predecessors — standard pattern for "maximum/minimum steps" with pairwise conditions on a small array.
