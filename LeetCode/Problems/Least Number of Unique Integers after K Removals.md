# 1481. Least Number of Unique Integers after K Removals

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals](https://leetcode.com/problems/least-number-of-unique-integers-after-k-removals)
**Companies:** Amazon, Fivetran, Google, Morgan Stanley, Oracle, Salesforce

---

## 1. Problem Description

Remove exactly `k` elements to minimize the number of unique integers remaining.

---

## 2. Approach: Greedy — O(n log n) ✅

Remove elements with the smallest frequency first to eliminate the most unique values.

```
FUNCTION findLeastNumOfUniqueInts(arr, k):
    count = Counter(arr)
    freqs = sorted(count.values())
    FOR i, f IN enumerate(freqs):
        k -= f
        IF k < 0: RETURN len(freqs) - i
    RETURN 0
```

| Time | Space |
|------|-------|
| O(n log n) | O(n) |

---

## 3. Key Takeaway

> Sort frequencies ascending, greedily remove cheapest (lowest frequency) elements first. Stop when k is exhausted.
