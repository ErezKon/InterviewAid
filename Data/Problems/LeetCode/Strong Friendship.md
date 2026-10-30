# 1949. Strong Friendship

**Difficulty:** 🟡 Medium
**LeetCode:** https://leetcode.com/problems/strong-friendship
**Companies:** Google, Meta
---
## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Friendship`

```
+-------------+------+
| Column Name | Type |
+-------------+------+
| user1_id    | int  |
| user2_id    | int  |
+-------------+------+
(user1_id, user2_id) is the primary key (combination of columns with unique values) for this table.
Each row of this table indicates that the users user1_id and user2_id are friends.
Note that user1_id < user2_id.
```

A friendship between a pair of friends `x` and `y` is **strong** if `x` and `y` have **at least three** common friends.

Write a solution to find all the **strong friendships**.

Note that the result table should not contain duplicates with `user1_id < user2_id`.

Return the result table in **any order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Friendship table:
+----------+----------+
| user1_id | user2_id |
+----------+----------+
| 1        | 2        |
| 1        | 3        |
| 2        | 3        |
| 1        | 4        |
| 2        | 4        |
| 1        | 5        |
| 2        | 5        |
| 1        | 7        |
| 3        | 7        |
| 1        | 6        |
| 3        | 6        |
| 2        | 6        |
+----------+----------+
Output:
+----------+----------+---------------+
| user1_id | user2_id | common_friend |
+----------+----------+---------------+
| 1        | 2        | 4             |
| 1        | 3        | 3             |
+----------+----------+---------------+
Explanation:
Users 1 and 2 have 4 common friends (3, 4, 5, and 6).
Users 1 and 3 have 3 common friends (2, 6, and 7).
We did not include the friendship of users 2 and 3 because they only have two common friends (1 and 6).
```

## Approach
Sort the ages and use a two‑pointer technique to count pairs whose sum exceeds the threshold.

```text
FUNCTION countStrongFriendships(ages, threshold):
    SORT ages ASCENDING
    SET left ← 0
    SET right ← LENGTH(ages) - 1
    SET count ← 0
    WHILE left < right:
        IF ages[left] + ages[right] > threshold:
            // All elements between left and right form valid pairs with ages[right]
            SET count ← count + (right - left)
            SET right ← right - 1
        ELSE:
            SET left ← left + 1
    RETURN count
```

## Walkthrough
For `ages = [10,20,30]`, `threshold = 35`:

| left | right | ages[left] + ages[right] | Action | count |
|------|-------|--------------------------|--------|-------|
| 0 (10) | 2 (30) | 40 > 35 | add (2-0)=2, right←1 | 2 |
| 0 (10) | 1 (20) | 30 ≤ 35 | left←1 |
Loop ends, return 2.

## Complexity Analysis
- **Time:** O(n log n) for sorting, then O(n) for the two‑pointer scan.
- **Space:** O(1) extra space (in‑place sort).

## Follow‑Up Questions
1. How would you handle the case where ages are streamed and cannot be stored entirely?
2. Can you extend the definition of strong friendship to include a minimum age difference?
3. What if the threshold varies per query—how would you preprocess for multiple queries?

## Key Takeaway
Sorting combined with a two‑pointer scan efficiently counts pairs whose sum exceeds a given threshold in linear time after sorting.
