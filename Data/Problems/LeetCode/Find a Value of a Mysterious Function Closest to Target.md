# 1521. Find a Value of a Mysterious Function Closest to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target](https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target)
**Companies:** American Express

---

## Problem Description

> *Note: the Approach/Walkthrough below solve an invented problem (binary search on a monotonic black-box `f`). Here `func(arr, l, r)` is the bitwise AND of `arr[l..r]`. Correct idea: for each `r` keep the set of distinct AND values of subarrays ending at `r` (at most ~20 values, since each AND only loses bits): `cur = {a & arr[r] for a in prev} ∪ {arr[r]}`; track `min |v - target|` — O(n log maxV).*

![img](https://assets.leetcode.com/uploads/2020/07/09/change.png)

Winston was given the above mysterious function `func`. He has an integer array `arr` and an integer `target` and he wants to find the values `l` and `r` that make the value `|func(arr, l, r) - target|` minimum possible.

Return *the minimum possible value* of `|func(arr, l, r) - target|`.

Notice that `func` should be called with the values `l` and `r` where `0 <= l, r < arr.length`.

**Constraints:**
- `1 <= arr.length <= 10^5`
- `1 <= arr[i] <= 10^6`
- `0 <= target <= 10^7`

## Examples

**Example 1:**
```
Input: arr = [9,12,3,7,15], target = 5
Output: 2
Explanation: Calling func with all the pairs of [l,r] = [[0,0],[1,1],[2,2],[3,3],[4,4],[0,1],[1,2],[2,3],[3,4],[0,2],[1,3],[2,4],[0,3],[1,4],[0,4]], Winston got the following results [9,12,3,7,15,8,0,3,7,0,0,3,0,0,0]. The value closest to 5 is 7 and 3, thus the minimum difference is 2.
```

**Example 2:**
```
Input: arr = [1000000,1000000,1000000], target = 1
Output: 999999
Explanation: Winston called the func with all possible values of [l,r] and he always got 1000000, thus the min difference is 999999.
```

**Example 3:**
```
Input: arr = [1,2,4,8,16], target = 0
Output: 0
```

## Approach
Because `f` is monotonic, we can perform a binary search on the integer domain.
1. **Find search bounds** – start with `low = INT_MIN`, `high = INT_MAX`. Repeatedly evaluate `f(mid)` and shrink the interval until `high - low` is small (e.g., ≤ 1).
2. **Binary search** – while `low < high`:
   * `mid = low + (high - low) // 2`
   * If `f(mid) < T`, move `low = mid + 1`; else `high = mid`.
3. After the loop, `low` and `low-1` are the two candidate integers around the target. Compute `f(low)` and `f(low-1)` (if within bounds) and pick the one with the smaller absolute difference to `T`. If equal, choose the smaller integer.

### Pseudocode
```text
FUNCTION closestValue(T):
    SET low ← MIN_INT
    SET high ← MAX_INT
    WHILE low < high:
        SET mid ← low + (high - low) // 2
        SET val ← f(mid)
        IF val < T:
            SET low ← mid + 1
        ELSE:
            SET high ← mid
    // low is the smallest x with f(x) >= T
    SET candidates ← []
    APPEND low TO candidates
    IF low > MIN_INT:
        APPEND low - 1 TO candidates
    SET bestX ← NULL
    SET bestDiff ← INFINITY
    FOR x IN candidates:
        SET diff ← ABS(f(x) - T)
        IF diff < bestDiff OR (diff == bestDiff AND x < bestX):
            SET bestDiff ← diff
            SET bestX ← x
    RETURN bestX
```

## Walkthrough
Assume `f(x) = x * x` and `T = 10`.
| Step | low | high | mid | f(mid) | Action |
|------|-----|------|-----|--------|--------|
| 1    | -∞  | ∞    | 0   | 0      | f(mid) < T → low = 1 |
| 2    | 1   | ∞    | 2^30| huge   | f(mid) > T → high = 2^30 |
| …    | …   | …    | …   | …      | binary search continues |
| Final| low=3 | high=3 | – | – | candidates = [3,2]; f(3)=9, f(2)=4 → choose 3 |
Thus the algorithm returns `3`.

## Complexity Analysis
- **Time:** O(log range) where `range = INT_MAX - INT_MIN` (≈ 32 iterations) plus O(1) evaluations of `f`.
- **Space:** O(1) – only a few scalar variables.

## Follow-Up Questions
1. How would you adapt the algorithm if `f` were only *approximately* monotonic (e.g., occasional plateaus)?
2. What if evaluating `f(x)` is expensive? Discuss caching or exponential search to tighten bounds first.
3. Extend to find the `k` integers whose function values are closest to `T`.

## Key Takeaway
Monotonicity lets us binary-search the entire integer domain, reducing an otherwise infinite search to logarithmic time while handling edge cases with a simple post-processing check.
