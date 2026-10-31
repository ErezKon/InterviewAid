# 1983. Widest Pair of Indices With Equal Range Sum

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum](https://leetcode.com/problems/widest-pair-of-indices-with-equal-range-sum)
**Companies:** Microsoft

---

## Problem Description

> *Note: premium problem (statement checked against the official text with verify.py).*

You are given two **0-indexed** binary arrays `nums1` and `nums2`. Find the **widest** pair of indices `(i, j)` such that `i <= j` and `nums1[i] + nums1[i+1] + ... + nums1[j] == nums2[i] + nums2[i+1] + ... + nums2[j]`.

The **widest** pair of indices is the pair with the **largest** **distance** between `i` and `j`. The **distance** between a pair of indices is defined as `j - i + 1`.

Return *the **distance** of the **widest** pair of indices. If no pair of indices meets the conditions, return* `0`.

**Constraints:**
- `n == nums1.length == nums2.length`
- `1 <= n <= 10^5`
- `nums1[i]` is either `0` or `1`.
- `nums2[i]` is either `0` or `1`.

## Examples

**Example 1:**
```
Input: nums1 = [1,1,0,1], nums2 = [0,1,1,0]
Output: 3
Explanation:
If i = 1 and j = 3:
nums1[1] + nums1[2] + nums1[3] = 1 + 0 + 1 = 2.
nums2[1] + nums2[2] + nums2[3] = 1 + 1 + 0 = 2.
The distance between i and j is j - i + 1 = 3 - 1 + 1 = 3.
```

**Example 2:**
```
Input: nums1 = [0,1], nums2 = [1,1]
Output: 1
Explanation:
If i = 1 and j = 1:
nums1[1] = 1.
nums2[1] = 1.
The distance between i and j is j - i + 1 = 1 - 1 + 1 = 1.
```

**Example 3:**
```
Input: nums1 = [0], nums2 = [1]
Output: 0
Explanation:
There are no pairs of indices that meet the requirements.
```

## Approach
The condition `Σ nums1[i..j] = Σ nums2[i..j]` is equivalent to `Σ_{t=i}^{j} (nums1[t] − nums2[t]) = 0`. Define the prefix of differences `d[0] = 0`, `d[k] = Σ_{t<k} (nums1[t] − nums2[t])`. Then `(i, j)` is valid iff `d[j+1] = d[i]`, and its distance is `(j + 1) − i`. So for every prefix index `k`, the widest valid range ending at `k − 1` starts at the **first** index where the value `d[k]` appeared. Store the earliest occurrence of each prefix value in a map (values lie in `[−n, n]`, so an array works too) and maximise `k − first[d[k]]`.

```text
FUNCTION widestPairOfIndices(nums1, nums2):
    SET n ← LENGTH(nums1)
    SET first ← MAP with first[0] = 0
    SET d ← 0
    SET best ← 0
    FOR k ← 1 TO n:
        SET d ← d + nums1[k-1] - nums2[k-1]
        IF d IN first:
            SET best ← MAX(best, k - first[d])
        ELSE:
            SET first[d] ← k            // earliest occurrence only
    RETURN best
```

## Walkthrough
Example 1: `nums1 = [1,1,0,1]`, `nums2 = [0,1,1,0]` → differences `[1, 0, −1, 1]`.

| k | diff added | d[k] | first[d] | Candidate k − first | best |
|---|-----------|------|----------|---------------------|------|
| 0 | — | 0 | first[0] = 0 (init) | — | 0 |
| 1 | +1 | 1 | new → first[1] = 1 | — | 0 |
| 2 | 0 | 1 | 1 | 2 − 1 = 1 | 1 |
| 3 | −1 | 0 | 0 | 3 − 0 = 3 | 3 |
| 4 | +1 | 1 | 1 | 4 − 1 = 3 | 3 |

The best range is `d[4] = d[1]`, i.e. `i = 1`, `j = 3`. Output: `3`.

## Complexity Analysis
- Time: O(n) – one pass with O(1) map operations.
- Space: O(n) for the first-occurrence map (an array of size `2n + 1` indexed by `d + n`).

## Follow-Up Questions
- How would you return the actual pair `(i, j)`? (Store the `k` and `first[d]` that achieve the maximum: `i = first[d]`, `j = k − 1`.)
- What if the arrays were not binary but arbitrary integers? (The same prefix-difference + hash-map idea works; only the array-indexing trick for the map no longer applies.)
- How would you count the number of valid pairs instead of the widest one? (Add the frequency of `d[k]` seen so far at each step.)

## Key Takeaway
Equal range sums in two arrays means a zero-sum range in their difference array; zero-sum ranges correspond to equal prefix values, so the widest one comes from the earliest occurrence of each prefix value.
