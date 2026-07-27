# 55. Jump Game

**Difficulty:** 🟡 Medium
**Acceptance:** 39.0%
**LeetCode:** [https://leetcode.com/problems/jump-game](https://leetcode.com/problems/jump-game)
**Companies:** Adobe, Agoda, Amazon, Apple, Bloomberg, Bytedance, Cisco, Cognizant, Doordash, Goldman Sachs, Google, Hashedin, Infosys, Karat, Meesho, Meta, Microsoft, Morgan Stanley, Navi, Nielsen, Nike, Nvidia, Oracle, Paypal, Phonepe, Shopee, Tcs, Tiktok, Tomtom, Turing, Verily, Walmart Labs, Zoho

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach 1: Greedy (Forward) — O(n) ✅](#3-approach-1-greedy-forward--on-)
4. [Approach 2: Greedy (Backward) — O(n)](#4-approach-2-greedy-backward--on)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)

---

## 1. Problem Description

You are given an integer array `nums`. You are initially positioned at the array's **first index**, and each element represents your **maximum jump length** at that position.

Return `true` if you can reach the **last index**, or `false` otherwise.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `0 <= nums[i] <= 10⁵`

---

## 2. Examples

```
Example 1:
  Input:  nums = [2,3,1,1,4]
  Output: true
  Reason: Jump 1 step to index 1, then 3 steps to the last index.

Example 2:
  Input:  nums = [3,2,1,0,4]
  Output: false
  Reason: You'll always arrive at index 3 (value 0) and can't proceed.
```

---

## 3. Approach 1: Greedy (Forward) — O(n) ✅

Track the **farthest reachable** index. If at any point the current index exceeds the farthest reachable, return false.

```
FUNCTION canJump(nums):
    maxReach = 0

    FOR i ← 0 TO n - 1:
        IF i > maxReach:
            RETURN false
        maxReach = MAX(maxReach, i + nums[i])
        IF maxReach >= n - 1:
            RETURN true

    RETURN true
```

---

## 4. Approach 2: Greedy (Backward) — O(n)

Start from the last index. Move the "goal" backward whenever a position can reach the current goal.

```
FUNCTION canJump(nums):
    goal = n - 1

    FOR i ← n - 2 DOWN TO 0:
        IF i + nums[i] >= goal:
            goal = i

    RETURN goal == 0
```

---

## 5. Walkthrough

```
nums = [2, 3, 1, 1, 4]

Forward greedy:
  i=0: maxReach = MAX(0, 0+2) = 2
  i=1: maxReach = MAX(2, 1+3) = 4 ≥ 4 → RETURN true ✅

nums = [3, 2, 1, 0, 4]

Forward greedy:
  i=0: maxReach = MAX(0, 0+3) = 3
  i=1: maxReach = MAX(3, 1+2) = 3
  i=2: maxReach = MAX(3, 2+1) = 3
  i=3: maxReach = MAX(3, 3+0) = 3
  i=4: 4 > maxReach=3 → RETURN false ✅
```

---

## 6. Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| **Greedy (Forward)** | **O(n)** | **O(1)** |
| Greedy (Backward) | O(n) | O(1) |

---

## 7. Follow-Up Questions

### 7.1 Jump Game II (LeetCode #45) — Minimum jumps?

Greedy BFS approach: track the farthest reachable from the current "level." When you exhaust the current level, increment jumps and move to the next level.

```
FUNCTION jump(nums):
    jumps = 0
    curEnd = 0
    farthest = 0

    FOR i ← 0 TO n - 2:
        farthest = MAX(farthest, i + nums[i])
        IF i == curEnd:
            jumps += 1
            curEnd = farthest

    RETURN jumps
```

### 7.2 Jump Game III (LeetCode #1306)?

Can you reach index with value 0 starting from `start`? At each index, you can jump `+nums[i]` or `-nums[i]`. Use BFS/DFS.

### 7.3 Jump Game IV (LeetCode #1345)?

Jump to i-1, i+1, or any j where nums[j]==nums[i]. Minimum jumps to reach the end. BFS with a hash map grouping equal values.

### 7.4 Can DP solve this?

Yes, but O(n²). `dp[i] = true` if index i is reachable. For each reachable i, mark `dp[i+1..i+nums[i]]` as true. The greedy approach is strictly better.

---

## Key Takeaway

> Jump Game demonstrates that **greedy can outperform DP** when the optimal substructure is simple enough. The forward greedy "track max reach" pattern is elegant and O(n). Always check if a greedy invariant can replace a full DP table.
