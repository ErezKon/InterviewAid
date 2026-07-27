# 364. Nested List Weight Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nested-list-weight-sum-ii](https://leetcode.com/problems/nested-list-weight-sum-ii)
**Companies:** Google, Linkedin, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS with Accumulation — O(n)](#3-approach)
4. [Complexity Analysis](#4-complexity-analysis)
5. [Key Takeaway](#5-key-takeaway)

---

## 1. Problem Description

Like Nested List Weight Sum, but **deeper** integers have **less** weight. Weight = `maxDepth - depth + 1`.

---

## 2. Key Insight

> Instead of finding max depth first, use an accumulation trick: add the current level's sum to a running `unweighted` total, then add `unweighted` to `weighted` each level. Deeper values are added fewer times.

---

## 3. Approach: BFS with Accumulation — O(n) ✅

```
FUNCTION depthSumInverse(nestedList):
    // BFS level-by-level, accumulate unweighted sum
    unweighted = 0; weighted = 0
    queue = nestedList
    WHILE queue:
        nextLevel = []
        FOR item IN queue:
            IF item.isInteger(): unweighted += item.getInteger()
            ELSE: nextLevel.EXTEND(item.getList())
        weighted += unweighted    // add current level sum again
        queue = nextLevel
    RETURN weighted
```

---

## 4. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element visited once |
| **Space** | O(n) — queue |

---

## 5. Key Takeaway

> **Accumulation trick avoids computing max depth.** By re-adding the running sum at each level, shallower values naturally accumulate more weight than deeper ones.
