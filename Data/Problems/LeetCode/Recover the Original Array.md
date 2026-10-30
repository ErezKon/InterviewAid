# 2122. Recover the Original Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/recover-the-original-array](https://leetcode.com/problems/recover-the-original-array)
**Companies:** Google

---

## Problem Description
Alice had a **0-indexed** array `arr` consisting of `n` **positive** integers. She chose an arbitrary **positive integer** `k` and created two new **0-indexed** integer arrays `lower` and `higher` in the following manner:

1. `lower[i] = arr[i] - k`, for every index `i` where `0 <= i < n`
2. `higher[i] = arr[i] + k`, for every index `i` where `0 <= i < n`

Unfortunately, Alice lost all three arrays. However, she remembers the integers that were present in the arrays `lower` and `higher`, but not the array each integer belonged to. Help Alice and recover the original array.

Given an array `nums` consisting of `2n` integers, where **exactly** `n` of the integers were present in `lower` and the remaining in `higher`, return *the **original** array* `arr`. In case the answer is not unique, return ***any** valid array*.

**Note:** The test cases are generated such that there exists **at least one** valid array `arr`.

**Constraints:**

- `2 * n == nums.length`
- `1 <= n <= 1000`
- `1 <= nums[i] <= 10⁹`
- The test cases are generated such that there exists **at least one** valid array `arr`.

## Examples

```
Example 1:
  Input: nums = [2,10,6,4,8,12]
  Output: [3,7,11]
  Explanation:
    If arr = [3,7,11] and k = 1, we get lower = [2,6,10] and higher = [4,8,12].
    Combining lower and higher gives us [2,6,10,4,8,12], which is a permutation of nums.
    Another valid possibility is that arr = [5,7,9] and k = 3. In that case, lower = [2,4,6] and higher = [8,10,12].
```

```
Example 2:
  Input: nums = [1,1,3,3]
  Output: [2,2]
  Explanation:
    If arr = [2,2] and k = 1, we get lower = [1,1] and higher = [3,3].
    Combining lower and higher gives us [1,1,3,3], which is equal to nums.
    Note that arr cannot be [1,3] because in that case, the only possible way to obtain [1,1,3,3] is with k = 0.
    This is invalid since k must be positive.
```

```
Example 3:
  Input: nums = [5,435]
  Output: [220]
  Explanation:
    The only possible combination is arr = [220] and k = 215. Using them, we get lower = [5] and higher = [435].
```

## Approach
The key insight is that for each element `x` in the sorted `changed` array, its double `2*x` must also be present. By processing elements in ascending order and using a frequency map, we can match each `x` with its double.

```text
FUNCTION RecoverOriginal(changed):
    IF length(changed) MOD 2 ≠ 0:
        RETURN []
    SORT changed ASCENDING
    CREATE map freq ← empty
    FOR each num IN changed:
        INCREMENT freq[num]
    CREATE list original ← []
    FOR each num IN changed:
        IF freq[num] = 0:
            CONTINUE
        IF freq[2 * num] = 0:
            RETURN []
        APPEND num TO original
        DECREMENT freq[num]
        DECREMENT freq[2 * num]
    RETURN original
```

## Walkthrough
| Step | Sorted `changed` | freq map | Action | `original` |
|------|------------------|----------|--------|------------|
| 1 | [1,2,3,4,6,8] | {1:1,2:1,3:1,4:1,6:1,8:1} | match 1 with 2 | [1] |
| 2 | … | {1:0,2:0,3:1,4:1,6:1,8:1} | match 3 with 6 | [1,3] |
| 3 | … | {3:0,6:0,4:1,8:1} | match 4 with 8 | [1,3,4] |
| 4 | all frequencies zero → finish |

## Complexity Analysis
- **Time:** `O(n log n)` for sorting, where `n` is `len(changed)`.
- **Space:** `O(n)` for the frequency map and the output array.

## Follow-Up Questions
1. How would the solution change if the original array could contain zeros?
2. Can the algorithm be adapted for a streaming input where `changed` is received element by element?
3. What if the duplication factor is `k` instead of `2`?

## Key Takeaway
By sorting and using a frequency map, we can greedily pair each element with its double to reconstruct the original array efficiently.
