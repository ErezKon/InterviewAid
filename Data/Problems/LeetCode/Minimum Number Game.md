# 2974. Minimum Number Game

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/minimum-number-game](https://leetcode.com/problems/minimum-number-game)
**Companies:** Bloomberg, Bt Group, Google, Meta, Microsoft

---

## Problem Description

You are given an array `nums` of even length containing distinct integers. You must reorder the array into a new array `result` of the same length such that for every even index `i` (0‑based), the pair `(result[i], result[i+1])` consists of the two smallest remaining numbers, with the smaller number placed at `i+1` and the larger at `i`. Return the resulting array.

Constraints:
- `2 ≤ nums.length ≤ 10^5`
- `nums.length` is even
- All elements of `nums` are distinct

## Examples

**Example 1**
```
Input: nums = [3,5,2,3]
Output: [5,3,2,3]
Explanation: After sorting we have [2,3,3,5]. Pair (5,3) then (2,3) yields the required ordering.
```

**Example 2**
```
Input: nums = [1,2,3,4,5,6]
Output: [2,1,4,3,6,5]
Explanation: Sorted array is [1,2,3,4,5,6]; we swap each adjacent pair.
```

## Approach

**Algorithm:** Greedy sorting with pairwise swapping

1. Sort `nums` in non‑decreasing order.
2. Iterate over the sorted array with step size 2.
3. For each pair `(i, i+1)`, place the larger element first and the smaller second in the result.

```text
FUNCTION numberGame(nums):
    SORT nums ASCENDING
    result ← ARRAY(LEN(nums))
    FOR i ← 0 TO LEN(nums)-1 STEP 2 DO
        result[i] ← nums[i+1]
        result[i+1] ← nums[i]
    END FOR
    RETURN result
```

## Walkthrough

| Index `i` | Sorted `nums[i]` | Sorted `nums[i+1]` | Result positions |
|-----------|------------------|-------------------|-----------------|
| 0 | 1 | 2 | result[0]=2, result[1]=1 |
| 2 | 3 | 4 | result[2]=4, result[3]=3 |
| 4 | 5 | 6 | result[4]=6, result[5]=5 |

The final `result` satisfies the required ordering.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n log n)** – sorting dominates |
| Space  | **O(n)** – result array (in‑place possible) |

## Follow‑Up Questions

1. How would the solution change if the array length could be odd?
2. Can we achieve the same ordering without an explicit sort, e.g., using a selection algorithm?
3. What if we needed to maximize the sum of the first elements of each pair instead?

## Key Takeaway

Sorting the numbers and then swapping each adjacent pair yields the lexicographically smallest arrangement where each larger element precedes the smaller one in its pair.
