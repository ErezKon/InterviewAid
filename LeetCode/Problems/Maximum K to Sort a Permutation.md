# 3644. Maximum K to Sort a Permutation

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-k-to-sort-a-permutation](https://leetcode.com/problems/maximum-k-to-sort-a-permutation)
**Companies:** Amazon

---

## Problem Description
Given a permutation of the integers `1` to `n`, determine the maximum integer `K` such that the permutation can be sorted in non‑decreasing order using at most `K` swap operations (any two positions may be swapped). Return `K`.

## Examples
| Input | Output | Explanation |
|-------|--------|-------------|
| `[3,1,2]` | `2` | Swapping positions `0` and `2` yields `[2,1,3]`; a second swap of `0` and `1` sorts the array. No sequence of a single swap can sort it, so the maximum `K` is `2`. |
| `[1,2,3,4]` | `0` | The array is already sorted; zero swaps are needed, so the maximum `K` is `0`. |

## Approach
The minimum number of swaps required to sort a permutation equals `n - (number of cycles in the permutation)`. Compute the cycle decomposition, derive the minimum swaps, and the answer `K` is that minimum value because any larger `K` is also feasible.

```text
FUNCTION maxKToSort(permutation):
    SET n ← LENGTH(permutation)
    SET visited ← ARRAY of FALSE size n
    SET cycles ← 0
    FOR i ← 0 TO n-1:
        IF NOT visited[i]:
            SET j ← i
            WHILE NOT visited[j]:
                SET visited[j] ← TRUE
                SET j ← permutation[j] - 1  // convert value to index
            SET cycles ← cycles + 1
    SET minSwaps ← n - cycles
    RETURN minSwaps
```

## Walkthrough
Consider `[3,1,2]` (n=3):
1. Start at index 0 → 0→2→1→0 forms one cycle, `cycles=1`.
2. `minSwaps = 3 - 1 = 2` → return `2`.

## Complexity Analysis
- **Time:** `O(n)` – single pass to discover cycles.
- **Space:** `O(n)` – visited array.

## Follow‑Up Questions
1. How would the answer change if only adjacent swaps were allowed?
2. Can you extend the solution to return the actual sequence of swaps?
3. What is the minimum number of swaps needed to sort a list with duplicate values?

## Key Takeaway
The minimum swaps to sort a permutation equals the array size minus the number of permutation cycles; this directly yields the maximum feasible `K`.