# 697. Degree of an Array

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/degree-of-an-array](https://leetcode.com/problems/degree-of-an-array)
**Companies:** Amazon, Bloomberg, Expedia, Ge Digital, Google, Microsoft, Oracle, Paypal, Rivian, Sofi, Turing

---

## Problem Description

Given a non-empty array of non-negative integers `nums`, the **degree** of this array is defined as the maximum frequency of any one of its elements.

Your task is to find the smallest possible length of a (contiguous) subarray of `nums`, that has the same degree as `nums`.

**Constraints:**

- `nums.length` will be between 1 and 50,000.
- `nums[i]` will be an integer between 0 and 49,999.

---

## Examples

```
Example 1:
  Input: nums = [1,2,2,3,1]
  Output: 2
  Explanation:
  The input array has a degree of 2 because both elements 1 and 2 appear twice.
  Of the subarrays that have the same degree:
  [1, 2, 2, 3, 1], [1, 2, 2, 3], [2, 2, 3, 1], [1, 2, 2], [2, 2, 3], [2, 2]
  The shortest length is 2. So return 2.
```

```
Example 2:
  Input: nums = [1,2,2,3,1,4,2]
  Output: 6
  Explanation:
  The degree is 3 because the element 2 is repeated 3 times.
  So [2,2,3,1,4,2] is the shortest subarray, therefore returning 6.
```

---

## Approach

```
FUNCTION findShortestSubArray(nums):
    first = {}; last = {}; count = {}
    FOR i, num IN enumerate(nums):
        IF num NOT IN first: first[num] = i
        last[num] = i
        count[num] = count.get(num, 0) + 1

    degree = MAX(count.values())
    RETURN MIN(last[num] - first[num] + 1 for num if count[num] == degree)
```

---

## Walkthrough

1. Iterate through the array while recording the first index, last index, and frequency of each number.
2. After the pass, determine the degree = maximum frequency.
3. For every number whose frequency equals the degree, compute the length of its subarray `last - first + 1`.
4. Return the smallest such length.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n) |
| **Space** | O(n) |

---

## Follow-Up Questions

- How would you modify the solution to also return the actual subarray(s) achieving the minimum length?
- Can you solve it in a single pass without storing both first and last indices separately?

---

## Key Takeaway

> **Track first/last occurrence and frequency per element. Shortest subarray with same degree = min span `(last - first + 1)` among max-frequency elements.**