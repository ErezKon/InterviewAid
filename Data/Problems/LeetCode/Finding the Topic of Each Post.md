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

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Keywords`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| topic_id    | int     |
| word        | varchar |
+-------------+---------+
(topic_id, word) is the primary key (combination of columns with unique values) for this table.
Each row of this table contains the id of a topic and a word that is used to express this topic.
There may be more than one word to express the same topic and one word may be used to express multiple topics.
```

Table: `Posts`

```
+-------------+---------+
| Column Name | Type    |
+-------------+---------+
| post_id     | int     |
| content     | varchar |
+-------------+---------+
post_id is the primary key (column with unique values) for this table.
Each row of this table contains the ID of a post and its content.
Content will consist only of English letters and spaces.
```

Leetcode has collected some posts from its social media website and is interested in finding the topics of each post. Each topic can be expressed by one or more keywords. If a keyword of a certain topic exists in the content of a post (**case insensitive**) then the post has this topic.

Write a solution to find the topics of each post according to the following rules:

- If the post does not have keywords from any topic, its topic should be `"Ambiguous!"`.
- If the post has at least one keyword of any topic, its topic should be a string of the IDs of its topics sorted in ascending order and separated by commas `','`. The string should not contain duplicate IDs.

Return the result table in **any order**.

The result format is in the following example.

---

## 2. Examples

**Example 1:**
```
Input:
Keywords table:
+----------+----------+
| topic_id | word     |
+----------+----------+
| 1        | handball |
| 1        | football |
| 3        | WAR      |
| 2        | Vaccine  |
+----------+----------+
Posts table:
+---------+------------------------------------------------------------------------+
| post_id | content                                                                |
+---------+------------------------------------------------------------------------+
| 1       | We call it soccer They call it football hahaha                         |
| 2       | Americans prefer basketball while Europeans love handball and football |
| 3       | stop the war and play handball                                         |
| 4       | warning I planted some flowers this morning and then got vaccinated    |
+---------+------------------------------------------------------------------------+
Output:
+---------+------------+
| post_id | topic      |
+---------+------------+
| 1       | 1          |
| 2       | 1          |
| 3       | 1,3        |
| 4       | Ambiguous! |
+---------+------------+
Explanation:
1: "We call it soccer They call it football hahaha"
"football" expresses topic 1. There is no other word that expresses any other topic.
2: "Americans prefer basketball while Europeans love handball and football"
"handball" expresses topic 1. "football" expresses topic 1.
There is no other word that expresses any other topic.
3: "stop the war and play handball"
"war" expresses topic 3. "handball" expresses topic 1.
There is no other word that expresses any other topic.
4: "warning I planted some flowers this morning and then got vaccinated"
There is no word in this sentence that expresses any topic. Note that "warning" is different from "war" although they have a common prefix.
This post is ambiguous.
Note that it is okay to have one word that expresses more than one topic.
```

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
