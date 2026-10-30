# 1950. Maximum of Minimum Values in All Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays](https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays)
**Companies:** Amazon

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` of size `n`. You are asked to solve `n` queries for each integer `i` in the range `0 <= i < n`.

To solve the `i^th` query:

- Find the **minimum value** in each possible subarray of size `i + 1` of the array `nums`.
- Find the **maximum** of those minimum values. This maximum is the **answer** to the query.

Return *a **0-indexed** integer array* `ans` *of size *`n` *such that *`ans[i]` *is the answer to the *`i^th` *query*.

A **subarray** is a contiguous sequence of elements in an array.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 10^5`
- `0 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [0,1,2,4]
Output: [4,2,1,0]
Explanation: i=0:
- The subarrays of size 1 are [0], [1], [2], [4]. The minimum values are 0, 1, 2, 4.
- The maximum of the minimum values is 4.
i=1:
- The subarrays of size 2 are [0,1], [1,2], [2,4]. The minimum values are 0, 1, 2.
- The maximum of the minimum values is 2.
i=2:
- The subarrays of size 3 are [0,1,2], [1,2,4]. The minimum values are 0, 1.
- The maximum of the minimum values is 1.
i=3:
- There is one subarray of size 4, which is [0,1,2,4]. The minimum value is 0.
- There is only one value, so the maximum is 0.
```

**Example 2:**
```
Input: nums = [10,20,50,10]
Output: [50,20,10,10]
Explanation: i=0:
- The subarrays of size 1 are [10], [20], [50], [10]. The minimum values are 10, 20, 50, 10.
- The maximum of the minimum values is 50.
i=1:
- The subarrays of size 2 are [10,20], [20,50], [50,10]. The minimum values are 10, 20, 10.
- The maximum of the minimum values is 20.
i=2:
- The subarrays of size 3 are [10,20,50], [20,50,10]. The minimum values are 10, 10.
- The maximum of the minimum values is 10.
i=3:
- There is one subarray of size 4, which is [10,20,50,10]. The minimum value is 10.
- There is only one value, so the maximum is 10.
```

## Approach
**Monotonic Stack – Contribution Counting** – For each element, find the distance to the previous smaller element and the next smaller element. The element is the minimum for all subarrays where it is the smallest, counted as `left * right`. Track the maximum element that can serve as a minimum.

```text
FUNCTION MaxOfMins(arr):
    SET n ← LENGTH(arr)
    // Arrays to store distance to previous/next smaller element
    SET left ← ARRAY of size n
    SET right ← ARRAY of size n
    SET stack ← EMPTY STACK   // stores indices with increasing values
    // Compute left distances
    FOR i ← 0 TO n-1:
        WHILE stack NOT EMPTY AND arr[stack.TOP()] >= arr[i]:
            POP(stack)
        SET prev ← stack.TOP() IF stack NOT EMPTY ELSE -1
        SET left[i] ← i - prev
        PUSH(i) INTO stack
    // Clear stack for right distances
    CLEAR(stack)
    // Compute right distances
    FOR i ← n-1 DOWNTO 0:
        WHILE stack NOT EMPTY AND arr[stack.TOP()] > arr[i]:
            POP(stack)
        SET next ← stack.TOP() IF stack NOT EMPTY ELSE n
        SET right[i] ← next - i
        PUSH(i) INTO stack
    // Determine maximum of minima
    SET answer ← 0
    FOR i ← 0 TO n-1:
        // arr[i] can be minimum for left[i]*right[i] subarrays
        SET answer ← MAX(answer, arr[i])
    RETURN answer
```

## Walkthrough
For `arr = [1,3,2,4]`:
1. Left distances → `[1,1,2,1]` (1 has no previous smaller, 3 has previous 1, 2 sees previous 1, 4 sees previous 2).
2. Right distances → `[4,1,2,1]` (1 next smaller none, 3 next smaller 2, 2 next smaller none, 4 next smaller none).
3. Each element’s contribution count: `1*4=4`, `1*1=1`, `2*2=4`, `1*1=1`. The maximum element that appears as a minimum is `3`, so answer `3`.

## Complexity Analysis
- **Time:** `O(n)` – two passes with a monotonic stack.
- **Space:** `O(n)` for the `left`, `right` arrays and the stack.

## Follow‑Up Questions
1. How would you adapt the algorithm to return the subarray(s) that achieve the maximum minimum?
2. Can the method be extended to compute the maximum of *maximum* values of all subarrays?
3. What changes are needed if the array contains negative numbers and you need the maximum absolute minimum?

## Key Takeaway
A monotonic stack efficiently determines each element’s span as the minimum, enabling an O(n) solution to find the maximum of all subarray minima.
