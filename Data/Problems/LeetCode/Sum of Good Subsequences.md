# 3351. Sum of Good Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-good-subsequences](https://leetcode.com/problems/sum-of-good-subsequences)
**Companies:** Google

---

## Problem Description

You are given an integer array `nums`. A **good subsequence** is defined as a subsequence of `nums` where the absolute difference between any **two** consecutive elements in the subsequence is **exactly** 1.

Return the **sum** of all *possible* **good subsequences** of `nums`.

Since the answer may be very large, return it **modulo** `10^9 + 7`.

**Note** that a subsequence of size 1 is considered good by definition.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `0 <= nums[i] <= 10^5`

## Examples

**Example 1:**
```
Input: nums = [1,2,1]
Output: 14
Explanation:
- Good subsequences are: [1], [2], [1], [1,2], [2,1], [1,2,1].
- The sum of elements in these subsequences is 14.
```

**Example 2:**
```
Input: nums = [3,4,5]
Output: 40
Explanation:
- Good subsequences are: [3], [4], [5], [3,4], [4,5], [3,4,5].
- The sum of elements in these subsequences is 40.
```

## Approach
A good subsequence is a chain where each next element differs from the previous one by exactly 1. Process `nums` left to right and keep, for every value `v`:
- `cnt[v]` = number of good subsequences (seen so far) that end with value `v`;
- `sum[v]` = total of element sums over those subsequences.

When we read `x`, the new good subsequences ending at this occurrence are:
- `[x]` alone (1 subsequence, sum `x`);
- any good subsequence ending with `x − 1` or `x + 1`, extended by `x`.

So the number of new subsequences is `c = 1 + cnt[x−1] + cnt[x+1]`, and their total sum is `s = sum[x−1] + sum[x+1] + c·x` (each of the `c` subsequences gains `x`). Add `c` to `cnt[x]` and `s` to `sum[x]`. The answer is the sum of all `sum[v]`. All arithmetic is mod 10^9 + 7.

```text
FUNCTION sumOfGoodSubsequences(nums)
    MOD ← 1_000_000_007
    cnt ← map with default 0      // value -> number of good subsequences ending with it
    sum ← map with default 0      // value -> total sum of those subsequences
    FOR EACH x IN nums
        c ← (1 + cnt[x-1] + cnt[x+1]) MOD MOD
        s ← (sum[x-1] + sum[x+1] + c * x) MOD MOD
        cnt[x] ← (cnt[x] + c) MOD MOD
        sum[x] ← (sum[x] + s) MOD MOD
    answer ← 0
    FOR EACH value v IN sum
        answer ← (answer + sum[v]) MOD MOD
    RETURN answer
```

## Walkthrough
Example 1: `nums = [1,2,1]`.

| Step | x | c = 1 + cnt[x-1] + cnt[x+1] | s = sum[x-1] + sum[x+1] + c·x | cnt after | sum after |
|------|---|-----------------------------|-------------------------------|-----------|-----------|
| 1 | 1 | 1 + 0 + 0 = 1 | 0 + 0 + 1 = 1 | {1:1} | {1:1} |
| 2 | 2 | 1 + cnt[1]=1 + 0 = 2 | sum[1]=1 + 0 + 2·2 = 5 | {1:1, 2:2} | {1:1, 2:5} |
| 3 | 1 | 1 + cnt[0]=0 + cnt[2]=2 = 3 | 0 + sum[2]=5 + 3·1 = 8 | {1:4, 2:2} | {1:9, 2:5} |

Step 2 adds `[2]` and `[1,2]` (sum 2 + 3 = 5); step 3 adds `[1]`, `[2,1]`, `[1,2,1]` (sum 1 + 3 + 4 = 8).
Answer = sum[1] + sum[2] = 9 + 5 = **14**.

## Complexity Analysis
- **Time:** O(n) — constant work per element (hash map or an array of size max(nums) + 2).
- **Space:** O(U) where U is the number of distinct values (at most 10^5 + 2 with an array).

## Follow-Up Questions
1. How would you count the good subsequences instead of summing them? (Only the `cnt` array is needed.)
2. What if consecutive elements may differ by at most `d` instead of exactly 1? (Sum `cnt`/`sum` over the range `[x−d, x+d]` with a Fenwick tree.)
3. How would you return the sum of the longest good subsequences only? (Track length alongside count/sum per value.)

## Key Takeaway
For "sum over all subsequences" problems, keep both the count and the aggregated sum per DP state: extending `c` subsequences by `x` adds `c·x` to the total, which lets the whole computation run in linear time.
