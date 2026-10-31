# 1093. Statistics from a Large Sample

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/statistics-from-a-large-sample](https://leetcode.com/problems/statistics-from-a-large-sample)
**Companies:** Microsoft

---

## Problem Description

You are given a large sample of integers in the range `[0, 255]`. Since the sample is so large, it is represented by an array `count` where `count[k]` is the **number of times** that `k` appears in the sample.

Calculate the following statistics:

- `minimum`: The minimum element in the sample.
- `maximum`: The maximum element in the sample.
- `mean`: The average of the sample, calculated as the total sum of all elements divided by the total number of elements.
- `median`:

- If the sample has an odd number of elements, then the `median` is the middle element once the sample is sorted.
- If the sample has an even number of elements, then the `median` is the average of the two middle elements once the sample is sorted.

- `mode`: The number that appears the most in the sample. It is guaranteed to be **unique**.

Return *the statistics of the sample as an array of floating-point numbers *`[minimum, maximum, mean, median, mode]`*. Answers within *`10^-5`* of the actual answer will be accepted.*

**Constraints:**
- `count.length == 256`
- `0 <= count[i] <= 10^9`
- `1 <= sum(count) <= 10^9`
- The mode of the sample that `count` represents is **unique**.

## Examples

**Example 1:**
```
Input: count = [0,1,3,4,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: [1.00000,3.00000,2.37500,2.50000,3.00000]
Explanation: The sample represented by count is [1,2,2,2,3,3,3,3].
The minimum and maximum are 1 and 3 respectively.
The mean is (1+2+2+2+3+3+3+3) / 8 = 19 / 8 = 2.375.
Since the size of the sample is even, the median is the average of the two middle elements 2 and 3, which is 2.5.
The mode is 3 as it appears the most in the sample.
```

**Example 2:**
```
Input: count = [0,4,3,2,2,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
Output: [1.00000,4.00000,2.18182,2.00000,1.00000]
Explanation: The sample represented by count is [1,1,1,1,2,2,2,3,3,4,4].
The minimum and maximum are 1 and 4 respectively.
The mean is (1+1+1+1+2+2+2+3+3+4+4) / 11 = 24 / 11 = 2.18181818... (for display purposes, the output shows the rounded number 2.18182).
Since the size of the sample is odd, the median is the middle element 2.
The mode is 1 as it appears the most in the sample.
```

## Approach
The input `count[0..255]` is already the frequency table, so we never materialize the sample (it can have up to 10⁹ elements). One pass over the 256 buckets gives the minimum (first non-zero index), maximum (last non-zero index), the weighted sum `Σ k·count[k]` (use 64-bit / Python int), the total `n = Σ count[k]`, and the mode (index with largest count). The median is found by a second scan of cumulative counts until reaching the middle position(s): position `(n+1)/2` if `n` is odd, otherwise the average of positions `n/2` and `n/2 + 1` (1-based).

**Pseudocode**
```text
FUNCTION sampleStats(count):
    SET minVal ← -1
    SET maxVal ← -1
    SET total ← 0
    SET n ← 0
    SET modeVal ← 0
    FOR k FROM 0 TO 255:
        IF count[k] > 0:
            IF minVal == -1:
                SET minVal ← k
            SET maxVal ← k
            SET total ← total + k * count[k]
            SET n ← n + count[k]
            IF count[k] > count[modeVal]:
                SET modeVal ← k
    SET mean ← total / n

    FUNCTION kth(pos):            // value at 1-based sorted position pos
        SET prefix ← 0
        FOR k FROM 0 TO 255:
            SET prefix ← prefix + count[k]
            IF prefix >= pos:
                RETURN k

    IF n MOD 2 == 1:
        SET median ← kth((n + 1) / 2)
    ELSE:
        SET median ← (kth(n / 2) + kth(n / 2 + 1)) / 2
    RETURN [minVal, maxVal, mean, median, modeVal]
```

## Walkthrough
Example 1: non-zero counts are `count[1]=1, count[2]=3, count[3]=4` (sample `[1,2,2,2,3,3,3,3]`).

| k | count[k] | prefix | running total | mode so far |
|---|----------|--------|---------------|-------------|
| 1 | 1 | 1 | 1 | 1 |
| 2 | 3 | 4 | 1 + 6 = 7 | 2 |
| 3 | 4 | 8 | 7 + 12 = 19 | 3 |

- `minimum = 1`, `maximum = 3`, `n = 8`, `mean = 19 / 8 = 2.375`, `mode = 3`.
- `n` is even: positions 4 and 5. Prefix reaches 4 at `k=2`, and reaches 5 at `k=3` → `median = (2 + 3) / 2 = 2.5`.

Result: `[1.00000, 3.00000, 2.37500, 2.50000, 3.00000]`.

## Complexity Analysis
- **Time:** O(R) with R = 256 buckets - independent of the sample size.
- **Space:** O(1) extra.

## Follow-Up Questions
1. How would you compute an arbitrary percentile (e.g. 90th) from the same count array?
2. What if the value range were large (e.g. 10⁹) and only a sparse map of counts were given?
3. How would you maintain the median under a stream of updates to `count`?

## Key Takeaway
When data arrives as a histogram, work directly on the buckets: all order statistics come from cumulative counts, so cost depends on the value range, not on the (huge) sample size.
