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
    items = sorted(zip(values, labels), reverse=True)
    labelCount = Counter()
    total = 0; chosen = 0
    FOR val, label IN items:
        IF labelCount[label] < useLimit:
            total += val
            labelCount[label] += 1
            chosen += 1
            IF chosen == numWanted: BREAK
    RETURN total
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Sort by value descending, greedily pick items respecting per-label and total limits. Classic constrained greedy selection.
