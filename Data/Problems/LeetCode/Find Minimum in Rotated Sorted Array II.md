# 154. Find Minimum in Rotated Sorted Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Given a rotated sorted array `nums` that may contain duplicate values, return the minimum element. The array was originally sorted in non‑decreasing order and then rotated an unknown number of times.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[2,2,2,0,1]` | `0` | The smallest value after rotation is `0`. |
| `[1,3,5]` | `1` | No rotation, the first element is the minimum. |
| `[10,1,10,10,10]` | `1` | Duplicates require careful handling of the high pointer. |

## Approach
Use a modified binary search. Compare `mid` with `hi`:
- If `nums[mid] > nums[hi]`, the minimum lies to the right of `mid`.
- If `nums[mid] < nums[hi]`, the minimum is at `mid` or left of it.
- If equal, decrement `hi` to shrink the search space safely.

## Walkthrough
Consider `[2,2,2,0,1]`:
| lo | hi | mid | nums[mid] | nums[hi] | Action |
|----|----|-----|----------|----------|--------|
| 0 | 4 | 2 | 2 | 1 | `nums[mid] > nums[hi]` → lo = mid+1 |
| 3 | 4 | 3 | 0 | 1 | `nums[mid] < nums[hi]` → hi = mid |
| 3 | 3 | - | - | - | loop ends, return `nums[lo]=0` |

## Complexity Analysis
- **Time:** O(log n) on average, O(n) worst‑case when many duplicates force linear shrinkage.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you find the rotation count instead of the minimum?
- Can you adapt the algorithm for a descending sorted array?
- What changes are needed if the array contains only unique elements?

## Key Takeaway
When duplicates are present, a binary search can still locate the minimum by cautiously reducing the high pointer when `nums[mid] == nums[hi]`.
