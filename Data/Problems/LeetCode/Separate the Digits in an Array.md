# 2553. Separate the Digits in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/separate-the-digits-in-an-array](https://leetcode.com/problems/separate-the-digits-in-an-array)

**Companies:** Google, Meta, Microsoft
---

## Problem Description

Given an array of positive integers `nums`, return *an array* `answer` *that consists of the digits of each integer in* `nums` *after separating them in **the same order** they appear in* `nums`.

To separate the digits of an integer is to get all the digits it has in the same order.

- For example, for the integer `10921`, the separation of its digits is `[1,0,9,2,1]`.

**Constraints:**

- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= 10^5`

---

## Examples

```
Example 1:
  Input: nums = [13,25,83,77]
  Output: [1,3,2,5,8,3,7,7]
  Explanation:
  - The separation of 13 is [1,3].
  - The separation of 25 is [2,5].
  - The separation of 83 is [8,3].
  - The separation of 77 is [7,7].
  answer = [1,3,2,5,8,3,7,7]. Note that answer contains the separations in the same order.
```

```
Example 2:
  Input: nums = [7,1,3,9]
  Output: [7,1,3,9]
  Explanation: The separation of each integer in nums is itself.
  answer = [7,1,3,9].
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

Example 1: `nums = [13, 25, 83, 77]`

| Step | num | digitsString | result after processing |
|------|-----|--------------|--------------------------|
| 1 | 13 | "13" | [1, 3] |
| 2 | 25 | "25" | [1, 3, 2, 5] |
| 3 | 83 | "83" | [1, 3, 2, 5, 8, 3] |
| 4 | 77 | "77" | [1, 3, 2, 5, 8, 3, 7, 7] |

Return `[1,3,2,5,8,3,7,7]` (expected output). In Example 2 every number is a single digit, so the result is `[7,1,3,9]`.

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
