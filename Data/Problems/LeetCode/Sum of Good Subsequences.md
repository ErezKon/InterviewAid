# 3351. Sum of Good Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-good-subsequences](https://leetcode.com/problems/sum-of-good-subsequences)
**Companies:** Google

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented OR-based problem. Correct idea: DP keyed by value — `cnt[v]` = number of good subsequences ending with value `v`, `sum[v]` = total of their element sums. For each `x`: `c = 1 + cnt[x−1] + cnt[x+1]`, `s = sum[x−1] + sum[x+1] + c·x`; then `cnt[x] += c`, `sum[x] += s`. Answer = `Σ sum[v]` mod 10⁹+7. O(n).*

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
The problem can be solved with dynamic programming over bitwise OR states.
1. Maintain a map `dp[or]` = sum of values of good subsequences ending with current prefix that have bitwise OR `or`.
2. Iterate through `num` in `nums` and update a new map `next`:
   - Start a new subsequence with `num` → `next[num] += num`.
   - Extend each existing subsequence: newOr = `or | num`; `next[newOr] += dp[or] + num * count[or]` where `count[or]` tracks number of subsequences with that OR.
3. After processing all elements, the answer is the sum of `dp[or]` for which `or` equals the maximum element of that subsequence (i.e., `or` is a power‑of‑two representation of the max). In practice, a subsequence is good iff `or` equals the maximum element, which holds when `or` has no bits outside the max.

```text
FUNCTION sumGoodSubsequences(nums):
    MOD ← 1_000_000_007
    dp ← empty map
    count ← empty map
    FOR num IN nums:
        nextDP ← dp.copy()
        nextCount ← count.copy()
        // start new subsequence
        SET nextDP[num] ← (nextDP.get(num,0) + num) % MOD
        SET nextCount[num] ← (nextCount.get(num,0) + 1) % MOD
        // extend existing subsequences
        FOR orVal, sumVal IN dp:
            newOr ← orVal OR num
            SET addVal ← (sumVal + num * count[orVal]) % MOD
            SET nextDP[newOr] ← (nextDP.get(newOr,0) + addVal) % MOD
            SET nextCount[newOr] ← (nextCount.get(newOr,0) + count[orVal]) % MOD
        dp ← nextDP
        count ← nextCount
    ans ← 0
    FOR orVal, sumVal IN dp:
        // good subsequence condition: orVal equals its maximum element
        IF isGood(orVal):
            SET ans ← (ans + sumVal) % MOD
    RETURN ans
```
*`isGood(orVal)` checks whether `orVal` has no bits other than those of its maximum element, which is true when `orVal` is a power of two or equals the maximum element itself.*

## Walkthrough
| Step | num | dp keys (OR) | Explanation |
|------|-----|--------------|-------------|
| 1 | 1 | {1:1} | Start subsequence `[1]`.
| 2 | 2 | {1:1, 2:2, 3:3} | Extend `[1]` → OR 3, start `[2]`.
| 3 | 3 | {1:1, 2:2, 3:6} | Extend previous subsequences, good ones where OR equals max contribute to answer.

## Complexity Analysis
- **Time:** O(n · M) where `M` is the number of distinct OR states (≤ 2 · maxBit). In practice `M` ≤ 1024 for 10‑bit numbers.
- **Space:** O(M) for the DP maps.

## Follow-Up Questions
1. How would the solution change if the definition of a good subsequence used bitwise AND instead of OR?
2. Can the algorithm be optimized to O(n) using bitset tricks for larger integer ranges?
3. How would you handle the problem if the array length could be up to 10⁵ with values up to 10⁹?

## Key Takeaway
By treating each possible bitwise OR as a DP state, we can iteratively build all subsequences and efficiently sum those that satisfy the “OR equals maximum” condition.
