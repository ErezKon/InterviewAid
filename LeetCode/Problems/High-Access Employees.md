# 2933. High-Access Employees

**Difficulty:** 🟡 Medium

**Companies:** Amazon, Atlassian, Karat
---

## 1. Problem Description

Find employees who have 3 or more accesses within any 1-hour window.

## 2. Approach: Sort + Sliding Window — O(n log n) ✅

```
FUNCTION findHighAccessEmployees(access_times):
    // Group accesses by employee
    // Sort each employee's times
    // Check if any 3 accesses within 1-hour window
    result ← []
    FOR each employee DO
        SORT their access times
        FOR i ← 2 TO LENGTH(times) - 1 DO
            IF times[i] - times[i-2] < 60 minutes:
                result.ADD(employee); BREAK
    RETURN result
```

## Key Takeaway

> Group by employee, sort times, check if `times[i] - times[i-2] < 60` for any window of 3.
