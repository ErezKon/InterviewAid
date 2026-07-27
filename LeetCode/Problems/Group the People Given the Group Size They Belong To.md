# 1282. Group the People Given the Group Size They Belong To

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to](https://leetcode.com/problems/group-the-people-given-the-group-size-they-belong-to)
**Companies:** Amazon, Bloomberg, Google, Meta, Roblox

---

## Table of Contents

1. [Problem Description](#1-problem-description)
2. [Approach: Greedy Grouping — O(n) ✅](#2-approach-greedy-grouping--on-)
3. [Key Takeaway](#3-key-takeaway)

---

## 1. Problem Description

Given `groupSizes[i]` = the size of the group person `i` belongs to, partition people into groups of the specified sizes.

---

## 2. Approach: Greedy Grouping — O(n) ✅

```
FUNCTION groupThePeople(groupSizes):
    groups = defaultdict(list)
    result = []

    FOR i, size IN enumerate(groupSizes):
        groups[size].ADD(i)
        IF len(groups[size]) == size:
            result.ADD(groups[size])
            groups[size] = []

    RETURN result
```

---

## 3. Key Takeaway

> Accumulate people by their group size. When a bucket reaches its target size, flush it as a complete group. O(n) greedy.
