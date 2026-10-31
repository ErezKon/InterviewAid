# 1526. Minimum Number of Increments on Subarrays to Form a Target Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array](https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array)
**Companies:** Amazon, Dream11, Google, Ibm, Meta, Microsoft, Oracle

---

## Problem Description

You are given an integer array `target`. You have an integer array `initial` of the same size as `target` with all elements initially zeros.

In one operation you can choose **any** subarray from `initial` and increment each value by one.

Return *the minimum number of operations to form a *`target`* array from *`initial`.

The test cases are generated so that the answer fits in a 32-bit integer.

**Constraints:**
- `1 <= target.length <= 10^5`
- `1 <= target[i] <= 10^5`
- The input is generated such that the answer fits inside a 32 bit integer.

---

## Examples

**Example 1:**
```
Input: target = [1,2,3,2,1]
Output: 3
Explanation: We need at least 3 operations to form the target array from the initial array.
[0,0,0,0,0] increment 1 from index 0 to 4 (inclusive).
[1,1,1,1,1] increment 1 from index 1 to 3 (inclusive).
[1,2,2,2,1] increment 1 at index 2.
[1,2,3,2,1] target array is formed.
```

**Example 2:**
```
Input: target = [3,1,1,2]
Output: 4
Explanation: [0,0,0,0] -> [1,1,1,1] -> [1,1,1,2] -> [2,1,1,2] -> [3,1,1,2]
```

**Example 3:**
```
Input: target = [3,1,5,4,2]
Output: 7
Explanation: [0,0,0,0,0] -> [1,1,1,1,1] -> [2,1,1,1,1] -> [3,1,1,1,1] -> [3,1,2,2,2] -> [3,1,3,3,2] -> [3,1,4,4,2] -> [3,1,5,4,2].
```

---

## Approach

**Greedy – Count Increases (O(n))**

The number of operations equals the sum of positive differences between consecutive elements, plus the first element value. Each increase from `target[i-1]` to `target[i]` requires additional operations; decreases are covered by earlier operations.

```text
FUNCTION minNumberOperations(target):
    ops ← target[0]
    FOR i ← 1 TO LEN(target) - 1 DO
        IF target[i] > target[i-1] THEN
            ops ← ops + (target[i] - target[i-1])
    RETURN ops
```

---

## Walkthrough

For `target = [1,2,3,2,1]`:
| i | target[i] | target[i-1] | diff | ops |
|---|-----------|------------|------|-----|
|0|1| – | – | 1 |
|1|2|1|+1|2 |
|2|3|2|+1|3 |
|3|2|3|0|3 |
|4|1|2|0|3 |
Final ops = 3.

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Greedy scan | **O(n)** | **O(1)** |

---

## Follow-Up Questions

1. How would you modify the algorithm if each increment operation adds a value `k` instead of `1`?
2. Can you output the exact set of subarrays to achieve the minimum operations?
3. What changes if the array may contain negative numbers?

---

## Key Takeaway

The minimal number of subarray increments equals the first element plus the sum of all positive jumps between consecutive elements.
