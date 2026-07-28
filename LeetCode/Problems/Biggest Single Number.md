# 619. Biggest Single Number

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/biggest-single-number](https://leetcode.com/problems/biggest-single-number)
**Companies:** Amazon, Bloomberg, Google

---

## Problem Description
Given an integer array `nums`, find the largest integer that appears exactly once in the array. If no such element exists, return `-1`.

## Examples
**Example 1**
```
Input: nums = [4,5,7,5,4,8]
Output: 8
Explanation: 8 appears only once and is the largest such number.
```
**Example 2**
```
Input: nums = [1,2,2,1]
Output: -1
Explanation: No number appears exactly once.
```

## Approach
Count occurrences of each number, then scan the keys to find the maximum value with count = 1.

```text
FUNCTION BiggestSingle(nums):
    CREATE freq MAP ← {}
    FOR each num IN nums:
        INCREMENT freq[num]
    SET answer ← -1
    FOR each (value, count) IN freq:
        IF count = 1 AND value > answer:
            SET answer ← value
    RETURN answer
```

## Walkthrough
| nums iteration | freq map after iteration |
|----------------|--------------------------|
| [4]            | {4:1}                    |
| [4,5]          | {4:1,5:1}                |
| [4,5,7]        | {4:1,5:1,7:1}            |
| ...            | ... (final) {4:2,5:2,7:1,8:1} |
After counting, the single‑occurrence numbers are 7 and 8; the maximum is 8.

## Complexity Analysis
- **Time:** O(n) – one pass to count and one pass over the map.
- **Space:** O(n) – extra space for the frequency map.

## Follow-Up Questions
1. How would you solve the problem if the array is sorted?
2. Can you achieve O(1) extra space when the input range is limited (e.g., numbers 0‑100)?
3. How to extend the solution to return the *k* largest single numbers?

## Key Takeaway
Counting frequencies and then selecting the maximum among unique elements yields a simple linear‑time solution.
