# 504. Base 7

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/base-7](https://leetcode.com/problems/base-7)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given an integer `num`, return *a string of its **base 7** representation*.

**Constraints:**
- `-10⁷ ≤ num ≤ 10⁷`

## Examples
```
Example 1:
  Input: num = 100
  Output: "202"

Example 2:
  Input: num = -7
  Output: "-10"
```

## Approach
Repeatedly divide the absolute value by 7, collecting remainders. The remainders form the digits in reverse order. Add a leading `'-'` if the original number was negative.

```text
FUNCTION convertToBase7(num):
    IF num == 0:
        RETURN "0"
    SET negative ← num < 0
    SET n ← ABS(num)
    SET digits ← []
    WHILE n > 0:
        SET remainder ← n MOD 7
        PREPEND STRING(remainder) TO digits
        SET n ← n DIV 7
    SET result ← JOIN(digits)
    IF negative:
        SET result ← "-" + result
    RETURN result
```

## Walkthrough
| Step | n before | remainder | digits (so far) |
|------|----------|-----------|-----------------|
| 1    | 100      | 2         | ["2"] |
| 2    | 14       | 0         | ["0","2"] |
| 3    | 2        | 2         | ["2","0","2"] |
Result = "202".

## Complexity Analysis
- **Time:** O(log₇ n) – number of divisions equals the number of digits.
- **Space:** O(log₇ n) – storage for the digit list.

## Follow-Up Questions
1. How would you convert to an arbitrary base `b`?
2. Can you perform the conversion without using extra space for the digit list?
3. How would you handle very large integers beyond built-in limits?

## Key Takeaway
Repeated division by the base and collecting remainders (in reverse) yields the base-7 representation, handling sign separately.
