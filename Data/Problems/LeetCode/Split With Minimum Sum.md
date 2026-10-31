# 2578. Split With Minimum Sum

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/split-with-minimum-sum](https://leetcode.com/problems/split-with-minimum-sum)
**Companies:** Amazon, Google

---

## Problem Description

Given a positive integer `num`, split it into two non-negative integers `num1` and `num2` such that:

- The concatenation of `num1` and `num2` is a permutation of `num`.
  - In other words, the sum of the number of occurrences of each digit in `num1` and `num2` is equal to the number of occurrences of that digit in `num`.
- `num1` and `num2` can contain leading zeros.

Return *the **minimum** possible sum of* `num1` *and* `num2`.

**Notes:**

- It is guaranteed that `num` does not contain any leading zeros.
- The order of occurrence of the digits in `num1` and `num2` may differ from the order of occurrence of `num`.

**Constraints:**
- `10 <= num <= 10^9`

## Examples

**Example 1:**
```
Input: num = 4325
Output: 59
Explanation: We can split 4325 so that num1 is 24 and num2 is 35, giving a sum of 59. We can prove that 59 is indeed the minimal possible sum.
```

**Example 2:**
```
Input: num = 687
Output: 75
Explanation: We can split 687 so that num1 is 68 and num2 is 7, which would give an optimal sum of 75.
```

## Approach
To minimize `num1 + num2`, the smallest digits should occupy the highest place values, and the two numbers should have (almost) equal length so no digit is pushed to an unnecessarily high place. Sort the digits ascending and deal them alternately: even indices build `num1`, odd indices build `num2`. Leading zeros are allowed, so zeros simply land at the front and cost nothing.

**Pseudocode**
```text
FUNCTION SplitNum(num):
    SET digits ← SORT(DIGITS(num)) ascending
    SET num1 ← 0
    SET num2 ← 0
    FOR i ← 0 TO LENGTH(digits)-1:
        IF i is even:
            SET num1 ← num1 * 10 + digits[i]
        ELSE:
            SET num2 ← num2 * 10 + digits[i]
    RETURN num1 + num2
```

## Walkthrough
`num = 4325` → sorted digits `[2, 3, 4, 5]`.

| i | digit | goes to | num1 | num2 |
|---|-------|---------|------|------|
| 0 | 2 | num1 | 2 | 0 |
| 1 | 3 | num2 | 2 | 3 |
| 2 | 4 | num1 | 24 | 3 |
| 3 | 5 | num2 | 24 | 35 |

Result: `24 + 35 = 59`, matching the expected output.

## Complexity Analysis
*Time:* O(d log d) where `d` is the number of digits (at most 10), so effectively O(1).
*Space:* O(d) for the digit list.

## Follow-Up Questions
1. How would you generalize to splitting into `k` numbers with minimum sum?
2. What if leading zeros were not allowed in `num1` and `num2`?
3. Can you avoid sorting by using a digit-count array (counting sort)?

## Key Takeaway
Greedy placement of the smallest digits at the highest place values, alternating between the two numbers to keep their lengths balanced, yields the minimum sum.
