# 485. Max Consecutive Ones

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/max-consecutive-ones](https://leetcode.com/problems/max-consecutive-ones)
**Companies:** Accenture, Amazon, Apple, Bloomberg, Careem, Cognizant, Deloitte, Google, Ibm, Meta, Microsoft, Tcs, Yandex

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Single Pass — O(n)](#approach-single-pass--on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a binary array `nums`, return the maximum number of consecutive `1`'s in the array.

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `nums[i]` is either `0` or `1`

---

## Examples

**Example 1:**
```
Input:  nums = [1,1,0,1,1,1]
Output: 3
Explanation: The last three elements form the longest run of 1's.
```

**Example 2:**
```
Input:  nums = [1,0,1,1,0,1]
Output: 2
```

---

## Key Insight

> Keep a running counter of consecutive 1's. Every time you hit a `0`, reset the counter. Track the maximum seen so far.

---

## Approach: Single Pass — O(n) ✅

```
FUNCTION findMaxConsecutiveOnes(nums):
    maxCount = 0
    count = 0
    FOR num IN nums:
        IF num == 1: count += 1
        ELSE: count = 0
        maxCount = MAX(maxCount, count)
    RETURN maxCount
```

---

## Walkthrough

```
nums = [1, 1, 0, 1, 1, 1]
```

| Index | num | count | maxCount |
|-------|-----|-------|----------|
| 0     | 1   | 1     | 1        |
| 1     | 1   | 2     | 2        |
| 2     | 0   | 0     | 2        |
| 3     | 1   | 1     | 2        |
| 4     | 1   | 2     | 2        |
| 5     | 1   | 3     | **3**    |

**Result:** 3 ✅

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Single Pass | **O(n)** | O(1) |

---

## Follow-Up Questions

**Q1: What if you could flip at most one 0?**
This becomes LeetCode 487 (*Max Consecutive Ones II*). Use a two-pointer / sliding window approach allowing one zero in the window.

**Q2: What if you could flip at most k zeros?**
This becomes LeetCode 1004 (*Max Consecutive Ones III*). Sliding window with a zero counter.

**Q3: How would you solve this with a stream (online, no random access)?**
The single-pass approach already works for streaming — it never looks back.

---

## Key Takeaway

> **A running counter with reset is the simplest pattern for "longest consecutive run" problems.** Reset on mismatch, update the max on every step.
