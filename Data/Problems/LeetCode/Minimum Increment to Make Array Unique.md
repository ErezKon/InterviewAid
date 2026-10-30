# 945. Minimum Increment to Make Array Unique

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimum-increment-to-make-array-unique](https://leetcode.com/problems/minimum-increment-to-make-array-unique)
**Companies:** Amazon, Coursera, Goldman Sachs, Google, Infosys, Microsoft, Paypal, Tiktok, Zscaler

---

## Problem Description

You are given an integer array `nums`. In one move, you can pick an index `i` where `0 <= i < nums.length` and increment `nums[i]` by `1`.

Return *the minimum number of moves to make every value in *`nums`* **unique***.

The test cases are generated so that the answer fits in a 32-bit integer.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Key Insight

> Sort the array. Process left to right: if `nums[i] <= nums[i-1]`, bump it to `nums[i-1] + 1`. Each bump costs exactly the difference.

## Approach

**Algorithm:** Sort + Greedy.

```text
FUNCTION minIncrementForUnique(nums):
    SORT nums
    moves ← 0
    FOR i ← 1 TO LENGTH(nums) - 1:
        IF nums[i] ≤ nums[i-1]:
            needed ← nums[i-1] + 1
            moves ← moves + (needed - nums[i])
            nums[i] ← needed
    RETURN moves
```

## Examples

**Example 1:**
```
Input: nums = [1,2,2]
Output: 1
Explanation: After 1 move, the array could be [1, 2, 3].
```

**Example 2:**
```
Input: nums = [3,2,1,2,1,7]
Output: 6
Explanation: After 6 moves, the array could be [3, 4, 1, 2, 5, 7].
It can be shown that it is impossible for the array to have all unique values with 5 or less moves.
```

## Walkthrough

Consider `nums = [3,2,1,2,1,7]`.
1. Sort → `[1,1,2,2,3,7]`.
2. i=1: `nums[1]=1 ≤ nums[0]=1` → set to `2`, moves+=1.
3. i=2: `nums[2]=2 ≤ nums[1]=2` → set to `3`, moves+=1.
4. i=3: `nums[3]=2 ≤ nums[2]=3` → set to `4`, moves+=2.
5. i=4: `nums[4]=3 ≤ nums[3]=4` → set to `5`, moves+=2.
6. i=5: `nums[5]=7 > nums[4]=5` → no change.
Total moves = 1+1+2+2 = 6.

## Complexity Analysis

- **Time:** O(n log n) due to sorting.
- **Space:** O(1) extra space if sorting in‑place.

## Follow-Up Questions

1. How would you solve the problem if decrement operations were also allowed?
2. Can you achieve O(n) time using counting sort when the range of numbers is limited?

## Key Takeaway

> After sorting, greedily ensure each element exceeds its predecessor — this minimizes total increments since we never overshoot.