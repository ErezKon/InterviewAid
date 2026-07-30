# 2799. Count Complete Subarrays in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/count-complete-subarrays-in-an-array](https://leetcode.com/problems/count-complete-subarrays-in-an-array)
**Companies:** Amazon, Google, Meta, Tiktok

---

## Problem Description
Given an integer array `nums`, a subarray is **complete** if it contains all distinct values that appear in the entire array. Return the number of complete subarrays.

## Examples
| nums | Output | Explanation |
|------|--------|-------------|
| [1,3,1,2,2] | 4 | Complete subarrays are `[1,3,1,2]`, `[3,1,2,2]`, `[1,3,1,2,2]`, `[3,1,2]` |
| [1,2,3] | 1 | Only the whole array is complete |

## Approach
Use a sliding window to maintain a count of distinct elements in the current window. Let `total` be the number of distinct values in `nums`. Expand the right pointer, updating the frequency map. When the window contains all `total` distinct values, every extension of the right pointer yields a complete subarray, so add `len(nums) - right` to the answer and shrink from the left until the window is no longer complete.

### Pseudocode
```text
FUNCTION countCompleteSubarrays(nums):
    total ← LENGTH(SET(nums))
    left ← 0
    count ← 0
    window ← MAP()
    FOR right ← 0 TO LENGTH(nums) - 1:
        INCREMENT window[nums[right]]
        WHILE LENGTH(window) == total:
            SET count ← count + (LENGTH(nums) - right)
            DECREMENT window[nums[left]]
            IF window[nums[left]] == 0:
                DELETE window[nums[left]]
            SET left ← left + 1
    RETURN count
```

## Walkthrough
For `nums = [1,3,1,2,2]`:
1. `total = 3` distinct values.
2. Expand right pointer, track frequencies.
3. When window `[1,3,1,2]` (indices 0‑3) contains all three values, add `5 - 3 = 2` to count (subarrays ending at 3 and 4). Continue shrinking and counting as per algorithm, resulting in total 4.

## Complexity Analysis
- Time: O(n) – each element enters and leaves the window at most once.
- Space: O(k) where `k` is the number of distinct values.

## Follow-Up Questions
- How would you modify the algorithm to count subarrays that contain at least `k` distinct numbers?
- Can this be extended to handle streams of data where the array is not fully known in advance?
- What is the effect on complexity if you need to output all complete subarrays instead of just counting them?

## Key Takeaway
A sliding‑window with a frequency map efficiently counts complete subarrays by adding `len(nums) - right` each time the window first becomes complete.
