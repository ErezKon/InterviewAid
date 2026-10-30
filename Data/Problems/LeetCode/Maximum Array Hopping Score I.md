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

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an array `nums`, you have to get the **maximum** score starting from index 0 and **hopping** until you reach the last element of the array.

In each **hop**, you can jump from index `i` to an index `j > i`, and you get a **score** of `(j - i) * nums[j]`.

Return the *maximum score* you can get.

**Constraints:**
- `2 <= nums.length <= 10^3`
- `1 <= nums[i] <= 10^5`

---

## Examples

**Example 1:**
```
Input: nums = [1,5,8]
Output: 16
Explanation: There are two possible ways to reach the last element:
- 0 -> 1 -> 2 with a score of (1 - 0) * 5 + (2 - 1) * 8 = 13.
- 0 -> 2 with a score of (2 - 0) * 8 = 16.
```

**Example 2:**
```
Input: nums = [4,5,2,8,9,1,3]
Output: 42
Explanation: We can do the hopping 0 -> 4 -> 6 with a score of (4 - 0) * 9 + (6 - 4) * 3 = 42.
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
