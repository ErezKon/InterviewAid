# 1526. Minimum Number of Increments on Subarrays to Form a Target Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array](https://leetcode.com/problems/minimum-number-of-increments-on-subarrays-to-form-a-target-array)
**Companies:** Amazon, Dream11, Google, Ibm, Meta, Microsoft, Oracle

---

## Problem Description

You are given an integer array `target` of length `n`. In one operation you may choose any subarray `target[l…r]` and increment each element of that subarray by `1`. Return the minimum number of operations required to transform an array of zeros into `target`.

---

## Examples

**Example 1:**
```
Input: target = [1,2,3,2,1]
Output: 3
Explanation:
1. Increment subarray [0,4] → [1,1,1,1,1]
2. Increment subarray [1,3] → [1,2,2,2,1]
3. Increment subarray [2,2] → [1,2,3,2,1]
```

**Example 2:**
```
Input: target = [3,1,1,2]
Output: 4
Explanation:
Increment subarray [0,0] three times and subarray [3,3] once.
```

---

## Approach

**Greedy – Count Increases (O(n))**

The number of operations equals the sum of positive differences between consecutive elements, plus the first element value. Each increase from `target[i‑1]` to `target[i]` requires additional operations; decreases are covered by earlier operations.

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
| i | target[i] | target[i‑1] | diff | ops |
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
