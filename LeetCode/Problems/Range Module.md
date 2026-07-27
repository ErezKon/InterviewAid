# 715. Range Module

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/range-module](https://leetcode.com/problems/range-module)
**Companies:** Amazon, Coupang, Google, Machine Zone, Meta

---

## Approach: Sorted Intervals — O(n) per operation ✅

```
CLASS RangeModule:
    CONSTRUCTOR:
        intervals = SortedList()    // list of [start, end)

    FUNCTION addRange(left, right):
        // Merge all overlapping intervals with [left, right)
        // Remove overlapping, insert merged

    FUNCTION queryRange(left, right):
        // Binary search for interval containing [left, right)

    FUNCTION removeRange(left, right):
        // Split intervals at left and right boundaries
```

Use a SortedList or balanced BST. Each operation merges/splits O(k) intervals where k = overlapping count.
