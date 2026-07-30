# 2098. Subsequence of Size K With the Largest Even Sum

**Difficulty:** 🟡 Medium

**Companies:** Drw, Microsoft, Retailmenot
---

## Problem Description
Given an integer array `nums` and an integer `k`, select exactly `k` elements to form a subsequence whose sum is as large as possible **and** even. Return the maximum possible even sum. If no such subsequence exists, return `-1`.

## Examples
- **Input:** `nums = [3,1,4,2,5]`, `k = 3`
  **Output:** `12`
  **Explanation:** Choose `[5,4,3]` → sum `12` (even) which is maximal.
- **Input:** `nums = [1,2,3]`, `k = 2`
  **Output:** `-1`
  **Explanation:** The only possible sums are `3` and `5`, both odd; no even sum exists.

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
