# 2801. Count Stepping Numbers in Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-stepping-numbers-in-range](https://leetcode.com/problems/count-stepping-numbers-in-range)
**Companies:** Amazon, Google

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

A stepping number has the property that each pair of adjacent digits differs by exactly 1. Given two integers `low` and `high` as strings, return the count of stepping numbers in `[low, high]` inclusive, modulo `10^9 + 7`.

**Constraints:**
- `1 <= low.length, high.length <= 100`

---

## Examples

**Example 1:**
```
Input: low = "1", high = "20"
Output: 13
Explanation: The stepping numbers are 1,2,3,4,5,6,7,8,9,10,12,21,23 (but 23 > 20, so count is 13).
```

**Example 2:**
```
Input: low = "0", high = "0"
Output: 1
Explanation: 0 is considered a stepping number.
```

---

## Key Insight

Use **Digit DP** with `count(high) - count(low - 1)`. State: `(position, last_digit, is_tight, is_started)`. At each position, try digits where `|digit - last_digit| == 1` (or any digit if not started yet).

---

## Approach

```text
FUNCTION countSteppingNumbers(low, high):
    MOD ← 10^9 + 7
    RETURN (digitDP(high) - digitDP(decrementString(low)) + MOD) % MOD

FUNCTION digitDP(numStr):
    MEMO ← {}
    FUNCTION dp(pos, lastDigit, tight, started):
        IF pos == LENGTH(numStr):
            RETURN 1 IF started ELSE 0
        IF (pos, lastDigit, tight, started) IN MEMO:
            RETURN MEMO[(pos, lastDigit, tight, started)]

        limit ← INT(numStr[pos]) IF tight ELSE 9
        result ← 0
        FOR d ← 0 TO limit:
            newTight ← tight AND (d == limit)
            IF NOT started:
                IF d == 0:
                    result ← result + dp(pos+1, -1, newTight, false)
                ELSE:
                    result ← result + dp(pos+1, d, newTight, true)
            ELSE:
                IF ABS(d - lastDigit) == 1:
                    result ← result + dp(pos+1, d, newTight, true)
        MEMO[(pos, lastDigit, tight, started)] ← result % MOD
        RETURN result % MOD

    RETURN dp(0, -1, true, false)
```

---

## Walkthrough

Take `low = "1"`, `high = "20"`.

1. **Compute `digitDP(high)`** (`"20"`):
   - Position 0, tight true, started false → limit 2.
   - Branches: d=0 (stay not started), d=1 (start with 1), d=2 (start with 2).
   - For d=1, next position tight false, lastDigit=1, started true → can place 0 or 2 at pos1 (|digit-1|=1). Both are ≤ limit, giving numbers 10 and 12.
   - For d=2, next position tight true, lastDigit=2, started true → limit at pos1 is 0, only digit 1 satisfies |1-2|=1, but 1 > limit, so no valid continuation.
   - d=0 path eventually yields number 0.
   - Total from `high` side = 13.
2. **Compute `digitDP(low-1)`** (`"0"`): returns 0.
3. **Result** = (13 - 0) mod MOD = 13.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(L × 10 × 2 × 2) where L = number of digits |
| **Space** | O(L × 10 × 2 × 2) for memoization |

---

## Follow-Up Questions

1. How would you adapt the DP to handle a different adjacency condition, such as digits differing by at most 2?
2. Can the algorithm be extended to count numbers where the absolute difference follows a custom pattern (e.g., Fibonacci sequence differences)?
3. What changes are needed if the range bounds are given as integers instead of strings?

---

## Key Takeaway

> **Digit DP is the standard approach for counting numbers with digit-level constraints in a range. Track `(position, last_digit, tight_bound, has_started)` and enumerate valid next digits.**