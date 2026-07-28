# 977. Squares of a Sorted Array

**Difficulty:** 🟢 Easy
**Acceptance:** 72.0%
**LeetCode:** [https://leetcode.com/problems/squares-of-a-sorted-array](https://leetcode.com/problems/squares-of-a-sorted-array)
**Companies:** Accenture, Adobe, Agoda, Amazon, Bloomberg, Crowdstrike, Deutsche Bank, Google, Infosys, Instacart, Meta, Microsoft, Ozon, Tcs, Uber, Whatnot, Yandex

---

## Problem Description
Given a non‑decreasing integer array `nums` (which may contain negative numbers), return a new array containing the squares of each element, also sorted in non‑decreasing order.

## Examples
**Example 1:**
```
Input: nums = [-4,-1,0,3,10]
Output: [0,1,9,16,100]
Explanation: Squares are [16,1,0,9,100] and sorting yields the output.
```
**Example 2:**
```
Input: nums = [-7,-3,2,3,11]
Output: [4,9,9,49,121]
```

## Approach
Use two pointers starting at the ends of the array. The larger absolute value yields the larger square, which should be placed at the end of the result array. Move the corresponding pointer inward and repeat.

```text
FUNCTION sortedSquares(nums):
    SET n ← LENGTH(nums)
    CREATE array result of size n
    SET left ← 0
    SET right ← n - 1
    FOR i FROM n - 1 DOWN TO 0:
        IF ABS(nums[left]) > ABS(nums[right]):
            SET result[i] ← nums[left] * nums[left]
            SET left ← left + 1
        ELSE:
            SET result[i] ← nums[right] * nums[right]
            SET right ← right - 1
    RETURN result
```

## Walkthrough
| Step | left val | right val | chosen square | result index |
|------|----------|-----------|---------------|--------------|
| i=4 | -4 (abs4) | 10 (abs10) | 100 (right) | result[4] = 100, right→3 |
| i=3 | -4 (4) | 3 (3) | 16 (left) | result[3] = 16, left→1 |
| i=2 | -1 (1) | 3 (3) | 9 (right) | result[2] = 9, right→2 |
| i=1 | -1 (1) | 0 (0) | 1 (left) | result[1] = 1, left→2 |
| i=0 | 0 (0) | 0 (0) | 0 (right) | result[0] = 0 |
The final `result` is `[0,1,9,16,100]`.

## Complexity Analysis
- **Time:** O(n) – each element is processed once.
- **Space:** O(n) – output array of size n.

## Follow‑Up Questions
1. How would you modify the algorithm to work in‑place without extra O(n) space?
2. Can you handle the case where the input array is not sorted?
3. What if you need to return the k smallest squares instead of all of them?

## Key Takeaway
Two‑pointer traversal from both ends efficiently builds the sorted squares array in linear time.
