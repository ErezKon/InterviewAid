# 3038. Maximum Number of Operations With the Same Score I

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-i](https://leetcode.com/problems/maximum-number-of-operations-with-the-same-score-i)
**Companies:** Microsoft

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

Given an array `nums`, repeatedly remove the **first two elements** if their sum equals the score of the first operation. Return the **maximum number of operations**.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 1000`

---

## Examples

**Example 1:**
```
Input:  nums = [3,2,1,4,5]
Output: 2
Explanation: Score = 3+2=5. Remove (3,2). Next: (1,4)=5 ✅. Then (5) — only 1 element, stop.
```

**Example 2:**
```
Input:  nums = [3,2,6,1,4]
Output: 1
Explanation: Score = 3+2=5. Next (6,1)=7 ≠ 5. Stop.
```

---

## Key Insight

> Simple simulation: the score is fixed by the first pair. Keep removing from the front while the sum matches.

---

## Approach

```
FUNCTION maxOperations(nums)
    score ← nums[0] + nums[1]
    count ← 0
    i ← 0

    WHILE i + 1 < len(nums) DO
        IF nums[i] + nums[i+1] = score THEN
            count ← count + 1
            i ← i + 2
        ELSE
            BREAK

    RETURN count
END FUNCTION
```

---

## Walkthrough

```
nums = [3, 2, 1, 4, 5], score = 5
```

| i | nums[i]+nums[i+1] | = 5? | count |
|---|--------------------|------|-------|
| 0 | 3+2=5              | ✅   | 1     |
| 2 | 1+4=5              | ✅   | **2** |
| 4 | only 1 element     | stop | 2     |

**Result: 2** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — constant |

---

## Follow-Up Questions

1. **How does this differ from the Score II version?**
   Score II allows removing from front, back, or both ends — requiring interval DP.

2. **What if we could choose the score?**
   Would need to try all possible first-pair sums and take the max.

---

## Key Takeaway

> **Simple greedy simulation** — fix the score from the first pair, then greedily consume matching pairs from the front.
