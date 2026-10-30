# 1722. Minimize Hamming Distance After Swap Operations

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations](https://leetcode.com/problems/minimize-hamming-distance-after-swap-operations)
**Companies:** Bloomberg, Google, Sumologic

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

You are given two integer arrays, `source` and `target`, both of length `n`. You are also given an array `allowedSwaps` where each `allowedSwaps[i] = [a_i, b_i]` indicates that you are allowed to swap the elements at index `a_i` and index `b_i` **(0-indexed)** of array `source`. Note that you can swap elements at a specific pair of indices **multiple** times and in **any** order.

The **Hamming distance** of two arrays of the same length, `source` and `target`, is the number of positions where the elements are different. Formally, it is the number of indices `i` for `0 <= i <= n-1` where `source[i] != target[i]` **(0-indexed)**.

Return *the **minimum Hamming distance** of *`source`* and *`target`* after performing **any** amount of swap operations on array *`source`*.*

**Constraints:**
- `n == source.length == target.length`
- `1 <= n <= 10^5`
- `1 <= source[i], target[i] <= 10^5`
- `0 <= allowedSwaps.length <= 10^5`
- `allowedSwaps[i].length == 2`
- `0 <= a_i, b_i <= n - 1`
- `a_i != b_i`

---

## Examples

**Example 1:**
```
Input: source = [1,2,3,4], target = [2,1,4,5], allowedSwaps = [[0,1],[2,3]]
Output: 1
Explanation: source can be transformed the following way:
- Swap indices 0 and 1: source = [2,1,3,4]
- Swap indices 2 and 3: source = [2,1,4,3]
The Hamming distance of source and target is 1 as they differ in 1 position: index 3.
```

**Example 2:**
```
Input: source = [1,2,3,4], target = [1,3,2,4], allowedSwaps = []
Output: 2
Explanation: There are no allowed swaps.
The Hamming distance of source and target is 2 as they differ in 2 positions: index 1 and index 2.
```

**Example 3:**
```
Input: source = [5,1,2,4,3], target = [1,5,4,2,3], allowedSwaps = [[0,4],[4,2],[1,3],[1,4]]
Output: 0
```

---

## Key Insight

> Allowed swaps form **connected components** via Union-Find. Within each component, elements can be freely rearranged. For each component, count how many source values match target values using frequency counters — unmatched values contribute to Hamming distance.

---

## Approach: Union-Find + Frequency Counting ✅

```
FUNCTION minimumHammingDistance(source, target, allowedSwaps):
    uf ← UnionFind(LEN(source))
    FOR [a, b] IN allowedSwaps DO
        uf.union(a, b)

    groups ← defaultdict(list)
    FOR i DO groups[uf.find(i)].ADD(i)

    diff ← 0
    FOR indices IN groups.values() DO
        srcCount ← Counter(source[i] FOR i IN indices)
        tgtCount ← Counter(target[i] FOR i IN indices)
        diff ← diff + SUM((srcCount - tgtCount).values())
    RETURN diff
```

---

## Walkthrough

```
source = [1,2,3,4], target = [2,1,4,5], swaps = [[0,1],[2,3]]

Union-Find: {0,1} and {2,3}

Group {0,1}: source = {1,2}, target = {2,1}
  srcCount = {1:1, 2:1}, tgtCount = {2:1, 1:1}
  srcCount - tgtCount = {} → diff += 0

Group {2,3}: source = {3,4}, target = {4,5}
  srcCount = {3:1, 4:1}, tgtCount = {4:1, 5:1}
  srcCount - tgtCount = {3:1} → diff += 1

Total diff = 1 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Union-Find + counting | **O(n · α(n))** | **O(n)** |

Where α is the inverse Ackermann function (nearly constant).

---

## Follow-Up Questions

1. **Why Union-Find?** Swap transitivity means indices reachable through chains of swaps can freely rearrange — this is exactly connected components.
2. **Why Counter subtraction?** `srcCount - tgtCount` keeps only unmatched surplus in source, which equals the number of mismatches in that group.
3. **What if swaps are limited (e.g., at most k times)?** Would need a different approach — potentially BFS/DFS to check reachability within k hops.

---

## Key Takeaway

> **Union-Find for swap equivalence** — connected positions can freely rearrange. Within each component, compare multisets of source and target values to count irreducible mismatches.

---
