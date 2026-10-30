# 2098. Subsequence of Size K With the Largest Even Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subsequence-of-size-k-with-the-largest-even-sum](https://leetcode.com/problems/subsequence-of-size-k-with-the-largest-even-sum)
**Companies:** Drw, Microsoft, Retailmenot

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

You are given an integer array `nums` and an integer `k`. Find the **largest even sum** of any subsequence of `nums` that has a length of `k`.

Return *this sum, or* `-1` *if such a sum does not exist*.

A **subsequence** is an array that can be derived from another array by deleting some or no elements without changing the order of the remaining elements.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`
- `1 <= k <= nums.length`

## Examples

**Example 1:**
```
Input: nums = [4,1,5,3,1], k = 3
Output: 12
Explanation:
The subsequence with the largest possible even sum is [4,5,3]. It has a sum of 4 + 5 + 3 = 12.
```

**Example 2:**
```
Input: nums = [4,6,2], k = 3
Output: 12
Explanation:
The subsequence with the largest possible even sum is [4,6,2]. It has a sum of 4 + 6 + 2 = 12.
```

**Example 3:**
```
Input: nums = [1,3,5], k = 1
Output: -1
Explanation:
No subsequence of nums with length 1 has an even sum.
```

## Approach
Sort the array in descending order and take the first `k` elements. If their sum is even, it is optimal. If the sum is odd, we need to swap the smallest odd element inside the chosen `k` with the largest even element outside (or vice‑versa) to flip parity while minimizing loss of total value.

```text
FUNCTION LargestEvenSum(nums, k):
    SORT nums DESCENDING
    SET chosen ← first k elements of nums
    SET sum ← SUM(chosen)
    IF sum MOD 2 = 0:
        RETURN sum
    SET minOddIn ← MINIMUM element in chosen WHERE element MOD 2 = 1
    SET minEvenIn ← MINIMUM element in chosen WHERE element MOD 2 = 0
    SET maxOddOut ← MAXIMUM element in nums[k:] WHERE element MOD 2 = 1
    SET maxEvenOut ← MAXIMUM element in nums[k:] WHERE element MOD 2 = 0
    SET candidate1 ← IF minOddIn AND maxEvenOut THEN sum - minOddIn + maxEvenOut ELSE -∞
    SET candidate2 ← IF minEvenIn AND maxOddOut THEN sum - minEvenIn + maxOddOut ELSE -∞
    SET best ← MAX(candidate1, candidate2)
    IF best = -∞:
        RETURN -1
    RETURN best
```

## Walkthrough
| Step | Chosen Elements | Sum | Parity | Action |
|------|----------------|-----|--------|--------|
| 1 | `[5,4,3]` (k=3) | 12 | even | Return 12 |
| 2 | `[5,3,2]` | 10 | even | Return 10 |
| 3 | `[5,3,1]` | 9 | odd | Swap `1` (odd in) with `4` (even out) → sum 12 |

## Complexity Analysis
- **Time:** O(n log n) for sorting; subsequent steps are O(n).
- **Space:** O(1) extra beyond the input array (in‑place sort possible).

## Follow-Up Questions
- How would you adapt the algorithm if the array could contain negative numbers?
- Can you solve the problem in O(n) time without full sorting?
- What changes are needed if you must return the actual subsequence, not just the sum?

## Key Takeaway
Sorting and a single parity‑fixing swap yields the maximum even sum for a fixed‑size subsequence.
