# 153. Find Minimum in Rotated Sorted Array

**Difficulty:** 🟡 Medium
**Acceptance:** 51.0%
**LeetCode:** [https://leetcode.com/problems/find-minimum-in-rotated-sorted-array](https://leetcode.com/problems/find-minimum-in-rotated-sorted-array)
**Companies:** Amazon, Apple, Bloomberg, Flipkart, Goldman Sachs, Google, Ibm, Infosys, Linkedin, Meta, Microsoft, Oracle, Tcs, Tiktok, Uber, Walmart Labs, Yandex

---

## 1. Problem Description

Suppose an array of length `n` sorted in ascending order is **rotated** between `1` and `n` times. For example, the array `nums = [0,1,2,4,5,6,7]` might become:

- `[4,5,6,7,0,1,2]` if it was rotated `4` times.
- `[0,1,2,4,5,6,7]` if it was rotated `7` times.

Notice that **rotating** an array `[a[0], a[1], a[2], ..., a[n-1]]` 1 time results in the array `[a[n-1], a[0], a[1], a[2], ..., a[n-2]]`.

Given the sorted rotated array `nums` of **unique** elements, return *the minimum element of this array*.

You must write an algorithm that runs in `O(log n) time`.

**Constraints:**
- `n == nums.length`
- `1 <= n <= 5000`
- `-5000 <= nums[i] <= 5000`
- All the integers of `nums` are **unique**.
- `nums` is sorted and rotated between `1` and `n` times.

---

## 2. Approach: Binary Search — O(log n) ✅

```text
FUNCTION findMin(nums):
    lo ← 0
    hi ← len(nums) - 1
    WHILE lo < hi:
        mid ← (lo + hi) / 2
        IF nums[mid] > nums[hi]:
            SET lo ← mid + 1       // min is in the right half
        ELSE:
            SET hi ← mid           // min is at mid or left of mid
    RETURN nums[lo]
```

### Why compare with `hi`?

If `nums[mid] > nums[hi]`, the rotation point (minimum) is between `mid+1` and `hi`. Otherwise, the minimum is at `mid` or to its left.

---

## Examples

**Example 1:**
```
Input: nums = [3,4,5,1,2]
Output: 1
Explanation: The original array was [1,2,3,4,5] rotated 3 times.
```

**Example 2:**
```
Input: nums = [4,5,6,7,0,1,2]
Output: 0
Explanation: The original array was [0,1,2,4,5,6,7] and it was rotated 4 times.
```

**Example 3:**
```
Input: nums = [11,13,15,17]
Output: 11
Explanation: The original array was [11,13,15,17] and it was rotated 4 times.
```

---

## Walkthrough

Consider `nums = [4,5,6,7,0,1,2]`:

1. `lo=0`, `hi=6`, `mid=3` → `nums[mid]=7 > nums[hi]=2` → set `lo=4`.
2. `lo=4`, `hi=6`, `mid=5` → `nums[mid]=1 ≤ nums[hi]=2` → set `hi=5`.
3. `lo=4`, `hi=5`, `mid=4` → `nums[mid]=0 ≤ nums[hi]=1` → set `hi=4`.
4. Loop ends (`lo==hi==4`), return `nums[4]=0`.

---

## Complexity Analysis

- **Time:** O(log n) – binary search halves the search space each iteration.
- **Space:** O(1) – only a few integer variables.

---

## Follow-Up Questions

- How would the algorithm change if duplicates were allowed? (Hint: need to handle `nums[mid] == nums[hi]` by decrementing `hi`.)
- Can you adapt the method to find the rotation index instead of the minimum value?
- What is the worst‑case time complexity when duplicates are present?

---

## Key Takeaway

> Binary search comparing `mid` with `hi` (not `lo`). The unsorted half always contains the minimum.
