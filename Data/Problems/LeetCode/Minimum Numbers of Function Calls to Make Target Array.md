# 1558. Minimum Numbers of Function Calls to Make Target Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array](https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below solves #1441 Build an Array With Stack Operations. Officially the calls are "increment one element" or "double all". The answer is `Σ popcount(nums[i])` (increments) plus `bitlength(max(nums)) − 1` (shared doublings).*

You are given an integer array `nums`. You have an integer array `arr` of the same length with all values set to `0` initially. You also have the following `modify` function:
![img](https://assets.leetcode.com/uploads/2020/07/10/sample_2_1887.png)
You want to use the modify function to convert `arr` to `nums` using the minimum number of calls.

Return *the minimum number of function calls to make *`nums`* from *`arr`.

The test cases are generated so that the answer fits in a **32-bit** signed integer.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [1,5]
Output: 5
Explanation: Increment by 1 (second element): [0, 0] to get [0, 1] (1 operation).
Double all the elements: [0, 1] -> [0, 2] -> [0, 4] (2 operations).
Increment by 1 (both elements)  [0, 4] -> [1, 4] -> [1, 5] (2 operations).
Total of operations: 1 + 2 + 2 = 5.
```

**Example 2:**
```
Input: nums = [2,2]
Output: 3
Explanation: Increment by 1 (both elements) [0, 0] -> [0, 1] -> [1, 1] (2 operations).
Double all the elements: [1, 1] -> [2, 2] (1 operation).
Total of operations: 2 + 1 = 3.
```

**Example 3:**
```
Input: nums = [4,2,5]
Output: 6
Explanation: (initial)[0,0,0] -> [1,0,0] -> [1,0,1] -> [2,0,2] -> [2,1,2] -> [4,2,4] -> [4,2,5](nums).
```

## Approach
Use a **greedy scan** of numbers from 1 to n. Keep a pointer `j` on `target`. For each `i`:
- If `i` equals `target[j]`, perform an **append** and move `j`.
- Otherwise, perform a **skip** (no call) which counts as a function call.
The total calls equal the number of processed integers up to the last target element.

## Walkthrough
| i | target[j] | Action | Calls so far |
|---|-----------|--------|--------------|
|1|1|append|1|
|2|3|skip|2|
|3|3|append|3 (target completed)|

## Complexity Analysis
Time: O(n) – single pass through numbers up to the last target element.
Space: O(1) – only pointers and counters.

## Follow-Up Questions
* How would the solution change if the operations had different costs?
* Can we output the exact sequence of operations instead of just the count?
* What if `target` is not strictly increasing?

## Key Takeaway
A simple greedy scan aligns the next integer with the target, counting skips as function calls to achieve the minimal total.
