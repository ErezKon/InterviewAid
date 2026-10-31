# 3176. Find the Maximum Length of a Good Subsequence I

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-i](https://leetcode.com/problems/find-the-maximum-length-of-a-good-subsequence-i)
**Companies:** Snowflake

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP with at most k Changes — O(n² · k) ✅](#3-approach-dp-with-at-most-k-changes--on²--k-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

You are given an integer array `nums` and a **non-negative** integer `k`. A sequence of integers `seq` is called **good** if there are **at most** `k` indices `i` in the range `[0, seq.length - 2]` such that `seq[i] != seq[i + 1]`.

Return the **maximum** possible length of a **good** subsequence of `nums`.

**Constraints:**
- `1 <= nums.length <= 500`
- `1 <= nums[i] <= 10⁹`
- `0 <= k <= min(nums.length, 25)`

---

## 2. Key Insight

> `dp[i][j]` = max length of good subsequence ending at index `i` with exactly `j` bad transitions used. Extend from any previous index: if same value, no cost; if different value, cost 1 transition.

---

## 3. Approach: DP with at most k Changes — O(n² · k) ✅

```text
FUNCTION maximumLength(nums, k):
    n ← LENGTH(nums)
    dp ← n × (k+1) array of 1

    FOR i ← 0 TO n - 1 DO
        FOR j ← 0 TO i - 1 DO
            IF nums[i] == nums[j] THEN
                FOR t ← 0 TO k DO
                    dp[i][t] ← MAX(dp[i][t], dp[j][t] + 1)
            ELSE
                FOR t ← 1 TO k DO
                    dp[i][t] ← MAX(dp[i][t], dp[j][t-1] + 1)

    RETURN MAX over all dp[i][t]
```

---

## 4. Examples

```
Example 1:
  Input: nums = [1,2,1,1,3], k = 2
  Output: 4
  Explanation: The maximum length subsequence is [1,2,1,1] (taken from [1,2,1,1,3]).

Example 2:
  Input: nums = [1,2,3,4,5,1], k = 0
  Output: 2
  Explanation: The maximum length subsequence is [1,1] (the first and last elements of [1,2,3,4,5,1]).
```

---

## 5. Walkthrough

Consider Example 1 (`nums = [1,2,1,2,1]`, `k = 1`).

| i | nums[i] | dp[i][0] | dp[i][1] | Explanation |
|---|---------|----------|----------|-------------|
| 0 | 1 | 1 | 1 | Start new subsequence.
| 1 | 2 | 1 | 2 | Different from index 0, uses one bad transition → length 2.
| 2 | 1 | 2 | 2 | Same as index 0 (no extra cost) → extend dp[0][0] to 2. Different from index 1 would exceed k.
| 3 | 2 | 2 | 3 | Extend from index 2 (different) using the one allowed transition → length 3.
| 4 | 1 | 3 | 3 | Extend from index 2 (same) → dp[2][0]+1 = 3. Extending from index 3 would exceed k.

Maximum length with ≤1 bad transition is 4 (subsequence indices 0-1-3-4).

---

## 6. Follow-Up Questions

- How would the solution change if `k` could be as large as `n`?
- Can the DP be optimized to O(n·k) using prefix maxima?
- What if the subsequence must be contiguous (i.e., a subarray) instead of any subsequence?

---

## 5. Key Takeaway

> Classic DP extension: track the number of "bad" transitions used. Same-value pairs extend freely; different-value pairs consume one transition from the budget.
