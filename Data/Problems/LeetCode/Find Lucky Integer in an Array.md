# 1394. Find Lucky Integer in an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-lucky-integer-in-an-array](https://leetcode.com/problems/find-lucky-integer-in-an-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Zoho

---

## Problem Description

Given an array of integers `arr`, a **lucky integer** is an integer that has a frequency in the array equal to its value.

Return *the largest **lucky integer** in the array*. If there is no **lucky integer** return `-1`.

**Constraints:**
- `1 <= arr.length <= 500`
- `1 <= arr[i] <= 500`

## Examples

**Example 1:**
```
Input: arr = [2,2,3,4]
Output: 2
Explanation: The only lucky number in the array is 2 because frequency[2] == 2.
```

**Example 2:**
```
Input: arr = [1,2,2,3,3,3]
Output: 3
Explanation: 1, 2 and 3 are all lucky numbers, return the largest of them.
```

**Example 3:**
```
Input: arr = [2,2,2,3,3]
Output: -1
Explanation: There are no lucky numbers in the array.
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

## Follow-Up Questions
1. How would you solve the problem if the array is read as a stream?
2. Can you find the second-largest lucky integer efficiently?
3. What changes are needed if negative numbers are allowed?

## Key Takeaway
Counting frequencies and then checking the equality condition yields the largest lucky integer in linear time.
