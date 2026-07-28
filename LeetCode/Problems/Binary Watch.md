# 401. Binary Watch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-watch](https://leetcode.com/problems/binary-watch)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
A binary watch has 4 LEDs to represent the hour (0‑11) and 6 LEDs to represent the minutes (0‑59). Each LED is either on (1) or off (0). Given an integer `turnedOn` indicating the total number of LEDs that are lit, return all possible times the watch could represent.

## Examples
| turnedOn | Output | Explanation |
|----------|--------|-------------|
| 1 | `["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]` | Exactly one LED is on.
| 2 | `["0:03","0:05","0:06","0:09","0:10","0:12","0:17","0:18","0:20","0:24","0:33","0:34","0:36","0:40","0:48","1:01","1:02", ...]` |

## Approach
Iterate over all possible hour values (0‑11) and minute values (0‑59). Count the number of set bits in each using a bit‑count operation. If the sum equals `turnedOn`, format the time as `h:mm` (minutes padded to two digits) and add to the result list.

```text
FUNCTION readBinaryWatch(turnedOn):
    result ← []
    FOR h FROM 0 TO 11:
        FOR m FROM 0 TO 59:
            IF BIT_COUNT(h) + BIT_COUNT(m) == turnedOn:
                timeStr ← CONCAT(h, ":", PAD_LEFT(m, 2, '0'))
                APPEND timeStr TO result
    RETURN result
```

## Walkthrough
For `turnedOn = 1`:
1. Hours loop: only `h = 1,2,4,8` have a single set bit → times `1:00`, `2:00`, `4:00`, `8:00`.
2. Minutes loop: minutes with a single set bit are `1,2,4,8,16,32` → times `0:01`, `0:02`, `0:04`, `0:08`, `0:16`, `0:32`.
3. Combine all → 10 possible times.

## Complexity Analysis
- Time: O(12 × 60) = O(1) – constant bounded loops.
- Space: O(k) where k is the number of valid times returned.

## Follow-Up Questions
- How would you generate the times using combinatorial generation of bit positions instead of brute‑force loops?
- Can you adapt the solution for a watch with a different number of hour/minute LEDs?
- How would you modify the algorithm to return times sorted chronologically?

## Key Takeaway
Enumerating all hour and minute combinations and filtering by total set‑bit count provides a simple, constant‑time solution for the binary watch problem.
