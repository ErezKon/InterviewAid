# 440. K-th Smallest in Lexicographical Order

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/k-th-smallest-in-lexicographical-order](https://leetcode.com/problems/k-th-smallest-in-lexicographical-order)
**Companies:** Amazon, De Shaw, Google, Hulu, Meta, Microsoft, Tiktok

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: Counting Steps in Trie — O(log²n) ✅](#3-approach-counting-steps-in-trie--olog²n-)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Given `n` and `k`, return the k-th smallest integer in the lexicographical order of `[1, n]`.

**Constraints:** `1 <= k <= n <= 10⁹`

---

## 2. Key Insight

Think of numbers 1..n as a **10-ary trie** (prefix tree). To find the k-th node in pre-order:
- Count how many nodes are under the current prefix.
- If k is within that subtree, go deeper (×10). Otherwise, skip to the next sibling (+1).

---

## 3. Approach: Counting Steps in Trie — O(log²n) ✅

```
FUNCTION findKthNumber(n, k):
    curr = 1
    k -= 1

    WHILE k > 0:
        steps = countSteps(n, curr, curr + 1)
        IF steps <= k:
            k -= steps
            curr += 1    // move to next sibling
        ELSE:
            k -= 1
            curr *= 10    // move to first child

    RETURN curr

FUNCTION countSteps(n, prefix1, prefix2):
    steps = 0
    WHILE prefix1 <= n:
        steps += MIN(n + 1, prefix2) - prefix1
        prefix1 *= 10
        prefix2 *= 10
    RETURN steps
```

---

## 4. Complexity Analysis

| Metric | Value | Explanation |
|--------|-------|-------------|
| Time | O(log²n) | Outer loop O(log n) × countSteps O(log n) |
| Space | O(1) | No extra data structures |

---

## 5. Key Takeaway

> Model numbers as a trie and navigate by counting subtree sizes. `countSteps` computes nodes between two prefixes level by level. This avoids materializing the sorted list.
