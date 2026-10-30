# 2656. Maximum Sum With Exactly K Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/maximum-sum-with-exactly-k-elements](https://leetcode.com/problems/maximum-sum-with-exactly-k-elements)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach below sums the `k` largest elements. Officially each pick of `m` adds `m + 1` back to the array, so you always re-pick the maximum: `answer = k · max(nums) + k(k − 1)/2`.*

You are given a **0-indexed** integer array `nums` and an integer `k`. Your task is to perform the following operation **exactly** `k` times in order to maximize your score:

- Select an element `m` from `nums`.
- Remove the selected element `m` from the array.
- Add a new element with a value of `m + 1` to the array.
- Increase your score by `m`.

Return *the maximum score you can achieve after performing the operation exactly* `k` *times.*

**Constraints:**
- `1 <= nums.length <= 100`
- `1 <= nums[i] <= 100`
- `1 <= k <= 100`

## Examples

**Example 1:**
```
Input: nums = [1,2,3,4,5], k = 3
Output: 18
Explanation: We need to choose exactly 3 elements from nums to maximize the sum.
For the first iteration, we choose 5. Then sum is 5 and nums = [1,2,3,4,6]
For the second iteration, we choose 6. Then sum is 5 + 6 and nums = [1,2,3,4,7]
For the third iteration, we choose 7. Then sum is 5 + 6 + 7 = 18 and nums = [1,2,3,4,8]
So, we will return 18.
It can be proven, that 18 is the maximum answer that we can achieve.
```

**Example 2:**
```
Input: nums = [5,5,5], k = 2
Output: 11
Explanation: We need to choose exactly 2 elements from nums to maximize the sum.
For the first iteration, we choose 5. Then sum is 5 and nums = [5,5,6]
For the second iteration, we choose 6. Then sum is 5 + 6 = 11 and nums = [5,5,7]
So, we will return 11.
It can be proven, that 11 is the maximum answer that we can achieve.
```

## Approach
The optimal selection is simply the `k` largest elements of the array. We can obtain them by:
1. Sorting `nums` in descending order and summing the first `k` values, **or**
2. Using a **min‑heap** of size `k` to keep the largest elements while scanning the array once (useful when `n` is large and `k` is small).
Both methods run in O(n log n) or O(n log k) time respectively.

### Pseudocode (Sorting version)
```text
FUNCTION maxSumExactlyK(nums, k):
    SORT nums DESCENDING
    sum ← 0
    FOR i FROM 0 TO k-1:
        sum ← sum + nums[i]
    RETURN sum
```

### Pseudocode (Heap version)
```text
FUNCTION maxSumExactlyKHeap(nums, k):
    heap ← MIN-HEAP   // stores up to k largest values
    FOR each val IN nums:
        heap.PUSH(val)
        IF heap.SIZE() > k:
            heap.POP()   // discard smallest among stored values
    sum ← 0
    WHILE heap IS NOT EMPTY:
        sum ← sum + heap.POP()
    RETURN sum
```

## Walkthrough
For `nums = [5,2,9,1,5,6]`, `k = 3`:
- Sorting yields `[9,6,5,5,2,1]`; sum of first three = 9+6+5 = 20.
- Heap method: push each value, maintaining size ≤ 3. After processing all, heap contains `[5,6,9]`; sum = 20.

## Complexity Analysis
*Time:* O(n log n) for sorting, or O(n log k) for the heap approach.
*Space:* O(1) extra for sorting in‑place, or O(k) for the heap.

## Follow‑Up Questions
1. How would you adapt the solution to return the indices of the selected elements?
2. Can the problem be solved in O(n) time using a selection algorithm (quickselect) to find the k‑th largest element?
3. What changes are needed if the array is streamed and you must maintain the maximum sum of exactly k elements at any point?

## Key Takeaway
Selecting the `k` largest numbers—via sorting or a bounded min‑heap—directly yields the maximum possible sum for exactly `k` elements.
