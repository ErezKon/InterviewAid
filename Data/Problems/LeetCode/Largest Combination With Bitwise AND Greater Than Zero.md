# 2275. Largest Combination With Bitwise AND Greater Than Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero)
**Companies:** Adobe, Amazon, Google, Jump Trading, Microsoft

---

## 1. Problem Description

The **bitwise AND** of an array `nums` is the bitwise AND of all integers in `nums`.

- For example, for `nums = [1, 5, 3]`, the bitwise AND is equal to `1 & 5 & 3 = 1`.
- Also, for `nums = [7]`, the bitwise AND is `7`.

You are given an array of positive integers `candidates`. Compute the **bitwise AND** for all possible **combinations** of elements in the `candidates` array.

Return *the size of the **largest** combination of* `candidates` *with a bitwise AND **greater** than* `0`.

**Constraints:**
- `1 <= candidates.length <= 10^5`
- `1 <= candidates[i] <= 10^7`

---

## 2. Key Insight

AND > 0 iff there's at least one bit position set in ALL selected numbers. For each bit, count how many numbers have it set. The answer is the max count across all bits.

---

## 3. Approach: Bit Counting — O(24·n) ✅

```text
FUNCTION largestCombination(candidates):
    maxCount ← 0
    FOR bit ← 0 TO 23:
        count ← 0
        FOR each c IN candidates:
            IF c AND (1 << bit) ≠ 0:
                count ← count + 1
        maxCount ← MAX(maxCount, count)
    RETURN maxCount
```

---

## 4. Examples

**Example 1:**
```
Input: candidates = [16,17,71,62,12,24,14]
Output: 4
Explanation: The combination [16,17,62,24] has a bitwise AND of 16 & 17 & 62 & 24 = 16 > 0 (non-zero).
The size of the combination is 4 (combination size = 4).
It can be shown that no combination with a size greater than 4 has a bitwise AND greater than 0
(the maximum number of candidates sharing any single set bit, here bit 4, is count = 4).
Note that more than one combination may have the largest size.
For example, the combination [62,12,24,14] has a bitwise AND of 62 & 12 & 24 & 14 = 8 > 0.
```

**Example 2:**
```
Input: candidates = [8,8]
Output: 2
Explanation: The largest combination [8,8] has a bitwise AND of 8 & 8 = 8 > 0.
(Bit 3 is set in both numbers: count = 2, so the max bit frequency is also count = 2).
The size of the combination is 2, so we return 2.
```

---

## 5. Walkthrough

Consider the first example `[2,3,4,5]`.
| Step | Bit examined | Numbers with bit set | Count |
|------|--------------|----------------------|-------|
| 1 | 0 | 2 (0010), 3 (0011), 5 (0101) | 3 |
| 2 | 1 | 2 (0010), 3 (0011) | 2 |
| 3 | 2 | 4 (0100), 5 (0101) | 2 |
The algorithm records the maximum count (3) and returns it.

---

## 6. Complexity Analysis

| Time | Space |
|------|-------|
| O(24·n) → O(n) – one pass per bit (24 bits for 32-bit ints) | O(1) – only counters are stored |

---

## 7. Follow-Up Questions

1. How would the solution change if numbers could be up to 2³¹-1 (31 bits)?
2. Can you extend the approach to find the largest subset where the bitwise OR is less than a given value?
3. What if you need the actual subset, not just its size?

---

## Key Takeaway

> Reduce bitwise AND to per-bit counting. The largest combination sharing a common set bit = the max bit frequency. No need to enumerate subsets.