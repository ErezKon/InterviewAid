# 461. Hamming Distance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hamming-distance](https://leetcode.com/problems/hamming-distance)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

Return the Hamming distance between two integers — the number of bit positions where they differ.

---

## 2. Approach: XOR + Popcount — O(1) ✅

```text
FUNCTION hammingDistance(x, y):
    // XOR highlights differing bits
    SET xor ← x XOR y
    // Count set bits (popcount)
    RETURN countSetBits(xor)
```

---

## 3. Examples

**Example 1:**
- Input: `x = 1, y = 4`
- Output: `2`
- Explanation: Binary `1` is `001`, `4` is `100`; they differ at two positions.

**Example 2:**
- Input: `x = 3, y = 1`
- Output: `1`
- Explanation: `3` is `011`, `1` is `001`; only the second bit differs.

---

## 4. Walkthrough

| Step | x (binary) | y (binary) | XOR (binary) | Set Bits |
|------|------------|------------|--------------|----------|
| 1    | 001        | 100        | 101          | 2 |
| 2    | 011        | 001        | 010          | 1 |

The algorithm XORs the numbers and counts the number of `1`s in the result.

---

## 5. Complexity Analysis

- **Time:** O(1) — constant-time bit operations.
- **Space:** O(1) — only a few integer variables.

---

## 6. Follow-Up Questions

- How would you compute the Hamming distance for large binary strings?
- Can you extend this to compute the distance between two arrays of integers?

---

## Key Takeaway

> XOR produces `1`s where bits differ. Counting the `1`s (popcount) yields the Hamming distance.
