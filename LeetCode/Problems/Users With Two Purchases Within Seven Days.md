# 2228. Users With Two Purchases Within Seven Days

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/users-with-two-purchases-within-seven-days](https://leetcode.com/problems/users-with-two-purchases-within-seven-days)
**Companies:** Amazon

---

## Problem Description
Given a list of purchase records where each record contains a `userId` and a `timestamp` (in days), determine how many distinct users have made **at least two purchases** within any **7‑day window**. Each user may have multiple purchases; only one qualifying window per user is needed.

## Examples
**Example 1**
```
Input: purchases = [[1,1],[2,2],[1,5],[1,10],[2,8]]
Output: 1
Explanation: User 1 purchased on days 1 and 5 (within 7 days). User 2's purchases are 6 days apart but not within any 7‑day window that contains two purchases.
```
**Example 2**
```
Input: purchases = [[3,2],[3,9],[3,15]]
Output: 0
Explanation: All purchases for user 3 are spaced more than 7 days apart.
```

## Approach
Use a **hash map** to group timestamps by `userId`. For each user's sorted timestamps, apply a **sliding window** to find any pair where `right - left <= 7`. If found, count the user and move to the next.

## Walkthrough
| Step | User | Sorted Timestamps | Sliding Window (left, right) | Condition Met? |
|------|------|-------------------|------------------------------|----------------|
| 1    | 1    | [1,5,10]          | (1,5) → 5‑1 ≤7 ✅            | Yes → count++ |
| 2    | 2    | [2,8]             | (2,8) → 8‑2 >7 ❌            | No |

## Complexity Analysis
- **Time:** O(N log N) for sorting timestamps per user (total N records). Sliding window is linear in the number of timestamps.
- **Space:** O(N) for the hash map storing timestamps.

## Follow-Up Questions
1. How would you handle real‑time streams of purchases?
2. Extend to find the **maximum number of purchases** any user made within a 7‑day window.
3. Generalize to an arbitrary window size `k` days.

## Key Takeaway
Grouping timestamps by user and applying a sliding window efficiently reveals users with multiple purchases in a limited time span.
