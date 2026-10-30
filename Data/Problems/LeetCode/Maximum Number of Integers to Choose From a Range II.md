# 2557. Maximum Number of Integers to Choose From a Range II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-ii](https://leetcode.com/problems/maximum-number-of-integers-to-choose-from-a-range-ii)
**Companies:** Paypal

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

You are given an integer array `banned` and two integers `n` and `maxSum`. You are choosing some number of integers following the below rules:

- The chosen integers have to be in the range `[1, n]`.
- Each integer can be chosen **at most once**.
- The chosen integers should not be in the array `banned`.
- The sum of the chosen integers should not exceed `maxSum`.

Return *the **maximum** number of integers you can choose following the mentioned rules*.

**Constraints:**
- `1 <= banned.length <= 10^5`
- `1 <= banned[i] <= n <= 10^9`
- `1 <= maxSum <= 10^15`

---

## Examples

```
Example 1:
  Input: banned = [1,4,6], n = 6, maxSum = 4
  Output: 1
  Explanation: You can choose the integer 3.
    3 is in the range [1, 6], and do not appear in banned. The sum of the chosen integers is 3, which does not exceed maxSum.
```

```
Example 2:
  Input: banned = [4,3,5,6], n = 7, maxSum = 18
  Output: 3
  Explanation: You can choose the integers 1, 2, and 7.
    All these integers are in the range [1, 7], all do not appear in banned, and their sum is 10, which does not exceed maxSum.
```

---

## Key Insight

> With n up to 10^9, we can't iterate one-by-one. **Binary search** on the count: "can we pick `k` smallest non-banned numbers with sum ≤ maxSum?" The sum of the first `k` non-banned numbers can be computed using arithmetic series minus banned elements.

---

## Approach

```
FUNCTION maxCount(banned, n, maxSum)
    bannedSet ← SORT and DEDUPLICATE banned, filter to ≤ n
    // Binary search on how many we can pick
    lo ← 0, hi ← n - len(bannedSet)

    WHILE lo ≤ hi DO
        mid ← (lo + hi) / 2
        // Compute sum of smallest `mid` non-banned integers in [1..n]
        s ← sumOfSmallestK(mid, bannedSet, n)
        IF s ≤ maxSum THEN
            lo ← mid + 1
        ELSE
            hi ← mid - 1

    RETURN hi
END FUNCTION

FUNCTION sumOfSmallestK(k, banned, n)
    // Use binary search to find the k-th non-banned number
    // Then compute sum = total_sum(1..x) - sum_of_banned(≤ x)
    // Where x is the k-th non-banned number
    ... (binary search within to find x such that x - count_banned(≤x) = k)
END FUNCTION
```

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(b log b + log²n)** — sort banned, nested binary search |
| Space  | **O(b)** — sorted banned array |

---

## Follow-Up Questions

1. **How does this differ from the Range I version?**
   Range I has small n (≤10^4), allowing direct iteration. This needs binary search.

2. **Can prefix sums of banned help?**
   Yes — precompute prefix sums of sorted banned to quickly get sum-of-banned-up-to-x.

---

## Key Takeaway

> **Binary search on count + arithmetic series** — when the range is too large to iterate, binary search for how many elements fit and use math to compute their sum.
