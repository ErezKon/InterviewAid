# 2218. Maximum Value of K Coins From Piles

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-value-of-k-coins-from-piles](https://leetcode.com/problems/maximum-value-of-k-coins-from-piles)
**Companies:** Google

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

There are `n` piles of coins. Each pile is a stack — you can only take coins from the **top**. You may take at most `k` coins **total** across all piles. Return the **maximum total value** of coins you can collect.

**Constraints:**
- `1 ≤ n ≤ 1000`
- `1 ≤ piles[i].length ≤ 25` (each pile has at most 25 coins)
- `1 ≤ k ≤ sum of all pile sizes`
- `1 ≤ piles[i][j] ≤ 10⁵`

---

## Examples

**Example 1:**
```
Input:  piles = [[1,100,3],[7,8,9]], k = 2
Output: 101
Explanation: Take top 2 from pile 0: 1+100 = 101.
```

**Example 2:**
```
Input:  piles = [[100],[100],[100],[100],[100],[100],[1,1,1,1,1,1,700]], k = 7
Output: 706
Explanation: Take 1 coin from each of the first 6 piles (600), then 1 from last pile (1+...→ actually take top of pile 7). Best: 6×100 + top of last pile = 600+1=601? Actually take all 7 from last pile: 1+1+1+1+1+1+700=706.
```

---

## Key Insight

> This is a **grouped knapsack / prefix-sum DP** problem. For each pile, you decide how many coins to take from the top (0, 1, 2, ..., up to pile size). Precompute prefix sums per pile, then use DP where `dp[j]` = max value using exactly `j` coins from the first `i` piles.

---

## Approach

```
FUNCTION maxValueOfCoins(piles, k):
    // dp[j] = max value using j coins from piles considered so far
    dp ← ARRAY[k+1] filled with 0

    FOR pile IN piles DO
        // Compute prefix sums for this pile
        prefix ← [0]
        FOR coin IN pile DO
            prefix.APPEND(prefix.LAST + coin)

        // Update dp in reverse (like 0/1 knapsack)
        newDp ← COPY(dp)
        FOR j ← 1 TO k DO
            FOR take ← 1 TO MIN(LEN(pile), j) DO
                newDp[j] ← MAX(newDp[j], dp[j - take] + prefix[take])
        dp ← newDp

    RETURN dp[k]
```

---

## Walkthrough

```
piles = [[1,100,3],[7,8,9]], k = 2

Pile 0: prefix = [0, 1, 101, 104]
  j=1: take 1 → dp[0]+1=1.   newDp[1]=1
  j=2: take 1 → dp[1]+1=1, take 2 → dp[0]+101=101.  newDp[2]=101
  dp = [0, 1, 101]

Pile 1: prefix = [0, 7, 15, 24]
  j=1: take 1 → dp[0]+7=7. newDp[1]=MAX(1,7)=7
  j=2: take 1 → dp[1]+7=8, take 2 → dp[0]+15=15. newDp[2]=MAX(101,8,15)=101
  dp = [0, 7, 101]

Return dp[2] = 101 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| DP with prefix sums | **O(n · k · m)** | **O(k)** |

Where `m` = max pile size (≤ 25). Total ≈ 1000 × 2000 × 25 = 50M, feasible.

---

## Follow-Up Questions

1. **Why prefix sums?** Taking `t` coins from the top of a pile gives a total of `prefix[t]` — avoids re-summing.
2. **Why process dp in a "new copy" pattern?** To avoid using coins from the same pile multiple times in the same iteration (similar to 0/1 knapsack).
3. **Can greedy work?** No — a pile might have a small top coin but huge coins underneath, so greedy by top value fails.
4. **What's the connection to knapsack?** Each pile is a "group" of items (take 0, 1, 2, ... coins). This is the **grouped knapsack** pattern.

---

## Key Takeaway

> **Grouped knapsack with prefix sums** — when items come in ordered groups where you must take a prefix, precompute prefix sums and iterate over group sizes in a knapsack DP.

---
