# 1093. Statistics from a Large Sample

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/statistics-from-a-large-sample](https://leetcode.com/problems/statistics-from-a-large-sample)
**Companies:** Microsoft

---

## Problem Description

> *Note: the Approach/Walkthrough below take the raw sample as input; the official input is the **count array** `count[0..255]` (already the frequency table), so skip the counting pass and compute min/max/mean/median/mode directly from `count`.*

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
Because the value range is limited (0‑10⁴), we can count frequencies in a fixed‑size array (`cnt[0..10000]`). A single pass computes min, max, total sum, and fills the frequency array. The median is found by scanning the counts until reaching the middle position(s). The mode is the smallest value with the highest frequency.

```text
FUNCTION sampleStats(sample):
    SET minVal ← INF
    SET maxVal ← -INF
    SET total ← 0
    SET n ← LENGTH(sample)
    CREATE array cnt[0..10000] initialized to 0
    FOR x IN sample:
        SET minVal ← MIN(minVal, x)
        SET maxVal ← MAX(maxVal, x)
        SET total ← total + x
        INCREMENT cnt[x]
    // mean
    SET mean ← total / n
    // mode
    SET modeFreq ← 0
    SET modeVal ← 0
    FOR i FROM 0 TO 10000:
        IF cnt[i] > modeFreq:
            SET modeFreq ← cnt[i]
            SET modeVal ← i
    // median
    SET prefix ← 0
    IF n MOD 2 == 1:
        SET medianPos ← (n + 1) / 2
        FOR i FROM 0 TO 10000:
            SET prefix ← prefix + cnt[i]
            IF prefix >= medianPos:
                SET median ← i
                BREAK
    ELSE:
        SET leftPos ← n / 2
        SET rightPos ← leftPos + 1
        SET leftVal ← -1
        SET rightVal ← -1
        FOR i FROM 0 TO 10000:
            SET prefix ← prefix + cnt[i]
            IF leftVal == -1 AND prefix >= leftPos:
                SET leftVal ← i
            IF rightVal == -1 AND prefix >= rightPos:
                SET rightVal ← i
                BREAK
        SET median ← (leftVal + rightVal) / 2
    RETURN [minVal, maxVal, mean, median, modeVal]
```

## Walkthrough
For `sample = [1,2,2,3,4]`:
1. After counting: `cnt[1]=1, cnt[2]=2, cnt[3]=1, cnt[4]=1`.
2. `min=1`, `max=4`, `total=12`, `mean=2.4`.
3. Mode: highest count is 2 at value 2 → `mode=2`.
4. Median (odd length 5): target position 3 → scanning counts reaches cumulative 3 at value 2 → `median=2`.
Result `[1,4,2.4,2,2]`.

## Complexity Analysis
- **Time:** O(n + R) where R = 10⁴ (range size), effectively linear in input size.
- **Space:** O(R) for the frequency array.

## Follow‑Up Questions
1. How would you adapt the solution if the value range were unbounded?
2. Can you compute the statistics in a streaming fashion with limited memory?
3. What changes are needed to return the percentile values (e.g., 25th, 75th) as well?

## Key Takeaway
Using a fixed‑size frequency array leverages the bounded value range to compute all required statistics in linear time.
