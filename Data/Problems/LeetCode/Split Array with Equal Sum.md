# 548. Split Array with Equal Sum

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/split-array-with-equal-sum](https://leetcode.com/problems/split-array-with-equal-sum)
**Companies:** Alibaba

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode.*

Given an integer array `nums` of length `n`, return `true` if there is a triplet `(i, j, k)` which satisfies the following conditions:

- `0 < i, i + 1 < j, j + 1 < k < n - 1`
- The sum of subarrays `(0, i - 1)`, `(i + 1, j - 1)`, `(j + 1, k - 1)` and `(k + 1, n - 1)` is equal.

A subarray `(l, r)` represents a slice of the original array starting from the element indexed `l` to the element indexed `r`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 2000`
- `-10^6 <= nums[i] <= 10^6`

## Examples

**Example 1:**
```
Input: nums = [1,2,1,2,1,2,1]
Output: true
Explanation:
i = 1, j = 3, k = 5.
sum(0, i - 1) = sum(0, 0) = 1
sum(i + 1, j - 1) = sum(2, 2) = 1
sum(j + 1, k - 1) = sum(4, 4) = 1
sum(k + 1, n - 1) = sum(6, 6) = 1
```

**Example 2:**
```
Input: nums = [1,2,1,2,1,2,1,2]
Output: false
```

## Approach
Build prefix sums `p` so that `sum(l, r) = p[r+1] - p[l]` in O(1). Fix the **middle cut `j`** first; the problem then splits into two independent halves:

1. **Left half** (`1 ≤ i ≤ j-2`): every `i` with `sum(0, i-1) == sum(i+1, j-1)` produces a candidate common sum; store it in a hash set.
2. **Right half** (`j+2 ≤ k ≤ n-2`): for every `k` with `sum(j+1, k-1) == sum(k+1, n-1)`, if that sum is in the set, all four parts are equal → return `true`.

Each `j` costs O(n), giving O(n²) overall instead of the O(n³) brute force over all triplets.

```text
FUNCTION splitArray(nums):
    n ← LENGTH(nums)
    p[0] ← 0
    FOR t ← 0 TO n-1: p[t+1] ← p[t] + nums[t]
    // sum(l, r) = p[r+1] - p[l]
    FOR j ← 3 TO n-4:
        seen ← empty set
        FOR i ← 1 TO j-2:
            IF sum(0, i-1) == sum(i+1, j-1):
                ADD sum(0, i-1) TO seen
        FOR k ← j+2 TO n-2:
            IF sum(j+1, k-1) == sum(k+1, n-1) AND sum(k+1, n-1) IN seen:
                RETURN true
    RETURN false
```

## Walkthrough
Example 1: `nums = [1,2,1,2,1,2,1]`, `n = 7`, prefix `p = [0,1,3,4,6,7,9,10]`. Only `j = 3` is possible (`3 ≤ j ≤ n-4 = 3`).

| Phase | Index | Left/Right sums | Action |
|-------|-------|-----------------|--------|
| left  | i = 1 | sum(0,0)=1, sum(2,2)=1 | equal → seen = {1} |
| right | k = 5 | sum(4,4)=1, sum(6,6)=1 | equal and 1 ∈ seen → return true |

Output: `true`. (For Example 2, `n = 8`; for `j = 3` and `j = 4` no right-half match lies in the set, so the result is `false`.)

## Complexity Analysis
- **Time:** O(n²) — for each of the O(n) middle cuts, the left and right scans are O(n) each with O(1) prefix-sum queries.
- **Space:** O(n) for the prefix array and the hash set.

## Follow-Up Questions
1. How would you return the actual triplet `(i, j, k)` instead of a boolean?
2. How would you generalise to `m` cuts producing `m + 1` equal-sum parts?
3. If all numbers were non-negative, could you prune the search using monotonic prefix sums?

## Key Takeaway
Fixing the middle cut decouples the problem into two independent "two equal parts" checks; a hash set of left-side sums joins them, turning O(n³) into O(n²).
