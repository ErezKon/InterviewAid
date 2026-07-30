# 1558. Minimum Numbers of Function Calls to Make Target Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array](https://leetcode.com/problems/minimum-numbers-of-function-calls-to-make-target-array)
**Companies:** Amazon

---

## Problem Description
You are given a strictly increasing integer array `target` and an integer `n`. Starting with an empty array, you can perform two operations:
1. **Append** the next integer `i` (starting from 1) to the array.
2. **Add** the next integer `i` to the end of the array (i.e., increment the last element by `i`).
Determine the minimum number of function calls required to generate `target` using numbers from `1` to `n`.

## Examples
**Example 1**
```
Input: target = [1,3], n = 3
Output: 3
Explanation: Call append(1), append(2), add(2) to get [1,3].
```
**Example 2**
```
Input: target = [2,3,4], n = 4
Output: 4
Explanation: Skip 1 (no call), then append 2,3,4.
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

## Follow‑Up Questions
* How would the solution change if the operations had different costs?
* Can we output the exact sequence of operations instead of just the count?
* What if `target` is not strictly increasing?

## Key Takeaway
A simple greedy scan aligns the next integer with the target, counting skips as function calls to achieve the minimal total.
