# Array Equalization Patterns

**Difficulty:** 🟡 Medium
**Companies:** Various

---

## Problem Description

This file summarizes a family of array‑equalization problems on LeetCode. Each problem asks for the minimum number of operations (or total cost) to make all elements of an array equal under a specific set of allowed operations.

The table below lists the related problems, the operation allowed, and the formula for the answer.

## Examples

| Problem | Operation | Answer Formula |
|---------|-----------|----------------|
| #453 – Minimum Moves to Equal Array Elements | Increment **n‑1** elements by 1 (equivalently decrement 1 element) | `sum(nums) - n * min(nums)` |
| #462 – Minimum Moves to Equal Array Elements II | Increment or decrement a single element by 1 | `Σ |nums[i] - median(nums)|` |
| #2137 – Equal Water Distribution | Pour water between containers (capacity limits) | Limited by `min + capacity` of each container |
| #1551 – Minimum Operations to Make All Elements Equal | Increment or decrement any element by any amount | Sort array, use prefix sums to compute minimal total moves |

## Approach

For each variant, the key insight is to transform the operation into an equivalent cost function:

1. **Increment n‑1 elements** – decreasing one element by 1 has the same effect, so the total moves equal the sum of differences from the minimum element.
2. **Increment/Decrement one element** – the optimal target is any median of the array; the total moves are the sum of absolute deviations from that median.
3. **Pour between containers** – the reachable water level is bounded by the smallest container capacity plus its current water; the answer follows from capacity constraints.
4. **Arbitrary increments/decrements** – after sorting, the optimal target can be found by scanning prefix sums to balance the total increase and decrease needed.

## Walkthrough (Problem #462 Example)

| Step | Sorted array | Median | Cumulative cost |
|------|--------------|--------|-----------------|
| 1 | [1,2,3,4] | 2 or 3 | `|1-2|+|2-2|+|3-2|+|4-2| = 4` |

## Complexity Analysis

| Variant | Time | Space |
|---------|------|-------|
| #453 | **O(n)** | **O(1)** |
| #462 | **O(n log n)** (sort) | **O(1)** |
| #2137 | **O(n)** | **O(1)** |
| #1551 | **O(n log n)** (sort) | **O(1)** |

## Follow‑Up Questions

1. How would the solution change if each operation had a different cost per element?
2. Can these formulas be extended to multi‑dimensional arrays?
3. What if the array size is extremely large and cannot fit in memory?

## Key Takeaway

All these equalization problems reduce to finding an optimal target value (minimum, median, or capacity‑limited level) and summing the required adjustments, often achievable in linear or near‑linear time.
