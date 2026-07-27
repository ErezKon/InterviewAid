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

You are given an unsorted list of timestamps (as strings in `YYYY-MM-DD` format) representing days on which a user performed an action. Return a list of strings that compactly represent consecutive date ranges. Each range should be formatted as `"start->end"` if the range contains more than one day, otherwise just the single date. The output should be sorted chronologically.

Constraints (typical LeetCode limits):
- `1 <= timestamps.length <= 10^5`
- Each timestamp is a valid date between `2000-01-01` and `2099-12-31`.

The problem tests date parsing, sorting, and grouping consecutive values.

## Examples

1) Input: `["2023-01-01","2023-01-02","2023-01-04","2023-01-05","2023-01-06"]`

   Output: `["2023-01-01->2023-01-02","2023-01-04->2023-01-06"]`

2) Input: `["2022-12-31","2023-01-01","2023-01-02"]`

   Output: `["2022-12-31->2023-01-02"]`

3) Input: `["2021-07-15"]`

   Output: `["2021-07-15"]`

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

- *How to handle very large inputs?* Use an in‑place sort and stream the output to avoid extra memory.
- *Can we avoid sorting?* If the input is already sorted, the algorithm reduces to O(n).
- *What about time zones or timestamps with times?* Convert to UTC dates first, then apply the same logic.
- *How to output ranges in a different format?* Adjust the string construction step accordingly.

## Key Takeaway

Sorting followed by a single pass to merge consecutive dates yields a concise representation of date ranges in linearithmic time.

