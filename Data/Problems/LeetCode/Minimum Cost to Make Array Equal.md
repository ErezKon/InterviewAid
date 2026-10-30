# 2448. Minimum Cost to Make Array Equal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-cost-to-make-array-equal](https://leetcode.com/problems/minimum-cost-to-make-array-equal)
**Companies:** Amazon, Cisco, Google, Hashedin, Microsoft, Oracle

---

## Problem Description

You are given two **0-indexed** arrays `nums` and `cost` consisting each of `n` **positive** integers.

You can do the following operation **any** number of times:
- Increase or decrease **any** element of the array `nums` by `1`.

The cost of doing one operation on the `i-th` element is `cost[i]`.

Return *the **minimum** total cost such that all the elements of the array* `nums` *become **equal***.

**Constraints:**
- `n == nums.length == cost.length`
- `1 ≤ n ≤ 10^5`
- `1 ≤ nums[i], cost[i] ≤ 10^6`
- Test cases are generated in a way that the output doesn't exceed `2^53 - 1`

## Examples

```
Example 1:
  Input: nums = [1,3,5,2], cost = [2,3,1,14]
  Output: 8
  Explanation: We can make all the elements equal to 2 in the following way:
  - Increase the 0th element one time. The cost is 2.
  - Decrease the 1st element one time. The cost is 3.
  - Decrease the 2nd element three times. The cost is 1 + 1 + 1 = 3.
  The total cost is 2 + 3 + 3 = 8.
  It can be shown that we cannot make the array equal with a smaller cost.
```

```
Example 2:
  Input: nums = [2,2,2,2,2], cost = [4,2,8,1,3]
  Output: 0
  Explanation: All the elements are already equal, so no operations are needed.
```

## Approach

**Algorithm:** Weighted Median

The cost function is a weighted sum of absolute deviations. The value that minimizes this sum is any weighted median of the points, i.e., a value where the cumulative weight reaches at least half of the total weight.

Steps:
1. Pair each `nums[i]` with its `cost[i]` and sort by the `nums` value.
2. Compute the total weight `W = Σ cost[i]`.
3. Scan the sorted pairs, accumulating weights until the cumulative weight ≥ `W/2`. The corresponding `nums` value is a weighted median `target`.
4. Compute the total cost as `Σ |nums[i] - target| * cost[i]`.

```text
FUNCTION minCost(nums, cost):
    pairs ← ARRAY of (value, weight)
    FOR i ← 0 TO LEN(nums)-1 DO
        pairs.APPEND((nums[i], cost[i]))
    END FOR
    SORT pairs BY value ASC
    totalWeight ← 0
    FOR (_, w) IN pairs DO totalWeight ← totalWeight + w END FOR
    cumWeight ← 0
    target ← 0
    FOR (val, w) IN pairs DO
        cumWeight ← cumWeight + w
        IF cumWeight * 2 ≥ totalWeight THEN
            target ← val
            BREAK
        END IF
    END FOR
    result ← 0
    FOR i ← 0 TO LEN(nums)-1 DO
        result ← result + ABS(nums[i] - target) * cost[i]
    END FOR
    RETURN result
```

## Walkthrough

| Sorted `nums` | `cost` | Cumulative weight | Target reached? |
|---------------|--------|-------------------|----------------|
| 1 | 2 | 2 | No |
| 2 | 14 | 16 | Yes (≥ total/2 = 10) → target = 2 |
| … | … | … | … |

After selecting target = 2, compute total cost: `|1-2|*2 + |3-2|*3 + |5-2|*1 + |2-2|*14 = 2 + 3 + 3 + 0 = 8`.

## Complexity Analysis

| Metric | Complexity |
|--------|-------------|
| Time   | **O(n log n)** – sorting the pairs |
| Space  | **O(n)** – array of pairs |

## Follow‑Up Questions

1. How would the solution change if the cost to increase and decrease were different?
2. Can we find the optimal target without sorting, e.g., using a selection algorithm?
3. What if we needed to make the array equal to a value within a given range?

## Key Takeaway

The weighted median of the numbers, weighted by their per‑unit change costs, yields the minimal total cost for equalizing the array.
