# 1950. Maximum of Minimum Values in All Subarrays

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays](https://leetcode.com/problems/maximum-of-minimum-values-in-all-subarrays)
**Companies:** Amazon

---

## Problem Description
Given an integer array `arr` of length `n`, for every possible subarray compute its minimum value. Among all these minima, return the maximum value.

## Examples
**Example 1:**
Input: `arr = [1,3,2,4]`
Output: `3`
Explanation: Subarray minima are `[1,1,2,4,2,2,3,1,2,4]`; the maximum among them is `3` (from subarray `[3,2]`).

**Example 2:**
Input: `arr = [5,5,5]`
Output: `5`
Explanation: Every subarray has minimum `5`, so the answer is `5`.

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
