# 3685. Subsequence Sum After Capping Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/subsequence-sum-after-capping-elements](https://leetcode.com/problems/subsequence-sum-after-capping-elements)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums` of size `n` and a positive integer `k`.

An array **capped** by value `x` is obtained by replacing every element `nums[i]` with `min(nums[i], x)`.

For each integer `x` from 1 to `n`, determine whether it is possible to choose a **subsequence** from the array capped by `x` such that the sum of the chosen elements is **exactly** `k`.

Return a **0-indexed** boolean array `answer` of size `n`, where `answer[i]` is `true` if it is possible when using `x = i + 1`, and `false` otherwise.

**Constraints:**
- `1 <= n == nums.length <= 4000`
- `1 <= nums[i] <= n`
- `1 <= k <= 4000`

## Examples

**Example 1:**
```
Input: nums = [4,3,2,4], k = 5
Output: [false,false,true,true]
Explanation:
- For x = 1, the capped array is [1, 1, 1, 1]. Possible sums are 1, 2, 3, 4, so it is impossible to form a sum of 5.
- For x = 2, the capped array is [2, 2, 2, 2]. Possible sums are 2, 4, 6, 8, so it is impossible to form a sum of 5.
- For x = 3, the capped array is [3, 3, 2, 3]. A subsequence [2, 3] sums to 5, so it is possible.
- For x = 4, the capped array is [4, 3, 2, 4]. A subsequence [3, 2] sums to 5, so it is possible.
```

**Example 2:**
```
Input: nums = [1,2,3,4,5], k = 3
Output: [true,true,true,true,true]
Explanation: For every value of x, it is always possible to select a subsequence from the capped array that sums exactly to 3.
```

## Approach
Sort `nums` and sweep `x` from 1 to `n`. Elements `≤ x` are unchanged by capping, so add each of them once (when `x` first reaches its value) to a 0/1-knapsack set of reachable sums up to `k`, stored as a bitset (`reach |= reach << v`). The remaining `c` elements are all `> x` and each becomes exactly `x`, so they behave like `c` identical copies of `x`. Sum `k` is achievable iff for some `j` in `[0, c]` with `j·x ≤ k`, the sum `k − j·x` is reachable using the small elements.

```text
FUNCTION SubsequenceSumAfterCapping(nums, k):
    SET a ← SORT(nums)
    SET n ← LENGTH(a)
    SET reach ← bitset with only bit 0 set      // sums reachable from elements ≤ x
    SET i ← 0
    SET answer ← empty list
    FOR x ← 1 TO n:
        WHILE i < n AND a[i] ≤ x:
            SET reach ← (reach OR (reach << a[i])) restricted to bits 0..k
            SET i ← i + 1
        SET c ← n - i                            // elements capped to x
        SET ok ← false
        FOR j ← 0 TO c:
            IF j * x > k: BREAK
            IF reach has bit (k - j * x):
                SET ok ← true
                BREAK
        APPEND ok TO answer
    RETURN answer
```

## Walkthrough
`nums = [4,3,2,4]`, `k = 5` → sorted `[2,3,4,4]`.

| x | added to knapsack | reachable sums (≤ 5) | c (capped to x) | checks `k − j·x` | answer |
|---|-------------------|----------------------|-----------------|------------------|--------|
| 1 | - | {0} | 4 | 5, 4, 3, 2, 1 - none reachable | false |
| 2 | 2 | {0, 2} | 3 | 5, 3, 1 - none reachable | false |
| 3 | 3 | {0, 2, 3, 5} | 2 | 5 reachable (j = 0) | true |
| 4 | 4, 4 | {0, 2, 3, 4, 5} | 0 | 5 reachable (j = 0) | true |

Result: `[false, false, true, true]`, matching the expected output.

## Complexity Analysis
- **Time:** O(n log n + n·k/w + k log n) – sorting, each element is added to the bitset once (`k/w` word operations), and for each `x` at most `k/x + 1` values of `j` are checked (harmonic sum).
- **Space:** O(k/w) for the bitset plus O(n) for the answer.

## Follow-Up Questions
- Why is it valid to add each small element to the knapsack only once instead of rebuilding it for every `x`?
- How would you answer the same question for arbitrary queries `(x, k)` given offline?
- What if subsequences had to have exactly `m` elements?

## Key Takeaway
Sorting turns the per-`x` capping into an incremental process: small elements feed a growing subset-sum bitset, while all capped elements are interchangeable copies of `x`, so each query reduces to checking a few residues `k − j·x`.
