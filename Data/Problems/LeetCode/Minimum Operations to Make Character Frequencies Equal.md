# 3389. Minimum Operations to Make Character Frequencies Equal

**Difficulty:** 🔴 Hard
**LeetCode:** [https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal](https://leetcode.com/problems/minimum-operations-to-make-character-frequencies-equal)
**Companies:** Google, Tiktok

---

## Problem Description
You are given a string `s`.

A string `t` is called **good** if all characters of `t` occur the same number of times.

You can perform the following operations **any number of times**:

- Delete a character from `s`.
- Insert a character in `s`.
- Change a character in `s` to its next letter in the alphabet.

**Note** that you cannot change `'z'` to `'a'` using the third operation.

Return the **minimum** number of operations required to make `s` **good**.

**Constraints:**
- `3 <= s.length <= 2 * 10^4`
- `s` contains only lowercase English letters.

## Examples

```
Example 1:
  Input: s = "acab"
  Output: 1
  Explanation: We can make s good by deleting one occurrence of character 'a'.
```

```
Example 2:
  Input: s = "wddw"
  Output: 0
  Explanation: We do not need to perform any operations since s is initially good.
```

```
Example 3:
  Input: s = "aaabc"
  Output: 2
  Explanation: We can make s good by applying these operations:
  - Change one occurrence of 'a' to 'b'
  - Insert one occurrence of 'c' into s
```

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
