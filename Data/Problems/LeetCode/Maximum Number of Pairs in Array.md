# 2341. Maximum Number of Pairs in Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-pairs-in-array](https://leetcode.com/problems/maximum-number-of-pairs-in-array)
**Companies:** Altimetrik

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

Given an integer array `nums`, pair up equal elements. Return `[pairs, leftover]` where `pairs` is the maximum number of pairs and `leftover` is the count of remaining unpaired elements.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

---

## Examples

**Example 1:**
```
Input:  nums = [1,3,2,1,3,2,2]
Output: [3, 1]
Explanation: Pairs: (1,1), (3,3), (2,2). Leftover: one 2.
```

---

## Key Insight

> Count frequency of each number. Each value contributes `freq // 2` pairs and `freq % 2` leftover.

---

## Approach

```
FUNCTION numberOfPairs(nums)
    count ← frequency map of nums
    pairs ← 0

    FOR each freq IN count.values() DO
        pairs ← pairs + freq / 2

    leftover ← len(nums) - 2 * pairs
    RETURN [pairs, leftover]
END FUNCTION
```

---

## Walkthrough

```
nums = [1,3,2,1,3,2,2]
count = {1:2, 3:2, 2:3}
```

| Value | Freq | Pairs | Leftover |
|-------|------|-------|----------|
| 1     | 2    | 1     | 0        |
| 3     | 2    | 1     | 0        |
| 2     | 3    | 1     | 1        |

Total: pairs=3, leftover = 7 - 6 = **1**

**Result: [3, 1]** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — frequency count |
| Space  | **O(n)** — hash map |

---

## Follow-Up Questions

1. **What if we needed pairs of different elements?**
   Different problem — two-sum or sorting-based approach.

2. **What if we needed triplets instead of pairs?**
   Use `freq // 3` for each value.

---

## Key Takeaway

> **Frequency counting** — pairs = sum of `freq // 2` across all values. Leftover = total - 2 × pairs.
