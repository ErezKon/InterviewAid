# 1389. Create Target Array in the Given Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-target-array-in-the-given-order](https://leetcode.com/problems/create-target-array-in-the-given-order)
**Companies:** Amazon, Bloomberg, Google, Visa

---

## Problem Description

Given two arrays of integers `nums` and `index`. Your task is to create *target* array under the following rules:

- Initially *target* array is empty.
- From left to right read `nums[i]` and `index[i]`, insert at index `index[i]` the value `nums[i]` in *target* array.
- Repeat the previous step until there are no elements to read in `nums` and `index`.

Return the *target* array.

It is guaranteed that the insertion operations will be valid.

**Constraints:**
- `1 <= nums.length, index.length <= 100`
- `nums.length == index.length`
- `0 <= nums[i] <= 100`
- `0 <= index[i] <= i`

---

## Examples

```
Example 1:
  Input: nums = [0,1,2,3,4], index = [0,1,2,2,1]
  Output: [0,4,1,3,2]
  Explanation:
  nums       index     target
  0            0        [0]
  1            1        [0,1]
  2            2        [0,1,2]
  3            2        [0,1,3,2]
  4            1        [0,4,1,3,2]
```

```
Example 2:
  Input: nums = [1,2,3,4,0], index = [0,1,2,3,0]
  Output: [0,1,2,3,4]
  Explanation:
  nums       index     target
  1            0        [1]
  2            1        [1,2]
  3            2        [1,2,3]
  4            3        [1,2,3,4]
  0            0        [0,1,2,3,4]
```

```
Example 3:
  Input: nums = [1], index = [0]
  Output: [1]
```

---

## Approach

```text
FUNCTION createTargetArray(nums, index):
    // Initialise empty list for target
    SET target ← []
    FOR each pair (value, pos) IN zip(nums, index):
        // Insert value at the required position, shifting right
        INSERT value INTO target AT pos
    RETURN target
```

---

## Walkthrough

**Using Example 1:**
| Step | nums[i] | index[i] | Target after insertion |
|------|---------|----------|------------------------|
| 1    | 0       | 0        | [0]                    |
| 2    | 1       | 1        | [0,1]                  |
| 3    | 2       | 2        | [0,1,2]                |
| 4    | 3       | 2        | [0,1,3,2]              |
| 5    | 4       | 1        | [0,4,1,3,2]            |

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n²) due to list insertions |
| **Space** | O(n) |

---

## Follow-Up Questions

- How can we achieve O(n) time using a linked list or auxiliary array?
- What modifications are needed if we must support deletions at given indices as well?
- How would the solution change if the input size could be up to 10⁵?

---

## Key Takeaway

> **Simulate insertions directly using list.insert(). For small n, this O(n²) approach is sufficient.**