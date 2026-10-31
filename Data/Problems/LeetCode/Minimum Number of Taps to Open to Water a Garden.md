# 1326. Minimum Number of Taps to Open to Water a Garden

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden)
**Companies:** Adobe, Akuna Capital, Amazon, De Shaw, Google, Meesho, Meta, Microsoft, Morgan Stanley, Rippling, Salesforce, Squarepoint Capital, Uber

---

## Problem Description

There is a one-dimensional garden on the x-axis. The garden starts at the point `0` and ends at the point `n`. (i.e., the length of the garden is `n`).

There are `n + 1` taps located at points `[0, 1, ..., n]` in the garden.

Given an integer `n` and an integer array `ranges` of length `n + 1` where `ranges[i]` (0-indexed) means the `i-th` tap can water the area `[i - ranges[i], i + ranges[i]]` if it was open.

Return *the minimum number of taps* that should be open to water the whole garden, If the garden cannot be watered return **-1**.

**Constraints:**
- `1 <= n <= 10^4`
- `ranges.length == n + 1`
- `0 <= ranges[i] <= 100`

## Examples

**Example 1:**
```
Input: n = 5, ranges = [3,4,1,1,0,0]
Output: 1
Explanation: The tap at point 0 can cover the interval [-3,3]
The tap at point 1 can cover the interval [-3,5]
The tap at point 2 can cover the interval [1,3]
The tap at point 3 can cover the interval [2,4]
The tap at point 4 can cover the interval [4,4]
The tap at point 5 can cover the interval [5,5]
Opening Only the second tap will water the whole garden [0,5]
```

**Example 2:**
```
Input: n = 3, ranges = [0,0,0,0]
Output: -1
Explanation: Even if you activate all the four taps you cannot water the whole garden.
```

## Approach
The problem can be reduced to the classic Jump Game II / Video Stitching problem. For each tap we compute the farthest right point it can reach from its leftmost start, then greedily determine the minimum number of intervals (taps) needed to cover `[0, n]`.

### Pseudocode
```text
FUNCTION minTaps(n, ranges):
    // maxReach[i] = farthest right endpoint of any tap that starts at or before i
    SET maxReach[0..n] ← ARRAY OF ZEROES
    FOR i ← 0 TO n:
        SET left ← MAX(0, i - ranges[i])
        SET right ← MIN(n, i + ranges[i])
        SET maxReach[left] ← MAX(maxReach[left], right)
    // Greedy jump game
    SET taps ← 0
    SET curEnd ← 0
    SET farthest ← 0
    FOR i ← 0 TO n-1:
        SET farthest ← MAX(farthest, maxReach[i])
        IF i = curEnd:
            IF farthest <= i:
                RETURN -1
            INCREMENT taps
            SET curEnd ← farthest
    RETURN taps
```

## Walkthrough
Consider `n = 5`, `ranges = [3,4,1,1,0,0]`.
1. Compute intervals: tap 0 → `[0,3]`, tap 1 → `[0,5]`, tap 2 → `[1,3]`, …
2. Build `maxReach`: `maxReach[0] = 5` (from tap 1), others remain `0`.
3. Iterate positions:
   - At `i = 0`, `farthest = 5`, `i == curEnd` → open a tap (`taps = 1`), set `curEnd = 5`.
   - Loop ends as `curEnd` already covers the garden.
Result is `1` tap.

## Complexity Analysis
- **Time:** O(n) – single pass to build `maxReach` and another pass for the greedy scan.
- **Space:** O(n) – the `maxReach` array of size `n+1`.

## Follow-Up Questions
- How would the solution change if each tap had a different activation cost and you needed to minimize total cost?
- Can the algorithm be adapted for a 2-dimensional garden with circular watering ranges?
- What if taps could be turned on partially, providing fractional coverage?

## Key Takeaway
Transforming tap ranges into interval reachability and applying the greedy Jump Game II strategy yields the minimum number of taps needed to water the whole garden.
