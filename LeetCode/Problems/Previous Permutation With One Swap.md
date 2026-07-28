# 1053. Previous Permutation With One Swap

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/previous-permutation-with-one-swap](https://leetcode.com/problems/previous-permutation-with-one-swap)
**Companies:** Microsoft

---

## Problem Description
Given an integer array `arr` that represents a permutation of the first `n` positive integers, modify the array to obtain the lexicographically largest permutation that is **strictly smaller** than the original array, using **at most one swap** of any two elements. If no such permutation exists, return the array unchanged.

## Examples
**Example 1:**
```
Input: arr = [3,2,1]
Output: [3,1,2]
Explanation: Swapping the last two elements yields the largest permutation smaller than the original.
```
**Example 2:**
```
Input: arr = [1,1,5]
Output: [1,1,5]
Explanation: The array is already the smallest possible; no swap can make it smaller.
```
**Example 3:**
```
Input: arr = [1,9,4,6,7]
Output: [1,7,4,6,9]
Explanation: Swap 9 (index 1) with the largest element smaller than 9 to its right (7 at index 4).
```

## Approach
**Algorithm:** Greedy scan from right to find the first decreasing pair, then swap with the largest element smaller than the pivot that appears to its right (skip duplicates).
**Key Insight:** The first index `i` from the right where `arr[i] > arr[i+1]` marks the position where a smaller permutation can be created. To maximize the result, swap `arr[i]` with the greatest element `arr[j]` (`j > i`) that is still less than `arr[i]`; if multiple candidates exist, choose the leftmost occurrence of that value.

```text
FUNCTION prevPermOpt1(arr):
    n ← LENGTH(arr)
    // 1. Find the first index i from the right where arr[i] > arr[i+1]
    i ← n - 2
    WHILE i >= 0 AND arr[i] <= arr[i+1]:
        i ← i - 1
    IF i < 0:
        RETURN arr   // already smallest permutation

    // 2. Find the largest value smaller than arr[i] to the right of i
    j ← n - 1
    WHILE arr[j] >= arr[i]:
        j ← j - 1
    // skip duplicates of arr[j] to get the leftmost occurrence
    WHILE j - 1 > i AND arr[j-1] == arr[j]:
        j ← j - 1

    // 3. Swap arr[i] and arr[j]
    TEMP ← arr[i]
    arr[i] ← arr[j]
    arr[j] ← TEMP
    RETURN arr
```

## Walkthrough
For `arr = [1,9,4,6,7]`:
1. Scan from right: `i = 1` because `9 > 4` while `4 <= 6 <= 7`.
2. Scan from right for a value `< 9`: start `j = 4` (`7 < 9`). No duplicate of `7` to its left, so `j = 4`.
3. Swap positions 1 and 4 → `[1,7,4,6,9]`.
The result is the largest permutation smaller than the original.

## Complexity Analysis
- **Time:** O(n) – a single pass from the right and a second pass to locate `j`.
- **Space:** O(1) – in‑place modification.

## Follow‑Up Questions
1. How would the algorithm change if you were allowed up to `k` swaps?
2. Can you adapt the solution to return the previous permutation for a multiset (array with duplicate values) while still using at most one swap?
3. What is the time‑space trade‑off if you pre‑process the array with a suffix maximum structure?

## Key Takeaway
Identify the first decreasing position from the right and swap it with the greatest smaller element to its right (choosing the leftmost duplicate) to obtain the maximal smaller permutation in a single swap.
