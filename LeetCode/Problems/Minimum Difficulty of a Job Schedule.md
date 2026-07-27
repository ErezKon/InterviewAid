# 1335. Minimum Difficulty of a Job Schedule

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule](https://leetcode.com/problems/minimum-difficulty-of-a-job-schedule)
**Companies:** Amazon, Google, Mathworks, Microsoft, Salesforce, Tiktok, Turvo

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n²·d)](#approach-dp--ond)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Schedule `n` jobs over `d` days. Each day you must complete at least one job, and jobs must be done in order. The **difficulty** of a day = maximum difficulty among jobs done that day. Return the **minimum total difficulty** across all days. Return `-1` if `n < d`.

**Constraints:**
- `1 ≤ n ≤ 300`
- `1 ≤ d ≤ 10`
- `0 ≤ jobDifficulty[i] ≤ 1000`

---

## Examples

**Example 1:**
```
Input: jobDifficulty = [6,5,4,3,2,1], d = 2
Output: 7
Explanation: Day 1: [6,5,4,3,2] diff=6, Day 2: [1] diff=1. Total=7.
```

**Example 2:**
```
Input: jobDifficulty = [9,9,9], d = 4
Output: -1
Explanation: Can't split 3 jobs into 4 days.
```

---

## Key Insight

> This is a **partition DP** problem: split the array into `d` contiguous segments, minimizing the sum of max values per segment. `dp[i][day]` = min difficulty to schedule first `i` jobs in `day` days.

---

## Approach: DP — O(n²·d) ✅

```
FUNCTION minDifficulty(jobDifficulty, d):
    n = len(jobDifficulty)
    IF n < d: RETURN -1

    // dp[i][j] = min difficulty scheduling first i jobs in j days
    dp = (n+1) × (d+1) of infinity
    dp[0][0] = 0

    FOR day ← 1 TO d:
        FOR i ← day TO n:
            maxDiff = 0
            FOR j ← i DOWN TO day:
                maxDiff = MAX(maxDiff, jobDifficulty[j-1])
                dp[i][day] = MIN(dp[i][day], dp[j-1][day-1] + maxDiff)

    RETURN dp[n][d]
```

---

## Walkthrough

```
jobDifficulty = [6,5,4,3,2,1], d = 2
```

| day | i | Best split | dp[i][day] |
|-----|---|------------|------------|
| 1 | 1 | [6] | 6 |
| 1 | 2 | [6,5] | 6 |
| 1 | 5 | [6,5,4,3,2] | 6 |
| 2 | 6 | Day1=[6..2], Day2=[1] → 6+1 | **7** |

**Result:** dp[6][2] = **7** ✅

---

## Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n² · d) — for each day×position, scan back for the split |
| **Space** | O(n · d) — DP table |

---

## Follow-Up Questions

1. **Can we optimize to O(n·d)?** Yes, using a monotonic stack to track max values, but the O(n²·d) solution is standard for interviews.
2. **What if jobs could be reordered?** Sort descending, assign hardest jobs to separate days. Becomes a greedy problem.
3. **What if each day had a max capacity?** Add a constraint to the inner loop limiting jobs per day.

---

## Key Takeaway

> Partitioning an array into `d` contiguous segments to minimize sum of max values is a classic **partition DP** — iterate days, positions, and split points while tracking running maximums.
