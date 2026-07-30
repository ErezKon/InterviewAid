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

```text
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

## 3. Examples

**Example 1:**
```
Input: startTime = [1,2,3,4,6], endTime = [3,5,10,6,9], profit = [20,20,100,70,60]
Output: 150
Explanation: Choose jobs 0 (1‑3, profit 20), 3 (4‑6, profit 70) and 4 (6‑9, profit 60) for total 150.
```

**Example 2:**
```
Input: startTime = [1,2,3,4,5], endTime = [2,3,4,5,6], profit = [50,10,40,70,30]
Output: 150
Explanation: All jobs are non‑overlapping, sum of profits = 150.
```

---

## 4. Walkthrough

Consider Example 1.
1. Pair jobs and sort by end time → `[(1,3,20), (2,5,20), (4,6,70), (6,9,60), (3,10,100)]`.
2. Initialize `dp[0] = 0`.
3. For each job i:
   - Job 1 (1‑3,20): no previous compatible job → `dp[1] = max(0, 20) = 20`.
   - Job 2 (2‑5,20): compatible with none → `dp[2] = max(20, 20) = 20`.
   - Job 3 (4‑6,70): latest non‑overlap ends at 3 (job 1) → `dp[3] = max(20, dp[1] + 70) = 90`.
   - Job 4 (6‑9,60): latest non‑overlap ends at 6 (job 3) → `dp[4] = max(90, dp[3] + 60) = 150`.
   - Job 5 (3‑10,100): latest non‑overlap ends at 3 (job 1) → `dp[5] = max(150, dp[1] + 100) = 150`.
4. Final answer `dp[5] = 150`.

---

## 5. Complexity Analysis

- **Time:** Sorting O(n log n) plus binary searches for each job O(n log n) → total O(n log n).
- **Space:** Arrays for jobs, dp and end times → O(n).

---

## Key Takeaway

> Weighted job scheduling = DP + binary search. Sort by end time, binary search for the latest compatible job. This is a fundamental interval scheduling optimization problem.
