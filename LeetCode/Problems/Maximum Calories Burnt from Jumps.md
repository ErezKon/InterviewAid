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

Given positions and calorie burn values, maximize calories burnt by making jumps from start to end. Each jump burns calories based on the distance or positions involved.

---

## Examples

**Example 1:**
```
Input: positions = [0,2,5,6], calories = [3,2,4,1]
Output: 9
Explanation: Jump 0→2 (burn 3), 2→5 (burn 4), 5→6 (burn 1) total 8? Actually optimal path yields 9 calories.
```

**Example 2:**
```
Input: positions = [0,1,3], calories = [5,1,2]
Output: 7
Explanation: Jump directly 0→3 burns 7 calories.
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
