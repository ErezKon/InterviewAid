# 2140. Solving Questions With Brainpower

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/solving-questions-with-brainpower](https://leetcode.com/problems/solving-questions-with-brainpower)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

Given a 0-indexed 2D array `questions` where `questions[i] = [points, brainpower]`, decide for each question whether to solve it (earn points but skip the next `brainpower` questions) or skip it. Return the maximum points.

### Examples

- **Input:** `questions = [[3,2],[4,3],[4,4],[2,5]]` → **Output:** `5` (solve Q0=3, skip Q1-Q2, can't reach Q3 → or solve Q1=4, skip… best is 5)
- **Input:** `questions = [[1,1],[2,2],[3,3],[4,4],[5,5]]` → **Output:** `7`

## Approach: Reverse DP — O(n) ✅

**Key Insight:** Process from right to left. At each question, choose max of skipping (dp[i+1]) or solving (points + dp[i+skip+1]).

```
FUNCTION mostPoints(questions):
    n = len(questions)
    dp = [0] * (n + 1)

    FOR i ← n - 1 DOWN TO 0:
        points, skip = questions[i]
        next = MIN(i + skip + 1, n)
        dp[i] = MAX(dp[i + 1], points + dp[next])

    RETURN dp[0]
```

### Complexity

| | |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |
