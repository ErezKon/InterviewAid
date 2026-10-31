# 2848. Points That Intersect With Cars

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/points-that-intersect-with-cars](https://leetcode.com/problems/points-that-intersect-with-cars)
**Companies:** Uber

---

## Problem Description

You are given a **0-indexed** 2D integer array `nums` representing the coordinates of the cars parking on a number line. For any index `i`, `nums[i] = [start_i, end_i]` where `start_i` is the starting point of the `i`th car and `end_i` is the ending point of the `i`th car.

Return *the number of integer points on the line that are covered with **any part** of a car.*

**Constraints:**
- `1 <= nums.length <= 100`
- `nums[i].length == 2`
- `1 <= start_i <= end_i <= 100`

## Examples

**Example 1:**
```
Input: nums = [[3,6],[1,5],[4,7]]
Output: 7
Explanation: All the points from 1 to 7 intersect at least one car, therefore the answer would be 7.
```

**Example 2:**
```
Input: nums = [[1,3],[5,8]]
Output: 7
Explanation: Points intersecting at least one car are 1, 2, 3, 5, 6, 7, 8. There are a total of 7 points, therefore the answer would be 7.
```

## Approach
Coordinates are bounded by `100`, so use a difference array over `1..100`:
1. For each car `[start, end]`, increment `diff[start]` and decrement `diff[end+1]`.
2. Sweep `p = 1..100`, keeping a running sum `active` = number of cars covering `p`.
3. Count the points where `active > 0`.

(Equivalently, mark each point of each interval in a boolean array of size 101; with these bounds that is at most 100 · 100 operations.)

**Pseudocode**
```text
FUNCTION NumberOfPoints(nums):
    SET diff ← ARRAY OF 0 LENGTH 102
    FOR EACH [start, end] IN nums:
        SET diff[start] ← diff[start] + 1
        SET diff[end + 1] ← diff[end + 1] - 1
    SET active ← 0, count ← 0
    FOR p ← 1 TO 100:
        SET active ← active + diff[p]
        IF active > 0:
            SET count ← count + 1
    RETURN count
```

## Walkthrough
Example 2: `nums = [[1,3],[5,8]]`.

| Step | Action | State |
|------|--------|-------|
|1|Apply `[1,3]`|`diff[1] += 1, diff[4] -= 1`|
|2|Apply `[5,8]`|`diff[5] += 1, diff[9] -= 1`|
|3|Sweep p = 1..3|`active = 1, 1, 1` → count = 3|
|4|p = 4|`active = 0` → not covered|
|5|Sweep p = 5..8|`active = 1, 1, 1, 1` → count = 7|
|6|p = 9..100|`active = 0`|
|7|Return|`7`|

## Complexity Analysis
Time: O(N + R) where N = `nums.length` and R = 100 is the coordinate range.
Space: O(R) for the difference array.

## Follow-Up Questions
1. How would you solve it if coordinates went up to 10^9 (sort intervals and merge, summing merged lengths)?
2. How would you count points covered by at least `k` cars instead of at least one?
3. How would you support adding and removing cars dynamically while answering the count (segment tree with cover counts)?

## Key Takeaway
With a small coordinate range, a difference array turns interval coverage into a single linear sweep; for large ranges, sorting and merging intervals gives the same answer.
