# 1095. Find in Mountain Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-in-mountain-array](https://leetcode.com/problems/find-in-mountain-array)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft, Oracle

---

## Problem Description

*(This problem is an **interactive problem**.)*

You may recall that an array `arr` is a **mountain array** if and only if:

- `arr.length >= 3`
- There exists some `i` with `0 < i < arr.length - 1` such that:

- `arr[0] < arr[1] < ... < arr[i - 1] < arr[i]`
- `arr[i] > arr[i + 1] > ... > arr[arr.length - 1]`

Given a mountain array `mountainArr`, return the **minimum** `index` such that `mountainArr.get(index) == target`. If such an `index` does not exist, return `-1`.

**You cannot access the mountain array directly.** You may only access the array using a `MountainArray` interface:

- `MountainArray.get(k)` returns the element of the array at index `k` (0-indexed).
- `MountainArray.length()` returns the length of the array.

Submissions making more than `100` calls to `MountainArray.get` will be judged *Wrong Answer*. Also, any solutions that attempt to circumvent the judge will result in disqualification.

**Constraints:**
- `3 <= mountainArr.length() <= 10^4`
- `0 <= target <= 10^9`
- `0 <= mountainArr.get(index) <= 10^9`

## Examples

**Example 1:**
```
Input: mountainArr = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists in the array, at index=2 and index=5. Return the minimum index, which is 2.
```

**Example 2:**
```
Input: mountainArr = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not exist in the array, so we return -1.
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
