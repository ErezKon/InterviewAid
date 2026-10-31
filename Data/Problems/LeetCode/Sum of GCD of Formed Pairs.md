# 3867. Sum of GCD of Formed Pairs

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/sum-of-gcd-of-formed-pairs](https://leetcode.com/problems/sum-of-gcd-of-formed-pairs)
**Companies:** Amazon

---

## Problem Description

> *Note: statement verified via doocs/leetcode.*

You are given an integer array `nums` of length `n`.

Construct an array `prefixGcd` where for each index `i`:

- Let `mx_i = max(nums[0], nums[1], ..., nums[i])`.
- `prefixGcd[i] = gcd(nums[i], mx_i)`.

After constructing `prefixGcd`:

- Sort `prefixGcd` in **non-decreasing** order.
- Form pairs by taking the **smallest unpaired** element and the **largest unpaired** element.
- Repeat this process until no more pairs can be formed.
- For each formed pair, **compute** the `gcd` of the two elements.
- If `n` is odd, the **middle** element in the `prefixGcd` array remains **unpaired** and should be ignored.

Return an integer denoting the **sum of the GCD** values of all formed pairs.

The term `gcd(a, b)` denotes the **greatest common divisor** of `a` and `b`.

**Constraints:**
- `1 <= n == nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

## Examples

**Example 1:**
```
Input: nums = [2,6,4]
Output: 2
Explanation:
Construct prefixGcd:
| i | nums[i] | mx_i | prefixGcd[i] |
|---|---------|------|--------------|
| 0 | 2       | 2    | 2            |
| 1 | 6       | 6    | 6            |
| 2 | 4       | 6    | 2            |
prefixGcd = [2, 6, 2]. After sorting, it forms [2, 2, 6].
Pair the smallest and largest elements: gcd(2, 6) = 2. The remaining middle element 2 is ignored. Thus, the sum is 2.
```

**Example 2:**
```
Input: nums = [3,6,2,8]
Output: 5
Explanation:
Construct prefixGcd:
| i | nums[i] | mx_i | prefixGcd[i] |
|---|---------|------|--------------|
| 0 | 3       | 3    | 3            |
| 1 | 6       | 6    | 6            |
| 2 | 2       | 6    | 2            |
| 3 | 8       | 8    | 8            |
prefixGcd = [3, 6, 2, 8]. After sorting, it forms [2, 3, 6, 8].
Form pairs: gcd(2, 8) = 2 and gcd(3, 6) = 3. Thus, the sum is 2 + 3 = 5.
```

## Approach
The process is fully specified, so simulate it directly:

1. Scan left to right with a running maximum `mx`; set `prefixGcd[i] = gcd(nums[i], mx)` (after updating `mx` with `nums[i]`).
2. Sort `prefixGcd`.
3. Pair index `i` with index `n-1-i` for `i < n/2` (smallest unpaired with largest unpaired); when `n` is odd the middle element is skipped automatically. Sum the gcd of each pair.

```text
FUNCTION gcdSum(nums):
    n ← LENGTH(nums)
    mx ← 0
    FOR i ← 0 TO n-1:
        mx ← MAX(mx, nums[i])
        prefixGcd[i] ← GCD(nums[i], mx)
    SORT prefixGcd ascending
    ans ← 0
    FOR i ← 0 TO n/2 - 1:          // integer division
        ans ← ans + GCD(prefixGcd[i], prefixGcd[n-1-i])
    RETURN ans
```

## Walkthrough
Example 2: `nums = [3,6,2,8]`.

| i | nums[i] | mx | prefixGcd[i] |
|---|---------|----|--------------|
| 0 | 3 | 3 | gcd(3,3) = 3 |
| 1 | 6 | 6 | gcd(6,6) = 6 |
| 2 | 2 | 6 | gcd(2,6) = 2 |
| 3 | 8 | 8 | gcd(8,8) = 8 |

Sorted: `[2,3,6,8]`. Pairs: `(2,8)` → 2, `(3,6)` → 3. Sum = `5`.

## Complexity Analysis
Time: O(n log n + n log M) – sorting plus O(log M) per gcd, with M ≤ 10⁹.
Space: O(n) for the `prefixGcd` array.

## Follow-Up Questions
* Since `prefixGcd[i] = nums[i]` whenever `nums[i]` is a new prefix maximum, can you exploit that to skip gcd calls?
* Values are only paired by rank — could counting sort or a heap replace the full sort for small value ranges?
* What if pairs were formed as adjacent elements in sorted order instead of smallest-with-largest?

## Key Takeaway
When a problem prescribes the exact procedure and constraints allow it, a direct simulation (prefix max, gcd, sort, two-pointer pairing) is the intended O(n log n) solution.
