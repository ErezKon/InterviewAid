# 3351. Sum of Good Subsequences

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-good-subsequences](https://leetcode.com/problems/sum-of-good-subsequences)
**Companies:** Google

---

## Problem Description
Given an integer array `nums`, a **good subsequence** is defined as a non‑empty subsequence whose bitwise OR equals the maximum element of that subsequence. Return the sum of the values of all good subsequences modulo `10^9 + 7`. A subsequence is a sequence that can be derived from the array by deleting some (or none) elements without changing the order of the remaining elements.

## Examples
**Example 1**
```
Input: nums = [1,2,3]
Output: 6
Explanation: Good subsequences are [1], [2], [3], [1,3], [2,3], [1,2,3] with sums 1+2+3+4+5+6 = 21, but only those where OR equals max are counted, resulting in sum 6.
```
**Example 2**
```
Input: nums = [0,0]
Output: 0
Explanation: All subsequences have OR 0 which equals max 0, sum is 0.
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
