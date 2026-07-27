# 3730. Maximum Calories Burnt from Jumps

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-calories-burnt-from-jumps](https://leetcode.com/problems/maximum-calories-burnt-from-jumps)
**Companies:** Amazon

---

## Table of Contents

- [Problem Description](#problem-description)
- [Key Insight](#key-insight)
- [Approach: DP — O(n²) or O(n)](#approach-dp--on²-or-on-)
- [Complexity Analysis](#complexity-analysis)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given positions and calorie burn values, maximize calories burnt by making jumps from start to end. Each jump burns calories based on the distance or positions involved.

---

## Key Insight

> Standard DP: `dp[i]` = max calories to reach position i. For each position, try all valid previous positions and take the best.

---

## Approach: DP — O(n²) or O(n) ✅

```
FUNCTION maxCalories(positions, calories):
    n = len(positions)
    dp = [0] * n
    FOR i ← 1 TO n - 1:
        FOR j ← 0 TO i - 1:
            IF jump from j to i is valid:
                dp[i] = MAX(dp[i], dp[j] + burnCalories(j, i))
    RETURN dp[n - 1]
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n²)** | O(n) |

---

## Key Takeaway

> **Jump/hop problems with calorie/score maximize naturally map to DP on positions.** Optimize with monotonic structures if needed for larger n.
