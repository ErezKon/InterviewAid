# 1132. Reported Posts II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/reported-posts-ii](https://leetcode.com/problems/reported-posts-ii)
**Companies:** Meta

---

## Problem Description
You are given a list of post IDs `postIds` and a list of report events `reports`, where each report is a pair `[userId, postId]`. A post is considered *reported* if it receives at least `k` distinct user reports. Return the number of posts that are reported at least `k` times.

## Examples
- Input: `postIds = [1,2,3]`, `reports = [[101,1],[102,1],[103,2],[101,2],[104,2]]`, `k = 2`
  → Output: `2` (posts 1 and 2 each have ≥2 distinct reports).
- Input: `postIds = [5]`, `reports = [[200,5]]`, `k = 1`
  → Output: `1`.

## Approach
Count distinct user reports per post using a set, then count how many posts meet the threshold.

```text
FUNCTION CountReportedPosts(postIds, reports, k):
    SET reportMap ← MAP from postId to SET of userIds
    FOR each (userId, postId) IN reports:
        IF postId NOT IN reportMap:
            reportMap[postId] ← SET()
        ADD userId TO reportMap[postId]
    SET reportedCount ← 0
    FOR postId IN postIds:
        IF SIZE(reportMap[postId] OR EMPTY SET) ≥ k:
            INCREMENT reportedCount
    RETURN reportedCount
```

## Walkthrough
| Step | (userId,postId) | reportMap after step |
|------|-----------------|----------------------|
| 1 | (101,1) | {1:{101}}
| 2 | (102,1) | {1:{101,102}}
| 3 | (103,2) | {1:{101,102}, 2:{103}}
| 4 | (101,2) | {1:{101,102}, 2:{103,101}}
| 5 | (104,2) | {1:{101,102}, 2:{103,101,104}}

After processing, both post 1 and 2 have ≥2 distinct reporters → result 2.

## Complexity Analysis
- Time: O(R) where R is number of reports.
- Space: O(P + R) for storing sets per post.

## Follow‑Up Questions
1. How would you modify the solution to return the list of reported post IDs?
2. What if each user can report a post only once, but duplicate reports appear in the input?
3. How to handle a streaming scenario where reports arrive in real time?

## Key Takeaway
Using a set per post efficiently tracks distinct reporters, enabling a simple count of posts meeting the report threshold.
