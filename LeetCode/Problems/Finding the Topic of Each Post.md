# 2199. Finding the Topic of Each Post

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/finding-the-topic-of-each-post](https://leetcode.com/problems/finding-the-topic-of-each-post)
**Companies:** Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: SQL Join with String Matching ✅](#2-approach-sql-join-with-string-matching-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `Posts(post_id, content)` and `Keywords(topic_id, word)`, find the topic of each post. A post's topic is determined by which keywords appear in its content. If no keywords match, label as "Ambiguous!". (SQL problem)

---

## 2. Approach: SQL Join with String Matching ✅

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

## 3. Key Takeaway

> Use **word boundary matching** (`' word '` pattern) to avoid partial matches. `GROUP_CONCAT` aggregates all matching topics per post.
