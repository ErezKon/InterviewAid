# 1521. Find a Value of a Mysterious Function Closest to Target

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target](https://leetcode.com/problems/find-a-value-of-a-mysterious-function-closest-to-target)
**Companies:** American Express

---

## Problem Description
You are given a **monotonic** function `f(x)` that maps an integer `x` to a real number. The function is defined implicitly by a black‑box API that, for any integer `x`, returns `f(x)`. You are also given a target value `T`. Your task is to find an integer `x` such that `f(x)` is as close as possible to `T`. If multiple `x` achieve the same minimal absolute difference, return the smallest `x`. The search space for `x` is the entire set of 32‑bit signed integers.

## Examples
**Example 1**
```
Input:  T = 10.0
Assume f(x) = x * x (square function)
Output: 3
Explanation: f(3)=9 (|9‑10|=1) and f(4)=16 (|16‑10|=6). 3 is the closest.
```

**Example 2**
```
Input:  T = -5.5
Assume f(x) = 2*x + 1
Output: -3
Explanation: f(-3) = -5 (|‑5‑(‑5.5)|=0.5) which is the smallest distance.
```

## Approach
Because `f` is monotonic, we can perform a binary search on the integer domain.
1. **Find search bounds** – start with `low = INT_MIN`, `high = INT_MAX`. Repeatedly evaluate `f(mid)` and shrink the interval until `high - low` is small (e.g., ≤ 1).
2. **Binary search** – while `low < high`:
   * `mid = low + (high - low) // 2`
   * If `f(mid) < T`, move `low = mid + 1`; else `high = mid`.
3. After the loop, `low` and `low‑1` are the two candidate integers around the target. Compute `f(low)` and `f(low‑1)` (if within bounds) and pick the one with the smaller absolute difference to `T`. If equal, choose the smaller integer.

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
- **Time:** O(log range) where `range = INT_MAX - INT_MIN` (≈ 32 iterations) plus O(1) evaluations of `f`.
- **Space:** O(1) – only a few scalar variables.

## Follow‑Up Questions
1. How would you adapt the algorithm if `f` were only *approximately* monotonic (e.g., occasional plateaus)?
2. What if evaluating `f(x)` is expensive? Discuss caching or exponential search to tighten bounds first.
3. Extend to find the `k` integers whose function values are closest to `T`.

## Key Takeaway
Monotonicity lets us binary‑search the entire integer domain, reducing an otherwise infinite search to logarithmic time while handling edge cases with a simple post‑processing check.
