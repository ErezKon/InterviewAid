# 1225. Report Contiguous Dates

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/report-contiguous-dates](https://leetcode.com/problems/report-contiguous-dates)
**Companies:** Amazon, Meta

---

## Table of Contents

- **[Problem Description](#problem-description)**
- **[Examples](#examples)**
- **[Key Insight](#key-insight)**
- **[Approach](#approach)**
- **[Pseudocode](#pseudocode)**
- **[Walkthrough](#walkthrough)**
- **[Complexity Analysis](#complexity-analysis)**
- **[Follow-Up Questions](#follow-up-questions)**
- **[Key Takeaway](#key-takeaway)**

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Table: `Failed`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| fail_date    | date    |
+--------------+---------+
fail_date is the primary key (column with unique values) for this table.
This table contains the days of failed tasks.
```

Table: `Succeeded`

```
+--------------+---------+
| Column Name  | Type    |
+--------------+---------+
| success_date | date    |
+--------------+---------+
success_date is the primary key (column with unique values) for this table.
This table contains the days of succeeded tasks.
```

A system is running one task **every day**. Every task is independent of the previous tasks. The tasks can fail or succeed.

Write a solution to report the `period_state` for each continuous interval of days in the period from `2019-01-01` to `2019-12-31`.

`period_state` is *'*`failed'`* *if tasks in this interval failed or `'succeeded'` if tasks in this interval succeeded. Interval of days are retrieved as `start_date` and `end_date.`

Return the result table ordered by `start_date`.

The result format is in the following example.

## Examples

**Example 1:**
```
Input:
Failed table:
+-------------------+
| fail_date         |
+-------------------+
| 2018-12-28        |
| 2018-12-29        |
| 2019-01-04        |
| 2019-01-05        |
+-------------------+
Succeeded table:
+-------------------+
| success_date      |
+-------------------+
| 2018-12-30        |
| 2018-12-31        |
| 2019-01-01        |
| 2019-01-02        |
| 2019-01-03        |
| 2019-01-06        |
+-------------------+
Output:
+--------------+--------------+--------------+
| period_state | start_date   | end_date     |
+--------------+--------------+--------------+
| succeeded    | 2019-01-01   | 2019-01-03   |
| failed       | 2019-01-04   | 2019-01-05   |
| succeeded    | 2019-01-06   | 2019-01-06   |
+--------------+--------------+--------------+
Explanation:
The report ignored the system state in 2018 as we care about the system in the period 2019-01-01 to 2019-12-31.
From 2019-01-01 to 2019-01-03 all tasks succeeded and the system state was "succeeded".
From 2019-01-04 to 2019-01-05 all tasks failed and the system state was "failed".
From 2019-01-06 to 2019-01-06 all tasks succeeded and the system state was "succeeded".
```

## Key Insight

After sorting the dates, consecutive dates differ by exactly one day. By iterating once and tracking the start of the current range, you can emit a range whenever the next date is not exactly one day after the current.

## Approach

- Parse each string into a `date` object (or integer days since epoch).
- Sort the dates.
- Initialize `range_start = dates[0]`.
- For each subsequent date `d`:
  - If `d` is exactly one day after `prev`, continue the current range.
  - Otherwise, close the current range (`range_start` to `prev`) and start a new range at `d`.
- After the loop, close the final range.
- Convert each range back to the required string format.

## Pseudocode




## Walkthrough

Given `["2023-01-01","2023-01-02","2023-01-04","2023-01-05","2023-01-06"]`:
- Sorted list is the same.
- Start range at `2023-01-01`.
- Next `2023-01-02` is one day after, extend range.
- Next `2023-01-04` breaks the continuity → emit `2023-01-01->2023-01-02`, start new range at `2023-01-04`.
- `2023-01-05` and `2023-01-06` extend the range → finally emit `2023-01-04->2023-01-06`.

## Complexity Analysis

- **Time:** O(n log n) for sorting plus O(n) for the linear scan.
- **Space:** O(n) to store parsed dates (or O(1) extra if sorting in place).

## Follow-Up Questions

- *How to handle very large inputs?* Use an in-place sort and stream the output to avoid extra memory.
- *Can we avoid sorting?* If the input is already sorted, the algorithm reduces to O(n).
- *What about time zones or timestamps with times?* Convert to UTC dates first, then apply the same logic.
- *How to output ranges in a different format?* Adjust the string construction step accordingly.

## Key Takeaway

Sorting followed by a single pass to merge consecutive dates yields a concise representation of date ranges in linearithmic time.

