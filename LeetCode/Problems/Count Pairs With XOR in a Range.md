# 1803. Count Pairs With XOR in a Range

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-pairs-with-xor-in-a-range](https://leetcode.com/problems/count-pairs-with-xor-in-a-range)
**Companies:** Vimeo

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

Given an array `nums` and two integers `low` and `high`, return the number of **nice pairs** `(i, j)` where `0 <= i < j < nums.length` and `low <= (nums[i] XOR nums[j]) <= high`.

**Constraints:**
- `1 <= nums.length <= 2 × 10^4`
- `1 <= nums[i] <= 2 × 10^4`
- `1 <= low <= high <= 2 × 10^4`

---

## Examples

**Example 1:**
- **Input:** `nums = [1,4,2,7], low = 2, high = 6`
- **Output:** `6`
- **Explanation:** All XOR pairs: 1⊕4=5, 1⊕2=3, 1⊕7=6, 4⊕2=6, 4⊕7=3, 2⊕7=5. All are in [2,6].

---

## Key Insight

Use a **Trie** (binary trie) to count pairs with XOR less than a limit. Then:
`count(low, high) = countLessThan(high + 1) - countLessThan(low)`

For each number, insert it into the trie, then query how many previously inserted numbers XOR with it to produce a value < limit.

---

## Approach

```
FUNCTION countPairs(nums, low, high):
    RETURN countLessThan(nums, high + 1) - countLessThan(nums, low)

FUNCTION countLessThan(nums, limit):
    trie = new BinaryTrie()
    count = 0
    FOR num IN nums DO
        count += trie.countPairsLessThan(num, limit)
        trie.insert(num)
    RETURN count

// Binary Trie processes bits from MSB to LSB (14 bits for values ≤ 2×10^4)
// countPairsLessThan(num, limit):
//   Walk the trie bit by bit. At each level:
//   - If limit's bit is 1: all numbers in the "same XOR bit = 0" subtree
//     produce XOR < limit at this point → add their count. Then go to the
//     "XOR bit = 1" subtree (which keeps XOR value matching limit so far).
//   - If limit's bit is 0: must go to "XOR bit = 0" subtree only.
```

---

## Walkthrough

**Input:** `nums = [1, 4, 2, 7], low = 2, high = 6`

```
countLessThan(nums, 7):
  Insert 1, then for 4: 1⊕4=5 < 7 → count pairs < 7
  Continue inserting and querying...
  Total pairs with XOR < 7 = 6

countLessThan(nums, 2):
  Count pairs with XOR < 2 = 0

Result: 6 - 0 = 6 ✅
```

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × 15) ≈ O(n) — 15 bits per number, insert and query each |
| **Space** | O(n × 15) — trie nodes |

---

## Follow-Up Questions

**Q1: Why a trie instead of brute force?**
Brute force is O(n²). The trie approach is O(n × log(max_val)), which is effectively O(n) since log(20000) ≈ 15.

**Q2: How does the trie count XOR < limit?**
At each bit level, if the limit bit is 1, all numbers that would produce a 0 at this XOR bit contribute to "less than" (they diverge below the limit). Add their count and continue down the "equals limit so far" path.

**Q3: Can this be solved with sorting?**
Not easily — XOR doesn't preserve order, so sorted structures don't help directly. The trie is the natural data structure for bitwise operations.

---

## Key Takeaway

> **Binary tries are the go-to data structure for XOR-based pair counting. The "count less than limit" query processes bits from MSB to LSB, accumulating subtree counts where the XOR diverges below the limit.**
