# 2275. Largest Combination With Bitwise AND Greater Than Zero

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero](https://leetcode.com/problems/largest-combination-with-bitwise-and-greater-than-zero)
**Companies:** Adobe, Amazon, Google, Jump Trading, Microsoft

---

## 1. Problem Description

Find the largest subset of `candidates` whose bitwise AND is greater than 0.

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
Input: candidates = [2,3,4,5]
Output: 3
Explanation: The binary representations are 0010, 0011, 0100, 0101.
The bit position 0 (least‑significant) is set in 2,3,5 → count = 3.
The bit position 2 is set in 4,5 → count = 2.
Maximum count is 3, so the largest combination size is 3.
```

**Example 2:**
```
Input: candidates = [1,2,3]
Output: 2
Explanation: Bit 0 is set in 1 and 3 (count = 2). Bit 1 is set in 2 and 3 (count = 2).
Thus the answer is 2.
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
| O(24·n) → O(n) – one pass per bit (24 bits for 32‑bit ints) | O(1) – only counters are stored |

---

## 7. Follow-Up Questions

1. How would the solution change if numbers could be up to 2³¹‑1 (31 bits)?
2. Can you extend the approach to find the largest subset where the bitwise OR is less than a given value?
3. What if you need the actual subset, not just its size?

---

## Key Takeaway

> Reduce bitwise AND to per‑bit counting. The largest combination sharing a common set bit = the max bit frequency. No need to enumerate subsets.