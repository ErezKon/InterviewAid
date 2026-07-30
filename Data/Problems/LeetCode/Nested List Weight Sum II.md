# 364. Nested List Weight Sum II

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/nested-list-weight-sum-ii](https://leetcode.com/problems/nested-list-weight-sum-ii)
**Companies:** Google, Linkedin, Meta

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Key Insight](#2-key-insight)
3. [Approach: BFS with Accumulation — O(n)](#3-approach)
4. [Examples](#4-examples)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Like Nested List Weight Sum, but **deeper** integers have **less** weight. Weight = `maxDepth - depth + 1`.

---

## 2. Key Insight

> Instead of finding max depth first, use an accumulation trick: add the current level's sum to a running `unweighted` total, then add `unweighted` to `weighted` each level. Deeper values are added fewer times.

---

## 3. Approach: BFS with Accumulation — O(n) ✅

```text
FUNCTION depthSumInverse(nestedList):
    // BFS level-by-level, accumulate unweighted sum
    SET unweighted ← 0
    SET weighted ← 0
    SET queue ← nestedList
    WHILE queue IS NOT EMPTY:
        SET nextLevel ← []
        FOR item IN queue:
            IF item.isInteger():
                SET unweighted ← unweighted + item.getInteger()
            ELSE:
                EXTEND nextLevel WITH item.getList()
        SET weighted ← weighted + unweighted    // add current level sum again
        SET queue ← nextLevel
    RETURN weighted
```

---

## 4. Examples

**Example 1:**
```
Input: nestedList = [[1,1],2,[1,1]]
Output: 8
Explanation: maxDepth = 2, weights = {2,1,2}. Sum = (1+1)*2 + 2*1 + (1+1)*2 = 8.
```

**Example 2:**
```
Input: nestedList = [1,[4,[6]]]
Output: 17
Explanation: maxDepth = 3, weights = {3,2,1}. Sum = 1*3 + 4*2 + 6*1 = 17.
```

---

## 5. Walkthrough

Consider `nestedList = [1,[4,[6]]]`.
1. **Level 0:** queue = [1, [4,[6]]]; unweighted = 0 → add 1 → unweighted = 1; nextLevel = [[4,[6]]]; weighted = 0 + 1 = 1.
2. **Level 1:** queue = [[4,[6]]]; unweighted = 1 → add 4 → unweighted = 5; nextLevel = [[6]]; weighted = 1 + 5 = 6.
3. **Level 2:** queue = [[6]]; unweighted = 5 → add 6 → unweighted = 11; nextLevel = []; weighted = 6 + 11 = 17.
4. Queue empty → return 17.

---

## 6. Complexity Analysis

| Aspect | Value |
|--------|-------|
| **Time** | O(n) — each element visited once |
| **Space** | O(n) — queue |

---

## 7. Follow-Up Questions

- How would you modify the algorithm to compute the weighted sum without BFS, using a single DFS pass?
- Can the approach be adapted for a streaming input where the nested structure is read incrementally?
- What changes are needed if weights are defined as `depth` instead of `maxDepth - depth + 1`?

---

## 8. Key Takeaway

> **Accumulation trick avoids computing max depth.** By re-adding the running sum at each level, shallower values naturally accumulate more weight than deeper ones.
