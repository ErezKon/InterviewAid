# 1235. Maximum Profit in Job Scheduling

**Difficulty:** 🔴 Hard
**Acceptance:** 53.0%
**LeetCode:** [https://leetcode.com/problems/maximum-profit-in-job-scheduling](https://leetcode.com/problems/maximum-profit-in-job-scheduling)
**Companies:** Airbnb, Amazon, Bloomberg, Bytedance, Docusign, Doordash, Flipkart, Goldman Sachs, Google, Infosys, Meesho, Meta, Microsoft, Oracle, Palo Alto Networks, Paypal, Phonepe, Pinterest, Ponyai, Snowflake, Swiggy, Tiktok, Uber, Verkada, Weride

---

## 1. Problem Description

Given `n` jobs with start times, end times, and profits, find the maximum profit such that no two chosen jobs overlap.

---

## 2. Approach: DP + Binary Search — O(n log n) ✅

Sort by end time. For each job, either skip it or take it (adding profit to the best non-overlapping previous job).

```
FUNCTION jobScheduling(startTime, endTime, profit):
    jobs = [(startTime[i], endTime[i], profit[i]) for i in 0..n-1]
    SORT jobs by endTime

    dp = [0] * (n + 1)
    ends = [job.endTime for job in jobs]

    FOR i ← 1 TO n:
        // Option 1: skip job i
        dp[i] = dp[i - 1]

        // Option 2: take job i
        // Find latest job that ends <= start of job i
        j = binarySearch(ends, jobs[i-1].startTime)   // rightmost end ≤ start
        dp[i] = MAX(dp[i], dp[j + 1] + jobs[i-1].profit)

    RETURN dp[n]
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## Key Takeaway

> Weighted job scheduling = DP + binary search. Sort by end time, binary search for the latest compatible job. This is a fundamental interval scheduling optimization problem.
