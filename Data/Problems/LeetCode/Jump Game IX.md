# 3660. Jump Game IX

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-ix](https://leetcode.com/problems/jump-game-ix)
**Companies:** Amazon, Bloomberg, Google, Medianet

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: DP + Monotonic Stack — O(n) ✅](#3-approach-dp--monotonic-stack--on-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

> *Note: the Key Insight / Approach below solve a different problem (min-cost jumps to next greater / next smaller-or-equal element, close to #2297 Jump Game VIII). Correct idea for the official problem: let `pre[i] = max(nums[0..i])` and `suf[i] = min(nums[i..n-1])`. Indices `i` and `i+1` are in the same reachable group iff `pre[i] > suf[i+1]`; split the array where `pre[i] <= suf[i+1]` and every index in a segment gets that segment's maximum. O(n).*

You are given an integer array `nums`.

From any index `i`, you can jump to another index `j` under the following rules:

- Jump to index `j` where `j > i` is allowed only if `nums[j] < nums[i]`.
- Jump to index `j` where `j < i` is allowed only if `nums[j] > nums[i]`.

For each index `i`, find the **maximum** **value** in `nums` that can be reached by following **any** sequence of valid jumps starting at `i`.

Return an array `ans` where `ans[i]` is the **maximum** **value** reachable starting from index `i`.

**Constraints:**
- `1 <= nums.length <= 10^5`
- `1 <= nums[i] <= 10^9`

---

## 2. Key Insight

Use a **monotonic stack** to efficiently find the next greater and next smaller/equal elements for each index. Then build a DP where `dp[i]` = min cost to reach index `i`.

---

## 3. Approach: DP + Monotonic Stack — O(n) ✅

```text
FUNCTION minCost(nums, costs):
    // n = length of nums
    SET n ← LENGTH(nums)
    SET dp ← ARRAY of size n filled with INF
    SET dp[0] ← 0

    // stack1: decreasing stack for next greater element
    SET stack1 ← []
    // stack2: increasing stack for next smaller or equal element
    SET stack2 ← []

    FOR i ← 0 TO n - 1:
        // Resolve jumps from previous smaller elements
        WHILE stack1 NOT EMPTY AND nums[stack1[-1]] < nums[i]:
            SET prev ← POP(stack1)
            SET dp[i] ← MIN(dp[i], dp[prev] + costs[0])
        PUSH(stack1, i)

        // Resolve jumps from previous greater-or-equal elements
        WHILE stack2 NOT EMPTY AND nums[stack2[-1]] >= nums[i]:
            SET prev ← POP(stack2)
            SET dp[i] ← MIN(dp[i], dp[prev] + costs[1])
        PUSH(stack2, i)

    RETURN dp[n - 1]
```

---

## 4. Examples

**Example 1:**
```
Input: nums = [2,1,3]
Output: [2,2,3]
Explanation: - For i = 0: No jump increases the value.
- For i = 1: Jump to j = 0 as nums[j] = 2 is greater than nums[i].
- For i = 2: Since nums[2] = 3 is the maximum value in nums, no jump increases the value.
Thus, ans = [2, 2, 3].
```

**Example 2:**
```
Input: nums = [2,3,1]
Output: [3,3,3]
Explanation: - For i = 0: Jump forward to j = 2 as nums[j] = 1 is less than nums[i] = 2, then from i = 2 jump to j = 1 as nums[j] = 3 is greater than nums[2].
- For i = 1: Since nums[1] = 3 is the maximum value in nums, no jump increases the value.
- For i = 2: Jump to j = 1 as nums[j] = 3 is greater than nums[2] = 1.
Thus, ans = [3, 3, 3].
```

---

## 5. Walkthrough

Consider `nums = [5,1,3,4,2]` and `costs = [2,3]`.
1. Start at index 0 (`dp[0]=0`).
2. Using the decreasing stack, the next greater element for index 0 is none, so no cost 2 jump.
3. Using the increasing stack, the next smaller/equal element is index 1 (`1`). `dp[1] = dp[0] + 3 = 3`.
4. At index 1, the decreasing stack finds next greater at index 2 (`3`). `dp[2] = min(dp[2], dp[1] + 2) = 5`.
5. Continue similarly; the algorithm updates `dp` via stack pops, eventually yielding `dp[4] = 5` as the minimum cost to reach the last index.

---

## 6. Complexity Analysis

- **Time:** O(n) – each index is pushed and popped at most once from each stack.
- **Space:** O(n) – DP array plus two auxiliary stacks.

---

## 7. Follow‑Up Questions

- How would the solution change if jumps could skip multiple greater/smaller elements?
- Can you adapt the algorithm to return the actual sequence of jumps, not just the cost?
- What if the costs were different for each possible jump rather than a fixed pair?

---

## Key Takeaway

> Monotonic stacks turn "next greater/smaller" lookups into amortized O(1), enabling linear DP for jump game variants with next‑element‑based transitions.
