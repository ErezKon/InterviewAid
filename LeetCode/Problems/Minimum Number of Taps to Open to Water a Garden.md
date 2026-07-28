# 1326. Minimum Number of Taps to Open to Water a Garden

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden](https://leetcode.com/problems/minimum-number-of-taps-to-open-to-water-a-garden)
**Companies:** Adobe, Akuna Capital, Amazon, De Shaw, Google, Meesho, Meta, Microsoft, Morgan Stanley, Rippling, Salesforce, Squarepoint Capital, Uber

---

## Problem Description
You are given a garden of length `n` represented by the interval `[0, n]`. There are `n + 1` taps, where the `i`‑th tap can water the interval `[i - ranges[i], i + ranges[i]]`. Return the minimum number of taps you need to open to water the entire garden. If it is impossible, return `-1`.

## Examples
| n | ranges | Output | Explanation |
|---|---|---|---|
| 5 | [3,4,1,1,0,0] | 1 | Opening tap `0` covers `[0,3]` and tap `1` covers `[0,5]`; the garden is fully covered with just tap `1`. |
| 3 | [0,0,0,0] | -1 | No tap can water any part of the garden. |
| 7 | [1,2,1,0,2,1,0,1] | 3 | Open taps `1`, `4`, and `6` to cover the whole interval. |

## Approach
The problem can be reduced to the classic Jump Game II / Video Stitching problem. For each tap we compute the farthest right point it can reach from its leftmost start, then greedily determine the minimum number of intervals (taps) needed to cover `[0, n]`.

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
1. Compute intervals: tap 0 → `[0,3]`, tap 1 → `[0,5]`, tap 2 → `[1,3]`, …
2. Build `maxReach`: `maxReach[0] = 5` (from tap 1), others remain `0`.
3. Iterate positions:
   - At `i = 0`, `farthest = 5`, `i == curEnd` → open a tap (`taps = 1`), set `curEnd = 5`.
   - Loop ends as `curEnd` already covers the garden.
Result is `1` tap.

## Complexity Analysis
- **Time:** O(n) – single pass to build `maxReach` and another pass for the greedy scan.
- **Space:** O(n) – the `maxReach` array of size `n+1`.

## Follow-Up Questions
- How would the solution change if each tap had a different activation cost and you needed to minimize total cost?
- Can the algorithm be adapted for a 2‑dimensional garden with circular watering ranges?
- What if taps could be turned on partially, providing fractional coverage?

## Key Takeaway
Transforming tap ranges into interval reachability and applying the greedy Jump Game II strategy yields the minimum number of taps needed to water the whole garden.
