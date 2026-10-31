# 3663. Find The Least Frequent Digit

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-the-least-frequent-digit](https://leetcode.com/problems/find-the-least-frequent-digit)
**Companies:** Flipkart

---

## Problem Description
Given an integer `n`, find the digit that occurs **least** frequently in its decimal representation. If multiple digits have the same frequency, choose the **smallest** digit.

Return the chosen digit as an integer.

The **frequency** of a digit `x` is the number of times it appears in the decimal representation of `n`.

> *Note: only digits that actually appear in `n` are candidates. The Approach/Walkthrough below also consider digits with count 0 (and would return 0 for most inputs) — skip digits with `count[d] == 0` when taking the minimum.*

## Examples
**Example 1:**
```
Input: n = 1553322
Output: 1
Explanation: The least frequent digit in n is 1, which appears only once. All other digits appear twice.
```
**Example 2:**
```
Input: n = 723344511
Output: 2
Explanation: The least frequent digits in n are 7, 2, and 5; each appears only once.
```

## Constraints
- `1 <= n <= 2^31 - 1`

## Approach
Count occurrences of each digit using an array of size 10. After scanning, find the minimum count and return the smallest digit with that count.

```text
FUNCTION leastFrequentDigit(num):
    // Initialize count array for digits 0-9
    SET count[0..9] ← 0
    SET temp ← num
    IF temp == 0:
        SET count[0] ← 1
    WHILE temp > 0:
        SET digit ← temp MOD 10
        SET count[digit] ← count[digit] + 1
        SET temp ← temp DIV 10
    // Determine minimum frequency
    SET minFreq ← INFINITY
    SET answer ← 0
    FOR d ← 0 TO 9:
        IF count[d] < minFreq:
            SET minFreq ← count[d]
            SET answer ← d
    RETURN answer
```

## Walkthrough
For `num = 123452`:
- Digit counts become `{0:0,1:1,2:2,3:1,4:1,5:1,6:0,7:0,8:0,9:0}`.
- Minimum frequency is `0`; the smallest digit with this count is `0`.
Result `0`.

## Complexity Analysis
- **Time:** O(L) where L is the number of digits in `num` (≤ 10 for 32-bit integers).
- **Space:** O(1) – constant array of 10 integers.

## Follow-Up Questions
1. How would you extend this to handle very large numbers given as strings?
2. Can you return all digits that share the minimum frequency instead of just the smallest?
3. What if the input is a list of numbers and you need the globally least frequent digit?

## Key Takeaway
A simple frequency array of size 10 lets you find the least frequent digit in linear time with constant extra space.
