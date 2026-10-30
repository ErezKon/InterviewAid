# 3228. Maximum Number of Operations to Move Ones to the End

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end](https://leetcode.com/problems/maximum-number-of-operations-to-move-ones-to-the-end)
**Companies:** Amazon, Bloomberg, Google, Meta

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

You are given a binary string `s`.

You can perform the following operation on the string **any** number of times:

- Choose **any** index `i` from the string where `i + 1 < s.length` such that `s[i] == '1'` and `s[i + 1] == '0'`.
- Move the character `s[i]` to the **right** until it reaches the end of the string or another `'1'`. For example, for `s = "010010"`, if we choose `i = 1`, the resulting string will be `s = "000110"`.

Return the **maximum** number of operations that you can perform.

**Constraints:**
- `1 <= s.length <= 10^5`
- `s[i]` is either `'0'` or `'1'`.

---

## Examples

```
Example 1:
  Input: s = "1001101"
  Output: 4
  Explanation: We can perform the following operations:
    - Choose index i = 0. The resulting string is s = "0011101".
    - Choose index i = 4. The resulting string is s = "0011011".
    - Choose index i = 3. The resulting string is s = "0010111".
    - Choose index i = 2. The resulting string is s = "0001111".
```

```
Example 2:
  Input: s = "00111"
  Output: 0
```

---

## Key Insight

> Each group of consecutive 1s, when hitting a 0, can "bubble" past it. The total operations = for each transition from 1→0, all accumulated 1s so far contribute one swap each through that 0-boundary.

---

## Approach

```
FUNCTION maxOperations(s)
    ones ← 0
    ops ← 0

    FOR i ← 0 TO len(s) - 1 DO
        IF s[i] = '1' THEN
            ones ← ones + 1
        ELSE IF i > 0 AND s[i-1] = '1' THEN
            ops ← ops + ones

    RETURN ops
END FUNCTION
```

---

## Walkthrough

```
s = "1001101"
```

| i | s[i] | ones | Condition            | ops |
|---|------|------|---------------------|-----|
| 0 | '1'  | 1    | —                   | 0   |
| 1 | '0'  | 1    | prev='1' → ops += 1 | 1   |
| 2 | '0'  | 1    | prev='0' → skip     | 1   |
| 3 | '1'  | 2    | —                   | 1   |
| 4 | '1'  | 3    | —                   | 1   |
| 5 | '0'  | 3    | prev='1' → ops += 3 | **4** |
| 6 | '1'  | 4    | —                   | 4   |

**Result: 4** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n)** — single pass |
| Space  | **O(1)** — two variables |

---

## Follow-Up Questions

1. **Why only count at 1→0 transitions?**
   A block of 1s moves as a unit through each 0-gap boundary. Consecutive 0s don't add extra operations.

2. **How does this relate to bubble sort?**
   Same as counting swaps needed to move all 1s to the right — each 1 swaps past each 0 to its right.

---

## Key Takeaway

> **Count accumulated 1s at each 1→0 boundary** — each transition point triggers as many swaps as there are 1s seen so far. O(n) single-pass solution.
