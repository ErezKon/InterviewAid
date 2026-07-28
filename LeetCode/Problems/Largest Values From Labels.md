# 1090. Largest Values From Labels

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-values-from-labels](https://leetcode.com/problems/largest-values-from-labels)
**Companies:** Google

---

## 1. Problem Description

Given items with values and labels, select at most `numWanted` items, using at most `useLimit` items from each label. Maximize total value.

---

## 2. Approach: Greedy Sort — O(n log n) ✅

```
FUNCTION largestValsFromLabels(values, labels, numWanted, useLimit):
    items ← SORT_DESCENDING(zip(values, labels))
    labelCount ← MAP()
    total ← 0
    chosen ← 0
    FOR val, label IN items:
        IF labelCount[label] < useLimit:
            total ← total + val
            labelCount[label] ← labelCount[label] + 1
            chosen ← chosen + 1
            IF chosen = numWanted: BREAK
    RETURN total
```

---

## Examples

**Example 1:**
```
values = [5,4,3,2,1]
labels = [1,1,2,2,3]
numWanted = 3, useLimit = 1
```
**Output:** 12
**Explanation:** Pick values 5 (label 1), 4 (label 1) cannot because limit 1, so pick 3 (label 2) and 5 (label 1) and 2 (label 2) → total 12.

**Example 2:**
```
values = [9,8,8,7,6]
labels = [0,0,0,1,1]
numWanted = 3, useLimit = 2
```
**Output:** 24
**Explanation:** Choose 9 (label 0), 8 (label 0), 7 (label 1).

---

## Walkthrough

| Step | Chosen Value | Label | labelCount | Total |
|------|--------------|-------|------------|-------|
| 1 | 5 | 1 | {1:1} | 5 |
| 2 | 4 | 1 | limit reached, skip |
| 3 | 3 | 2 | {1:1,2:1} | 8 |
| 4 | 2 | 2 | limit reached, skip |
| 5 | 1 | 3 | {1:1,2:1,3:1} | 9 |

---

## Complexity Analysis

- **Time:** O(n log n) for sorting the items.
- **Space:** O(n) to store the paired list and label counts.

---

## Follow-Up Questions

1. How would you modify the solution if each label had a different usage limit?
2. Can you solve the problem in O(n) time using a bucket sort when values are bounded?
3. How would you extend this to a streaming scenario where items arrive online?

---

## Key Takeaway

> Sort by value descending, greedily pick items respecting per-label and total limits. Classic constrained greedy selection.
