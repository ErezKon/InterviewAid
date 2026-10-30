# 2991. Top Three Wineries

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/top-three-wineries](https://leetcode.com/problems/top-three-wineries)
**Companies:** Google

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Wineries`

```
+-------------+----------+
| Column Name | Type     |
+-------------+----------+
| id          | int      |
| country     | varchar  |
| points      | int      |
| winery      | varchar  |
+-------------+----------+
id is column of unique values for this table.
This table contains id, country, points, and winery.
```

Write a solution to find the **top three wineries** in **each** **country** based on their **total points**. If **multiple wineries** have the **same** total points, order them by `winery` name in **ascending** order. If there's **no second winery**, output 'No second winery,' and if there's **no third winery**, output 'No third winery.'

Return *the result table ordered by *`country`* in **ascending** order**.*

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Wineries table:
+-----+-----------+--------+-----------------+
| id  | country   | points | winery          |
+-----+-----------+--------+-----------------+
| 103 | Australia | 84     | WhisperingPines |
| 737 | Australia | 85     | GrapesGalore    |
| 848 | Australia | 100    | HarmonyHill     |
| 222 | Hungary   | 60     | MoonlitCellars  |
| 116 | USA       | 47     | RoyalVines      |
| 124 | USA       | 45     | Eagle'sNest     |
| 648 | India     | 69     | SunsetVines     |
| 894 | USA       | 39     | RoyalVines      |
| 677 | USA       | 9      | PacificCrest    |
+-----+-----------+--------+-----------------+
Output:
+-----------+---------------------+-------------------+----------------------+
| country   | top_winery          | second_winery     | third_winery         |
+-----------+---------------------+-------------------+----------------------+
| Australia | HarmonyHill (100)   | GrapesGalore (85) | WhisperingPines (84) |
| Hungary   | MoonlitCellars (60) | No second winery  | No third winery      |
| India     | SunsetVines (69)    | No second winery  | No third winery      |
| USA       | RoyalVines (86)     | Eagle'sNest (45)  | PacificCrest (9)     |
+-----------+---------------------+-------------------+----------------------+
Explanation:
For Australia
 - HarmonyHill Winery accumulates the highest score of 100 points in Australia.
 - GrapesGalore Winery has a total of 85 points, securing the second-highest position in Australia.
 - WhisperingPines Winery has a total of 80 points, ranking as the third-highest.
For Hungary
 - MoonlitCellars is the sole winery, accruing 60 points, automatically making it the highest. There is no second or third winery.
For India
 - SunsetVines is the sole winery, earning 69 points, making it the top winery. There is no second or third winery.
For the USA
 - RoyalVines Wines accumulates a total of 47 + 39 = 86 points, claiming the highest position in the USA.
 - Eagle'sNest has a total of 45 points, securing the second-highest position in the USA.
 - PacificCrest accumulates 9 points, ranking as the third-highest winery in the USA
Output table is ordered by country in ascending order.
```

## Approach
Maintain a min‑heap of size three while iterating over the wineries. For each winery, push it onto the heap; if the heap exceeds size three, remove the smallest rating. At the end, extract the heap contents and sort them descending.

```text
FUNCTION TopThreeWineries(wineries):
    CREATE minHeap ← empty heap (compare by rating)
    FOR each winery IN wineries:
        INSERT winery INTO minHeap
        IF SIZE(minHeap) > 3:
            EXTRACT_MIN(minHeap)   // discard lowest rating
    SET result ← EXTRACT_ALL(minHeap)   // unsorted list of up to 3 wineries
    SORT result BY rating DESCENDING
    RETURN result
```

## Walkthrough
For the list `[A4.5, B4.7, C4.2, D4.9]`:
1. Insert A → heap `[A4.5]`
2. Insert B → heap `[A4.5, B4.7]`
3. Insert C → heap `[C4.2, B4.7, A4.5]` (C is smallest)
4. Insert D → heap `[C4.2, D4.9, A4.5, B4.7]` then remove min (C4.2) → heap `[A4.5, D4.9, B4.7]`
5. Extract all and sort descending → `[D4.9, B4.7, A4.5]`.

## Complexity Analysis
Time: O(n log k) where *k* = 3 (effectively O(n)). Space: O(k) = O(1) extra heap space.

## Follow-Up Questions
* How would you modify the algorithm to return the top *k* wineries for an arbitrary *k*?
* Can you solve the problem in a single pass without extra space using the Quickselect algorithm?
* How would you handle ties in ratings while preserving original order?

## Key Takeaway
A fixed‑size min‑heap lets you keep only the best *k* elements while scanning the entire list, giving an efficient O(n) solution for top‑k selection.
