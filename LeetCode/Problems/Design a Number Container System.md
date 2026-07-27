# 2349. Design a Number Container System

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/design-a-number-container-system](https://leetcode.com/problems/design-a-number-container-system)
**Companies:** Google

---

## Problem Description

Design a system: `change(index, number)` sets the number at an index, `find(number)` returns the smallest index with that number (or -1).

---

## Approach

```
CLASS NumberContainers:
    indexToNum = {}                    // index → number
    numToIndices = defaultdict(SortedList)  // number → sorted set of indices

    FUNCTION change(index, number):
        IF index IN indexToNum:
            oldNum = indexToNum[index]
            numToIndices[oldNum].REMOVE(index)
        indexToNum[index] = number
        numToIndices[number].ADD(index)

    FUNCTION find(number):
        IF numToIndices[number]: RETURN numToIndices[number][0]
        RETURN -1
```

---

## Key Takeaway

> **Dual map design: index→number for lookups, number→SortedSet of indices for find-min. O(log n) per change/find with SortedList.**
