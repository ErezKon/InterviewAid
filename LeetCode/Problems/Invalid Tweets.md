# 1683. Invalid Tweets

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/invalid-tweets](https://leetcode.com/problems/invalid-tweets)
**Companies:** Acko, Amazon, Bloomberg, Google, Meta, Microsoft, Twitter

---

## 1. Problem Description

Find the IDs of invalid tweets. A tweet is invalid if the number of characters in `content` is **strictly greater than 15**.

## 2. Approach: Simple Filter — SQL ✅

```sql
SELECT tweet_id FROM Tweets WHERE LENGTH(content) > 15;
```

## 3. Examples

| tweet_id | content | valid? |
|----------|---------|--------|
| 101 | "Hello world" | ✅ (11 ≤ 15) |
| 102 | "This tweet is definitely too long" | ❌ (33 > 15) |
| 103 | "Short" | ✅ (5 ≤ 15) |

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
