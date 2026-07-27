# 1383. Maximum Performance of a Team

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/maximum-performance-of-a-team](https://leetcode.com/problems/maximum-performance-of-a-team)
**Companies:** Amazon, Citrix, De Shaw, Flipkart, Google, Meta, Phonepe, Tiktok

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

Given `n` engineers with `speed[i]` and `efficiency[i]`, choose at most `k` engineers. Team performance = `sum(speeds) × min(efficiencies)`. Return the **maximum performance** modulo 10^9 + 7.

**Constraints:**
- `1 <= k <= n <= 10^5`
- `1 <= speed[i], efficiency[i] <= 10^8`

---

## Examples

**Example 1:**
```
Input:  n=6, speed=[2,10,3,1,5,8], efficiency=[5,4,3,9,7,2], k=2
Output: 60
Explanation: Pick engineers 1 and 4: (10+5) × min(4,7) = 60.
```

---

## Key Insight

> Sort engineers by **efficiency descending**. As we iterate, the current engineer always has the **minimum efficiency** in any team including them. Maintain a min-heap of speeds with size ≤ k. At each step, `performance = speedSum × currentEfficiency`.

Same pattern as #857 Min Cost to Hire K Workers and #2542 Maximum Subsequence Score.

---

## Approach: Sort by Efficiency + Min-Heap — O(n log n) ✅

```
FUNCTION maxPerformance(n, speed, efficiency, k)
    engineers ← sorted by efficiency DESCENDING

    heap ← MinHeap()    // speeds
    speedSum ← 0
    maxPerf ← 0

    FOR each (eff, spd) IN engineers DO
        heap.PUSH(spd)
        speedSum ← speedSum + spd
        IF heap.SIZE() > k THEN
            speedSum ← speedSum - heap.POP()
        maxPerf ← MAX(maxPerf, speedSum × eff)

    RETURN maxPerf MOD (10^9 + 7)
END FUNCTION
```

---

## Walkthrough

```
Engineers sorted by eff desc: [(9,1),(7,5),(5,2),(4,10),(3,3),(2,8)], k=2
```

| Step | (eff,spd) | Heap    | speedSum | Perf = sum×eff | maxPerf |
|------|-----------|---------|----------|----------------|---------|
| 1    | (9,1)     | [1]     | 1        | 1×9=9          | 9       |
| 2    | (7,5)     | [1,5]   | 6        | 6×7=42         | 42      |
| 3    | (5,2)     | [2,5]   | 7        | 7×5=35         | 42      |
| 4    | (4,10)    | [5,10]  | 15       | 15×4=**60**    | **60**  |

**Result: 60** ✅

---

## Complexity Analysis

| Aspect | Complexity |
|--------|-----------|
| Time   | **O(n log n)** — sort + heap operations |
| Space  | **O(n)** — heap |

---

## Follow-Up Questions

1. **Why sort by efficiency descending?**
   Ensures the current engineer has the minimum efficiency, so we know the min without scanning.

2. **Why min-heap for speeds?**
   We want to keep the k largest speeds. The min-heap lets us evict the smallest speed when over capacity.

3. **What if we needed exactly k (not at most k)?**
   Only compute performance after the heap reaches size k.

---

## Key Takeaway

> **Sort by bottleneck factor + min-heap for contribution** — a powerful pattern for "sum × min" optimization. Sort by the min-determining factor, use a heap to maintain the best sum.
