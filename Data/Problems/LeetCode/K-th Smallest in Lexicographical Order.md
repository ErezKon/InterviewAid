# 440. K-th Smallest in Lexicographical Order

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/k-th-smallest-in-lexicographical-order](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order)
**Companies:** Amazon, De Shaw, Google, Hulu, Meta, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Counting Steps in Trie — O(log²n) ✅](#4-approach-counting-steps-in-trie--olog²n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Given `n` and `k`, return the k-th smallest integer in the lexicographical order of `[1, n]`.

**Constraints:** `1 <= k <= n <= 10⁹`

---

## 2. Examples

| n | k | Output |
|---|---|--------|
| 13 | 2 | 10 |
| 100 | 10 | 17 |
| 1000 | 1000 | 999 |

*Explanation:* The lexicographic order of numbers from 1 to 13 is `[1,10,11,12,13,2,3,4,5,6,7,8,9]`. The 2nd element is `10`.

---

## 3. Key Insight

Think of numbers 1..n as a **10-ary trie** (prefix tree). To find the k-th node in pre-order:
- Count how many nodes are under the current prefix.
- If k is within that subtree, go deeper (×10). Otherwise, skip to the next sibling (+1).

---

## 4. Approach: Counting Steps in Trie — O(log²n) ✅

```text
FUNCTION findKthNumber(n, k):
    SET curr ← 1
    SET k ← k - 1
    WHILE k > 0:
        SET steps ← countSteps(n, curr, curr + 1)
        IF steps <= k:
            SET k ← k - steps
            SET curr ← curr + 1    // move to next sibling
        ELSE:
            SET k ← k - 1
            SET curr ← curr * 10    // move to first child
    RETURN curr

FUNCTION countSteps(n, prefix1, prefix2):
    SET steps ← 0
    WHILE prefix1 <= n:
        SET steps ← steps + MIN(n + 1, prefix2) - prefix1
        SET prefix1 ← prefix1 * 10
        SET prefix2 ← prefix2 * 10
    RETURN steps
```

---

## 5. Walkthrough

**Example:** `n = 13, k = 2`

| Step | curr | k (remaining) | steps (curr→curr+1) | Action |
|------|------|---------------|---------------------|--------|
| 1 | 1 | 1 | 5 (1,10‑19) | steps > k → go deeper: `curr = 1*10 = 10`, `k = 0` |
| End | 10 | 0 | — | Return `curr = 10` |

The algorithm correctly returns `10` as the 2nd lexicographic number.

---

## 6. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(log²n) | Outer loop O(log n) × countSteps O(log n) |
| Space | O(1) | No extra data structures |

---

## 7. Key Takeaway

> Model numbers as a trie and navigate by counting subtree sizes. `countSteps` computes nodes between two prefixes level by level. This avoids materializing the sorted list.
