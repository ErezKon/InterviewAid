# 2593. Find Score of an Array After Marking All Elements

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements](https://leetcode.com/problems/find-score-of-an-array-after-marking-all-elements)
**Companies:** Amazon, Bloomberg, Google, Meta, Visa

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Examples](#2-examples)
3. [Key Insight](#3-key-insight)
4. [Approach: Sort by Value + Greedy Mark — O(n log n) ✅](#4-approach-sort-by-value--greedy-mark--on-log-n-)
5. [Walkthrough](#5-walkthrough)
6. [Complexity Analysis](#6-complexity-analysis)
7. [Follow-Up Questions](#7-follow-up-questions)
8. [Key Takeaway](#8-key-takeaway)

---

## 1. Problem Description

Given an array `nums`, repeatedly pick the **smallest unmarked** element, add its value to your score, then mark it and its two adjacent elements. Return the final score after all elements are marked.

If two elements have the same value, pick the one with the smaller index first.

**Constraints:**
- `1 <= nums.length <= 10⁵`
- `1 <= nums[i] <= 10⁶`

---

## 2. Examples

```
Example 1:
  Input:  nums = [2, 1, 3, 4, 5, 2]
  Output: 7
  Reason: Pick 1 (idx 1) → mark {0,1,2}, score=1.
          Pick 2 (idx 5) → mark {4,5}, score=3.
          Pick 4 (idx 3) → mark {3}, score=7.

Example 2:
  Input:  nums = [2, 3, 5, 1, 3, 2]
  Output: 5
```

---

## 3. Key Insight

> Process elements in ascending order of value (ties broken by index). When picking an element, mark its neighbors so they can't be picked later. Sorting gives us the greedy order; a set tracks marked indices.

---

## 4. Approach: Sort by Value + Greedy Mark — O(n log n) ✅

```
FUNCTION findScore(nums):
    indexed = sorted((val, i) for i, val in enumerate(nums))
    marked = set()
    score = 0

    FOR val, i IN indexed:
        IF i IN marked: CONTINUE
        score += val
        marked.ADD(i)
        marked.ADD(i - 1)
        marked.ADD(i + 1)

    RETURN score
```

---

## 5. Walkthrough

```
nums = [2, 1, 3, 4, 5, 2]
indexed (sorted): [(1,1), (2,0), (2,5), (3,2), (4,3), (5,4)]
marked = {}, score = 0

(1,1): not marked → score=1, mark {0,1,2}
(2,0): 0 is marked → skip
(2,5): not marked → score=3, mark {4,5}
(3,2): 2 is marked → skip
(4,3): not marked → score=7, mark {3}
(5,4): 4 is marked → skip

Result: 7 ✅
```

---

## 6. Complexity Analysis

| Aspect | Complexity |
|--------|------------|
| **Time** | O(n log n) — sorting dominates |
| **Space** | O(n) — sorted array + marked set |

---

## 7. Follow-Up Questions

### 7.1 Can you solve this with a min-heap instead of sorting?

Yes — push all (value, index) pairs into a min-heap and pop greedily. Same complexity but streaming-friendly.

### 7.2 What if you had to maximize score instead?

Pick the largest elements first and mark their neighbors — reverse the sort order.

### 7.3 How is this related to "House Robber"?

Similar adjacency constraint (can't pick neighbors), but House Robber uses DP for the optimal subset. Here, the greedy "smallest first" is optimal because we want all elements eventually — we're just choosing the order.

---

## 8. Key Takeaway

> **Sort by value + greedy selection with neighbor marking** efficiently simulates the "pick smallest, mark neighbors" process. The set-based marking avoids costly array shifting.
