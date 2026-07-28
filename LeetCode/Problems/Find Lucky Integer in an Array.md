# 1394. Find Lucky Integer in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-lucky-integer-in-an-array](https://leetcode.com/problems/find-lucky-integer-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description
Given an integer array `arr`, a *lucky* integer is an integer whose value equals the number of times it appears in the array. Return the largest lucky integer. If no lucky integer exists, return `-1`.

## Examples
**Example 1**
```
Input: arr = [2,2,3,4]
Output: 2
Explanation: 2 appears twice, so it is lucky. 3 and 4 are not lucky.
```
**Example 2**
```
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 3 appears three times, which is lucky and larger than 2.
```
**Example 3**
```
Input: arr = [5,6,7]
Output: -1
Explanation: No number's frequency matches its value.
```

## Approach
Count the frequency of each number using a hash map, then iterate over the map to find numbers where `value == frequency`. Track the maximum such number.

### Pseudocode
```text
FUNCTION findLucky(arr):
    SET freq ← empty map
    FOR num ← 0 TO LENGTH(arr)-1:
        INCREMENT freq[arr[num]]
    SET answer ← -1
    FOR each (value, count) IN freq:
        IF value == count AND value > answer:
            SET answer ← value
    RETURN answer
```

## Walkthrough
For `arr = [1,2,2,3,3,3]`:
| Step | num | freq map after step | answer |
|------|-----|---------------------|--------|
| 1 | 1 | {1:1} | -1 |
| 2 | 2 | {1:1,2:1} | -1 |
| 3 | 2 | {1:1,2:2} | 2 (2==2) |
| 4 | 3 | {1:1,2:2,3:1} | 2 |
| 5 | 3 | {1:1,2:2,3:2} | 2 |
| 6 | 3 | {1:1,2:2,3:3} | 3 (3==3) |
Result = 3.

## Complexity Analysis
- **Time:** O(n) – one pass to count, one pass over distinct values.
- **Space:** O(m) where *m* is the number of distinct integers.

## Follow‑Up Questions
1. How would you solve the problem if the array is read as a stream?
2. Can you find the second‑largest lucky integer efficiently?
3. What changes are needed if negative numbers are allowed?

## Key Takeaway
Counting frequencies and then checking the equality condition yields the largest lucky integer in linear time.
