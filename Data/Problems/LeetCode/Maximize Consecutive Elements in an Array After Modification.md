# 3041. Maximize Consecutive Elements in an Array After Modification

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification](https://leetcode.com/problems/maximize-consecutive-elements-in-an-array-after-modification)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Sort + DP — O(n log n)](#approach-sort--dp--on-log-n-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given a 0-indexed array `nums` of positive integers, you can increase each element by **at most 1**. Find the maximum number of elements you can select to form a **consecutive sequence** (e.g., `[3,4,5,6]`).

**Constraints:**
- `1 ≤ nums.length ≤ 10⁵`
- `1 ≤ nums[i] ≤ 10⁶`

---

## Examples

**Example 1:**
```
Input:  nums = [2,1,5,1,1]
Output: 3
Explanation: Increase nums[0]=2 to 3, keep nums[1]=1, increase nums[3]=1 to 2.
             Selected: {1, 2, 3} → 3 consecutive.
```

**Example 2:**
```
Input:  nums = [1,4,7,10]
Output: 1
Explanation: No two elements can form consecutive values even with +1.
```

---

## Key Insight

> Sort the array. For each element, it can take value `nums[i]` or `nums[i]+1`. Use DP: track the longest consecutive chain ending at each possible value. For each `nums[i]`, try extending chains ending at `nums[i]-1` (keep as-is) or `nums[i]` (increment by 1 to get `nums[i]+1`).

---

## Approach: Sort + DP — O(n log n) ✅

```
FUNCTION maxSelectedElements(nums):
    SORT nums
    dp = {}    // value → length of longest chain ending at that value
    result = 0

    FOR num IN nums:
        // Option 1: use num+1 (increment), extends chain ending at num
        dp[num + 1] = dp.get(num, 0) + 1
        // Option 2: use num as-is, extends chain ending at num-1
        dp[num] = dp.get(num - 1, 0) + 1
        result = MAX(result, dp[num], dp[num + 1])

    RETURN result
```

**Important:** Process `num+1` before `num` to avoid using the updated `dp[num]` when computing `dp[num+1]`.

---

## Walkthrough

```
nums = [2, 1, 5, 1, 1] → sorted: [1, 1, 1, 2, 5]
```

| num | dp[num+1] = dp[num]+1 | dp[num] = dp[num-1]+1 | dp state |
|-----|-----------------------|-----------------------|----------|
| 1   | dp[2] = dp[1]+1 = 1  | dp[1] = dp[0]+1 = 1  | {1:1, 2:1} |
| 1   | dp[2] = dp[1]+1 = 2  | dp[1] = dp[0]+1 = 1  | {1:1, 2:2} |
| 1   | dp[2] = dp[1]+1 = 2  | dp[1] = dp[0]+1 = 1  | {1:1, 2:2} |
| 2   | dp[3] = dp[2]+1 = 3  | dp[2] = dp[1]+1 = 2  | {1:1, 2:2, 3:3} |
| 5   | dp[6] = dp[5]+1 = 1  | dp[5] = dp[4]+1 = 1  | {..., 5:1, 6:1} |

**Result:** 3 ✅ (chain 1→2→3)

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort + DP | **O(n log n)** | O(n) |

---

## Follow-Up Questions

**Q1: What if you could increase by at most k instead of 1?**
The problem becomes much harder — you'd need to consider all possible value assignments within [num, num+k] and find the longest consecutive subsequence. Sliding window on sorted values may work.

**Q2: What if you could also decrease elements?**
Then each element can take value `num-1`, `num`, or `num+1`. Extend the DP to consider all three options.

**Q3: How does this relate to "Longest Consecutive Sequence" (LC 128)?**
LC 128 is the base case (no modification allowed). This problem adds the +1 flexibility, requiring the DP to track two possible values per element.

---

## Key Takeaway

> **Sort + hash map DP tracking chain lengths per value handles "consecutive sequence with modification" problems.** The key is processing each element's two possible values (original and incremented) in the right order to avoid self-interference.
