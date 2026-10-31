# 2763. Sum of Imbalance Numbers of All Subarrays

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays](https://leetcode.com/problems/sum-of-imbalance-numbers-of-all-subarrays)
**Companies:** Google

---

## Problem Description

The **imbalance number** of a **0-indexed** integer array `arr` of length `n` is defined as the number of indices in `sarr = sorted(arr)` such that:

- `0 <= i < n - 1`, and
- `sarr[i+1] - sarr[i] > 1`

Here, `sorted(arr)` is the function that returns the sorted version of `arr`.

Given a **0-indexed** integer array `nums`, return *the **sum of imbalance numbers** of all its **subarrays***.

A **subarray** is a contiguous **non-empty** sequence of elements within an array.

**Constraints:**
- `1 <= nums.length <= 1000`
- `1 <= nums[i] <= nums.length`

## Examples

**Example 1:**
```
Input: nums = [2,3,1,4]
Output: 3
Explanation: There are 3 subarrays with non-zero imbalance numbers:
- Subarray [3, 1] with an imbalance number of 1.
- Subarray [3, 1, 4] with an imbalance number of 1.
- Subarray [1, 4] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 3.
```

**Example 2:**
```
Input: nums = [1,3,3,3,5]
Output: 8
Explanation: There are 7 subarrays with non-zero imbalance numbers:
- Subarray [1, 3] with an imbalance number of 1.
- Subarray [1, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3] with an imbalance number of 1.
- Subarray [1, 3, 3, 3, 5] with an imbalance number of 2.
- Subarray [3, 3, 3, 5] with an imbalance number of 1.
- Subarray [3, 3, 5] with an imbalance number of 1.
- Subarray [3, 5] with an imbalance number of 1.
The imbalance number of all other subarrays is 0. Hence, the sum of imbalance numbers of all the subarrays of nums is 8.
```

## Approach
With `n ≤ 1000`, enumerating all O(n²) subarrays is fine as long as each extension costs O(1).

Observation: the imbalance number of a set of distinct values equals (number of maximal runs of consecutive integers) − 1. For example `{1, 3, 4}` has runs `{1}` and `{3,4}`, so its imbalance is 1. Duplicates do not matter.

Fix the left end `i` and extend the right end `j`, maintaining a `seen` set of values and `runs` (number of runs of consecutive integers). When adding a value `x`:
- if `x` is already in `seen`, nothing changes;
- otherwise `x` forms a new run (`runs += 1`), but if `x − 1` is present it merges with that run (`runs −= 1`), and if `x + 1` is present it merges again (`runs −= 1`).

After each extension, the current subarray `nums[i..j]` has imbalance `runs − 1`; add it to the answer. Since values are in `[1, n]`, `seen` can be a boolean array of size `n + 2`, reset for each `i`.

```text
FUNCTION sumImbalanceNumbers(nums)
    n ← length(nums)
    total ← 0
    FOR i ← 0 TO n-1
        seen ← boolean array of size n+2, all false
        runs ← 0
        FOR j ← i TO n-1
            x ← nums[j]
            IF NOT seen[x]
                runs ← runs + 1                 // x starts a new run
                IF seen[x-1] THEN runs ← runs - 1  // merges with run ending at x-1
                IF seen[x+1] THEN runs ← runs - 1  // merges with run starting at x+1
                seen[x] ← true
            total ← total + (runs - 1)          // imbalance of nums[i..j]
    RETURN total
```

## Walkthrough
Example 1: `nums = [2,3,1,4]`.

| i | j | x added | seen after | runs | imbalance (runs − 1) | total |
|---|---|---------|------------|------|----------------------|-------|
| 0 | 0 | 2 | {2} | 1 | 0 | 0 |
| 0 | 1 | 3 | {2,3} | 1 | 0 | 0 |
| 0 | 2 | 1 | {1,2,3} | 1 | 0 | 0 |
| 0 | 3 | 4 | {1,2,3,4} | 1 | 0 | 0 |
| 1 | 1 | 3 | {3} | 1 | 0 | 0 |
| 1 | 2 | 1 | {1,3} | 2 | 1 | 1 |
| 1 | 3 | 4 | {1,3,4} | 2 | 1 | 2 |
| 2 | 2 | 1 | {1} | 1 | 0 | 2 |
| 2 | 3 | 4 | {1,4} | 2 | 1 | 3 |
| 3 | 3 | 4 | {4} | 1 | 0 | 3 |

The three non-zero rows are `[3,1]`, `[3,1,4]` and `[1,4]`. Result: **3**.

## Complexity Analysis
- **Time:** O(n²) — each of the n(n+1)/2 subarray extensions costs O(1) (plus O(n) reset per left end).
- **Space:** O(n) for the `seen` array.

## Follow-Up Questions
1. Can you do better than O(n²)? (Yes: count, for each index, the subarrays in which it is the "first" occurrence contributing a gap, using nearest occurrences of `nums[i]` and `nums[i] + 1` — O(n) contribution technique.)
2. What if values are unbounded (up to 10^9)? (Use a hash set instead of a boolean array.)
3. How would you change the solution if a gap were defined as `sarr[i+1] − sarr[i] > k`?

## Key Takeaway
Re-expressing "gaps in the sorted order" as "number of runs of consecutive integers minus one" turns a sorting-based definition into an O(1) incremental update, making the full enumeration of subarrays efficient.
