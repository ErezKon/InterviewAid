# 1683. Invalid Tweets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/invalid-tweets](https://leetcode.com/problems/invalid-tweets)
**Companies:** Acko, Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Find the IDs of invalid tweets. A tweet is invalid if the number of characters in `content` is **strictly greater than 15**.

---

## 2. Approach: Simple Filter — SQL ✅

```sql
SELECT tweet_id FROM Tweets WHERE LENGTH(content) > 15;
```

---

## 3. Key Takeaway

> Direct `LENGTH()` filter. Note: `CHAR_LENGTH()` counts characters while `LENGTH()` counts bytes — for ASCII content they're equivalent, but use `CHAR_LENGTH()` for multi-byte character sets.
