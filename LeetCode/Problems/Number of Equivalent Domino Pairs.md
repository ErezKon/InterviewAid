# 1128. Number of Equivalent Domino Pairs

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/number-of-equivalent-domino-pairs](https://leetcode.com/problems/number-of-equivalent-domino-pairs)
**Companies:** Amazon, Bloomberg, Google

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Approach: Canonical Key + Counter — O(n)](#3-approach)
4. [Walkthrough](#4-walkthrough)
5. [Complexity Analysis](#5-complexity-analysis)
6. [Follow-Up Questions](#6-follow-up-questions)
7. [Key Takeaway](#7-key-takeaway)

---

## 1. Problem Description

Count pairs of dominoes `(i, j)` where `i < j` and dominoes `i` and `j` are equivalent (same values regardless of order).

---

## 2. Examples

**Example 1:**
```
Input: dominoes = [[1,2],[2,1],[3,4],[5,6]]
Output: 1
Explanation: The first two dominoes are equivalent.
```

**Example 2:**
```
Input: dominoes = [[1,2],[1,2],[1,1],[1,2],[2,2]]
Output: 3
Explanation: Equivalent pairs are (0,1), (0,3), (1,3).
```

---

## 3. Approach: Canonical Key + Counter — O(n) ✅

```text
FUNCTION numEquivDominoPairs(dominoes):
    count ← MAP()
    result ← 0
    FOR each domino IN dominoes:
        a ← domino[0]
        b ← domino[1]
        // canonical representation (min, max)
        key ← (MIN(a, b), MAX(a, b))
        // all previous dominoes with same key form pairs with current
        result ← result + GET(count, key, 0)
        SET count[key] ← GET(count, key, 0) + 1
    RETURN result
```

---

## 4. Walkthrough

For `dominoes = [[1,2],[2,1],[3,4],[5,6]]`:

| Step | Domino | Key | count before | result increment | count after |
|------|--------|-----|--------------|------------------|------------|
| 1 | [1,2] | (1,2) | {} → 0 | +0 | {(1,2):1}
| 2 | [2,1] | (1,2) | {(1,2):1} → 1 | +1 | {(1,2):2}
| 3 | [3,4] | (3,4) | {(1,2):2} → 0 | +0 | {(1,2):2,(3,4):1}
| 4 | [5,6] | (5,6) | … → 0 | +0 | …

Final result = 1.

---

## 5. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) |
| **Space** | O(n) for the hashmap |

---

## 6. Follow-Up Questions

1. How would you adapt the solution if domino values could be larger than 9 (e.g., up to 10⁵)?
2. Can you solve the problem using sorting instead of a hashmap?
3. What changes are needed if the dominoes are given as a stream?

---

## 7. Key Takeaway

> **Normalize with (min, max) then count pairs.** For each new domino, it pairs with all previously seen equivalent dominoes. Accumulate count before incrementing.
