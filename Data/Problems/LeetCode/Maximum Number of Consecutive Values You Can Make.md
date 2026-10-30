# 1798. Maximum Number of Consecutive Values You Can Make

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make](https://leetcode.com/problems/maximum-number-of-consecutive-values-you-can-make)
**Companies:** Infosys

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

You are given an integer array `coins` of length `n` which represents the `n` coins that you own. The value of the `i`th coin is `coins[i]`. You can **make** some value `x` if you can choose some of your `n` coins such that their values sum up to `x`.

Return the *maximum number of consecutive integer values that you **can make** with your coins **starting** from and **including*** `0`.

Note that you may have multiple coins of the same value.

**Constraints:**
- `coins.length == n`
- `1 <= n <= 4 × 10^4`
- `1 <= coins[i] <= 4 × 10^4`

---

## Examples

```
Example 1:
  Input: coins = [1,3]
  Output: 2
  Explanation: You can make the following values:
    - 0: take []
    - 1: take [1]
    You can make 2 consecutive integer values starting from 0.
```

```
Example 2:
  Input: coins = [1,1,1,4]
  Output: 8
  Explanation: You can make the following values:
    - 0: take []
    - 1: take [1]
    - 2: take [1,1]
    - 3: take [1,1,1]
    - 4: take [4]
    - 5: take [4,1]
    - 6: take [4,1,1]
    - 7: take [4,1,1,1]
    You can make 8 consecutive integer values starting from 0.
```

```
Example 3:
  Input: coins = [1,4,10,3,1]
  Output: 20
```

---

## Key Insight

> Sort coins. Maintain `reach` = the current maximum consecutive value we can form (starting from 0). For each coin: if `coin ≤ reach + 1`, we extend our range to `reach + coin`. Otherwise, there's a gap.

This is the same insight as the classic "minimum number of coins to make change" greedy.

---

## Approach

```
FUNCTION getMaximumConsecutive(coins)
    SORT coins
    reach ← 0     // can make [0..reach]

    FOR each coin IN coins DO
        IF coin > reach + 1 THEN
            BREAK   // gap found
        reach ← reach + coin

    RETURN reach + 1   // number of consecutive values [0..reach]
END FUNCTION
```

---

## Walkthrough

```
coins = [1, 1, 1, 4]  →  sorted: [1, 1, 1, 4]
```

| Step | coin | reach before | coin ≤ reach+1? | reach after |
|------|------|-------------|-----------------|-------------|
| 1    | 1    | 0           | 1 ≤ 1 ✅        | 1           |
| 2    | 1    | 1           | 1 ≤ 2 ✅        | 2           |
| 3    | 1    | 2           | 1 ≤ 3 ✅        | 3           |
| 4    | 4    | 3           | 4 ≤ 4 ✅        | 7           |

**Result: 7 + 1 = 8** ✅ (values 0 through 7)

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sorting |
| Space  | **O(1)** — single variable |

---

## Follow-Up Questions

1. **Why does this greedy work?**
   If we can make [0..reach], adding any coin ≤ reach+1 extends the range to [0..reach+coin] because we can combine it with every existing value.

2. **What if coins had duplicates?**
   Works the same — each coin is processed individually.

3. **How does this relate to "Patching Array" (LeetCode 330)?**
   Patching Array asks: how many coins must you ADD to reach a target? Same greedy framework but with insertion.

---

## Key Takeaway

> **Greedy range extension**: sort and expand `[0..reach]` by each coin — if `coin ≤ reach + 1`, we bridge the gap. This elegant O(n log n) pattern solves a family of consecutive-sum problems.
