# 3662. Filter Characters by Frequency

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/filter-characters-by-frequency](https://leetcode.com/problems/filter-characters-by-frequency)
**Companies:** Opentext

---

## Problem Description

Given a string `s`, remove all characters whose frequency is strictly less than the average frequency of all distinct characters. Return the filtered string maintaining original order.

---

## Approach: Count + Filter — O(n) ✅

```
FUNCTION filterByFrequency(s):
    freq = Counter(s)
    avg = SUM(freq.values()) / len(freq)
    result = []
    FOR char IN s:
        IF freq[char] >= avg:
            result.ADD(char)
    RETURN "".JOIN(result)
```

---

## Key Takeaway

> **Count frequencies, compute average, filter characters below threshold. Standard frequency-based string filtering.**
