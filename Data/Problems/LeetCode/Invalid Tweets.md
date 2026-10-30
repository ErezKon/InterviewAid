# 1683. Invalid Tweets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/invalid-tweets](https://leetcode.com/problems/invalid-tweets)
**Companies:** Acko, Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Table: `Tweets`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| tweet_id       | int     |
| content        | varchar |
+----------------+---------+
tweet_id is the primary key (column with unique values) for this table.
content consists of alphanumeric characters, '!', or ' ' and no other special characters.
This table contains all the tweets in a social media app.
```

Write a solution to find the IDs of the invalid tweets. The tweet is invalid if the number of characters used in the content of the tweet is **strictly greater** than `15`.

Return the result table in **any order**.

The result format is in the following example.

## 2. Approach: Simple Filter — SQL ✅

```sql
SELECT tweet_id FROM Tweets WHERE LENGTH(content) > 15;
```

## 3. Examples

**Example 1:**
```
Input:
Tweets table:
+----------+-----------------------------------+
| tweet_id | content                           |
+----------+-----------------------------------+
| 1        | Let us Code                       |
| 2        | More than fifteen chars are here! |
+----------+-----------------------------------+
Output:
+----------+
| tweet_id |
+----------+
| 2        |
+----------+
Explanation:
Tweet 1 has length = 11. It is a valid tweet.
Tweet 2 has length = 33. It is an invalid tweet.
```

## 4. Walkthrough

1. Scan each row of the `Tweets` table.
2. Compute `LENGTH(content)` – the number of characters.
3. If the length exceeds 15, the row satisfies the condition and its `tweet_id` is emitted.
4. The SQL engine returns the set of matching `tweet_id`s directly.

## 5. Complexity Analysis

- **Time:** O(N) where *N* is the number of rows, because the filter touches each row once.
- **Space:** O(1) additional space besides the output list of IDs.

## 6. Follow‑Up Questions

- How would you adapt the query for Unicode characters where `CHAR_LENGTH` is needed?
- Can you write a single‑pass algorithm in a procedural language that mimics this filter?
- How would you index the table to speed up the length check for very large datasets?

## Key Takeaway

> Direct `LENGTH()` filter. Note: `CHAR_LENGTH()` counts characters while `LENGTH()` counts bytes — for ASCII content they're equivalent, but use `CHAR_LENGTH()` for multi-byte character sets.
