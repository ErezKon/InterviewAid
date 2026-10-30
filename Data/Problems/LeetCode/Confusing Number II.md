# 1088. Confusing Number II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/confusing-number-ii](https://leetcode.com/problems/confusing-number-ii)
**Companies:** Google

---

## 1. Problem Description

A **confusing number** is a number that when rotated `180` degrees becomes a different number with **each digit valid**.

We can rotate digits of a number by `180` degrees to form new digits.

- When `0`, `1`, `6`, `8`, and `9` are rotated `180` degrees, they become `0`, `1`, `9`, `8`, and `6` respectively.
- When `2`, `3`, `4`, `5`, and `7` are rotated `180` degrees, they become **invalid**.

Note that after rotating a number, we can ignore leading zeros.

- For example, after rotating `8000`, we have `0008` which is considered as just `8`.

Given an integer `n`, return *the number of **confusing numbers** in the inclusive range* `[1, n]`.

**Constraints:**
- `1 <= n <= 10^9`

---

## 2. Key Insight

> Generate all numbers using only valid digits (0,1,6,8,9) up to `n` via DFS. For each, check if its rotation differs. Count of confusing = count of valid-digit numbers − count of non-confusing (strobogrammatic) numbers.

---

## 3. Approach: DFS Generation — O(5^d) ✅

```text
FUNCTION confusingNumberII(n):
    validDigits ← [0, 1, 6, 8, 9]
    rotateMap ← {0:0, 1:1, 6:9, 8:8, 9:6}
    count ← 0
    
    FUNCTION dfs(num, rotated, rotMul):
        // rotMul tracks place value for building rotated number
        IF num ≠ rotated:
            count ← count + 1
        FOR d IN validDigits:
            next ← num * 10 + d
            IF next > n OR next = 0: CONTINUE
            dfs(next, rotateMap[d] * rotMul + rotated, rotMul * 10)
    
    FOR d IN validDigits:
        IF d = 0: CONTINUE
        dfs(d, rotateMap[d], 10)
    
    RETURN count
```

| Time | Space |
|------|-------|
| O(5^d) where d = digits of n | O(d) recursion |

---

## Examples

```
Example 1:
  Input: n = 20
  Output: 6
  Explanation: The confusing numbers are [6,9,10,16,18,19].
    6 converts to 9.
    9 converts to 6.
    10 converts to 01 which is just 1.
    16 converts to 91.
    18 converts to 81.
    19 converts to 61.
```
```
Example 2:
  Input: n = 100
  Output: 19
  Explanation: The confusing numbers are [6,9,10,16,18,19,60,61,66,68,80,81,86,89,90,91,98,99,100].
```

---

## Walkthrough

Consider `n = 20`.

| Step | num (generated) | rotated | num ≠ rotated? | count |
|------|----------------|---------|----------------|-------|
| 1    | 6              | 9       | Yes            | 1     |
| 2    | 9              | 6       | Yes            | 2     |
| 3    | 10             | 01 → 1  | Yes            | 3     |
| 4    | 13             | 31      | Yes            | 4     |
| 5    | 16             | 91      | Yes            | 5     |
| 6    | 18             | 81      | Yes            | 6     |

The DFS stops when the next generated number would exceed 20.

---

## Complexity Analysis

- **Time:** O(5^d), where *d* is the number of digits in *n* (each position can choose from 5 valid digits).
- **Space:** O(d) recursion stack depth.

---

## Follow-Up Questions

- How would you modify the algorithm to return the list of confusing numbers instead of just the count?
- Can the approach be adapted to handle a custom set of rotatable digits?
- What is the complexity if we need to support numbers up to 10^18?

---

## Key Takeaway

> Generate valid-digit numbers via DFS while simultaneously building the rotated value. Only count when original ≠ rotated. Much faster than checking every number up to n.
