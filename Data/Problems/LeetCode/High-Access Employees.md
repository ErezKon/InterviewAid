# 2933. High-Access Employees

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Atlassian, Karat
---

## 1. Problem Description

Find employees who have 3 or more accesses within any 1-hour window.

## 2. Examples

| Access Times (employee) | Expected Output |
|--------------------------|-----------------|
| ["10:00", "10:20", "10:55", "11:10"] | employee ID |
| ["09:00", "10:30", "12:00"] | (none) |

*Explanation*: In the first list, the first three accesses occur within 55 minutes, so the employee qualifies.

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
- What if the data stream is real‑time and you need an online algorithm?

## Key Takeaway

> Group by employee, sort times, check if `times[i] - times[i-2] ≤ 60` for any window of 3.
