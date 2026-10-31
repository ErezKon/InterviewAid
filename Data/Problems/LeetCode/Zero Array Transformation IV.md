# 3489. Zero Array Transformation IV

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/zero-array-transformation-iv](https://leetcode.com/problems/zero-array-transformation-iv)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums` of length `n` and a 2D array `queries`, where `queries[i] = [l_i, r_i, val_i]`.

Each `queries[i]` represents the following action on `nums`:

- Select a subset of indices in the range `[l_i, r_i]` from `nums`.
- Decrement the value at each selected index by **exactly** `val_i`.

A **Zero Array** is an array with all its elements equal to 0.

Return the **minimum** possible **non-negative** value of `k`, such that after processing the first `k` queries in **sequence**, `nums` becomes a **Zero Array**. If no such `k` exists, return -1.

**Constraints:**
- `1 <= nums.length <= 10`
- `0 <= nums[i] <= 1000`
- `1 <= queries.length <= 1000`
- `queries[i] = [l_i, r_i, val_i]`
- `0 <= l_i <= r_i < nums.length`
- `1 <= val_i <= 10`

## Examples

**Example 1:**
```
Input: nums = [2,0,2], queries = [[0,2,1],[0,2,1],[1,1,3]]
Output: 2
Explanation: - For query 0 (l = 0, r = 2, val = 1):
- Decrement the values at indices [0, 2] by 1.
- The array will become [1, 0, 1].
- For query 1 (l = 0, r = 2, val = 1):
- Decrement the values at indices [0, 2] by 1.
- The array will become [0, 0, 0], which is a Zero Array. Therefore, the minimum value of k is 2.
```

**Example 2:**
```
Input: nums = [4,3,2,1], queries = [[1,3,2],[0,2,1]]
Output: -1
Explanation: It is impossible to make nums a Zero Array even after all the queries.
```

**Example 3:**
```
Input: nums = [1,2,3,2,1], queries = [[0,1,1],[1,2,1],[2,3,2],[3,4,1],[4,4,1]]
Output: 4
Explanation: - For query 0 (l = 0, r = 1, val = 1):
- Decrement the values at indices [0, 1] by 1.
- The array will become [0, 1, 3, 2, 1].
- For query 1 (l = 1, r = 2, val = 1):
- Decrement the values at indices [1, 2] by 1.
- The array will become [0, 0, 2, 2, 1].
- For query 2 (l = 2, r = 3, val = 2):
- Decrement the values at indices [2, 3] by 2.
- The array will become [0, 0, 0, 0, 1].
- For query 3 (l = 3, r = 4, val = 1):
- Decrement the value at index 4 by 1.
- The array will become [0, 0, 0, 0, 0]. Therefore, the minimum value of k is 4.
```

**Example 4:**
```
Input: nums = [1,2,3,2,6], queries = [[0,1,1],[0,2,1],[1,4,2],[4,4,4],[3,4,1],[4,4,5]]
Output: 4
```

## Approach
Treat each query as a resource that contributes `val` to a range. The goal is to pick a subset with minimum total `val` that satisfies the per-index requirement `required[i] = max(0, -nums[i])` (here nums are already non-negative, so requirement is 0; but the problem statement expects making them non-negative, so we consider deficits if any). Since all `val` are positive, the optimal strategy is to use a **minimum-cost flow** like greedy: repeatedly select the query with the smallest `val` that covers the most uncovered deficit.
A simpler polynomial solution uses a **difference array** combined with a **priority queue** of queries sorted by `val`.
1. Compute deficits `need[i] = max(0, -nums[i])` (if nums may be negative).
2. Sort queries by `val` ascending.
3. Iterate queries, applying them to a difference array and updating the running deficit. Stop when all deficits are satisfied.
4. Sum the `val` of applied queries.
If after processing all queries some deficit remains, return `-1`.

```text
FUNCTION minTotalVal(nums, queries):
    n ← LENGTH(nums)
    need ← ARRAY[n] OF 0
    FOR i FROM 0 TO n-1:
        IF nums[i] < 0:
            need[i] ← -nums[i]
    totalVal ← 0
    // Sort queries by val (smallest first)
    SORT queries BY query[2] ASC
    diff ← ARRAY[n+1] OF 0
    remaining ← SUM(need)
    FOR [l, r, val] IN queries:
        // Apply query to diff
        diff[l] ← diff[l] + val
        diff[r+1] ← diff[r+1] - val
        // Update need via prefix scan lazily
        curr ← 0
        FOR i FROM 0 TO n-1:
            curr ← curr + diff[i]
            IF need[i] > 0 AND curr >= need[i]:
                remaining ← remaining - need[i]
                need[i] ← 0
        IF remaining == 0:
            totalVal ← totalVal + val
            BREAK
        totalVal ← totalVal + val
    IF remaining > 0:
        RETURN -1
    RETURN totalVal
```

## Walkthrough
| Query | diff updates | Cumulative addition after query | Deficits satisfied |
|-------|--------------|--------------------------------|--------------------|
| [0,1,2] | +2 at 0, -2 at 2 | positions 0-1 get +2 | reduces need at those indices |
| [1,2,1] | +1 at 1, -1 at 3 | positions 1-2 get additional +1 | all deficits cleared → stop |

## Complexity Analysis
Time: O((n + q) · log q) due to sorting queries; the inner scan can be optimized with segment tree to O((n+q) log n) but the presented version is acceptable.
Space: O(n + q) for arrays and sorted list.

## Follow-Up Questions
1. How would you modify the algorithm if queries have both positive and negative `val` (allowing subtraction)?
2. Can the problem be solved in O(n + q) using a more sophisticated data structure such as a Fenwick tree with range updates?
3. What if each query also carries a cost independent of `val` and you need to minimize total cost?

## Key Takeaway
Sorting queries by their added value and applying them greedily while tracking remaining deficits yields a simple method to achieve the minimum total addition needed.
