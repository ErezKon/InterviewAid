# 2772. Apply Operations to Make All Array Elements Equal to Zero

**Difficulty:** 🟡 Medium
**Companies:** Amazon, Google, Meta
---

## Problem Description
You are given an integer array `nums`. In one operation you can choose any subarray `[l, r]` and increment every element in that subarray by `1`. Determine the minimum number of operations required to make all elements of the array equal to `0`.

## Examples
**Example 1**
```
Input: nums = [1,2,3]
Output: 3
Explanation: Apply operations on subarrays [0,2], [1,2], and [2,2] to decrement each element to zero.
```
**Example 2**
```
Input: nums = [0,0,0]
Output: 0
Explanation: Array is already all zeros.
```

## Approach
Use a difference array to track the net increment applied to each position. Scan from left to right, maintaining a running sum of applied increments. When the current value after applied increments is positive, perform an operation starting at this index that extends to the end, effectively adding the needed amount to zero it out.

```text
FUNCTION minOperations(nums):
    n ← LENGTH(nums)
    diff ← ARRAY of zeros size n+1
    ops ← 0
    cur ← 0
    FOR i ← 0 TO n-1:
        cur ← cur + diff[i]
        // effective value after previous operations
        val ← nums[i] + cur
        IF val > 0:
            ops ← ops + val
            cur ← cur - val
            diff[i] ← diff[i] - val
            diff[n] ← diff[n] + val   // end marker
    RETURN ops
```

## Walkthrough
For `nums = [1,2,3]`:
1. i=0, cur=0, val=1 → perform 1 operation, ops=1, cur becomes -1, diff[3]+=1.
2. i=1, cur=-1+diff[1]= -1, val=2+(-1)=1 → perform 1 operation, ops=2.
3. i=2, cur=-2, val=3+(-2)=1 → perform 1 operation, ops=3.
All elements become zero after 3 operations.

## Complexity Analysis
*Time*: O(n) – single pass.
*Space*: O(n) – difference array of size n+1.

## Follow‑Up Questions
1. How would the solution change if operations could decrement instead of increment?
2. Can you solve the problem using a sliding‑window without an explicit difference array?
3. What if each operation has a cost proportional to the length of the subarray?

## Key Takeaway
A difference array enables O(1) range updates, allowing a linear‑time greedy scan to compute the minimal number of operations.
