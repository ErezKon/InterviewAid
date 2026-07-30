# 1095. Find in Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-in-mountain-array](https://leetcode.com/problems/find-in-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description
You are given an interface `MountainArray` that provides `length()` and `get(index)` for a **mountain array** – an array that strictly increases to a single peak and then strictly decreases. Given an integer `target`, return the smallest index such that `MountainArray.get(index) == target`. If the target does not exist, return `-1`. You must achieve a solution with `O(log n)` calls to `MountainArray.get`.

## Examples
**Example 1**
```
Input: target = 3, mountainArr = [1,2,3,4,5,3,1]
Output: 2
Explanation: The target 3 appears at index 2 (ascending side) and index 5 (descending side). Return the smallest index 2.
```

**Example 2**
```
Input: target = 2, mountainArr = [0,1,2,4,2,1]
Output: 2
```

## Approach
The array consists of three monotonic parts: an increasing prefix, a peak, and a decreasing suffix. We perform three binary searches:
1. **Find the peak** – binary search on the whole array comparing `mid` with `mid+1`.
2. **Search the ascending part** – standard binary search on `[0, peak]`.
3. **Search the descending part** – binary search on `[peak, n‑1]` with reversed comparison.
If the target is found in the first search, return that index; otherwise continue to the next part.

### Pseudocode
```text
FUNCTION findInMountainArray(target, mountainArr):
    SET n ← mountainArr.length()
    // 1. Locate peak index
    SET lo ← 0
    SET hi ← n - 1
    WHILE lo < hi:
        SET mid ← lo + (hi - lo) // 2
        IF mountainArr.get(mid) < mountainArr.get(mid + 1):
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid
    SET peak ← lo
    // 2. Binary search ascending side [0, peak]
    SET lo ← 0
    SET hi ← peak
    WHILE lo <= hi:
        SET mid ← lo + (hi - lo) // 2
        SET val ← mountainArr.get(mid)
        IF val == target:
            RETURN mid
        IF val < target:
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid - 1
    // 3. Binary search descending side [peak, n-1]
    SET lo ← peak
    SET hi ← n - 1
    WHILE lo <= hi:
        SET mid ← lo + (hi - lo) // 2
        SET val ← mountainArr.get(mid)
        IF val == target:
            RETURN mid
        IF val > target: // note reversed order
            SET lo ← mid + 1
        ELSE:
            SET hi ← mid - 1
    RETURN -1
```

## Walkthrough
Consider `mountainArr = [1,2,3,4,5,3,1]`, `target = 3`.
1. **Peak search** – after binary steps, `peak = 4` (value 5).
2. **Ascending search** on indices 0‑4 finds `target` at `mid = 2` → return 2.
Since we return immediately, the descending search is skipped.

## Complexity Analysis
- **Time:** `O(log n)` – three binary searches, each logarithmic.
- **Space:** `O(1)` – only a few scalar variables.

## Follow‑Up Questions
1. How would you adapt the algorithm if you could only make a limited number of `get` calls (e.g., ≤ 100)?
2. Can the solution be extended to find **all** occurrences of the target?
3. What changes are needed if the array may contain multiple peaks (i.e., a piecewise‑mountain array)?

## Key Takeaway
Exploiting the strict monotonicity on each side of the peak allows three simple binary searches to locate the target in logarithmic time.
