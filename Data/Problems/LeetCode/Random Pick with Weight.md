# 528. Random Pick with Weight

**Difficulty:** 🟡 Medium
**Acceptance:** 47.0%
**LeetCode:** [https://leetcode.com/problems/random-pick-with-weight](https://leetcode.com/problems/random-pick-with-weight)
**Companies:** 6Sense, Adobe, Amazon, Apple, Bloomberg, Coinbase, Coupang, Criteo, Google, Liftoff, Linkedin, Meta, Microsoft, Nuro, Paypal, Revolut, Roblox, Rubrik, Shopee, Snapchat, Snowflake, Sony, Tiktok, Two Sigma, Uber, Waymo

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Prefix Sum + Binary Search — O(log n) ✅](#3-approach-prefix-sum--binary-search--olog-n-)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)

---

## 1. Problem Description

You are given a 0-indexed array of positive integers `w` where `w[i]` describes the **weight** of the `iᵗʰ` index.

Implement `pickIndex()` which **randomly** picks an index in the range `[0, w.length - 1]` (**inclusive**). The probability of picking index `i` is `w[i] / sum(w)`.

---

## 2. Examples

```
Input:
  ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
  [[[1,3]],[],[],[],[],[]]

Output: [null,1,1,1,1,0]
  Index 0 has weight 1, index 1 has weight 3.
  Probability of picking 0 = 1/4, picking 1 = 3/4.
```

---

## 3. Approach: Prefix Sum + Binary Search — O(log n) ✅

### Key Insight

Build a **prefix sum** array. Generate a random number in `[1, totalWeight]`. Binary search for the index where this random number falls.

```
CLASS Solution:
    CONSTRUCTOR(w):
        prefixSum = []
        runningSum = 0
        FOR weight IN w:
            runningSum += weight
            prefixSum.ADD(runningSum)
        totalWeight = runningSum

    FUNCTION pickIndex():
        target = RANDOM(1, totalWeight)     // inclusive

        // Binary search: find leftmost index where prefixSum[i] >= target
        lo = 0
        hi = len(prefixSum) - 1
        WHILE lo < hi:
            mid = (lo + hi) / 2
            IF prefixSum[mid] < target:
                lo = mid + 1
            ELSE:
                hi = mid
        RETURN lo
```

### Why This Works

Each index `i` "owns" the range `(prefixSum[i-1], prefixSum[i]]`. A uniform random number in `[1, total]` falls into index `i`'s range with probability `w[i] / total`.

---

## 4. Walkthrough

```
w = [1, 3, 2]
prefixSum = [1, 4, 6]
totalWeight = 6

pickIndex():
  target = random(1, 6)

  If target = 1 → binary search finds index 0 (prefixSum[0]=1 ≥ 1)
  If target = 2 → index 1 (prefixSum[0]=1 < 2, prefixSum[1]=4 ≥ 2)
  If target = 3 → index 1
  If target = 4 → index 1
  If target = 5 → index 2
  If target = 6 → index 2

  Probabilities: 0→1/6, 1→3/6, 2→2/6  ✅ (matches weights)
```

---

## 5. Complexity Analysis

| Operation | Time | Space |
|-----------|------|-------|
| Constructor | O(n) | O(n) |
| pickIndex | O(log n) | O(1) |

---

## 6. Follow-Up Questions

### 6.1 What if weights change frequently?

Use a **Binary Indexed Tree (Fenwick Tree)** or **Segment Tree** for O(log n) updates and O(log n) queries.

### 6.2 What about the Alias Method?

O(n) preprocessing, O(1) per pick. Each index gets a "probability" and an "alias" (alternative index). For each pick: choose a random index, then flip a biased coin to decide between that index and its alias.

### 6.3 Linked List Random Node (LeetCode #382)?

Reservoir sampling: pick the kth node with probability 1/k. O(n) per pick, O(1) space.

---

## Key Takeaway

> **Prefix sum + binary search** converts weighted random selection into a range query problem. This is the standard technique for weighted sampling with fixed weights.
