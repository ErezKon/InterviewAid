# 154. Find Minimum in Rotated Sorted Array II

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array-ii)
**Companies:** Amazon, Google, Meta, Microsoft

---

## Problem Description
Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,4,4,5,6,7]` might become:

- `[4,5,6,7,0,1,4]` if it was rotated `4` times.
- `[0,1,4,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` that may contain **duplicates**, return *the minimum element of this array*.

You must decrease the overall operation steps as much as possible.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- `nums` is sorted and rotated between `1` and `n` times.

**Follow up:** This problem is similar to Find Minimum in Rotated Sorted Array, but `nums` may contain **duplicates**. Would this affect the runtime complexity? How and why?

**Official examples:** `nums = [1,3,5]` → `1`; `nums = [2,2,2,0,1]` → `0`.

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
- **Time:** O(log n) on average, O(n) worst-case when many duplicates force linear shrinkage.
- **Space:** O(1) extra space.

## Follow-Up Questions
- How would you find the rotation count instead of the minimum?
- Can you adapt the algorithm for a descending sorted array?
- What changes are needed if the array contains only unique elements?

## Key Takeaway
When duplicates are present, a binary search can still locate the minimum by cautiously reducing the high pointer when `nums[mid] == nums[hi]`.
