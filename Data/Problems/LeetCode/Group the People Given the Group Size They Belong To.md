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

There are `n` people that are split into some unknown number of groups. Each person is labeled with a **unique ID** from `0` to `n - 1`.

You are given an integer array `groupSizes`, where `groupSizes[i]` is the size of the group that person `i` is in. For example, if `groupSizes[1] = 3`, then person `1` must be in a group of size `3`.

Return *a list of groups such that each person* `i` *is in a group of size* `groupSizes[i]`.

Each person should appear in **exactly one group**, and every person must be in a group. If there are multiple answers, **return any of them**. It is **guaranteed** that there will be **at least one** valid solution for the given input.

**Constraints:**
- `groupSizes.length == n`
- `1 <= n <= 500`
- `1 <= groupSizes[i] <= n`

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

```
Example 1:
  Input: groupSizes = [3,3,3,3,3,1,3]
  Output: [[5],[0,1,2],[3,4,6]]
  Explanation:
  The first group is [5]. The size is 1, and groupSizes[5] = 1.
  The second group is [0,1,2]. The size is 3, and groupSizes[0] = groupSizes[1] = groupSizes[2] = 3.
  The third group is [3,4,6]. The size is 3, and groupSizes[3] = groupSizes[4] = groupSizes[6] = 3.
  Other possible solutions are [[2,1,6],[5],[0,4,3]] and [[5],[0,6,2],[4,3,1]].
```
```
Example 2:
  Input: groupSizes = [2,1,3,3,3,2]
  Output: [[1],[0,5],[2,3,4]]
```

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
