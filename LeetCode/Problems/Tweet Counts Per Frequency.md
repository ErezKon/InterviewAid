# 1348. Tweet Counts Per Frequency

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/tweet-counts-per-frequency](https://leetcode.com/problems/tweet-counts-per-frequency)
**Companies:** Google, Intercom, Microsoft, Twitter

---

```
CLASS TweetCounts:
    CONSTRUCTOR: self.tweets = defaultdict(list)

    FUNCTION recordTweet(tweetName, time):
        tweets[tweetName].ADD(time)

    FUNCTION getTweetCountsPerFrequency(freq, tweetName, startTime, endTime):
        delta = {"minute": 60, "hour": 3600, "day": 86400}[freq]
        times = sorted(tweets[tweetName])
        result = []
        FOR chunkStart ← startTime TO endTime STEP delta:
            chunkEnd = MIN(chunkStart + delta, endTime + 1)
            count = bisect_left(times, chunkEnd) - bisect_left(times, chunkStart)
            result.ADD(count)
        RETURN result
```
