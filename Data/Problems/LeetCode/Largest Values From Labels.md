# 1090. Largest Values From Labels

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-values-from-labels](https://leetcode.com/problems/largest-values-from-labels)
**Companies:** Google

---

## 1. Problem Description

You are given `n` item's value and label as two integer arrays `values` and `labels`. You are also given two integers `numWanted` and `useLimit`.

Your task is to find a subset of items with the **maximum sum** of their values such that:

- The number of items is **at most** `numWanted`.
- The number of items with the same label is **at most** `useLimit`.

Return the maximum sum.

**Constraints:**
- `n == values.length == labels.length`
- `1 <= n <= 2 * 10^4`
- `0 <= values[i], labels[i] <= 2 * 10^4`
- `1 <= numWanted, useLimit <= n`

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

```
Example 1:
  Input: values = [5,4,3,2,1], labels = [1,1,2,2,3], numWanted = 3, useLimit = 1
  Output: 9
  Explanation: The subset chosen is the first, third, and fifth items with the sum of values 5 + 3 + 1.
```

```
Example 2:
  Input: values = [5,4,3,2,1], labels = [1,3,3,3,2], numWanted = 3, useLimit = 2
  Output: 12
  Explanation: The subset chosen is the first, second, and third items with the sum of values 5 + 4 + 3.
```

```
Example 3:
  Input: values = [9,8,8,7,6], labels = [0,0,0,1,1], numWanted = 3, useLimit = 1
  Output: 16
  Explanation: The subset chosen is the first and fourth items with the sum of values 9 + 7.
```

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
