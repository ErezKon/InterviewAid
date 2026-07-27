# 581. Shortest Unsorted Continuous Subarray

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/shortest-unsorted-continuous-subarray](https://leetcode.com/problems/shortest-unsorted-continuous-subarray)
**Companies:** Amazon, Bloomberg, Deloitte, Ebay, Google, Liveramp, Meta, Microsoft, Tiktok

---

## Problem Description

Given an integer array `nums`, find one continuous subarray such that if you sort this subarray in non-decreasing order, the whole array becomes sorted. Return the length of the **shortest** such subarray.

### Examples

**Example 1:**
- **Input:** `nums = [2,6,4,8,10,9,15]`
- **Output:** `5`
- **Explanation:** Sorting `[6,4,8,10,9]` makes the whole array sorted.

**Example 2:**
- **Input:** `nums = [1,2,3,4]`
- **Output:** `0`

**Example 3:**
- **Input:** `nums = [1]`
- **Output:** `0`

### Constraints

- `1 <= nums.length <= 10⁴`
- `-10⁵ <= nums[i] <= 10⁵`

---

## Approach: Two Pass — O(n), O(1) ✅

**Left-to-right pass:** Track the maximum seen so far. Whenever `nums[i] < maxSeen`, index `i` must be inside the unsorted region → update `end`.

**Right-to-left pass:** Track the minimum seen so far. Whenever `nums[i] > minSeen`, index `i` must be inside the unsorted region → update `start`.

```
FUNCTION findUnsortedSubarray(nums):
    n = len(nums)
    maxSeen = -infinity
    end = -1

    FOR i ← 0 TO n - 1:
        IF nums[i] < maxSeen:
            end = i
        maxSeen = MAX(maxSeen, nums[i])

    minSeen = infinity
    start = 0

    FOR i ← n - 1 DOWN TO 0:
        IF nums[i] > minSeen:
            start = i
        minSeen = MIN(minSeen, nums[i])

    RETURN end - start + 1 IF end != -1 ELSE 0
```

### Walkthrough — `nums = [2,6,4,8,10,9,15]`

**Left-to-right (find `end`):**

| i | nums[i] | maxSeen | nums[i] < maxSeen? | end |
|---|---------|---------|---------------------|-----|
| 0 | 2       | 2       | No                  | -1  |
| 1 | 6       | 6       | No                  | -1  |
| 2 | 4       | 6       | Yes                 | 2   |
| 3 | 8       | 8       | No                  | 2   |
| 4 | 10      | 10      | No                  | 2   |
| 5 | 9       | 10      | Yes                 | 5   |
| 6 | 15      | 15      | No                  | 5   |

**Right-to-left (find `start`):**

| i | nums[i] | minSeen | nums[i] > minSeen? | start |
|---|---------|---------|---------------------|-------|
| 6 | 15      | 15      | No                  | 0     |
| 5 | 9       | 9       | No                  | 0     |
| 4 | 10      | 9       | Yes                 | 4     |
| 3 | 8       | 8       | No                  | 4     |
| 2 | 4       | 4       | No                  | 4     |
| 1 | 6       | 4       | Yes                 | 1     |
| 0 | 2       | 2       | No                  | 1     |

Result: `end - start + 1 = 5 - 1 + 1 = 5`

| Time | Space |
|------|-------|
| O(n) | O(1) |

---

## Follow-up

- An alternative O(n log n) approach: sort a copy and compare to find the first and last differing indices.
