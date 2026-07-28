# 3389. Minimum Operations to Make Character Frequencies Equal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal](https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal)
**Companies:** Google, Tiktok

---

## Problem Description
Given a string consisting of lowercase English letters, you can perform an operation that increments or decrements the frequency of any character by 1 (adding or removing an occurrence). Determine the minimum number of operations required so that all characters that appear in the string have the same frequency.

## Examples
- **Input:** `"aabbcc"` → **Output:** `0` – all frequencies are already equal (2 each).
- **Input:** `"aaabbbcc"` → **Output:** `2` – decrease `a` and `b` to frequency 2, or increase `c` to 3.
- **Input:** `"abc"` → **Output:** `0` – each character appears once.

## Approach
Use a frequency map to count occurrences of each character. Sort the frequencies. The optimal target frequency must be one of the existing frequencies (or zero). For each candidate target, compute the total operations needed by summing absolute differences, ignoring characters that would need to be removed completely (target = 0). Choose the minimum total.

## Walkthrough
| Step | Action | Explanation |
|------|--------|-------------|
|1|Count frequencies: `a:3, b:3, c:2`|Build hashmap.
|2|Sort frequencies → `[2,3,3]`|Prepare candidates.
|3|Try target = 2: operations = `(3‑2)+(3‑2)+(2‑2)=2`|Best so far.
|4|Try target = 3: operations = `(3‑3)+(3‑3)+(3‑2)=1` (but would need to add one `c`).|Compare.
|5|Select minimum = 1 operation (or 2 depending on allowed operations).|Result.

## Complexity Analysis
- **Time:** O(n + k log k) where *n* is string length and *k* ≤ 26 is number of distinct characters.
- **Space:** O(k) for the frequency map.

## Follow-Up Questions
1. How would the solution change if you could only delete characters?
2. Extend to Unicode characters with a larger alphabet.
3. What if the operation cost differs for increment vs. decrement?

## Key Takeaway
The optimal equal frequency is always one of the existing frequencies; evaluating each candidate yields the minimal number of adjustments.
