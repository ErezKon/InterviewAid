# 2611. Mice and Cheese

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/mice-and-cheese](https://leetcode.com/problems/mice-and-cheese)
**Companies:** Doordash

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

There are two mice and `n` different types of cheese, each type of cheese should be eaten by exactly one mouse.

A point of the cheese with index `i` (**0-indexed**) is:

- `reward1[i]` if the first mouse eats it.
- `reward2[i]` if the second mouse eats it.

You are given a positive integer array `reward1`, a positive integer array `reward2`, and a non-negative integer `k`.

Return ***the maximum** points the mice can achieve if the first mouse eats exactly* `k` *types of cheese.*

**Constraints:**
- `1 ≤ n == reward1.length == reward2.length ≤ 10⁵`
- `1 ≤ reward1[i], reward2[i] ≤ 1000`
- `0 ≤ k ≤ n`

---

## Examples

```
Example 1:
  Input: reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2
  Output: 15
  Explanation: In this example, the first mouse eats the 2nd (0-indexed) and the 3rd types of cheese, and the second mouse eats the 0th and the 1st types of cheese.
  The total points are 4 + 4 + 3 + 4 = 15.
  It can be proven that 15 is the maximum total points that the mice can achieve.
```

```
Example 2:
  Input: reward1 = [1,1], reward2 = [1,1], k = 2
  Output: 2
  Explanation: In this example, the first mouse eats the 0th (0-indexed) and 1st types of cheese, and the second mouse does not eat any cheese.
  The total points are 1 + 1 = 2.
  It can be proven that 2 is the maximum total points that the mice can achieve.
```

---

## Key Insight

> Start by giving all cheese to mouse 2 (sum of `reward2`). For each cheese switched to mouse 1, the net gain is `reward1[i] - reward2[i]`. Sort by this **difference** in descending order and switch the top `k` cheeses to mouse 1.

---

## Approach

```
FUNCTION miceAndCheese(reward1, reward2, k):
    n ← LEN(reward1)
    // Base: mouse 2 eats everything
    total ← SUM(reward2)
    
    // Compute gain from switching to mouse 1
    diff ← [reward1[i] - reward2[i] FOR i IN 0..n-1]
    SORT diff DESCENDING
    
    // Switch top k to mouse 1
    FOR i ← 0 TO k - 1 DO
        total ← total + diff[i]
    
    RETURN total
```

---

## Walkthrough

```
reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2

total = 4+4+1+1 = 10 (all to mouse 2)
diff = [1-4, 1-4, 3-1, 4-1] = [-3, -3, 2, 3]
Sorted desc: [3, 2, -3, -3]

Switch top 2: total += 3 + 2 = 15

Return 15 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Sort by difference | **O(n log n)** | **O(n)** |

---

## Follow-Up Questions

1. **Why start with all cheese to mouse 2?** It gives a clean baseline. Each switch adds `reward1[i] - reward2[i]`, making it a simple greedy selection.
2. **Can we use a heap instead of sorting?** Yes — use a max-heap of differences and pop `k` times, or use `nlargest(k, diff)` for O(n + k log n).
3. **What if there were 3 mice?** Becomes a more complex assignment problem — potentially solvable with DP or min-cost flow.

---

## Key Takeaway

> **Difference-based greedy** — when distributing items between two consumers, compute the marginal gain of switching each item and greedily pick the best `k` switches.

---
