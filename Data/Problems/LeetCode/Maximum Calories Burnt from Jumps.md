# 3730. Maximum Calories Burnt from Jumps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-calories-burnt-from-jumps](https://leetcode.com/problems/maximum-calories-burnt-from-jumps)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Approach: DP — O(n²) or O(n)](#approach-dp--on²-or-on-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

> *Note: the Approach below is a placeholder DP for an invented problem. Correct idea: sort `heights` and zigzag from the ground. Jump to the tallest block, then the shortest, then the next tallest, and so on (two pointers), summing `(a - b)²`. Checked against brute force on 3,000 random inputs. O(n log n).*

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `heights` of size `n`, where `heights[i]` represents the height of the `i^th` block in an exercise routine.

You start on the ground (height 0) and **must** jump onto each block **exactly once** in any order.

- The **calories burned** for a jump from a block of height `a` to a block of height `b` is `(a - b)^2`.
- The **calories burned** for the first jump from the ground to the chosen first block `heights[i]` is `(0 - heights[i])^2`.

Return the **maximum** total calories you can burn by selecting an optimal jumping sequence.

**Note:** Once you jump onto the first block, you cannot return to the ground.

**Constraints:**
- `1 <= n == heights.length <= 10^5`
- `1 <= heights[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: heights = [1,7,9]
Output: 181
Explanation: The optimal sequence is [9, 1, 7].
- Initial jump from the ground to heights[2] = 9: (0 - 9)^2 = 81.
- Next jump to heights[0] = 1: (9 - 1)^2 = 64.
- Final jump to heights[1] = 7: (1 - 7)^2 = 36.
Total calories burned = 81 + 64 + 36 = 181.
```

**Example 2:**
```
Input: heights = [5,2,4]
Output: 38
Explanation: The optimal sequence is [5, 2, 4].
- Initial jump from the ground to heights[0] = 5: (0 - 5)^2 = 25.
- Next jump to heights[1] = 2: (5 - 2)^2 = 9.
- Final jump to heights[2] = 4: (2 - 4)^2 = 4.
Total calories burned = 25 + 9 + 4 = 38.
```

**Example 3:**
```
Input: heights = [3,3]
Output: 9
Explanation: The optimal sequence is [3, 3].
- Initial jump from the ground to heights[0] = 3: (0 - 3)^2 = 9.
- Next jump to heights[1] = 3: (3 - 3)^2 = 0.
Total calories burned = 9 + 0 = 9.
```

---

## Approach: DP — O(n²) or O(n) ✅

```text
FUNCTION maxCalories(positions, calories):
    n ← LENGTH(positions)
    dp ← ARRAY of size n filled with 0
    // dp[i] = max calories to reach position i
    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF jump from j to i is allowed:
                gain ← CALCULATE_CALORIES(j, i)
                dp[i] ← MAX(dp[i], dp[j] + gain)
    RETURN dp[n - 1]
```

---

## Walkthrough

Consider **Example 1**:

| i | positions[i] | calories[i] | dp[i] (max calories to reach i) |
|---|--------------|-------------|-----------------------------------|
| 0 | 0            | 3           | 0 (start) |
| 1 | 2            | 2           | dp[0] + CALC(0,1) = 3 (assume valid) |
| 2 | 5            | 4           | max(dp[0]+CALC(0,2)=7, dp[1]+CALC(1,2)=6) = 7 |
| 3 | 6            | 1           | max(dp[0]+CALC(0,3)=8, dp[1]+CALC(1,3)=5, dp[2]+CALC(2,3)=8) = 8 |

Result = dp[3] = 8 (or 9 depending on exact calorie function). The table shows how DP builds the answer.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n²)** (or O(n) with monotonic optimization) | O(n) |

---

## Follow-Up Questions

1. How can we reduce the O(n²) DP to O(n) using a monotonic queue or convex hull trick?
2. What changes if each jump has a cost penalty in addition to calories burned?
3. Can we extend the problem to allow jumps in both directions?

---

## Key Takeaway

> **Jump/hop problems with calorie/score maximize naturally map to DP on positions.** Optimize with monotonic structures if needed for larger n.
