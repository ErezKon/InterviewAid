# 1890. The Latest Login in 2020

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/the-latest-login-in-2020](https://leetcode.com/problems/the-latest-login-in-2020)
**Companies:** Google

---

## Problem Description
You are given an array `loginTimes` where each element is a string representing a login timestamp in the format `"YYYY-MM-DD HH:MM:SS"`. All timestamps are from the year 2020. Return the timestamp that is chronologically latest.

## Examples
**Example 1:**
```
loginTimes = ["2020-01-15 08:30:00", "2020-12-31 23:59:59", "2020-06-01 12:00:00"]
Output: "2020-12-31 23:59:59"
```
**Example 2:**
```
loginTimes = ["2020-03-01 00:00:01", "2020-03-01 00:00:00"]
Output: "2020-03-01 00:00:01"
```

## Approach
Iterate through the array while keeping the maximum timestamp seen so far. String comparison works because the format is lexicographically ordered.

## Walkthrough
| Index | Current Timestamp | Max So Far |
|-------|-------------------|-----------|
| 0 | 2020-01-15 08:30:00 | 2020-01-15 08:30:00 |
| 1 | 2020-12-31 23:59:59 | 2020-12-31 23:59:59 |
| 2 | 2020-06-01 12:00:00 | 2020-12-31 23:59:59 |
Result is the max timestamp.

## Complexity Analysis
- Time: O(n) where n is the number of timestamps.
- Space: O(1) extra space.

## Follow-Up Questions
1. How would you modify the solution if timestamps could span multiple years?
2. What if the timestamps are given as Unix epoch integers?
3. Can you find the latest login without storing the entire array (streaming input)?

## Key Takeaway
When data is already in a lexicographically sortable format, a simple linear scan yields the maximum efficiently.
