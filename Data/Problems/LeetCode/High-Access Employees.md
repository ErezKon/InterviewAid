# 2933. High-Access Employees

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/high-access-employees](https://leetcode.com/problems/high-access-employees)

**Companies:** Amazon, Atlassian, Karat
---

## 1. Problem Description

You are given a 2D **0-indexed** array of strings, `access_times`, with size `n`. For each `i` where `0 <= i <= n - 1`, `access_times[i][0]` represents the name of an employee, and `access_times[i][1]` represents the access time of that employee. All entries in `access_times` are within the same day.

The access time is represented as **four digits** using a **24-hour** time format, for example, `"0800"` or `"2250"`.

An employee is said to be **high-access** if he has accessed the system **three or more** times within a **one-hour period**.

Times with exactly one hour of difference are **not** considered part of the same one-hour period. For example, `"0815"` and `"0915"` are not part of the same one-hour period.

Access times at the start and end of the day are **not** counted within the same one-hour period. For example, `"0005"` and `"2350"` are not part of the same one-hour period.

Return *a list that contains the names of **high-access** employees with any order you want.*

**Constraints:**
- `1 <= access_times.length <= 100`
- `access_times[i].length == 2`
- `1 <= access_times[i][0].length <= 10`
- `access_times[i][0]` consists only of English small letters.
- `access_times[i][1].length == 4`
- `access_times[i][1]` is in 24-hour time format.
- `access_times[i][1]` consists only of `'0'` to `'9'`.

## 2. Examples

**Example 1:**
```
Input: access_times = [["a","0549"],["b","0457"],["a","0532"],["a","0621"],["b","0540"]]
Output: ["a"]
Explanation: "a" has three access times in the one-hour period of [05:32, 06:31] which are 05:32, 05:49, and 06:21.
But "b" does not have more than two access times at all.
So the answer is ["a"].
```

**Example 2:**
```
Input: access_times = [["d","0002"],["c","0808"],["c","0829"],["e","0215"],["d","1508"],["d","1444"],["d","1410"],["c","0809"]]
Output: ["c","d"]
Explanation: "c" has three access times in the one-hour period of [08:08, 09:07] which are 08:08, 08:09, and 08:29.
"d" has also three access times in the one-hour period of [14:10, 15:09] which are 14:10, 14:44, and 15:08.
However, "e" has just one access time, so it can not be in the answer and the final answer is ["c","d"].
```

**Example 3:**
```
Input: access_times = [["cd","1025"],["ab","1025"],["cd","1046"],["cd","1055"],["ab","1124"],["ab","1120"]]
Output: ["ab","cd"]
Explanation: "ab" has three access times in the one-hour period of [10:25, 11:24] which are 10:25, 11:20, and 11:24.
"cd" has also three access times in the one-hour period of [10:25, 11:24] which are 10:25, 10:46, and 10:55.
So the answer is ["ab","cd"].
```

## 3. Approach: Sort + Sliding Window — O(n log n) ✅

```text
FUNCTION findHighAccessEmployees(access_times):
    // Group accesses by employee
    SET employee_map ← MAP employee → LIST of timestamps
    FOR each (employee, time) IN access_times DO
        APPEND time TO employee_map[employee]
    SET result ← []
    FOR each employee, times IN employee_map DO
        SORT times
        FOR i ← 2 TO LENGTH(times) - 1 DO
            IF times[i] - times[i-2] ≤ 60 minutes:
                APPEND employee TO result
                BREAK
    RETURN result
```

## 4. Walkthrough

Consider an employee with access timestamps `[10:00, 10:20, 10:55, 11:10]`.
1. After sorting (already sorted), start sliding window of size 3.
2. Compare `times[2] - times[0] = 10:55 - 10:00 = 55 minutes ≤ 60` → qualifies, add employee to result and stop.

## 5. Complexity Analysis

- **Time**: Sorting each employee's timestamps dominates → O(N log N) where N is total accesses.
- **Space**: O(N) for storing grouped timestamps.

## 6. Follow-Up Questions

- How would you handle overlapping windows for the same employee?
- Can the solution be adapted for a variable `k` accesses within `t` minutes?
- What if the data stream is real-time and you need an online algorithm?

## Key Takeaway

> Group by employee, sort times, check if `times[i] - times[i-2] ≤ 60` for any window of 3.
