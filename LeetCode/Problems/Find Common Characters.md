# 1002. Find Common Characters

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/find-common-characters](https://leetcode.com/problems/find-common-characters)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Tripadvisor

---

## Problem Description

Return a list of characters that appear in **all** strings (including duplicates at their minimum frequency).

---

## Approach: Counter Intersection — O(n × L) ✅

```
FUNCTION commonChars(words):
    common = Counter(words[0])
    FOR word IN words[1:]:
        common &= Counter(word)    // intersection (min counts)
    RETURN list(common.elements())
```

---

## Key Takeaway

> **Counter intersection (`&=`) keeps minimum counts across all words. `elements()` expands the counter back to a list with duplicates.**
