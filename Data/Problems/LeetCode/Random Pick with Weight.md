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

You are given a **0-indexed** array of positive integers `w` where `w[i]` describes the **weight** of the `iᵗʰ` index.

You need to implement the function `pickIndex()`, which **randomly** picks an index in the range `[0, w.length - 1]` (**inclusive**) and returns it. The **probability** of picking an index `i` is `w[i] / sum(w)`.

- For example, if `w = [1, 3]`, the probability of picking index `0` is `1 / (1 + 3) = 0.25` (i.e., `25%`), and the probability of picking index `1` is `3 / (1 + 3) = 0.75` (i.e., `75%`).

**Constraints:**

- `1 <= w.length <= 10⁴`
- `1 <= w[i] <= 10⁵`
- `pickIndex` will be called at most `10⁴` times.

---

## 2. Examples

```
Example 1:
  Input: ["Solution","pickIndex"]
         [[[1]],[]]
  Output: [null,0]
  Explanation:
    Solution solution = new Solution([1]);
    solution.pickIndex(); // return 0. The only option is to return 0 since there is only one element in w.
```

```
Example 2:
  Input: ["Solution","pickIndex","pickIndex","pickIndex","pickIndex","pickIndex"]
         [[[1,3]],[],[],[],[],[]]
  Output: [null,1,1,1,1,0]
  Explanation:
    Solution solution = new Solution([1, 3]);
    solution.pickIndex(); // return 1. It is returning the second element (index = 1) that has a probability of 3/4.
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 1
    solution.pickIndex(); // return 0. It is returning the first element (index = 0) that has a probability of 1/4.

    Since this is a randomization problem, multiple answers are allowed.
    All of the following outputs can be considered correct:
    [null,1,1,1,1,0]
    [null,1,1,1,1,1]
    [null,1,1,1,0,0]
    [null,1,1,1,0,1]
    [null,1,0,1,0,0]
    ......
    and so on.
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
Example 2: Solution([1, 3])
prefixSum = [1, 4]
totalWeight = 4

pickIndex():
  target = random(1, 4)

  If target = 1 → index 0 (prefixSum[0]=1 ≥ 1)
  If target = 2 → index 1 (prefixSum[0]=1 < 2, prefixSum[1]=4 ≥ 2)
  If target = 3 → index 1
  If target = 4 → index 1

  Probabilities: 0→1/4, 1→3/4  ✅ (matches weights)

  Five calls drawing targets e.g. 3, 2, 4, 2, 1 → [1, 1, 1, 1, 0],
  giving the official sample output [null,1,1,1,1,0].

Example 1: Solution([1]) → prefixSum = [1], target is always 1 → returns 0.
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
