# 1093. Statistics from a Large Sample

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/statistics-from-a-large-sample](https://leetcode.com/problems/statistics-from-a-large-sample)
**Companies:** Microsoft

---

## Problem Description
Given an integer array `sample` of length up to 10⁶ where each element is in the range `[0, 10⁴]`, compute the following statistics:
- Minimum value
- Maximum value
- Mean (average) value
- Median value (the middle element after sorting, or the average of the two middle elements if even length)
- Mode (the smallest value that appears most frequently)
Return these five numbers in an array.

## Examples
**Example 1:**
```
Input: sample = [1,2,2,3,4]
Output: [1,4,2.4,2,2]
Explanation:
min=1, max=4, mean=12/5=2.4, median=2 (middle element), mode=2 (appears twice).
```
**Example 2:**
```
Input: sample = [0,0,0,0]
Output: [0,0,0,0,0]
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
