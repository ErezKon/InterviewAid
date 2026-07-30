# 2199. Finding the Topic of Each Post

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/finding-the-topic-of-each-post](https://leetcode.com/problems/finding-the-topic-of-each-post)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: SQL Join with String Matching ✅](#3-approach-sql-join-with-string-matching-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `Posts(post_id, content)` and `Keywords(topic_id, word)`, find the topic of each post. A post's topic is determined by which keywords appear in its content. If no keywords match, label as "Ambiguous!". (SQL problem)

---

## 2. Examples

| posts | keywords | output |
|-------|----------|--------|
| `[(1, 'I love cats'), (2, 'JavaScript is great')]` | `[(10, 'cats'), (20, 'JavaScript')]` | `[(1, '10'), (2, '20')]` |
| `[(1, 'random text'), (2, 'another post')]` | `[(10, 'cats'), (20, 'JavaScript')]` | `[(1, 'Ambiguous!'), (2, 'Ambiguous!')]` |

---

## 3. Approach: SQL Join with String Matching ✅

```sql
SELECT p.post_id,
       COALESCE(GROUP_CONCAT(DISTINCT k.topic_id ORDER BY k.topic_id), 'Ambiguous!') AS topic
FROM Posts p
LEFT JOIN Keywords k
  ON CONCAT(' ', p.content, ' ') LIKE CONCAT('% ', k.word, ' %')
GROUP BY p.post_id
ORDER BY p.post_id;
```

---

## 4. Walkthrough

1. **Prepare data** – Ensure each `content` string has spaces padded on both sides to simplify word boundary matching.
2. **Join condition** – For each keyword `k.word`, the `LIKE` pattern `'% k.word %'` checks if the word appears as a whole word in the post.
3. **Aggregation** – `GROUP_CONCAT` collects all matching `topic_id`s per `post_id`. If none match, `COALESCE` substitutes `'Ambiguous!'`.
4. **Result** – The query returns one row per post with either a comma‑separated list of topics or `'Ambiguous!'`.

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(P × K) – each post is compared against all keywords via the `LIKE` pattern. |
| **Space** | O(P + K) – storing the tables and intermediate join results. |

---

## 6. Follow-Up Questions

- How would you redesign the schema to support fast full‑text search instead of `LIKE`?
- Can you modify the query to return only the *first* matching topic per post?
- How would you handle case‑insensitive matching or punctuation?

---

## 7. Key Takeaway

> Use **word boundary matching** (`' word '` pattern) to avoid partial matches. `GROUP_CONCAT` aggregates all matching topics per post.
