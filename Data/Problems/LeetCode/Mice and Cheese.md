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

Two mice are eating `n` types of cheese. `reward1[i]` is the reward if mouse 1 eats cheese `i`, `reward2[i]` for mouse 2. Mouse 1 eats exactly `k` cheeses, mouse 2 eats the rest. Maximize the **total reward**.

**Constraints:**
- `1 ≤ n ≤ 10⁵`
- `1 ≤ reward1[i], reward2[i] ≤ 1000`
- `0 ≤ k ≤ n`

---

## Examples

**Example 1:**
```
Input:  reward1 = [1,1,3,4], reward2 = [4,4,1,1], k = 2
Output: 15
Explanation: Mouse 1 eats cheese 2,3 (3+4=7). Mouse 2 eats cheese 0,1 (4+4=8). Total=15.
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
