# 3350. Adjacent Increasing Subarrays Detection II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii](https://leetcode.com/problems/adjacent-increasing-subarrays-detection-ii)
**Companies:** Google

---

## Problem Description

Given an integer array `nums`, find the **maximum** integer `k` such that there exist two **adjacent** subarrays of length `k` that are both **strictly increasing**.

**Constraints:**
- `2 ≤ nums.length ≤ 2 × 10⁵`
- `-10⁹ ≤ nums[i] ≤ 10⁹`

---

## Examples

| nums | Output |
|------|--------|
| `[1,2,3,4,5]` | `2` |
| `[5,4,3,2,1]` | `1` |
| `[1,3,2,4,5,6]` | `2` |

*Explanation:* In the first array, the longest increasing run is length 5, allowing two adjacent subarrays of length 2. In the second array, no increasing pair exists beyond length 1.

---

## Approach

**Pre‑compute increasing run lengths — O(n)**

```text
FUNCTION maxIncreasingSubarrays(nums):
    n ← len(nums)
    inc ← ARRAY of size n filled with 1
    FOR i ← 1 TO n-1:
        IF nums[i] > nums[i-1]:
            inc[i] ← inc[i-1] + 1
    ans ← 1
    FOR i ← 0 TO n-2:
        // Two adjacent subarrays of length k ending at i and i+k
        ans ← MAX(ans, inc[i] // 2)               // both halves from one run
        IF i + 1 < n:
            ans ← MAX(ans, MIN(inc[i], inc[i+1])) // split at boundary
    RETURN ans
```

---

## Walkthrough

Consider `nums = [1,3,2,4,5,6]`.

1. Compute `inc` (increasing run length ending at each index):
   - `inc = [1,2,1,2,3,4]`.
2. Scan possible split points:
   - At `i=0`: `inc[0]=1`, `inc[1]=2` → min = 1 → ans = 1.
   - At `i=2`: `inc[2]=1`, `inc[3]=2` → min = 1.
   - At `i=3`: `inc[3]=2`, `inc[4]=3` → min = 2 → ans updates to 2.
   - At `i=4`: `inc[4]=3`, `inc[5]=4` → min = 3, but length 3 windows exceed array bounds, so ans stays 2.
3. Final answer is `2`.

---

## Complexity Analysis

| Time | Space |
|------|-------|
| O(n) | O(n) |

---

## Follow‑Up Questions

1. How would you modify the algorithm to return the actual subarrays, not just the length?
2. Can you solve the problem with O(1) extra space?
3. What if the subarrays need to be non‑adjacent but still of equal length?

---

## Key Takeaway

> Pre‑computing increasing‑run lengths ending at each index lets you evaluate every split point in linear time, yielding the maximum possible `k` for two adjacent increasing subarrays.