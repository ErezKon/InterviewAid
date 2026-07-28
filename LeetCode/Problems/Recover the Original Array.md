# 2122. Recover the Original Array

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/recover-the-original-array](https://leetcode.com/problems/recover-the-original-array)
**Companies:** Google

---

## Problem Description
Given an integer array `changed` of length `2 * n`, it is formed by taking an original array `original` of length `n`, duplicating each element, and then shuffling the resulting `2 * n` elements. Your task is to recover and return the original array. If no such original array exists, return an empty array.

## Examples
- **Example 1:** `changed = [1,3,4,2,6,8]` → `original = [1,3,4]`. Each element of `original` appears twice after being multiplied by 2 and shuffled.
- **Example 2:** `changed = [6,3,0,1]` → `original = []`. No valid original array can produce this `changed` array.

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
