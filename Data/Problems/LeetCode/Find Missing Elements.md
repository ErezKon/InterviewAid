# 3731. Find Missing Elements

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-missing-elements](https://leetcode.com/problems/find-missing-elements)
**Companies:** Bloomberg, Google

---

## Problem Description
> *Note: statement verified against the official LeetCode page. Official input is an unsorted array whose min and max define the range (no `lower`/`upper` parameters) — the Approach/Walkthrough below use a lower/upper variant.*

You are given an integer array `nums` consisting of **unique** integers.

Originally, `nums` contained **every integer** within a certain range. However, some integers might have gone **missing** from the array.

The **smallest** and **largest** integers of the original range are still present in `nums`.

Return a **sorted** list of all the missing integers in this range. If no integers are missing, return an **empty** list.

**Constraints:**
- `2 <= nums.length <= 100`
- `1 <= nums[i] <= 100`

## Examples
```
Example 1:
  Input: nums = [1,4,2,5]
  Output: [3]
  Explanation: The smallest integer is 1 and the largest is 5, so the full range should be [1,2,3,4,5]. Among these, only 3 is missing.
```

```
Example 2:
  Input: nums = [7,8,6,9]
  Output: []
  Explanation: The smallest integer is 6 and the largest is 9, so the full range is [6,7,8,9]. All integers are already present, so no integer is missing.
```

```
Example 3:
  Input: nums = [5,1]
  Output: [2,3,4]
  Explanation: The smallest integer is 1 and the largest is 5, so the full range should be [1,2,3,4,5]. The missing integers are 2, 3, and 4.
```

## Approach
Iterate through the interval from `lower` to `upper` while maintaining an index into `nums`. For each value `v`:
- If `v` equals `nums[idx]`, advance `idx`.
- Otherwise, `v` is missing and is added to the answer list.
Because `nums` is sorted, this runs in linear time relative to the size of the interval.

## Walkthrough
Consider `nums = [2,5,7]`, `lower = 1`, `upper = 8`:
| v | idx | nums[idx] | Action | Missing List |
|---|-----|-----------|--------|--------------|
| 1 | 0 | 2 | v < nums[idx] → add 1 | [1]
| 2 | 0 | 2 | equal → idx = 1 | [1]
| 3 | 1 | 5 | v < nums[idx] → add 3 | [1,3]
| 4 | 1 | 5 | add 4 | [1,3,4]
| 5 | 1 | 5 | equal → idx = 2 | [1,3,4]
| 6 | 2 | 7 | add 6 | [1,3,4,6]
| 7 | 2 | 7 | equal → idx = 3 | [1,3,4,6]
| 8 | 3 | - | add 8 | [1,3,4,6,8]

## Complexity Analysis
- **Time:** O(`upper` - `lower` + 1) – one pass over the interval.
- **Space:** O(k) where k is the number of missing elements (output size).

## Follow-Up Questions
- How would you modify the algorithm if `nums` could contain duplicates?
- Can you return the missing ranges in a compact string format like `"1->3,5"`?
- What if the interval size is huge (e.g., up to 10⁹) but `nums` is small?

## Key Takeaway
A single linear scan using the sorted property of the input array efficiently yields all missing numbers within a given range.
