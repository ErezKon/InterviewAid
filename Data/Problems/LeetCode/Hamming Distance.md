# 461. Hamming Distance

**Difficulty:** 🟢 Easy
**LeetCode:** [https://leetcode.com/problems/hamming-distance](https://leetcode.com/problems/hamming-distance)
**Companies:** Amazon, Bloomberg, Google, Meta

---

## 1. Problem Description

The Hamming distance between two integers is the number of positions at which the corresponding bits are different.

Given two integers `x` and `y`, return *the **Hamming distance** between them*.

**Constraints:**
- `0 <= x, y <= 2^31 - 1`

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
```
Input: x = 1, y = 4
Output: 2
Explanation: 1   (0 0 0 1)
4   (0 1 0 0)
       ↑   ↑
The above arrows point to positions where the corresponding bits are different.
```

**Example 2:**
```
Input: x = 3, y = 1
Output: 1
```

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
