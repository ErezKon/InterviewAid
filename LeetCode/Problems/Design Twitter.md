# 355. Design Twitter

**Difficulty:** 🟡 Medium
**Acceptance:** 40.0%
**LeetCode:** [https://leetcode.com/problems/design-twitter](https://leetcode.com/problems/design-twitter)
**Companies:** Adobe, Amazon, Apple, Bloomberg, Coupang, Google, Meesho, Meta, Microsoft, Palo Alto Networks, Paypal, Salesforce, Swiggy, Twitter

---

## 1. Problem Description

Design a simplified Twitter: `postTweet`, `getNewsFeed` (10 most recent tweets from user + followees), `follow`, `unfollow`.

---

## 2. Approach: Hash Maps + Min-Heap — O(k log k) per feed ✅

```
CLASS Twitter:
    CONSTRUCTOR:
        time = 0
        tweets = {}       // userId → [(time, tweetId), ...]
        following = {}    // userId → set of followeeIds

    FUNCTION postTweet(userId, tweetId):
        tweets[userId].ADD((time, tweetId))
        time += 1

    FUNCTION getNewsFeed(userId):
        // Merge tweets from user + followees, get 10 most recent
        heap = MinHeap(size 10)
        users = following[userId] ∪ {userId}

        FOR user IN users:
            FOR tweet IN tweets[user] (last 10):
                heap.PUSH(tweet)
                IF heap.SIZE() > 10: heap.POP()

        RETURN [tweetId for (time, tweetId) in SORT(heap, desc)]

    FUNCTION follow(followerId, followeeId):
        following[followerId].ADD(followeeId)

    FUNCTION unfollow(followerId, followeeId):
        following[followerId].REMOVE(followeeId)
```

---

## Key Takeaway

> Combines hash maps for relationships/posts with a heap for k-way merge of sorted tweet lists. A practical OOD problem that tests data structure composition.
