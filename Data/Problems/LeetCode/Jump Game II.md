# 45. Jump Game II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/jump-game-ii](https://leetcode.com/problems/jump-game-ii)
**Companies:** Adobe, Amazon, Apple, Atlassian, Bloomberg, Doordash, Ebay, Goldman Sachs, Google, Groupon, Hashedin, Ibm, Meta, Microsoft, Nutanix, Oracle, Phonepe, Samsung, Servicenow, Snowflake, Tcs, Tiktok, Tomtom, Zoho, Zulily

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Greedy BFS — O(n) ✅](#4-approach-greedy-bfs--on-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array where `nums[i]` is the max jump length from position `i`, return the **minimum number of jumps** to reach the last index. Guaranteed reachable.

**Constraints:**
- `1 <= nums.length <= 10⁴`
- `0 <= nums[i] <= 1000`

---

## 2. Examples

```
Input:  nums = [2,3,1,1,4]
Output: 2  (0 → 1 → 4)

Input:  nums = [2,3,0,1,4]
Output: 2  (0 → 1 → 4)
```

---

## 3. Key Insight

Think of it as **implicit BFS** where each "level" is the range of indices reachable with the current number of jumps. Track the farthest reachable index within each level. When you reach the boundary of the current level, you must take another jump.

---

## 4. Approach: Greedy BFS — O(n) ✅

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

---

## 5. Walkthrough

```
nums = [2, 3, 1, 1, 4]
```

| i | nums[i] | farthest | i == curEnd? | Action |
|---|---------|----------|-------------|--------|
| 0 | 2 | max(0, 2) = 2 | 0 == 0 ✅ | jump! jumps=1, curEnd=2 |
| 1 | 3 | max(2, 4) = 4 | 1 ≠ 2 | — |
| 2 | 1 | max(4, 3) = 4 | 2 == 2 ✅ | jump! jumps=2, curEnd=4 |
| 3 | — | — | 3 ≠ 4 | — (stop at n-2) |

**Result:** 2 jumps ✅

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(n) | Single pass |
| Space | O(1) | Three variables |

---

## 7. Follow-Up Questions

### 7.1 How does this relate to Jump Game I (#55)?

Jump Game I only asks if the end is reachable (yes/no). Jump Game II asks for the minimum jumps (assumes reachable).

### 7.2 Can this be solved with DP?

Yes. `dp[i] = min jumps to reach i`. For each i, update all reachable j. But that's O(n²) — the greedy approach is O(n).

### 7.3 What if backward jumps are allowed?

Then it becomes BFS on a graph (like Jump Game III), not a greedy problem.

---

## 8. Key Takeaway

> Greedy: at each jump, go as far as possible. `curEnd` marks the end of the current jump's reach; when we hit it, we must jump again and extend to `farthest`. This is implicit BFS in O(n) / O(1).
