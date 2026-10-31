# 868. Binary Gap

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/binary-gap](https://leetcode.com/problems/binary-gap)
**Companies:** Amazon, Bloomberg, Ebay, Google, Microsoft, Twitter

---

## Problem Description
Given a positive integer `n`, find and return *the **longest distance** between any two **adjacent** `1`'s in the binary representation of `n`. If there are no two adjacent `1`'s, return `0`.*

Two `1`'s are **adjacent** if there are only `0`'s separating them (possibly no `0`'s). The **distance** between two `1`'s is the absolute difference between their bit positions. For example, the two `1`'s in `"1001"` have a distance of 3.

**Constraints:**
- `1 ≤ n ≤ 10⁹`

## Examples
```
Example 1:
  Input: n = 22
  Output: 2
  Explanation: 22 in binary is "10110".
  The first adjacent pair of 1's is "[1]0[1]10" with a distance of 2.
  The second adjacent pair of 1's is "10[1][1]0" with a distance of 1.
  The answer is the largest of these two distances, which is 2.
  Note that "[1]01[1]0" is not a valid pair since there is a 1 separating the two 1's marked.

Example 2:
  Input: n = 8
  Output: 0
  Explanation: 8 in binary is "1000".
  There are not any adjacent pairs of 1's in the binary representation of 8, so we return 0.

Example 3:
  Input: n = 5
  Output: 2
  Explanation: 5 in binary is "101".
```

## Approach
Iterate through the bits from least-significant to most-significant, tracking the position of the last seen `1`. When a new `1` is encountered, compute the distance to the previous `1` and update the maximum gap.

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
- **Time:** O(log n) – one iteration per binary digit.
- **Space:** O(1) – only a few integer variables.

## Follow-Up Questions
1. How would you modify the algorithm to return the start and end indices of the longest gap?
2. Can you compute the binary gap for all numbers in a range `[L, R]` more efficiently than processing each individually?
3. What is the effect of using a built-in bit-count operation on performance?

## Key Takeaway
Scanning bits while remembering the position of the previous `1` lets you compute the longest zero stretch in a single pass with constant space.
