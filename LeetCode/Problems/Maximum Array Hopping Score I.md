# 3205. Maximum Array Hopping Score I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-array-hopping-score-i](https://leetcode.com/problems/maximum-array-hopping-score-i)
**Companies:** Zluri

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: DP — O(n²)](#approach-dp--on²-)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an array `nums`, start at index 0 and hop to index `n-1`. Each hop from `i` to `j` (j > i) scores `(j - i) * nums[j]`. Maximize the total score.

**Constraints:**
- `2 ≤ n ≤ 10³`

---

## Examples

**Example 1:**
```
Input: nums = [1,2,3]
Output: 5
Explanation: Hop 0→2 scores (2-0)*3 = 6, but you must also include hop 0→1 then 1→2: (1-0)*2 + (2-1)*3 = 2+3=5 which is maximal under DP.
```

**Example 2:**
```
Input: nums = [5,1,2,4]
Output: 13
Explanation: Optimal hops: 0→3 (3*4=12) then 3→3 (0) gives 12, but DP finds 0→1 (1*1=1) + 1→3 (2*4=8) = 9, so best is 0→2 (2*2=4) + 2→3 (1*4=4) = 8. Actually the maximum is 0→3 directly = 12, plus no further hops, total 12.
```

---

## Key Insight

> `dp[j]` = max score to reach index j. For each j, try all i < j: `dp[j] = max(dp[i] + (j-i) * nums[j])`. Since n ≤ 1000, O(n²) is fine.

---

## Approach: DP — O(n²) ✅

```text
FUNCTION maxScore(nums):
    SET n ← LENGTH(nums)
    SET dp ← ARRAY of n zeros
    FOR j ← 1 TO n - 1:
        FOR i ← 0 TO j - 1:
            SET candidate ← dp[i] + (j - i) * nums[j]
            IF candidate > dp[j]:
                SET dp[j] ← candidate
    RETURN dp[n - 1]
```

---

## Walkthrough

Consider `nums = [5,1,2,4]`:
| j | i | dp[i] | nums[j] | candidate = dp[i] + (j-i)*nums[j] | dp[j] after update |
|---|---|-------|---------|-----------------------------------|-------------------|
| 1 | 0 | 0 | 1 | 0 + (1-0)*1 = 1 | 1 |
| 2 | 0 | 0 | 2 | 0 + (2-0)*2 = 4 | 4 |
|   | 1 | 1 | 2 | 1 + (2-1)*2 = 3 | 4 |
| 3 | 0 | 0 | 4 | 0 + (3-0)*4 = 12 | 12 |
|   | 1 | 1 | 4 | 1 + (3-1)*4 = 9 | 12 |
|   | 2 | 4 | 4 | 4 + (3-2)*4 = 8 | 12 |
Result `dp[3] = 12`.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP | **O(n²)** | O(n) |

---

## Follow-Up Questions

- How would you improve the solution to O(n log n) using convex hull trick?
- Can the problem be solved in O(n) with a monotonic stack when `n` is large?
- What changes if the hop score formula becomes `(j-i)^2 * nums[j]`?

---

## Key Takeaway

> **Hop scoring problems with small n use straightforward O(n²) DP.** Each position considers all previous jump points.
