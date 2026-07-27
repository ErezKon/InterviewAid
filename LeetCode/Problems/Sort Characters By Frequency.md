# 451. Sort Characters By Frequency

**Difficulty:** 🟡 Medium
**Acceptance:** 73.0%
**LeetCode:** [https://leetcode.com/problems/sort-characters-by-frequency](https://leetcode.com/problems/sort-characters-by-frequency)
**Companies:** Accenture, Amazon, Bloomberg, Epam Systems, Flipkart, Google, Ibm, Meta, Microsoft, Salesforce, Target, Visa, Walmart Labs, Wipro, Zoho

---

## 1. Problem Description

Given a string `s`, sort it in decreasing order based on the frequency of characters.

---

## 2. Approach: Bucket Sort — O(n) ✅

```
FUNCTION frequencySort(s):
    count = frequency map of s
    buckets = [[] for _ in range(len(s) + 1)]

    FOR (char, freq) IN count:
        buckets[freq].ADD(char)

    result = []
    FOR freq ← len(s) DOWN TO 1:
        FOR char IN buckets[freq]:
            result.ADD(char * freq)

    RETURN JOIN(result)
```

| Approach | Time | Space |
|----------|------|-------|
| **Bucket Sort** | **O(n)** | **O(n)** |
| Heap | O(n log k) | O(n) |
| Sort | O(n log n) | O(n) |

---

## Key Takeaway

> Bucket sort by frequency: index = frequency, value = characters with that frequency. Iterate buckets in reverse for descending frequency.
