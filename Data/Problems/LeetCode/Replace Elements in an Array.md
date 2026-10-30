# 2295. Replace Elements in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/replace-elements-in-an-array](https://leetcode.com/problems/replace-elements-in-an-array)
**Companies:** Amazon

---

## Problem Description

> *Note: the Approach/Walkthrough below solve LC 1299 (Replace Elements with Greatest Element on Right Side), not this problem. Correct idea: keep a hash map `value → index`; for each operation `[x, y]`, set `i = pos[x]`, `nums[i] = y`, `pos[y] = i`, delete `pos[x]`. O(n + m).*

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
Traverse the array from right to left while keeping track of the maximum seen so far.

```text
FUNCTION ReplaceElements(arr):
    SET maxSoFar ← -1
    FOR i ← LENGTH(arr) - 1 DOWNTO 0:
        SET current ← arr[i]
        SET arr[i] ← maxSoFar
        IF current > maxSoFar:
            SET maxSoFar ← current
    RETURN arr
```

## Walkthrough
| Index | Original | maxSoFar before | New Value |
|------|----------|----------------|----------|
| 5 | 1 | -1 | -1 |
| 4 | 6 | 1 | 1 |
| 3 | 4 | 6 | 6 |
| 2 | 5 | 6 | 6 |
| 1 | 18 | 6 | 6 |
| 0 | 17 | 18 | 18 |

## Complexity Analysis
- Time: O(n) – single pass.
- Space: O(1) – in‑place modification.

## Follow‑Up Questions
1. How would you modify the algorithm to return a new array instead of modifying in place?
2. Can this be extended to a circular array where the right side wraps around?
3. What if we needed the second‑largest element to the right?

## Key Takeaway
Scanning from right to left lets you maintain the maximum seen so far, enabling an O(n) in‑place solution.
