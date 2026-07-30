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

From index `i`, you can jump to the **next greater element** (cost `costs[0]`) or the **next smaller or equal element** (cost `costs[1]`). Find the minimum cost to reach the last index from index 0.

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

| nums               | costs          | Output |
|--------------------|----------------|--------|
| `[5,1,3,4,2]`      | `[2,3]`        | `5`    |
| `[1,2,3,4]`        | `[1,1]`        | `3`    |

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
