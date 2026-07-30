# 1389. Create Target Array in the Given Order

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/create-target-array-in-the-given-order](https://leetcode.com/problems/create-target-array-in-the-given-order)
**Companies:** Amazon, Bloomberg, Google, Visa

---

## Problem Description

Insert `nums[i]` at position `index[i]` in a target array (shifting existing elements right). Return the final target array.

---

## Examples

**Example 1:**
```
Input: nums = [0,1,2,3,4], index = [0,1,2,2,1]
Output: [0,4,1,3,2]
Explanation:
- Insert 0 at index 0 -> [0]
- Insert 1 at index 1 -> [0,1]
- Insert 2 at index 2 -> [0,1,2]
- Insert 3 at index 2 -> [0,1,3,2]
- Insert 4 at index 1 -> [0,4,1,3,2]
```

**Example 2:**
```
Input: nums = [1,2,3,4], index = [0,0,0,0]
Output: [4,3,2,1]
Explanation: Each new element is inserted at the front.
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