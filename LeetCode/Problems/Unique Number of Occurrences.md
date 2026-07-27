# 1207. Unique Number of Occurrences

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/unique-number-of-occurrences](https://leetcode.com/problems/unique-number-of-occurrences)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

```
FUNCTION uniqueOccurrences(arr):
    count = Counter(arr)
    RETURN len(count.values()) == len(SET(count.values()))
```
