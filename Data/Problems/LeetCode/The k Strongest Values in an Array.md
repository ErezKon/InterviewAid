# 1471. The k Strongest Values in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/the-k-strongest-values-in-an-array](https://leetcode.com/problems/the-k-strongest-values-in-an-array)
**Companies:** Google

---

## Problem Description
Given an array of integers `arr` and an integer `k`.

A value `arr[i]` is said to be stronger than a value `arr[j]` if `|arr[i] - m| > |arr[j] - m|` where `m` is the **centre** of the array.
If `|arr[i] - m| == |arr[j] - m|`, then `arr[i]` is said to be stronger than `arr[j]` if `arr[i] > arr[j]`.

Return *a list of the strongest `k` values in the array*. Return the answer **in any arbitrary order**.

The **centre** is the middle value in an ordered integer list. More formally, if the length of the list is n, the centre is the element in position `((n - 1) / 2)` in the sorted list **(0-indexed)**.

- For `arr = [6, -3, 7, 2, 11]`, `n = 5` and the centre is obtained by sorting the array `arr = [-3, 2, 6, 7, 11]` and the centre is `arr[m]` where `m = ((5 - 1) / 2) = 2`. The centre is `6`.
- For `arr = [-7, 22, 17, 3]`, `n = 4` and the centre is obtained by sorting the array `arr = [-7, 3, 17, 22]` and the centre is `arr[m]` where `m = ((4 - 1) / 2) = 1`. The centre is `3`.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `-10^5 <= arr[i] <= 10^5`
- `1 <= k <= arr.length`

## Examples
```
Example 1:
  Input: arr = [1,2,3,4,5], k = 2
  Output: [5,1]
  Explanation: Centre is 3, the elements of the array sorted by the strongest are [5,1,4,2,3].
  The strongest 2 elements are [5, 1]. [1, 5] is also accepted answer.
  Please note that although |5 - 3| == |1 - 3| but 5 is stronger than 1 because 5 > 1.
```
```
Example 2:
  Input: arr = [1,1,3,5,5], k = 2
  Output: [5,5]
  Explanation: Centre is 3, the elements of the array sorted by the strongest are [5,5,1,1,3].
  The strongest 2 elements are [5, 5].
```
```
Example 3:
  Input: arr = [6,7,11,7,6,8], k = 5
  Output: [11,8,6,6,7]
  Explanation: Centre is 7, the elements of the array sorted by the strongest are [11,8,6,6,7,7].
  Any permutation of [11,8,6,6,7] is accepted.
```

## Approach
1. Sort `arr`.
2. Compute the median element at index `⌊n/2⌋`.
3. Use two pointers, one at the start (`left`) and one at the end (`right`). At each step compare the strength of `arr[left]` and `arr[right]`. Append the stronger element to the result and move the corresponding pointer inward. Repeat until `k` elements are selected.

```text
FUNCTION getStrongest(arr, k):
    SORT arr ASCENDING
    n ← LENGTH(arr)
    median ← arr[ n DIV 2 ]
    left ← 0
    right ← n - 1
    result ← LIST()
    WHILE LENGTH(result) < k:
        leftStrength ← ABS(arr[left] - median)
        rightStrength ← ABS(arr[right] - median)
        IF rightStrength > leftStrength OR (rightStrength = leftStrength AND arr[right] > arr[left]):
            APPEND result, arr[right]
            SET right ← right - 1
        ELSE:
            APPEND result, arr[left]
            SET left ← left + 1
    RETURN result
```
The two‑pointer selection ensures the strongest elements are chosen without sorting by strength.

## Walkthrough
| Step | left | right | chosen | result |
|------|------|-------|--------|--------|
| 1 | 0 (1) | 4 (5) | rightStrength=2 > leftStrength=2? tie → larger value 5 | [5] |
| 2 | 0 (1) | 3 (4) | leftStrength=2 > rightStrength=1 → choose left 1 | [5,1] |
| … | … | … | continue until k=2 |

## Complexity Analysis
- **Time:** O(n log n) for sorting; the two‑pointer scan is O(k) ≤ O(n).
- **Space:** O(1) extra space besides the output list (in‑place sort).

## Follow‑Up Questions
1. How would you modify the algorithm to return the `k` weakest values instead?
2. Can you achieve O(n) time without full sorting, e.g., using a quick‑select to find the median and a heap for the strongest elements?
3. How would the solution change if the strength definition used a different distance metric (e.g., squared difference)?

## Key Takeaway
Sorting to find the median and then using a two‑pointer greedy selection yields the `k` strongest values efficiently.
