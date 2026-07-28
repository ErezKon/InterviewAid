# 868. Binary Gap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-gap](https://leetcode.com/problems/binary-gap)
**Companies:** Amazon, Bloomberg, Ebay, Google, Microsoft, Twitter

---

## Problem Description
Given a positive integer `n`, consider its binary representation without leading zeros. A binary gap is the maximum number of consecutive zeros that are surrounded by ones on both sides. Return the length of the longest binary gap. If no such gap exists, return `0`.

## Examples
**Example 1**
```
Input: n = 22   // binary 10110
Output: 2
Explanation: The longest sequence of zeros surrounded by ones is "00".
```
**Example 2**
```
Input: n = 8    // binary 1000
Output: 0
Explanation: There is no closing "1" after the zeros.
```

## Approach
Iterate through the bits from least‑significant to most‑significant, tracking the position of the last seen `1`. When a new `1` is encountered, compute the distance to the previous `1` and update the maximum gap.

```text
FUNCTION BinaryGap(n):
    SET lastOnePos ← -1
    SET maxGap ← 0
    SET pos ← 0
    WHILE n > 0:
        IF (n AND 1) = 1:
            IF lastOnePos ≠ -1:
                SET gap ← pos - lastOnePos - 1
                SET maxGap ← MAX(maxGap, gap)
            ENDIF
            SET lastOnePos ← pos
        ENDIF
        SET n ← n >> 1
        SET pos ← pos + 1
    ENDWHILE
    RETURN maxGap
```

## Walkthrough
| Step | n (binary) | pos | lastOnePos | maxGap |
|------|------------|-----|------------|--------|
| start| 10110      | 0   | -1         | 0 |
| bit0 | 0          | 0   | -1         | 0 |
| bit1 | 1          | 1   | 1          | 0 |
| bit2 | 1          | 2   | 1          | 0 |
| bit3 | 0          | 3   | 1          | 1 |
| bit4 | 1          | 4   | 4          | 2 |
The final `maxGap` is `2`.

## Complexity Analysis
- **Time:** O(log n) – one iteration per binary digit.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you modify the algorithm to return the start and end indices of the longest gap?
2. Can you compute the binary gap for all numbers in a range `[L, R]` more efficiently than processing each individually?
3. What is the effect of using a built‑in bit‑count operation on performance?

## Key Takeaway
Scanning bits while remembering the position of the previous `1` lets you compute the longest zero stretch in a single pass with constant space.
