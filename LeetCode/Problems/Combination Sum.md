# 39. Combination Sum

**Difficulty:** 🟡 Medium
**Acceptance:** 72.0%
**LeetCode:** [https://leetcode.com/problems/combination-sum](https://leetcode.com/problems/combination-sum)
**Companies:** Airbnb, Amazon, Apple, Bloomberg, Bytedance, Citadel, Confluent, Google, Hpe, Infosys, Linkedin, Meta, Microsoft, Netapp, Oracle, Paypal, Pinterest, Pure, Salesforce, Servicenow, Snapchat, Tiktok, Uber, Walmart Labs, Yahoo, Zoho, Zomato

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Backtracking — O(N^(T/M)) ✅](#3-approach-backtracking--ontm-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

Given an array of **distinct** integers `candidates` and a target integer `target`, return all **unique combinations** of candidates where the chosen numbers sum to `target`.

The **same** number may be chosen an **unlimited** number of times. Two combinations are unique if the frequency of at least one chosen number is different.

**Constraints:**
- `1 <= candidates.length <= 30`
- `2 <= candidates[i] <= 40`
- `1 <= target <= 40`

---

## 2. Examples

```
Example 1:
  Input:  candidates = [2,3,6,7], target = 7
  Output: [[2,2,3],[7]]

Example 2:
  Input:  candidates = [2,3,5], target = 8
  Output: [[2,2,2,2],[2,3,3],[3,5]]
```

---

## 3. Approach: Backtracking — O(N^(T/M)) ✅

### Key Idea

At each step, choose a candidate (can reuse) or move to the next candidate. Use a `start` index to avoid duplicates (only consider candidates from `start` onwards).

```
FUNCTION combinationSum(candidates, target):
    result = []
    SORT candidates          // optional, enables early termination
    backtrack(candidates, target, 0, [], result)
    RETURN result

FUNCTION backtrack(candidates, remaining, start, path, result):
    IF remaining == 0:
        result.ADD(copy of path)
        RETURN

    FOR i ← start TO len(candidates) - 1:
        IF candidates[i] > remaining:
            BREAK                // pruning (requires sorted array)

        path.ADD(candidates[i])
        backtrack(candidates, remaining - candidates[i], i, path, result)
        path.REMOVE_LAST()       // backtrack
```

---

## 4. Walkthrough

```
candidates = [2,3,6,7], target = 7

backtrack(7, start=0, path=[])
├── pick 2 → backtrack(5, start=0, path=[2])
│   ├── pick 2 → backtrack(3, start=0, path=[2,2])
│   │   ├── pick 2 → backtrack(1, start=0, path=[2,2,2])
│   │   │   └── 2 > 1, 3 > 1 → return
│   │   └── pick 3 → backtrack(0, start=1, path=[2,2,3]) → ADD [2,2,3]
│   └── pick 3 → backtrack(2, start=1, path=[2,3])
│       └── 3 > 2 → return
├── pick 3 → backtrack(4, start=1, path=[3])
│   └── pick 3 → backtrack(1, start=1, path=[3,3])
│       └── 3 > 1 → return
├── pick 6 → backtrack(1, start=2, path=[6])
│   └── 6 > 1 → return
└── pick 7 → backtrack(0, start=3, path=[7]) → ADD [7]

Result: [[2,2,3], [7]] ✅
```

---

## 5. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(N^(T/M)) where N = candidates, T = target, M = min candidate |
| **Space** | O(T/M) recursion depth |

---

## 6. Follow-Up Questions

### 6.1 Combination Sum II (LeetCode #40)?

Candidates may have duplicates, each used **at most once**. Sort, then skip duplicates at the same level: `if i > start and candidates[i] == candidates[i-1]: continue`.

### 6.2 Combination Sum III (LeetCode #216)?

Find k numbers from 1-9 that sum to n. Same backtracking with additional constraint on count.

### 6.3 Combination Sum IV (LeetCode #377)?

Count the number of combinations (order matters = permutations). Use DP: `dp[target] = sum(dp[target - c] for c in candidates)`.

### 6.4 Coin Change (LeetCode #322)?

Find **minimum** number of coins (not all combinations). DP: `dp[amount] = min(dp[amount - c] + 1)`.

---

## Key Takeaway

> The **start index** parameter prevents duplicate combinations — we only consider candidates from the current index onwards. The `remaining < candidates[i]` pruning (on a sorted array) significantly reduces the search space.
