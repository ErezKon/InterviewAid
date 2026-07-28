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
    groups ← MAP from size TO LIST of indices
    result ← LIST

    FOR i, size IN ENUMERATE(groupSizes) DO
        groups[size].ADD(i)
        IF LENGTH(groups[size]) == size THEN
            result.ADD(COPY(groups[size]))
            groups[size].CLEAR()
    RETURN result
```

---

## 3. Examples

| groupSizes | Output |
|------------|--------|
| [3,3,3,3,3,1,3] | [[0,1,2],[3,4,6],[5]] |
| [2,1,3,3,3,2] | [[0,5],[1],[2,3,4]] |

*Explanation*: People are grouped when the bucket for their required size reaches that size.

## 4. Walkthrough

1. Initialize empty buckets for each possible group size.
2. Iterate over `groupSizes`:
   - Add person index to the bucket of its required size.
   - When bucket length equals the size, emit the bucket as a completed group and reset it.
3. Continue until all people are placed.

## 5. Complexity Analysis

- **Time:** O(n) – each person is processed once.
- **Space:** O(n) – storage for buckets and result groups.

## 6. Follow-Up Questions

- How would you modify the algorithm to return groups in the order of their first member's index?
- Can this approach be adapted for a streaming input where `groupSizes` arrives one by one?
- What if some group sizes are impossible to satisfy? How would you detect and report them?

## Key Takeaway

> Accumulate people by their required group size; when a bucket fills, emit it as a group. This greedy O(n) method ensures all constraints are met.
