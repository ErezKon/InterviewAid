# 2829. Determine the Minimum Sum of a k-avoiding Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/determine-the-minimum-sum-of-a-k-avoiding-array](https://leetcode.com/problems/determine-the-minimum-sum-of-a-k-avoiding-array)
**Companies:** Infosys

---

## Table of Contents
- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach: Greedy Construction](#approach-greedy-construction)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given two integers `n` and `k`, construct an array of `n` **distinct positive integers** such that no two elements sum to `k`. Return the **minimum possible sum** of such an array.

**Constraints:**
- `1 <= n <= 50`
- `1 <= k <= 50`

---

## Examples

**Example 1:**
```
Input: n = 5, k = 4
Output: 18
Explanation: k-avoiding array = [1, 2, 4, 5, 6]. Sum = 18.
  Can't use both 1 and 3 (sum to 4), so skip 3.
```

**Example 2:**
```
Input: n = 2, k = 6
Output: 3
Explanation: [1, 2]. Sum = 3. No pair sums to 6.
```

---

## Key Insight

> For each pair `(x, k-x)`, you can include **at most one**. To minimize the sum, always pick the **smaller** of the pair. Greedily add numbers starting from 1, skipping any number whose complement `k - x` is already in the array.

Concretely: for `x < k/2`, both `x` and `k-x` can't coexist — always pick `x` (the smaller). Once you've used all numbers up to `⌊k/2⌋`, continue with numbers ≥ `k` (which have no forbidden complement in the array).

---

## Approach: Greedy Construction ✅

```
FUNCTION minimumSum(n, k):
    sum ← 0
    count ← 0
    num ← 1

    WHILE count < n DO
        // If num < k, check if complement (k - num) would conflict
        // We pick numbers 1..floor(k/2), then skip to k, k+1, ...
        IF num >= k OR num <= k / 2 THEN
            sum ← sum + num
            count ← count + 1
        END IF
        num ← num + 1
    END WHILE

    RETURN sum
END FUNCTION
```

Simpler closed-form approach:

```
FUNCTION minimumSum(n, k):
    // Take min(n, floor(k/2)) numbers from 1..floor(k/2)
    firstHalf ← MIN(n, FLOOR(k / 2))
    sum ← firstHalf * (firstHalf + 1) / 2

    // Remaining numbers start from k (no conflict possible)
    remaining ← n - firstHalf
    // Sum of k, k+1, ..., k+remaining-1
    sum ← sum + remaining * k + remaining * (remaining - 1) / 2

    RETURN sum
END FUNCTION
```

---

## Walkthrough

```
n = 5, k = 4
floor(k/2) = 2
```

**Phase 1:** Pick from `1..2` → pick `1, 2` (2 numbers, sum = 3)

**Phase 2:** Need 3 more, start from `k = 4` → pick `4, 5, 6` (sum = 15)

Total = 3 + 15 = **18** ✅

Skipped `3` because `3 + 1 = 4 = k`.

---

## Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| **Time** | O(1) | Closed-form arithmetic |
| **Space** | O(1) | No extra storage |

---

## Follow-Up Questions

**Q1: Why skip numbers in the range `(k/2, k)`?**
> If `x` is in `(k/2, k)`, then `k - x` is in `(0, k/2)` and we've already included `k - x`. Adding `x` would create a pair summing to `k`.

**Q2: Why are numbers ≥ k always safe?**
> If `x ≥ k`, then `k - x ≤ 0`, which isn't a positive integer. No valid complement exists.

**Q3: What if elements didn't need to be distinct?**
> You'd pick `1` repeated `n` times (sum = `n`), unless `1 + 1 = k` (i.e., `k = 2`), in which case pick all `2`s or handle specially.

---

## Key Takeaway

> **When building a k-avoiding set, greedily take the smaller element from each conflicting pair `(x, k-x)` and fill the rest with numbers ≥ k — this yields the minimum sum via a closed-form formula.**
