# 3688. Bitwise OR of Even Numbers in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array](https://leetcode.com/problems/bitwise-or-of-even-numbers-in-an-array)
**Companies:** Meta, Microsoft

---

## 1. Problem Description

You are given an integer array `nums`.

Return the bitwise **OR** of all **even** numbers in the array.

If there are no even numbers in `nums`, return 0.

**Constraints:**
- `1 ≤ nums.length ≤ 100`
- `1 ≤ nums[i] ≤ 100`

---

## Examples

```
Example 1:
  Input: nums = [1,2,3,4,5,6]
  Output: 6
  Explanation: The even numbers are 2, 4, and 6. Their bitwise OR equals 6.

Example 2:
  Input: nums = [7,9,11]
  Output: 0
  Explanation: There are no even numbers, so the result is 0.

Example 3:
  Input: nums = [1,8,16]
  Output: 24
  Explanation: The even numbers are 8 and 16. Their bitwise OR equals 24.
```

---

## 2. Approach: Filter + OR — O(n) ✅

```text
FUNCTION bitwiseORofEvenNumbers(nums):
    // accumulate OR of even numbers
    SET result ← 0
    FOR num IN nums:
        IF num % 2 == 0:
            SET result ← result OR num
    RETURN result
```

---

## Walkthrough

Consider the array `[1,2,3,4]`:
1. Initialize `result = 0`.
2. `1` is odd → skip.
3. `2` is even → `result = 0 OR 2 = 2`.
4. `3` is odd → skip.
5. `4` is even → `result = 2 OR 4 = 6`.
6. End of array, return `6`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-Up Questions

* How would you modify the solution to return the bitwise AND of all even numbers?
* Can you solve the problem in a single pass without using extra variables?
* What if the array is extremely large and stored on disk? Discuss streaming approaches.

---

## Key Takeaway

> Simple linear scan: filter even numbers and accumulate their bitwise OR.
