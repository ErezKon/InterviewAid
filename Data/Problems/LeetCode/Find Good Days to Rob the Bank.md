# 2100. Find Good Days to Rob the Bank

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-good-days-to-rob-the-bank](https://leetcode.com/problems/find-good-days-to-rob-the-bank)
**Companies:** Amazon, Google

---

## Problem Description
You and a gang of thieves are planning on robbing a bank. You are given a **0-indexed** integer array `security`, where `security[i]` is the number of guards on duty on the `i^th` day. The days are numbered starting from `0`. You are also given an integer `time`.

The `i^th` day is a good day to rob the bank if:

- There are at least `time` days before and after the `i^th` day,
- The number of guards at the bank for the `time` days **before** `i` are **non-increasing**, and
- The number of guards at the bank for the `time` days **after** `i` are **non-decreasing**.

More formally, this means day `i` is a good day to rob the bank if and only if `security[i - time] >= security[i - time + 1] >= ... >= security[i] <= ... <= security[i + time - 1] <= security[i + time]`.

Return *a list of **all** days **(0-indexed)** that are good days to rob the bank. The order that the days are returned in does **not** matter.*

**Constraints:**

- `1 <= security.length <= 10^5`
- `0 <= security[i], time <= 10^5`

## Examples

```
Example 1:
  Input: security = [5,3,3,3,5,6,2], time = 2
  Output: [2,3]
  Explanation:
  On day 2, we have security[0] >= security[1] >= security[2] <= security[3] <= security[4].
  On day 3, we have security[1] >= security[2] >= security[3] <= security[4] <= security[5].
  No other days satisfy this condition, so days 2 and 3 are the only good days to rob the bank.
```

```
Example 2:
  Input: security = [1,1,1,1,1], time = 0
  Output: [0,1,2,3,4]
  Explanation:
  Since time equals 0, every day is a good day to rob the bank, so return every day.
```

```
Example 3:
  Input: security = [1,2,3,4,5,6], time = 2
  Output: []
  Explanation:
  No day has 2 days before it that have a non-increasing number of guards.
  Thus, no day is a good day to rob the bank, so return an empty list.
```

## Approach
Pre-compute two auxiliary arrays:
- `left[i]` = number of consecutive days ending at `i` where `security` is non-increasing.
- `right[i]` = number of consecutive days starting at `i` where `security` is non-decreasing.
A day `i` is good if `left[i] >= time` and `right[i] >= time`.

## Pseudocode
```text
FUNCTION goodDays(security, time):
    SET n ← LENGTH(security)
    SET left ← array of n zeros
    SET right ← array of n zeros
    // fill left
    FOR i FROM 1 TO n-1:
        IF security[i] <= security[i-1]:
            left[i] ← left[i-1] + 1
        ELSE:
            left[i] ← 0
    // fill right
    FOR i FROM n-2 DOWNTO 0:
        IF security[i] <= security[i+1]:
            right[i] ← right[i+1] + 1
        ELSE:
            right[i] ← 0
    SET result ← []
    FOR i FROM 0 TO n-1:
        IF left[i] >= time AND right[i] >= time:
            APPEND i TO result
    RETURN result
```

## Walkthrough
| i | security[i] | left[i] | right[i] | good? |
|---|-------------|---------|----------|-------|
| 0 | 5 | 0 | 0 | no |
| 1 | 3 | 1 (5≥3) | 0 | no |
| 2 | 3 | 2 (3≤3) | 2 (3≤5≤6) | yes |
| 3 | 3 | 3 | 1 | yes |
| ... | ... | ... | ... | ... |
Result → [2,3]

## Complexity Analysis
- **Time:** O(n) – two linear passes.
- **Space:** O(n) for the auxiliary arrays (can be reduced to O(1) with two-pointer sliding windows).

## Follow-Up Questions
- How would you adapt the solution for a streaming input where the array is not fully known in advance?
- Can you solve the problem using only O(1) extra space?
- What changes are needed if the condition uses strict inequality instead of non-strict?

## Key Takeaway
Prefix counts of monotonic segments let you evaluate each day in constant time, turning a seemingly quadratic check into a linear-time solution.
