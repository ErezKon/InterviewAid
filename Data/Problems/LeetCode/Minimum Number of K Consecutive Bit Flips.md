# 995. Minimum Number of K Consecutive Bit Flips

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips](https://leetcode.com/problems/minimum-number-of-k-consecutive-bit-flips)
**Companies:** Amazon, Bloomberg, Google, Meta, Microsoft

---

## Problem Description

You are given a binary array `nums` and an integer `k`. In one operation you may select a subarray of length `k` and flip every bit in it (changing `0` to `1` and `1` to `0`). Return the minimum number of operations required to make all bits `1`. If it is impossible, return `-1`.

## Examples

1. **Input:** `nums = [0,0,0,1,0,1,1,0]`, `k = 3`
   **Output:** `3`
   **Explanation:** Flip at indices `0`, `1`, and `4` (0‑based) to obtain all `1`s.
2. **Input:** `nums = [1,1,0]`, `k = 2`
   **Output:** `-1`
   **Explanation:** No sequence of length‑2 flips can turn the third bit to `1`.

## Approach

**Algorithm:** Greedy with a sliding‑window counter.

- Iterate from left to right, maintaining `flipCount`, the number of flips affecting the current position.
- When the current effective bit (`(nums[i] + flipCount) % 2`) is `0`, we must start a new flip at `i` (if `i + k` fits within the array).
- Record the start of each flip in an auxiliary array `flipped[i] = 1` and increment `flipCount`.
- When the window moves past `k` positions, subtract the effect of the flip that ends (`flipped[i‑k]`).
- Count each new flip; if a required flip would exceed the array bounds, return `-1`.

```text
FUNCTION minKBitFlips(nums, k):
    n ← LENGTH(nums)
    flipped ← ARRAY(n, 0)          // marks where a flip starts
    flipCount ← 0
    result ← 0
    FOR i ← 0 TO n-1 DO
        IF i ≥ k THEN
            flipCount ← flipCount - flipped[i - k]
        ENDIF
        // effective value after previous flips
        IF (nums[i] + flipCount) MOD 2 = 0 THEN
            IF i + k > n THEN RETURN -1
            flipped[i] ← 1
            flipCount ← flipCount + 1
            result ← result + 1
        ENDIF
    ENDFOR
    RETURN result
```

## Walkthrough

For `nums = [0,0,0,1,0,1,1,0]`, `k = 3`:

- At `i=0`, effective bit `0` → start flip, `flipped[0]=1`.
- At `i=1`, effective bit `0` (still flipped once) → start flip, `flipped[1]=1`.
- At `i=2`, effective bit `0` → start flip, `flipped[2]=1`.
- Continue; when `i=5` the first flip ends, reducing `flipCount`.
- Total flips recorded: `3`.

## Complexity Analysis

- **Time:** `O(n)` – single pass through the array.
- **Space:** `O(n)` for the `flipped` auxiliary array (can be reduced to `O(k)` with a queue).

## Follow‑Up Questions

- How would you adapt the algorithm if flips could be of variable length?
- Can the solution be extended to minimize the number of flips when the target pattern is not all `1`s?
- What is the impact on complexity if the array size is up to `10^5` and `k` is large?

## Key Takeaway

A left‑to‑right greedy scan with a sliding‑window counter determines exactly where flips are needed, yielding a linear‑time solution.
