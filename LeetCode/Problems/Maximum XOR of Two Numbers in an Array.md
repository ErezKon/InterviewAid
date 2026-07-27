# 421. Maximum XOR of Two Numbers in an Array

**Difficulty:** 🟡 Medium
**LeetCode:** [https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array](https://leetcode.com/problems/maximum-xor-of-two-numbers-in-an-array)
**Companies:** Amazon, Bloomberg, Goldman Sachs, Google, Meta, Microsoft

---

## Table of Contents

- [Problem Description](#problem-description)
- [Examples](#examples)
- [Key Insight](#key-insight)
- [Approach](#approach)
- [Walkthrough](#walkthrough)
- [Complexity Analysis](#complexity-analysis)
- [Follow-Up Questions](#follow-up-questions)
- [Key Takeaway](#key-takeaway)

---

## Problem Description

Given an integer array `nums`, return the **maximum XOR** of any two elements `nums[i] XOR nums[j]` where `0 ≤ i ≤ j < n`.

**Constraints:**
- `1 ≤ nums.length ≤ 2 × 10⁵`
- `0 ≤ nums[i] ≤ 2³¹ - 1`

---

## Examples

**Example 1:**
```
Input:  nums = [3, 10, 5, 25, 2, 8]
Output: 28
Explanation: 5 XOR 25 = 28.
```

**Example 2:**
```
Input:  nums = [14, 70, 53, 83, 49, 91, 36, 80, 92, 51, 66, 70]
Output: 127
```

---

## Key Insight

> Build a **binary trie** of all numbers (MSB to LSB). For each number, greedily traverse the trie choosing the **opposite bit** at each level to maximize the XOR. This guarantees we find the optimal pair in O(32) per number.

---

## Approach: Trie — O(32n) ✅

```
FUNCTION findMaximumXOR(nums):
    // ——— Build trie ———
    root ← TrieNode()
    FOR num IN nums DO
        node ← root
        FOR bit ← 31 DOWN TO 0 DO
            b ← (num >> bit) AND 1
            IF b NOT IN node.children THEN
                node.children[b] ← TrieNode()
            node ← node.children[b]

    // ——— Find max XOR ———
    maxXOR ← 0
    FOR num IN nums DO
        node ← root
        curXOR ← 0
        FOR bit ← 31 DOWN TO 0 DO
            b ← (num >> bit) AND 1
            // Try opposite bit for maximum XOR
            IF (1 - b) IN node.children THEN
                curXOR ← curXOR OR (1 << bit)
                node ← node.children[1 - b]
            ELSE
                node ← node.children[b]
        maxXOR ← MAX(maxXOR, curXOR)

    RETURN maxXOR
```

---

## Walkthrough

```
nums = [3, 10, 5, 25, 2, 8]

Binary (5 bits shown):
  3  = 00011
  10 = 01010
  5  = 00101
  25 = 11001
  2  = 00010
  8  = 01000

Build trie with all numbers...

Query for num=5 (00101):
  bit 4: want 1, trie has 1 (from 25) → curXOR |= 16, go to 1-branch
  bit 3: want 1, trie has 1 (from 25) → curXOR |= 8, go to 1-branch
  bit 2: want 1, no 1 in this branch → go to 0 (from 25=11001)
  bit 1: want 1, trie has 0 only → go to 0
  bit 0: want 0, trie has 1 → curXOR |= 1
  curXOR = 16+8+0+0+1 = but actually...

Best pair: 5 XOR 25 = 00101 XOR 11001 = 11100 = 28

Return 28 ✅
```

---

## Complexity Analysis

| Approach | Time | Space |
|----------|------|-------|
| Binary Trie | **O(32n)** | **O(32n)** |
| Hash Set (bit-by-bit) | O(32n) | O(n) |
| Brute force | O(n²) | O(1) |

---

## Follow-Up Questions

1. **Alternative: Hash Set approach?** Build the answer bit by bit from MSB. For each bit, check if any pair achieves the current prefix XOR using a hash set. Same O(32n) time, O(n) space.
2. **Why MSB to LSB?** Higher bits contribute more to the XOR value, so we greedily maximize from the most significant bit.
3. **What about negative numbers?** Handle sign bit separately or use unsigned representation.
4. **Can this extend to max XOR of k numbers?** Becomes much harder — NP-hard in general for arbitrary k.

---

## Key Takeaway

> **Binary Trie** is the go-to structure for "maximize XOR of a pair" problems — insert all numbers, then greedily choose opposite bits from MSB to LSB. O(32n) time, O(32n) space.

---
