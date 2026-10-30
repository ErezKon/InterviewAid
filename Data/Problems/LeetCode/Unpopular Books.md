# 1098. Unpopular Books

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/unpopular-books](https://leetcode.com/problems/unpopular-books)
**Companies:** Meta
---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Books`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| book_id        | int     |
| name           | varchar |
| available_from | date    |
+----------------+---------+
book_id is the primary key (column with unique values) of this table.
```

Table: `Orders`

```
+----------------+---------+
| Column Name    | Type    |
+----------------+---------+
| order_id       | int     |
| book_id        | int     |
| quantity       | int     |
| dispatch_date  | date    |
+----------------+---------+
order_id is the primary key (column with unique values) of this table.
book_id is a foreign key (reference column) to the Books table.
```

Write a solution to report the **books** that have sold **less than **`10` copies in the last year, excluding books that have been available for less than one month from today. **Assume today is **`2019-06-23`.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Books table:
+---------+--------------------+----------------+
| book_id | name               | available_from |
+---------+--------------------+----------------+
| 1       | "Kalila And Demna" | 2010-01-01     |
| 2       | "28 Letters"       | 2012-05-12     |
| 3       | "The Hobbit"       | 2019-06-10     |
| 4       | "13 Reasons Why"   | 2019-06-01     |
| 5       | "The Hunger Games" | 2008-09-21     |
+---------+--------------------+----------------+
Orders table:
+----------+---------+----------+---------------+
| order_id | book_id | quantity | dispatch_date |
+----------+---------+----------+---------------+
| 1        | 1       | 2        | 2018-07-26    |
| 2        | 1       | 1        | 2018-11-05    |
| 3        | 3       | 8        | 2019-06-11    |
| 4        | 4       | 6        | 2019-06-05    |
| 5        | 4       | 5        | 2019-06-20    |
| 6        | 5       | 9        | 2009-02-02    |
| 7        | 5       | 8        | 2010-04-13    |
+----------+---------+----------+---------------+
Output:
+-----------+--------------------+
| book_id   | name               |
+-----------+--------------------+
| 1         | "Kalila And Demna" |
| 2         | "28 Letters"       |
| 5         | "The Hunger Games" |
+-----------+--------------------+
```

## Approach
**Algorithm:** Dynamic Programming with a monotonic stack.
1. Sort books by rating descending (or process in original order while maintaining decreasing rating constraint).
2. Let `dp[i]` be the maximum pages ending at book `i`.
3. Use a stack that stores indices of books with decreasing ratings; while the top of the stack has rating ≤ current rating, pop it because it cannot precede the current book.
4. `dp[i] = pages_i + (dp[stack.top] if stack not empty else 0)`.
5. Push `i` onto the stack and track the global maximum of `dp`.

**Pseudocode:**
```text
FUNCTION maxPages(books):
    // books is list of [rating, pages]
    SET n ← LENGTH(books)
    SET dp ← ARRAY of size n filled with 0
    SET stack ← EMPTY LIST // will store indices with decreasing rating
    SET answer ← 0
    FOR i FROM 0 TO n-1:
        SET rating ← books[i][0]
        SET pages ← books[i][1]
        // Remove books that cannot be before i
        WHILE stack NOT EMPTY AND books[stack[-1]][0] <= rating:
            POP(stack)
        IF stack IS EMPTY:
            SET dp[i] ← pages
        ELSE:
            SET dp[i] ← pages + dp[stack[-1]]
        PUSH(i, stack)
        SET answer ← MAX(answer, dp[i])
    RETURN answer
```

## Walkthrough
| i | rating | pages | stack (indices) after pop | dp[i] | explanation |
|---|--------|-------|---------------------------|------|-------------|
|0|5|4|[]|4|No previous book, start new sequence.
|1|3|2|[0]|2+dp[0]=6|3 < 5, can extend sequence 5→3.
|2|4|3|[0]|3+dp[0]=7|4 < 5, pop index 1 (rating 3) because 3 ≤ 4, then extend from 5.
|3|2|1|[2,0]|1+dp[2]=8|2 < 4, extend longest ending at rating 4.
Result max = 8 pages.

## Complexity Analysis
- Time: O(N) because each index is pushed and popped at most once.
- Space: O(N) for `dp` array and O(N) worst‑case for the stack.

## Follow‑Up Questions
1. How would you modify the algorithm if the rating constraint were non‑strict (≤) instead of strict (<)?
2. Can you solve the problem using only O(1) extra space by overwriting the input array?
3. How would you handle the case where books are not given in any particular order and you need to consider all possible starting points?

## Key Takeaway
A monotonic stack combined with DP efficiently captures the longest decreasing‑rating sequence, yielding a linear‑time solution.
