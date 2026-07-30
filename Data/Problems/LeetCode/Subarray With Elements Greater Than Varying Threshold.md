# 2334. Subarray With Elements Greater Than Varying Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold](https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold)
**Companies:** Amazon, Google, Instabase, Tiktok

---

## Problem Description
Given an integer array `nums` and an integer `threshold`, find the length of the longest subarray such that every element in the subarray is strictly greater than `threshold / length_of_subarray`. Return the maximum length, or `-1` if no such subarray exists.

## Examples
**Example 1:**
```
Input: nums = [1,3,4,3,1], threshold = 6
Output: 3
Explanation: Subarray [3,4,3] has length 3 and each element > 6/3 = 2.
```
**Example 2:**
```
Input: nums = [6,5,6,2,5,1,2], threshold = 7
Output: 5
Explanation: Subarray [5,6,2,5,1] (length 5) satisfies each element > 7/5 = 1.4.
```

## Approach
**Monotonic Stack to Find Nearest Smaller Elements** – For each element treat it as the minimum of a candidate subarray. Using a stack we compute the nearest smaller element to the left and right, giving the maximal width where the current element is the minimum. Then check if the element exceeds `threshold / width`.

```text
FUNCTION longestValidSubarray(nums, threshold):
    SET n ← LENGTH(nums)
    SET left ← ARRAY of size n filled with -1
    SET right ← ARRAY of size n filled with n
    SET stack ← []
    // Find next smaller on the right
    FOR i ← 0 TO n-1:
        WHILE stack NOT EMPTY AND nums[stack[-1]] >= nums[i]:
            SET idx ← POP(stack)
            SET right[idx] ← i
        END WHILE
        IF stack NOT EMPTY:
            SET left[i] ← stack[-1]
        END IF
        PUSH(i, stack)
    END FOR

    SET maxLen ← -1
    FOR i ← 0 TO n-1:
        SET width ← right[i] - left[i] - 1
        IF nums[i] > threshold / width:
            SET maxLen ← MAX(maxLen, width)
        END IF
    END FOR
    RETURN maxLen
```

## Walkthrough
Take `nums = [1,3,4,3,1]`, `threshold = 6`.
| i | nums[i] | left | right | width | threshold/width | condition |
|---|---------|------|-------|-------|----------------|-----------|
|0|1|-1|5|5|6/5=1.2|1 > 1.2? No|
|1|3|0|4|3|6/3=2|3 > 2 ✔|
|2|4|1|3|1|6/1=6|4 > 6? No|
|3|3|0|4|3|2|✔|
|4|1| -1|5|5|1.2|No|
Maximum width satisfying condition is 3.

## Complexity Analysis
- **Time:** O(n) – each element is pushed and popped at most once from the stack.
- **Space:** O(n) for the `left`, `right` arrays and the stack.

## Follow-Up Questions
1. How would the solution change if the condition were `>= threshold / length` instead of `>`?
2. Can you adapt the algorithm to return the actual subarray(s) achieving the maximum length?
3. What if the threshold can be negative? How does that affect the comparison?

## Key Takeaway
A monotonic stack efficiently gives the maximal span where each element is the minimum, enabling a linear‑time check against the threshold condition.
