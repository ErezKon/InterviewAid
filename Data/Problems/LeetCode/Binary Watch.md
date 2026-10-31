# 401. Binary Watch

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-watch](https://leetcode.com/problems/binary-watch)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description
A binary watch has 4 LEDs on the top to represent the hours (0-11), and 6 LEDs on the bottom to represent the minutes (0-59). Each LED represents a zero or one, with the least significant bit on the right.

- For example, the below binary watch reads `"4:51"`.

Given an integer `turnedOn` which represents the number of LEDs that are currently on (ignoring the PM), return *all possible times the watch could represent*. You may return the answer in **any order**.

The hour must not contain a leading zero.

- For example, `"01:00"` is not valid. It should be `"1:00"`.

The minute must consist of two digits and may contain a leading zero.

- For example, `"10:2"` is not valid. It should be `"10:02"`.

**Constraints:**
- `0 ≤ turnedOn ≤ 10`

## Examples
```
Example 1:
  Input: turnedOn = 1
  Output: ["0:01","0:02","0:04","0:08","0:16","0:32","1:00","2:00","4:00","8:00"]

Example 2:
  Input: turnedOn = 9
  Output: []
```

## Approach
Iterate over all possible hour values (0-11) and minute values (0-59). Count the number of set bits in each using a bit-count operation. If the sum equals `turnedOn`, format the time as `h:mm` (minutes padded to two digits) and add to the result list.

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
- Time: O(12 × 60) = O(1) – constant bounded loops.
- Space: O(k) where k is the number of valid times returned.

## Follow-Up Questions
- How would you generate the times using combinatorial generation of bit positions instead of brute-force loops?
- Can you adapt the solution for a watch with a different number of hour/minute LEDs?
- How would you modify the algorithm to return times sorted chronologically?

## Key Takeaway
Enumerating all hour and minute combinations and filtering by total set-bit count provides a simple, constant-time solution for the binary watch problem.
