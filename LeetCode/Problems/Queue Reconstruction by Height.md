# 406. Queue Reconstruction by Height

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/queue-reconstruction-by-height](https://leetcode.com/problems/queue-reconstruction-by-height)
**Companies:** Amazon, Google, Medianet, Meta, Phonepe

---

```
FUNCTION reconstructQueue(people):
    // Sort by height descending, then by k ascending
    SORT people by (-h, k)
    result = []
    FOR [h, k] IN people:
        result.INSERT(k, [h, k])
    RETURN result
```

Tallest first. Insert at index k since all previously placed people are taller or equal.
