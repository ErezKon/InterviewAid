# 1689. Partitioning Into Minimum Number Of Deci-Binary Numbers

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers](https://leetcode.com/problems/partitioning-into-minimum-number-of-deci-binary-numbers)
**Companies:** Amazon, Google, Nutanix, Zoho

---

## Problem Description
Given a positive integer `n` represented as a string, split it into the minimum number of *deci‑binary* numbers (each digit is either `0` or `1`). Return that minimum count.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `"32"` | `3` | `32 = 11 + 11 + 10` (three deci‑binary numbers). |
| `"82734"` | `8` | The largest digit is `8`, so at least eight numbers are needed. |
| `"1"` | `1` | Already a deci‑binary number.

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
