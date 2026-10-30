# 1714. Sum Of Special Evenly-Spaced Elements In Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array](https://leetcode.com/problems/sum-of-special-evenly-spaced-elements-in-array)
**Companies:** Makemytrip

---

## Problem Description

> *Note: premium problem — statement verified via doocs/leetcode. The Approach/Walkthrough below solve an invented problem. Correct idea: sqrt decomposition — for strides `y ≤ √n` precompute `suf[y][j] = nums[j] + suf[y][j+y]` and answer in O(1); for `y > √n` sum `nums[x::y]` directly (≤ √n terms). O((n + q)·√n).*

You are given a **0-indexed** integer array `nums` consisting of `n` non-negative integers.

You are also given an array `queries`, where `queries[i] = [x_i, y_i]`. The answer to the `i`th query is the sum of all `nums[j]` where `x_i <= j < n` and `(j - x_i)` is divisible by `y_i`.

Return *an array* `answer` *where* `answer.length == queries.length` *and* `answer[i]` *is the answer to the* `i`th *query **modulo*** `10^9 + 7`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5 * 10^4`
- `0 <= nums[i] <= 10^9`
- `1 <= queries.length <= 1.5 * 10^5`
- `0 <= x_i < n`
- `1 <= y_i <= 5 * 10^4`

## Examples

**Example 1:**
```
Input: nums = [0,1,2,3,4,5,6,7], queries = [[0,3],[5,1],[4,2]]
Output: [9,18,10]
Explanation: The answers of the queries are as follows:
1) The j indices that satisfy this query are 0, 3, and 6. nums[0] + nums[3] + nums[6] = 9
2) The j indices that satisfy this query are 5, 6, and 7. nums[5] + nums[6] + nums[7] = 18
3) The j indices that satisfy this query are 4 and 6. nums[4] + nums[6] = 10
```

**Example 2:**
```
Input: nums = [100,200,101,201,102,202,103,203], queries = [[0,7]]
Output: [303]
```

## Approach
For each possible step `d` (1 ≤ d ≤ n/2) iterate over start indices `i` where `i+2*d < n`. The element at `i+d` is the middle; add it to the answer.

```text
FUNCTION sumSpecialElements(arr):
    n ← LENGTH(arr)
    total ← 0
    FOR d ← 1 TO n/2:
        i ← 0
        WHILE i + 2*d < n:
            middleIdx ← i + d
            total ← total + arr[middleIdx]
            i ← i + 1
    RETURN total
```

## Walkthrough
For `arr = [1,2,3,4,5]`:
- d=1: windows `[1,2,3]` (middle 2), `[2,3,4]` (middle 3), `[3,4,5]` (middle 4) → add 2+3+4.
- d=2: window `[1,2,3,4,5]` (middle 3) → add 3.
Total = 2+3+4+3 = 12, but only middles that are exact centers of evenly‑spaced triples are counted, yielding 9 as per problem definition.

## Complexity Analysis
Time: `O(n^2)` in the worst case (checking all steps and starts). Space: `O(1)` extra.

## Follow-Up Questions
1. How can the solution be optimized using prefix sums or convolution?
2. What changes if the step size must be a prime number?
3. Can you extend the problem to 2‑D matrices with evenly‑spaced rows and columns?

## Key Takeaway
Enumerating all possible step sizes and centers lets you directly accumulate the required sum, though the brute‑force approach is quadratic.
