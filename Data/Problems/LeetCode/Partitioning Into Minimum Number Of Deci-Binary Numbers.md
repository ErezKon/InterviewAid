# 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers)
**Companies:** Amazon, Google, Nutanix, Zoho

---

## Problem Description
A decimal number is called **deci-binary** if each of its digits is either `0` or `1` without any leading zeros. For example, `101` and `1100` are **deci-binary**, while `112` and `3001` are not.

Given a string `n` that represents a positive decimal integer, return *the **minimum** number of positive **deci-binary** numbers needed so that they sum up to* `n`*.*

**Constraints:**

- `1 <= n.length <= 10^5`
- `n` consists of only digits.
- `n` does not contain any leading zeros and represents a positive integer.

## Examples

```
Example 1:
  Input: n = "32"
  Output: 3
  Explanation: 10 + 11 + 11 = 32
```

```
Example 2:
  Input: n = "82734"
  Output: 8
```

```
Example 3:
  Input: n = "27346209830709182346"
  Output: 9
```

## Approach
The answer equals the maximum digit in the decimal representation because each deci‑binary number can contribute at most `1` to each digit position. Thus the minimum count is the largest digit.

```text
FUNCTION minPartitions(n):
    SET maxDigit ← 0
    FOR ch IN n:
        SET digit ← INTEGER(ch)
        IF digit > maxDigit:
            SET maxDigit ← digit
    RETURN maxDigit
```

## Walkthrough
For `n = "82734"`:

| Step | ch | digit | maxDigit |
|------|----|-------|----------|
| 1 | '8' | 8 | 8 |
| 2 | '2' | 2 | 8 |
| 3 | '7' | 7 | 8 |
| 4 | '3' | 3 | 8 |
| 5 | '4' | 4 | 8 |

Result = 8.

## Complexity Analysis
- **Time:** O(L) where L is the number of digits in `n`.
- **Space:** O(1) – only a few integer variables.

## Follow‑Up Questions
1. How would you construct the actual deci‑binary numbers achieving the minimum count?
2. Can this be extended to other bases, e.g., binary‑like numbers in base‑3?
3. What if the input number is extremely large (beyond standard integer range)?

## Key Takeaway
The minimal number of deci‑binary partitions equals the maximum digit of the original number.
