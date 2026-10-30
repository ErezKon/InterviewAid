# 2334. Subarray With Elements Greater Than Varying Threshold

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold](https://leetcode.com/problems/subarray-with-elements-greater-than-varying-threshold)
**Companies:** Amazon, Google, Instabase, Tiktok

---

## Problem Description

You are given an integer array `nums` and an integer `threshold`.

Find any subarray of `nums` of length `k` such that **every** element in the subarray is **greater** than `threshold / k`.

Return *the **size** of **any** such subarray*. If there is no such subarray, return `-1`.

A **subarray** is a contiguous non-empty sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i], threshold <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [1,3,4,3,1], threshold = 6
Output: 3
Explanation: The subarray [3,4,3] has a size of 3, and every element is greater than 6 / 3 = 2.
Note that this is the only valid subarray.
```

**Example 2:**
```
Input: nums = [6,5,6,5,8], threshold = 7
Output: 1
Explanation: The subarray [8] has a size of 1, and 8 > 7 / 1 = 7. So 1 is returned.
Note that the subarray [6,5] has a size of 2, and every element is greater than 7 / 2 = 3.5.
Similarly, the subarrays [6,5,6], [6,5,6,5], [6,5,6,5,8] also satisfy the given conditions.
Therefore, 2, 3, 4, or 5 may also be returned.
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
