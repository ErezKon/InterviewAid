# 1407. Top Travellers

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/top-travellers](https://leetcode.com/problems/top-travellers)
**Companies:** Google, Point72

---

## Problem Description

Table: `Users`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| name          | varchar |
+---------------+---------+
id is the column with unique values for this table.
name is the name of the user.
```

Table: `Rides`

```
+---------------+---------+
| Column Name   | Type    |
+---------------+---------+
| id            | int     |
| user_id       | int     |
| distance      | int     |
+---------------+---------+
id is the column with unique values for this table.
user_id is the id of the user who traveled the distance "distance".
```

Write a solution to report the distance traveled by each user.

Return the result table ordered by `travelled_distance` in **descending order**, if two or more users traveled the same distance, order them by their `name` in **ascending order**.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Users table:
+------+-----------+
| id   | name      |
+------+-----------+
| 1    | Alice     |
| 2    | Bob       |
| 3    | Alex      |
| 4    | Donald    |
| 7    | Lee       |
| 13   | Jonathan  |
| 19   | Elvis     |
+------+-----------+
Rides table:
+------+----------+----------+
| id   | user_id  | distance |
+------+----------+----------+
| 1    | 1        | 120      |
| 2    | 2        | 317      |
| 3    | 3        | 222      |
| 4    | 7        | 100      |
| 5    | 13       | 312      |
| 6    | 19       | 50       |
| 7    | 7        | 120      |
| 8    | 19       | 400      |
| 9    | 7        | 230      |
+------+----------+----------+
Output:
+----------+--------------------+
| name     | travelled_distance |
+----------+--------------------+
| Elvis    | 450                |
| Lee      | 450                |
| Bob      | 317                |
| Jonathan | 312                |
| Alex     | 222                |
| Alice    | 120                |
| Donald   | 0                  |
+----------+--------------------+
Explanation:
Elvis and Lee traveled 450 miles, Elvis is the top traveler as his name is alphabetically smaller than Lee.
Bob, Jonathan, Alex, and Alice have only one ride and we just order them by the total distances of the ride.
Donald did not have any rides, the distance traveled by him is 0.
```

## Approach
Maintain a min‑heap of size three while iterating through the travellers. Insert each traveller into the heap; if the heap exceeds three elements, remove the smallest visit count. After processing, extract the heap contents and sort them descending to obtain the top travellers.

```text
FUNCTION TopTravellers(travellers):
    CREATE minHeap ← empty heap (compare by visits)
    FOR each traveller IN travellers:
        INSERT traveller INTO minHeap
        IF SIZE(minHeap) > 3:
            EXTRACT_MIN(minHeap)
    SET result ← EXTRACT_ALL(minHeap)   // up to 3 travellers, unsorted
    SORT result BY visits DESCENDING
    RETURN LIST of traveller.id FROM result
```

## Walkthrough
For the list `[ {id:1,5}, {id:2,8}, {id:3,3}, {id:4,9} ]`:
1. Insert traveller 1 → heap `[1(5)]`
2. Insert traveller 2 → heap `[1(5),2(8)]`
3. Insert traveller 3 → heap `[3(3),2(8),1(5)]` (3 is smallest)
4. Insert traveller 4 → heap `[3(3),4(9),1(5),2(8)]` then remove min (3) → heap `[1(5),4(9),2(8)]`
5. Extract all and sort descending → `[4,2,1]`.

## Complexity Analysis
Time: O(n log k) where *k* = 3 (effectively O(n)). Space: O(k) = O(1) extra heap space.

## Follow-Up Questions
* How would you generalize the solution to return the top *k* travellers for any *k*?
* Can you achieve the same result using the Quickselect algorithm with O(n) average time and O(1) extra space?
* How would you handle ties in visit counts while preserving the original order?

## Key Takeaway
A fixed‑size min‑heap efficiently tracks the best *k* elements during a single pass, yielding an O(n) solution for top‑k selection.
