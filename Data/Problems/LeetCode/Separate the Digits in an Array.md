# 2553. Separate the Digits in an Array

**Difficulty:** 🟢 Easy

**Companies:** Google, Meta, Microsoft
---

## Problem Description

Given an integer array `nums`, return a new array consisting of the individual digits of each number in `nums`, preserving the original order of numbers and digits.

---

## Examples

**Example 1:**
```
Input: nums = [13, 25, 83]
Output: [1,3,2,5,8,3]
Explanation: The digits of 13 are [1,3], of 25 are [2,5], and of 83 are [8,3]. Concatenating them yields [1,3,2,5,8,3].
```

**Example 2:**
```
Input: nums = [7, 0, 100]
Output: [7,0,1,0,0]
Explanation: Digits are extracted individually, including leading zeros inside numbers.
```

---

## Approach

Use simple iteration over each number, convert it to its decimal representation, and collect each digit.

```text
FUNCTION separateDigits(nums):
    SET result ← []
    FOR each num IN nums:
        SET digitsString ← STRING(num)               // convert number to string
        FOR each ch IN digitsString:
            SET digit ← INTEGER(ch)                 // convert character back to integer
            APPEND digit TO result
    RETURN result
```

---

## Walkthrough

Consider `nums = [13, 25, 83]`:
| Step | num | digitsString | result after processing |
|------|-----|--------------|--------------------------|
| 1 | 13 | "13" | [1, 3] |
| 2 | 25 | "25" | [1, 3, 2, 5] |
| 3 | 83 | "83" | [1, 3, 2, 5, 8, 3] |
The final `result` matches the expected output.

---

## Complexity Analysis

- **Time:** O(N * D) where N is the number of elements in `nums` and D is the average number of digits per element.
- **Space:** O(N * D) for the output array containing all digits.

---

## Follow-Up Questions

1. How would you modify the algorithm to handle negative numbers?
2. Can you output the digits in reverse order for each number?
3. How would you perform this in-place if the input array allowed expansion?

---

## Key Takeaway

Iterating through each number and extracting its digits via string conversion provides a straightforward O(total digits) solution.
