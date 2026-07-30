# 2791. Count Paths That Can Form a Palindrome in a Tree

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree](https://leetcode.com/problems/count-paths-that-can-form-a-palindrome-in-a-tree)
**Companies:** Google, Thoughtspot, Uber, Weride

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

Given a rooted tree with `n` nodes where each edge has a character label (lowercase letter), count the number of pairs of nodes `(u, v)` where `u < v` such that the string formed by the characters on the path from `u` to `v` can be rearranged into a palindrome.

**Constraints:**
- `2 <= n <= 10^5`
- Edge labels are lowercase English letters

---

## Examples

**Example 1:**
- **Input:** `parent = [-1, 0, 0, 1, 1, 2], s = "acaabc"`
- **Output:** `8`

---

## Key Insight

A string can form a palindrome iff **at most 1 character has odd frequency**. Represent character parity as a **26-bit bitmask** — bit `i` is 1 if character `i` appears an odd number of times.

For the path from `u` to `v`, the parity mask = `mask(root→u) XOR mask(root→v)`. This path is palindrome-rearrangeable iff the XOR result has **≤ 1 bit set**.

So: compute root-to-node masks via DFS, then count pairs where `mask_u XOR mask_v` has ≤ 1 bit set. Use a hash map of mask frequencies.

---

## Approach: DFS + Bitmask — O(n × 26) ✅

```
FUNCTION countPalindromePaths(parent, s):
    n = LENGTH(parent)
    mask = [0] * n   // root-to-node parity mask

    // Compute masks via BFS/DFS from root
    FOR i ← 1 TO n - 1 DO
        mask[i] = mask[parent[i]] XOR (1 << (s[i] - 'a'))

    // Count pairs using hash map
    freq = Counter()
    count = 0

    FOR i ← 0 TO n - 1 DO
        // Exact match: mask_u XOR mask_v = 0
        count += freq[mask[i]]

        // One bit different: mask_u XOR mask_v = 2^b for b in 0..25
        FOR b ← 0 TO 25 DO
            count += freq[mask[i] XOR (1 << b)]

        freq[mask[i]] += 1

    RETURN count
```

---

## Walkthrough

For each node, we compute its root-to-node mask by XORing the parent's mask with the current edge character bit. Then for each node, we check the hash map for:
1. Exact same mask (XOR = 0 → all characters have even count → palindrome)
2. Mask differing by exactly 1 bit (XOR = 2^b → exactly 1 odd-count character → palindrome)

This gives all valid pairs in O(n × 26) time.

---

## Complexity Analysis

| Aspect | Value |
|---|---|
| **Time** | O(n × 26) — for each node, check 27 possible partner masks |
| **Space** | O(n) — mask array + hash map |

---

## Follow-Up Questions

**Q1: Why XOR for path masks?**
XOR cancels the common ancestor path. `mask(u) XOR mask(v)` gives the parity of characters on the `u→v` path because the root-to-LCA segment appears in both and cancels out.

**Q2: Why check 27 masks (not more)?**
A valid palindrome rearrangement needs ≤ 1 odd-count character. XOR of two masks with this property has at most 1 bit set → only 27 possible values (0 or 2^0..2^25).

**Q3: Could this be solved with LCA + brute force?**
Yes but O(n² × path_length) is far too slow. The bitmask + hash map approach avoids computing actual paths.

---

## Key Takeaway

> **Palindrome rearrangement on tree paths reduces to bitmask parity: represent character frequencies mod 2 as a bitmask, use XOR for path composition, and count pairs with ≤ 1 bit set using a frequency hash map.**
