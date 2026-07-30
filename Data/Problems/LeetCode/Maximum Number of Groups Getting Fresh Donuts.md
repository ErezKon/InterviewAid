# 1815. Maximum Number of Groups Getting Fresh Donuts

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-groups-getting-fresh-donuts](https://leetcode.com/problems/maximum-number-of-groups-getting-fresh-donuts)
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

A donut shop bakes in batches of `batchSize`. Given `groups` where `groups[i]` is the size of the i-th group, each group gets **fresh donuts** if the total donuts served before them is divisible by `batchSize`. You can rearrange the order of groups.

Return the **maximum number of groups** that get fresh donuts.

**Constraints:**
- `1 <= batchSize <= 9`
- `1 <= groups.length <= 30`
- `1 <= groups[i] <= 10^9`

---

## Examples

**Example 1:**
```
Input:  batchSize = 3, groups = [1,2,3,4,5,6]
Output: 4
Explanation: Groups with size divisible by 3 always get fresh donuts. 
Remaining groups can be paired to sum to multiples of 3.
```

**Example 2:**
```
Input:  batchSize = 4, groups = [1,3,2,5,2,2,1,6]
Output: 4
```

---

## Key Insight

> Only `groups[i] % batchSize` matters. Groups with remainder 0 always get fresh donuts. For the rest, this is a **state-space search** where the state is the count of each remainder class. Use **memoized DFS** (or bitmask DP) on the frequency array of remainders.

---

## Approach

```
FUNCTION maxHappyGroups(batchSize, groups)
    // Count remainders
    freq ← array of batchSize zeros
    FOR each g IN groups DO
        freq[g MOD batchSize] ← freq[g MOD batchSize] + 1

    result ← freq[0]   // Groups with remainder 0 always happy
    freq[0] ← 0

    // Pair complementary remainders greedily
    FOR r ← 1 TO batchSize / 2 DO
        comp ← batchSize - r
        IF r = comp THEN
            result ← result + freq[r] / 2
            freq[r] ← freq[r] MOD 2
        ELSE
            pairs ← MIN(freq[r], freq[comp])
            result ← result + pairs
            freq[r] ← freq[r] - pairs
            freq[comp] ← freq[comp] - pairs

    // DFS with memoization on remaining freq state
    result ← result + DFS(freq, 0, memo)
    RETURN result
END FUNCTION

FUNCTION DFS(freq, leftover, memo)
    state ← tuple(freq)
    IF state IN memo THEN RETURN memo[state]

    best ← 0
    FOR r ← 1 TO batchSize - 1 DO
        IF freq[r] > 0 THEN
            freq[r] ← freq[r] - 1
            happy ← 1 IF leftover = 0 ELSE 0
            best ← MAX(best, happy + DFS(freq, (leftover + r) MOD batchSize, memo))
            freq[r] ← freq[r] + 1

    memo[state] ← best
    RETURN best
END FUNCTION
```

---

## Walkthrough

```
batchSize = 3, groups = [1,2,3,4,5,6]
Remainders: [1,2,0,1,2,0] → freq = [2, 2, 2]
```

- freq[0] = 2 → 2 happy groups automatically. freq = [0, 2, 2]
- Pair r=1 with r=2: min(2,2) = 2 pairs → 2 more happy groups. freq = [0, 0, 0]
- Total: **4** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(batchSize^groups)** worst case, but memoization reduces drastically |
| Space  | **O(states)** — number of unique frequency tuples |

With batchSize ≤ 9 and groups ≤ 30, the state space is manageable.

---

## Follow-Up Questions

1. **Why reduce to remainders?**
   Only the cumulative sum mod batchSize matters for freshness — actual group sizes are irrelevant beyond their remainder.

2. **Why pair complementary remainders first?**
   It's a greedy optimization that reduces the DFS state space.

3. **How does batchSize ≤ 9 help?**
   The frequency array has at most 9 entries, keeping the memoization state space small.

---

## Key Takeaway

> **Remainder-based state compression + memoized DFS** — reduce group sizes to remainders, greedily pair complements, then search the remaining states for optimal ordering.
