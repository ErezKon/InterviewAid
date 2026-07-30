# 1348. Tweet Counts Per Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tweet-counts-per-frequency](https://leetcode.com/problems/tweet-counts-per-frequency)
**Companies:** Google, Intercom, Microsoft, Twitter

---

## Problem Description
Design a class `TweetCounts` that records tweet timestamps and returns the number of tweets for a given tweet name in each time interval of a specified frequency (`minute`, `hour`, or `day`). The method `getTweetCountsPerFrequency` receives a frequency, tweet name, start time, and end time, and must return a list of counts for each consecutive interval within `[startTime, endTime]`.

## Examples
**Example 1:**
```
TweetCounts tweetCounts = new TweetCounts();
 tweetCounts.recordTweet("tweet3", 0);
 tweetCounts.recordTweet("tweet3", 60);
 tweetCounts.recordTweet("tweet3", 10);
 tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 59); // returns [2]
 tweetCounts.getTweetCountsPerFrequency("minute", "tweet3", 0, 60); // returns [2,1]
```
The first query counts tweets in the interval `[0,59]`; the second splits `[0,60]` into `[0,59]` and `[60,60]`.

## Approach
Maintain a map from `tweetName` to a sorted list of timestamps. For a query, compute the interval length `delta` based on the frequency (60, 3600, 86400 seconds). Iterate from `startTime` to `endTime` in steps of `delta`, and for each interval use binary search to count timestamps within `[intervalStart, intervalEnd]`.

## Walkthrough
| Step | Action | Data Structure State |
|------|--------|----------------------|
| 1 | `recordTweet("tweet3", 0)` | {"tweet3": [0]}
| 2 | `recordTweet("tweet3", 60)`| {"tweet3": [0,60]}
| 3 | `recordTweet("tweet3", 10)`| {"tweet3": [0,10,60]}
| 4 | Query `minute`, start=0, end=60 | delta=60, intervals: [0‑59], [60‑60]; binary search yields counts 2 and 1.

## Complexity Analysis
- **Time:** `recordTweet` – `O(1)` amortized insertion; `getTweetCountsPerFrequency` – `O(k log n)` where `k` is number of intervals and `n` is number of timestamps for the tweet (binary searches).
- **Space:** `O(totalTweets)` to store all timestamps.

## Follow‑Up Questions
1. How would you support removal of a tweet timestamp?
2. Can the data structure be optimized for frequent queries on the same tweet?
3. How would you handle very large time ranges where the number of intervals is huge?

## Key Takeaway
Storing timestamps per tweet and using binary search on sorted lists lets you answer interval count queries efficiently by converting each interval into two rank queries.
