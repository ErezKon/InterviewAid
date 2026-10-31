# 2295. Replace Elements in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-elements-in-an-array](https://leetcode.com/problems/replace-elements-in-an-array)
**Companies:** Amazon

---

## Problem Description

You are given a **0-indexed** array `nums` that consists of `n` **distinct** positive integers. Apply `m` operations to this array, where in the `i`th operation you replace the number `operations[i][0]` with `operations[i][1]`.

It is guaranteed that in the `i`th operation:

- `operations[i][0]` **exists** in `nums`.
- `operations[i][1]` does **not** exist in `nums`.

Return *the array obtained after applying all the operations*.

**Constraints:**
- `n == nums.length`
- `m == operations.length`
- `1 <= n, m <= 10^5`
- All the values of `nums` are **distinct**.
- `operations[i].length == 2`
- `1 <= nums[i], operations[i][0], operations[i][1] <= 10^6`
- `operations[i][0]` will exist in `nums` when applying the `i`th operation.
- `operations[i][1]` will not exist in `nums` when applying the `i`th operation.

## Examples

**Example 1:**
```
Input: nums = [1,2,4,6], operations = [[1,3],[4,7],[6,1]]
Output: [3,2,7,1]
Explanation: We perform the following operations on nums:
- Replace the number 1 with 3. nums becomes [3,2,4,6].
- Replace the number 4 with 7. nums becomes [3,2,7,6].
- Replace the number 6 with 1. nums becomes [3,2,7,1].
We return the final array [3,2,7,1].
```

**Example 2:**
```
Input: nums = [1,2], operations = [[1,3],[2,1],[3,2]]
Output: [2,1]
Explanation: We perform the following operations to nums:
- Replace the number 1 with 3. nums becomes [3,2].
- Replace the number 2 with 1. nums becomes [3,1].
- Replace the number 3 with 2. nums becomes [2,1].
We return the array [2,1].
```

## Approach
Searching `nums` for `operations[i][0]` each time would be O(n·m) = 10^10 in the worst case. Because all values stay distinct (an operation always removes an existing value and inserts a new one), keep a hash map `pos: value → index`.

For each operation `[x, y]`: look up `i = pos[x]`, write `nums[i] = y`, remove `x` from the map and set `pos[y] = i`. Each operation is O(1).

```text
FUNCTION arrayChange(nums, operations):
    pos ← EMPTY HASH MAP
    FOR i ← 0 TO length(nums)-1:
        pos[nums[i]] ← i
    FOR each [x, y] IN operations:
        i ← pos[x]          // index currently holding x
        nums[i] ← y
        DELETE pos[x]
        pos[y] ← i
    RETURN nums
```

## Walkthrough
Example 1: `nums = [1,2,4,6]`, `operations = [[1,3],[4,7],[6,1]]`. Initial `pos = {1:0, 2:1, 4:2, 6:3}`.

| Operation | i = pos[x] | nums after | pos after |
|-----------|------------|------------|-----------|
| [1,3] | 0 | [3,2,4,6] | {3:0, 2:1, 4:2, 6:3} |
| [4,7] | 2 | [3,2,7,6] | {3:0, 2:1, 7:2, 6:3} |
| [6,1] | 3 | [3,2,7,1] | {3:0, 2:1, 7:2, 1:3} |

Result: `[3,2,7,1]` — matches the expected output.

## Complexity Analysis
- **Time:** O(n + m) — building the map plus O(1) average work per operation.
- **Space:** O(n) for the value-to-index map (values are always exactly n distinct numbers). Since values are at most 10^6, a plain array of size 10^6 + 1 can replace the hash map.

## Follow-Up Questions
1. What if values were not guaranteed distinct and each operation replaced *all* occurrences of `x`? (Map each value to a list/union-find group of indices and merge groups.)
2. Can you solve it without knowing `nums` positions, processing operations backwards? (Yes: compose the replacement chain in reverse with a map `final[x]`, then map each original value through it.)
3. How would you support undoing the last operation? (Store `[x, y]` on a stack and apply the reverse replacement `[y, x]`.)

## Key Takeaway
When elements are distinct and you repeatedly need "where is value x?", maintain a value-to-index map alongside the array so every replacement is constant time.
