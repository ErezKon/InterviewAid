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

You are given a **0-indexed** integer array `nums`. In one operation, you may do the following:

- Choose **two** integers in `nums` that are **equal**.
- Remove both integers from `nums`, forming a **pair**.

The operation is done on `nums` as many times as possible.

Return *a **0-indexed** integer array* `answer` *of size* `2` *where* `answer[0]` *is the number of pairs that are formed and* `answer[1]` *is the number of leftover integers in* `nums` *after doing the operation as many times as possible*.

**Constraints:**
- `1 <= nums.length <= 100`
- `0 <= nums[i] <= 100`

---

## Examples

```
Example 1:
  Input: nums = [1,3,2,1,3,2,2]
  Output: [3,1]
  Explanation:
    Form a pair with nums[0] and nums[3] and remove them from nums. Now, nums = [3,2,3,2,2].
    Form a pair with nums[0] and nums[2] and remove them from nums. Now, nums = [2,2,2].
    Form a pair with nums[0] and nums[1] and remove them from nums. Now, nums = [2].
    No more pairs can be formed. A total of 3 pairs have been formed, and there is 1 number leftover in nums.
```

```
Example 2:
  Input: nums = [1,1]
  Output: [1,0]
  Explanation: Form a pair with nums[0] and nums[1] and remove them from nums. Now, nums = [].
    No more pairs can be formed. A total of 1 pair has been formed, and there are 0 numbers leftover in nums.
```

```
Example 3:
  Input: nums = [0]
  Output: [0,1]
  Explanation: No pairs can be formed, and there is 1 number leftover in nums.
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
